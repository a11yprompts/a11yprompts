import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';

// ─── Recursive file reader ────────────────────────────────────────────────────

function readMdFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...readMdFiles(full));
    } else if (entry.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

// ─── Parse CLI args ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);

const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const toolArg  = getArg('--tool') ?? 'all';
const levelArg = getArg('--level') ?? 'a,aa,best-practices';

const TOOLS  = toolArg  === 'all' ? ['claude', 'cursor'] : toolArg.split(',');
const LEVELS = levelArg === 'all' ? ['a', 'aa', 'aaa', 'best-practices']
                                  : levelArg.split(',');

console.log(`\n🔨 Building a11yprompts`);
console.log(`   Tools:  ${TOOLS.join(', ')}`);
console.log(`   Levels: ${LEVELS.join(', ')}\n`);

// ─── Read and filter rules ────────────────────────────────────────────────────

const RULES_DIR = new URL('../rules', import.meta.url).pathname;

const rules = readMdFiles(RULES_DIR)
  .map(f => {
    const raw = readFileSync(f, 'utf8');
    const { data, content } = matter(raw);
    return { file: f, data, content };
  })
  .filter(r => LEVELS.includes(r.data.level?.toLowerCase().replace(/\s+/g, '-')));

console.log(`📋 Found ${rules.length} rule(s) matching level filter\n`);

// ─── Builders ─────────────────────────────────────────────────────────────────

function buildClaude(rules) {
  const header = [
    `# a11yprompts — Accessibility Rules`,
    `# Generated: ${new Date().toISOString()}`,
    `# Levels: ${LEVELS.join(', ')}`,
    `# DO NOT EDIT — regenerate with: npm run build`,
    `# https://a11yprompts.org`,
    ``
  ].join('\n');

  const body = rules
    .map(r => `---\n<!-- Rule: ${r.data.id} | ${r.data.title} -->\n${r.content.trim()}`)
    .join('\n\n');

  return header + body;
}

function buildCursorMdc(rule) {
  return [
    `---`,
    `description: ${rule.data.title}`,
    `alwaysApply: true`,
    `---`,
    ``,
    rule.content.trim()
  ].join('\n');
}

// ─── Write output ─────────────────────────────────────────────────────────────

const DIST = new URL('../dist', import.meta.url).pathname;
mkdirSync(DIST, { recursive: true });

if (TOOLS.includes('claude')) {
  const claudeDir = join(DIST, 'claude');
  mkdirSync(claudeDir, { recursive: true });

  const content = buildClaude(rules);
  const outPath = join(claudeDir, 'a11yprompts.md');
  writeFileSync(outPath, content, 'utf8');

  console.log(`✅ Claude Code → dist/claude/a11yprompts.md (${rules.length} rules)`);
  console.log(`\n   📎 Add this line to your CLAUDE.md:`);
  console.log(`      @import ./node_modules/a11yprompts/dist/claude/a11yprompts.md\n`);
}

if (TOOLS.includes('cursor')) {
  const cursorDir = join(DIST, 'cursor', 'rules');
  mkdirSync(cursorDir, { recursive: true });

  rules.forEach(rule => {
    const filename = basename(rule.file, '.md') + '.mdc';
    const outPath  = join(cursorDir, filename);
    writeFileSync(outPath, buildCursorMdc(rule), 'utf8');
  });

  console.log(`✅ Cursor       → dist/cursor/rules/ (${rules.length} files)`);
  console.log(`\n   📎 Copy or symlink into your project:`);
  console.log(`      cp -r node_modules/a11yprompts/dist/cursor/rules/ .cursor/rules/a11yprompts\n`);
}

console.log('🎉 Build complete\n');
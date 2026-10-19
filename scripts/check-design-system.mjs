import { readdir, readFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const failures = []
const fail = (message) => failures.push(message)

const requiredTokens = [
  '--color-bg-page',
  '--color-bg-surface',
  '--color-bg-card',
  '--color-bg-raised',
  '--color-text-primary',
  '--color-text-secondary',
  '--color-text-muted',
  '--color-border-subtle',
  '--color-border-strong',
  '--color-border-control',
  '--color-focus-ring',
  '--font-display',
  '--font-body',
  '--font-editorial',
  '--font-size-display',
  '--font-size-heading',
  '--font-size-subheading',
  '--font-size-body',
  '--font-size-label',
  '--font-size-meta',
  '--line-height-display',
  '--line-height-heading',
  '--line-height-body',
  '--tracking-display',
  '--tracking-label',
  '--space-0',
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
  '--space-6',
  '--space-8',
  '--space-12',
  '--space-16',
  '--space-24',
  '--space-32',
  '--content-width',
  '--reading-width',
  '--page-gutter',
  '--section-space',
  '--section-space-compact',
  '--icon-size',
  '--radius-chip',
  '--radius-control',
  '--radius-card',
  '--radius-terminal',
  '--duration-fast',
  '--ease-out',
]

const indexCss = await readFile(resolve(root, 'src/styles/index.css'), 'utf8')
for (const token of requiredTokens) {
  if (!indexCss.includes(`${token}:`)) {
    fail(`src/styles/index.css is missing the ${token} token.`)
  }
}
if (!indexCss.includes('tailwindcss/preflight.css')) {
  fail('src/styles/index.css must import tailwindcss/preflight.css.')
}
for (const utility of ['rounded-chip', 'rounded-control', 'rounded-card', 'rounded-terminal']) {
  if (!indexCss.includes(`@utility ${utility}`)) {
    fail(`src/styles/index.css is missing the @utility ${utility} helper.`)
  }
}

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

const forbidden = [
  {
    pattern: /--color-(?:background|foreground|muted-foreground)(?![\w-])/,
    message: 'legacy GitHub-style color token; use the semantic portfolio tokens',
  },
  {
    pattern: /--color-border(?![\w-])/,
    message: 'legacy --color-border token; use --color-border-subtle, --color-border-strong, or --color-border-control',
  },
  {
    pattern: /\bshadow-(?:sm|md|lg|xl|2xl)\b/,
    message: 'drop shadows are not part of the system; use surface brightness instead',
  },
  {
    pattern: /\btext-\[[^\]]+\]/,
    message: 'arbitrary font-size utility; use the text role tokens',
  },
]

for await (const path of walk(resolve(root, 'src'))) {
  const rel = relative(root, path)
  if (!/\.(?:tsx?|css)$/.test(path)) continue
  // Palette primitives live in the token sheet; activity palettes are data, not UI tokens.
  if (rel === 'src/styles/index.css' || rel === 'src/contribution-utils.ts') continue
  const source = await readFile(path, 'utf8')
  for (const { pattern, message } of forbidden) {
    if (pattern.test(source)) {
      fail(`${rel}: ${message} (${pattern}).`)
    }
  }
}

const kitchenSink = await readFile(resolve(root, 'src/pages/KitchenSinkPage.css'), 'utf8')
const duplicateClasses = [
  'button',
  'terminal-window',
  'project-empty-state',
  'text-link',
  'type-display',
  'type-heading',
  'type-body',
  'type-meta',
  'eyebrow',
]
for (const className of duplicateClasses) {
  const pattern = new RegExp(`(?:^|[\\s,>])\\.${className}(?![\\w-])`)
  if (pattern.test(kitchenSink)) {
    fail(
      `src/pages/KitchenSinkPage.css re-declares .${className}; use the production component class instead.`,
    )
  }
}

try {
  await readFile(resolve(root, 'src/DesignTokens.ts'), 'utf8')
  fail('src/DesignTokens.ts duplicates the CSS tokens; remove the TypeScript mirror.')
} catch {
  // The mirror is intentionally absent.
}

if (failures.length) {
  console.error('Design system check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Design system check passed (${requiredTokens.length} tokens verified).`)

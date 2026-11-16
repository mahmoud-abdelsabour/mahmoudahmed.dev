// Extracts the devicon SVGs used by the Tech Stack section into src/data/stack-icons.json
// (so the full icon set is never shipped). Run: node scripts/extract-stack-icons.mjs
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const set = require('@iconify-json/devicon/icons.json')

const ids = [
  'dot-net',
  'dotnetcore',
  'nodejs',
  'entityframeworkcore',
  'react',
  'tailwindcss',
  'typescript',
  'bootstrap',
  'microsoftsqlserver',
  'postgresql',
  'mongodb',
  'redis',
  'git',
  'docker',
  'postman',
  'azuredevops',
]
const out = {}
for (const id of ids) {
  const i = set.icons[id]
  if (!i) throw new Error(`Missing devicon: ${id}`)
  out[id] = { body: i.body, width: i.width ?? set.width, height: i.height ?? set.height }
}
writeFileSync(
  new URL('../src/data/stack-icons.json', import.meta.url),
  JSON.stringify(out, null, 2) + '\n',
)
console.log(`Wrote ${ids.length} icons`)

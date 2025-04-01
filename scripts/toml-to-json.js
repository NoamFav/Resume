// scripts/toml-to-json.js
import fs from 'fs'
import toml from 'toml'

const files = [
  'config',
  'projects',
  'skills',
  'experience',
  'education',
  'frameworks',
  'programming_languages',
  'tools',
  'contact',
  'roadmaps'
]

files.forEach((file) => {
  const raw = fs.readFileSync(`src/data/${file}.toml`, 'utf-8')
  const parsed = toml.parse(raw)
  fs.writeFileSync(`public/data/${file}.json`, JSON.stringify(parsed, null, 2))
})
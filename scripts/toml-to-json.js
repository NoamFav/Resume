import fs from 'fs'
import toml from 'toml'

// Ensure output folder exists
const outputDir = 'public/data'
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

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
  fs.writeFileSync(`${outputDir}/${file}.json`, JSON.stringify(parsed, null, 2))
})
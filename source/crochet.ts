
import {
  evaluate,
  read,
  readGlob,
  FileReadReport,
  writeAll,
  extensionless,
  filename
} from "crochet"

(async function renderHistories() {

  // Read template.
  const template = (await read("source/templates/histories.crochet.html")).content

  // Read sources.
  const sources = await readGlob("source/histories/*.md")

  // Render histories.
  const histories = await Promise.all(sources.map(async function(source: FileReadReport) {
    return {
      path: `build/histories/${extensionless(filename(source.path)).toLowerCase()}/index.html`,
      content: await evaluate(template, source)
    }
  }))

  // Write histories.
  await writeAll(histories)
})()

// Log all errors to the console.
.catch(error => {
  console.error(error)
  throw error
})

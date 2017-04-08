
//
// This node script generates the Herodotus website.
//

// Evaluate the javascript blocks in the template html.
import evaluate from "crochet/build/evaluate"

// Functions for reading and writing files.
import {
  read,
  readGlob,
  FileReadReport,
  write,
  copy,
  writeAll,
  FileWriteMandate,
  extensionless,
  filename
} from "crochet/build/disk"

// Utilities made specifically for parsing and handling the Herodotus books.
import { Book, parseBooksFromMarkdown } from "./book-utils"

/**
 * Immediately invoked function expression which generates the website.
 */
(async function generateWebsite() {

  // Read the HTML template file.
  const templateFile = await read("source/template.html")

  // Read the entire histories in one go.
  const sourceTextFile = await read("source/herodotus-histories.md")

  // Parse the histories.
  const histories = parseBooksFromMarkdown(sourceTextFile.content)

  // Render histories.
  const fileWriteMandates: FileWriteMandate[] = await Promise.all(
    histories.map(async function(book) {
      return {
        path: `build/${book.name}/index.html`,
        content: await evaluate(templateFile.content, book)
      }
    })
  )

  // Write histories.
  await writeAll(fileWriteMandates)

  // Copy index file and stylesheet.
  await copy("source/index.html", "build/index.html")
  await copy("source/style.css", "build/style.css")
})()

// Log all errors to the console.
.catch(error => { console.error(error); throw error })


import {
  evaluate,
  read,
  readGlob,
  FileReadReport,
  writeAll,
  FileWriteMandate,
  extensionless,
  filename
} from "crochet"

/**
 * History book which has been parsed.
 * Provided as context to the template.
 */
interface HistoryBook {
  title: string
  name: string
  content: string
}

/**
 * Parse herodotus history books out of the markdown file.
 */
function parseBooksFromMarkdown(markdown: string): HistoryBook[] {
    markdown = markdown.split(/[=]{3,}/m)[1].trim()

    const bookParse = markdown.split(/^([\w\s]+)(?:\r\n|\n)^[-]{3,}/m)
      .map(chapter => chapter.trim())
      .filter(chapter => !!chapter)

    const bookTitles   = bookParse.filter((chapter, index) => index % 2 === 0)
    const bookContents = bookParse.filter((chapter, index) => index % 2 !== 0)

    return bookTitles.map((title, index) => ({
      title,
      name: title.toLowerCase().replace(/\s/, "-"),
      content: bookContents[index]
    }))
}

(async function generateWebsite() {

  // Read the HTML template file.
  const templateFile = await read("source/histories.crochet.html")

  // Read the entire histories in one go.
  const sourceTextFile = await read("source/herodotus-histories.md")

  // Parse the histories.
  const histories = parseBooksFromMarkdown(sourceTextFile.content)

  // Render histories.
  const fileWriteMandates: FileWriteMandate[] = await Promise.all(
    histories.map(async function(book) {
      return {
        path: `build/histories/${book.name}/index.html`,
        content: await evaluate(templateFile.content, book)
      }
    })
  )

  // Write histories.
  await writeAll(fileWriteMandates)
})()

// Log all errors to the console.
.catch(error => { console.error(error); throw error })

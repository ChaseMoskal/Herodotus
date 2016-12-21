
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

(async function renderHistories() {

  // Read the HTML template file.
  const template = (await read("source/histories.crochet.html")).content

  // Read the entire histories in one go.
  const sourceTextFile = await read("source/herodotus-histories-george-rawlinson.md")

  // Parse the histories.
  const histories = ((file: FileReadReport): HistoryBook[] => {
    const text: string = file.content.split(/[=]{3,}/m)[1].trim()

    const bookParse = text.split(/^([\w\s]+)(?:\r\n|\n)^[-]{3,}/m)
      .map(chapter => chapter.trim())
      .filter(chapter => !!chapter)

    const bookTitles   = bookParse.filter((chapter, index) => index % 2 === 0)
    const bookContents = bookParse.filter((chapter, index) => index % 2 !== 0)

    return bookTitles.map((title, index) => ({
      title,
      name: title.toLowerCase().replace(/\s/, "-"),
      content: bookContents[index]
    }))
  })(sourceTextFile)

  // Render histories.
  const fileWriteMandates: FileWriteMandate[] = await Promise.all(
    histories.map(async function(book) {
      return {
        path: `build/histories/${book.name}/index.html`,
        content: await evaluate(template, book)
      }
    })
  )

  // Write histories.
  await writeAll(fileWriteMandates)
})()

// Log all errors to the console.
.catch(error => { console.error(error); throw error })

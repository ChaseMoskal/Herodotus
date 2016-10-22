
/**
 * Book object.
 */
export interface Book {
  name: string
  numeral: string
  passages: { id: string; text: string; }[]
}

/**
 * Parse text into a book object.
 */
export function parseBook(text: string): Book {

  // Ascertain the book name and numeral.
  const [header, raw] = text.split('--------')
  const [firstLine] = header.split('\n')
  const [numeral, name] = firstLine.split('–')[1].trim().split(' ')

  // Parse passages from the raw text.
  const passages = raw.split('[')
    .filter(t => /\]/.test(t))
    .map(passage => {
      let [id, text] = passage.split(']')
      text = text.trim()
      return {id, text}
    })

  console.log(`\n${numeral} ${name}\n - ${passages.length} passages`)
  return {numeral, name, passages}
}

/**
 * Load and parse a book from a URI.
 */
export function loadBook(uri: string): Promise<Book> {

  // Fetch the book.
  return fetch(uri)

    // Grab the text content.
    .then(response => response.text())

    // Parse the text into a history book.
    .then(parseBook)
}

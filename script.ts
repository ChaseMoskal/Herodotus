
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//// INPUT INFORMATION

const sources = [
  'histories/1-CLIO.txt',
  'histories/2-EUTERPE.txt',
  'histories/3-THALIA.txt',
  'histories/4-MELPOMENE.txt',
  'histories/5-TERPSICHORE.txt',
  'histories/6-ERATO.txt',
  'histories/7-POLYMNIA.txt',
  'histories/8-URANIA.txt',
  'histories/9-CALLIOPE.txt'
]

// Destination element to append history sections.
const historyDestination = document.querySelector('#herodotus')

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//// FUNCTION DEFINITIONS

/**
 * Parsed history book.
 */
interface HistoryBook {
  numeral: string
  name: string
  passages: { id: string; text: string; }[]
}

/**
 * Parse text contents into a history book object.
 */
function parseHistoryBook(text: string): HistoryBook {

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

  console.log(`\n${numeral} ${name}\n  - ${passages.length} passages`)
  return {numeral, name, passages}
}

/**
 * Format a history book into an HTML history section.
 */
function formatHistorySection(book: HistoryBook): HTMLElement {
  const section = document.createElement('section')
  const paragraphs = '<p>'
    + book.passages.map(passage => {
      const idTag = `<em class="passage-id">[${passage.id}]</em>`
      const text = passage.text.replace(/\n/g, '<br/>')
      return `${idTag} ${text}`
    }).join('</p><p>')
    + '</p>'
  section.innerHTML = `<h1><span class="numeral">${book.numeral}</span> ${book.name}</h1>` + paragraphs
  section.className = 'passage'
  return section
}

/**
 * Load an HTML history section from the provided URI.
 */
function loadHistorySection(uri: string): Promise<HTMLElement> {

  // Fetch the book.
  return fetch(uri)

    // Grab the text content.
    .then(response => response.text())

    // Parse the text into a history book.
    .then(parseHistoryBook)

    // Format the history book into an HTML history section.
    .then(formatHistorySection)
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////// ACTION

// Load all history sections.
Promise.all(sources.map(loadHistorySection))

  // Append each history section.
  .then(books => books.forEach(book => historyDestination.appendChild(book)))

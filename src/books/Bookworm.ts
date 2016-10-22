
import { Book, loadBook } from './bookUtils'

/**
 * Options for creating a bookworm.
 */
export interface BookwormOptions {

  /** Root directory for loading books (no trailing slash). */
  root: string

  /** Array of book filenames (no extensions). */
  bookNames: string[]

  /** Name of the default book to load. */
  defaultBook: string

  /** File extension for loading books (no leading period). */
  extension: string

  /** HTML element where the book's contents will be displayed. */
  destination: HTMLElement

  /** Callback fired when a book is displayed. */
  onBookChange?: ((bookElement: HTMLElement) => void)
}

/**
 * Bookworm loads and displays books on demand.
 */
export default class Bookworm {
  private root: string
  private bookNames: string[]
  private defaultBookName: string
  private extension: string
  private destination: HTMLElement
  private onBookChange: (bookElement: HTMLElement) => void

  /** True when busy. Books cannot be summoned while we're still busy. */
  private busy: boolean = false

  /**
   * Create a new bookworm.
   */
  constructor(options: BookwormOptions) {

    // Accept options.
    this.root = options.root
    this.bookNames = options.bookNames
    this.defaultBookName = options.defaultBook
    this.extension = options.extension
    this.destination = options.destination
    this.onBookChange = options.onBookChange || (() => {})

    // Handle hash change events.
    window.addEventListener("hashchange", () => this.summonBookBasedOnHash())

    // Handle the initial hash state.
    this.summonBookBasedOnHash()
  }

  /**
   * Handle the change of location hash.
   */
  private summonBookBasedOnHash() {
    const hash = window.location.hash.replace(/^#/, "")
    const bookName = this.bookNames.find(bookName => bookName === hash) || this.defaultBookName
    this.summonBook(bookName)
  }

  /**
   * Load, parse, and display a book.
   */
  private summonBook(bookName: string): Promise<void> {

    // Bail out if we're already busy.
    if (this.busy) {
      console.log("Cannot summon book while already busy.")
      return Promise.resolve()
    }

    // Start being busy.
    this.busy = true;

    // Put together the URI to the book.
    const uri = `${this.root}/${bookName}.${this.extension}`

    // Load up the book.
    return loadBook(uri)

      // Format the book to our liking.
      .then(formatBookElement)

      // Overwrite the book destination with our formatted book HTML.
      .then(bookElement => {

        // Clear the destination.
        while (this.destination.firstChild)
          this.destination.removeChild(this.destination.firstChild)

        // Insert the book.
        this.destination.appendChild(bookElement)

        return bookElement
      })

      // Execute book change callback.
      .then(bookElement => this.onBookChange(bookElement))

      // Stop being busy.
      .then(() => { this.busy = false })
  }
}

/**
 * Format a book into a nice HTML section element.
 */
function formatBookElement(book: Book): HTMLElement {

  const section = document.createElement('section')
  section.className = 'book'

  const paragraphs = '<p>'
    + book.passages.map(passage => {
      const idTag = `<em class="passage-id">[${passage.id}]</em>`
      const text = passage.text.replace(/\n/g, '<br/>')
      return `${idTag} ${text}`
    }).join('</p><p>')
    + '</p>'

  section.innerHTML = `<h1><span class="numeral">${book.numeral}</span> ${book.name}</h1>` + paragraphs

  return section
}

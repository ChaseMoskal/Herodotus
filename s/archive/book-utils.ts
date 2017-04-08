
//
// Herodotus text is divided into books.
// This util module contains tools for interacting with the books.
//

/**
 * Book which has been parsed.
 * Provided as context to the template.
 */
export interface Book {

  /** Human readable title of the book. */
  title: string

  /** URL-friendly shortname for the book. */
  name: string

  /** Whole text content of the book. */
  content: string

  /** Navigation references to other books. */
  navigation?: {
    title: string
    name: string
    href: string
  }[]
}

/**
 * Parse books out of the markdown file.
 */
export function parseBooksFromMarkdown(markdown: string): Book[] {
    markdown = markdown.split(/[=]{3,}/m)[1].trim()

    const bookParse = markdown.split(/^([\w\s]+)(?:\r\n|\n)^[-]{3,}/m)
      .map(chapter => chapter.trim())
      .filter(chapter => !!chapter)

    const bookTitles   = bookParse.filter((chapter, index) => index % 2 === 0)
    const bookContents = bookParse.filter((chapter, index) => index % 2 !== 0)

    const books = bookTitles.map((title, index) => ({
      title,
      name: title.toLowerCase().replace(/\s/, "-"),
      content: bookContents[index]
    }))

    return books.map(book => ({
      navigation: books.map(({title, name}) => ({
        title,
        name,
        href: `../${name}/`
      })),
      ...book
    }))
}

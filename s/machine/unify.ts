
/******************************************************************************

=========
~ UNIFY ~
=========

Script to generate the unified history

  - stitches the passages together to create unified history
  - aggregates footnotes and bundles them at the bottom
  - each translation's formatting is unique, thus has its own parser

The unified history is

  - represented in memory as a javascript object
  - serializable as nine machine-readable markdown files with YAML 
    frontmatter

******************************************************************************/

import parseAdaptedHistory from "./parseAdaptedHistory"
import {
  BookTranslation, Passage, UnifiedPassage, UnifiedBook
} from "./concepts"

import * as files from "crochet/o/files"

/**
 * Stitch multiple book translations together into a unified book
 */
export default function unify(books: BookTranslation[]): UnifiedBook {
  return {
    translators: books.map(book => book.translator),

    titleTranslations: books
      .map(book => book.title),

    unifiedPassages: books[0].passages
      .map(mainPassage => ({
        id: mainPassage.id,
        translations: books.map(
            book => {
              const passage = book.passages.find(passage => passage.id === mainPassage.id)
              return (passage && passage.text)
                ? passage.text
                : ""
            }
        )
      }))
  }
}

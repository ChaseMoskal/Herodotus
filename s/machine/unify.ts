
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

import * as parsers from "./parsers"
import {
  BookTranslation, Passage, UnifiedPassage, UnifiedBook
} from "./concepts"

import * as files from "crochet/o/disk/files"

/**
 * Stitch multiple book translations together into a super-copy
 */
const unify = (books: BookTranslation[]): UnifiedBook => ({

  translatorNames: books.map(book => book.translatorName),

  titleTranslations: books
    .map(book => book.title),

  unifiedPassages: books[0].passages
    .map(mainPassage => ({
      id: mainPassage.id,
      translations: books.map(
          book => book.passages
            .find(passage => passage.id === mainPassage.id)
            .text
      )
    }))
})

/**
 * Perform the unification.
 */
;(async () => {

  // Create the unified book!
  const unifiedBook = unify([

    // Right now, I've only got the skalides parser ready...
    parsers.skalides(
      await files.read("s/histories/digested/i-clio.skalides.txt")
    )
  ])

  console.log("Titles:", unifiedBook.titleTranslations)
  console.log("Number of unified passages:", unifiedBook.unifiedPassages.length)

})().catch(error => console.error(error))

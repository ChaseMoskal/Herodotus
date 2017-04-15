
/******************************************************************************

===========
~ PARSERS ~
===========

Parse Herodotus translation text files into BookTranslation objects

******************************************************************************/

import {BookTranslation, Passage} from "./concepts"

import * as files from "crochet/o/disk/files"

/** Signature of a translation parsing function */
export type TranslationParser = (bookFile: files.ReadReport) => BookTranslation

/**
 * Parse a skalides book translation
 */
export const skalides: TranslationParser = (bookFile: files.ReadReport): BookTranslation => ({

  // Name of the translator
  translator: bookFile.frontmatter.translator,

  // Translated title
  title: bookFile.frontmatter.title,

  // Parsing adapted text into passage objects
  passages: bookFile.content
    /*
    At this point, the adapted content looks like this [truncated]:

      11. Ούτω λοιπόν χωρίς να αποδείξη τίποτε κατ' εκείνην την στιγμήν,
      την εξής ερώτησιν· Η γυνή αποκριθείσα είπε· «Θα ορμήσης εκ
      γυμνήν και θα τον κτυπήσης κοιμώμενον.»

      12. Τακτοποιηθέντος του σχεδίου τούτου και ελθούσης της νυκτός, ο
      Γύγης (επειδή η γυνή δεν τον άφησε να μακρυνθή, ούτε ήτο δυνατόν
      όστις έζη κατ' εκείνην την εποχήν.

    */

    // Separate the numbered passages
    //  - ["\n", "11. Ούτω λοιπόν…", "10. Τακτο…"]
    .split(/(?=^\d+\.)/m)

    // Remove the chaff (extra strings, newlines, etc)
    //  - ["11. Ούτω λοιπόν…", "10. Τακτο…"]
    .map(text => text.trim()).filter(text => !!text)

    // Parse into passage objects
    .map(passage => {
      const [id, text] = passage.split(/(\d+)\.\s*/m)
        .map(s => s.trim()).filter(s => !!s)
      return {id, text}
    })
})

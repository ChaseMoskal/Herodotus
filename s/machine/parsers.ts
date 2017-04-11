
/******************************************************************************

===========
~ PARSERS ~
===========

  Parse Herodotus translation text files into BookTranslation objects

******************************************************************************/

import {BookTranslation, Passage} from "./concepts"

import * as files from "crochet/o/disk/files"

/**
 * Parse a skalides book translation
 */
export function skalides(bookFile: files.FileReadReport): BookTranslation {
  const translatorName = "A. Skalides"

  // The translated book title, in greek
  const {title} = bookFile.frontmatter.title

  /*
  At this point, the digested content looks like this [truncated]:

    11. Ούτω λοιπόν χωρίς να αποδείξη τίποτε κατ' εκείνην την στιγμήν,
    την εξής ερώτησιν· Η γυνή αποκριθείσα είπε· «Θα ορμήσης εκ
    γυμνήν και θα τον κτυπήσης κοιμώμενον.»

    12. Τακτοποιηθέντος του σχεδίου τούτου και ελθούσης της νυκτός, ο
    Γύγης (επειδή η γυνή δεν τον άφησε να μακρυνθή, ούτε ήτο δυνατόν
    όστις έζη κατ' εκείνην την εποχήν.

  */

  // Parsing digested text into passage objects
  const passages: Passage[] = bookFile.content

    // Separate the numbered passages
    //  - ["\n", "11. Ούτω λοιπόν…", "10. Τακτο…"]
    .split(/(?=^\d+\.)/m)

    // Remove the chaff (extra strings, newlines, etc)
    //  - ["11. Ούτω λοιπόν…", "10. Τακτο…"]
    .map(text => text.trim()).filter(text => !!text)

    // Parse into passage objects
    .map(passage => {
      const [id, text] = passage
        .split(/(\d+)\.\s*/m).map(s => s.trim()).filter(s => !!s)
      return {id, text}
    })

  // Return a proper book translation
  return {translatorName, title, passages}
}

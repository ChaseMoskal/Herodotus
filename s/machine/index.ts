
import unify from "./unify"
import parseAdaptedHistory from "./parseAdaptedHistory"

import * as files from "crochet/o/files"

/**
 * Perform the unification.
 */
;(async () => {

  // Create the unified book!
  const unifiedBook = unify([
    parseAdaptedHistory(await files.read("s/histories/adapted/i-clio.skalides.txt")),
    parseAdaptedHistory(await files.read("s/histories/adapted/i-clio.macaulay.txt")),
    parseAdaptedHistory(await files.read("o/histories/adapted/i-clio.rawlinson.txt"))
  ])

  console.log("Titles:", unifiedBook.titleTranslations)
  console.log("Number of unified passages:", unifiedBook.unifiedPassages.length)

})().catch(error => console.error(error))

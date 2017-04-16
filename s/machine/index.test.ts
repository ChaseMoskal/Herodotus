
import * as tape from "tape"

import * as files from "crochet/o/files"

import unify from "./unify"
import parseAdaptedHistory from "./parseAdaptedHistory"

;(async () => {

  /** Constants in the tests that may be reused */
  const constants = Object.freeze({
      i_clio: unify([
        parseAdaptedHistory(await files.read("s/histories/adapted/i-clio.skalides.txt"))
      ])
  })

  /** Verify the integrity of a unified book */
  tape("unified book looks ok", t => {
    const {i_clio} = constants;

    t.ok(i_clio)

    t.ok(i_clio.titleTranslations)
    t.ok(i_clio.translators)
    t.ok(i_clio.unifiedPassages)
    t.ok(i_clio.unifiedPassages.length > 10)

    t.comment(` - adapted and parsed passages: ${i_clio.unifiedPassages.length}`)
    t.end()
  })


})()

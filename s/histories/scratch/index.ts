
import * as files from "crochet/o/files"

/**
 * Render the rawlinson adaptation from scratch file
 */
;(async () => {

  const scratch = await files.read("s/histories/scratch/i-clio.rawlinson.txt")

  const passages = scratch.content.split(/❂/)
    .map(s => s.replace(/✖\s*/gm, ""))
    .map(s => s.trim()).filter(s => !!s)
    .map((passage, number) => `${number}. ${passage}`)

  await files.write({
    filepath: "o/histories/adapted/i-clio.rawlinson.txt",
    content: passages.join("\n\n").trim()
  })

  console.log("❂ rendered rawlinson adaptation from scratch")

})()

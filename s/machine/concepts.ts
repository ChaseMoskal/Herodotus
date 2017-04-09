
/**
 * Numbered paragraph from the Herodotus text
 */
export interface Passage {
  id: string
  text: string
}

/**
 * A translation of a Herodotus book, including all of its passages
 */
export interface BookTranslation {
  title: string
  translatorName: string
  passages: Passage[]
}

/**
 * A single herodotus passage with multiple translations
 */
export interface UnifiedPassage {
  id: string
  translations: string[]
}

/**
 * A Herodotus book with multiple translations
 */
export interface UnifiedBook {

  /** Name of each translator */
  translatorNames: string[]

  /** Translations of the book title */
  titleTranslations: string[]

  /** Each passage contains each translation */
  unifiedPassages: UnifiedPassage[]
}

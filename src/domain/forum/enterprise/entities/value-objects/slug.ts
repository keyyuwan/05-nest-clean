export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a string and normalize it as a slug.
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // replace every white space
      .replace(/[^\w-]+/g, '') // replace everything that are not words
      .replace(/_/g, '-') // replace every underline
      .replace(/--+/g, '-') // replace every double "--"
      .replace(/-$/g, '') // replace every text that ends with "-"

    return new Slug(slugText)
  }
}

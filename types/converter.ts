export type ConvertedResult =
  | {
      success: true
      result: string
    }
  | {
      success: false
      error: string
    }

export type Converter = {
  name: string
  description: string
  converterFunction: (text: string) => ConvertedResult
}


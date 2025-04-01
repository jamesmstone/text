import type { Converter, ConvertedResult } from "@/types/converter"

// Encoding functions
export const encodeBase64 = (text: string): ConvertedResult => {
  try {
    return {
      success: true,
      result: btoa(text),
    }
  } catch (e) {
    return {
      success: false,
      error: "Invalid input for Base64 encoding",
    }
  }
}

export const encodeUrl = (text: string): ConvertedResult => {
  try {
    return {
      success: true,
      result: encodeURIComponent(text),
    }
  } catch (e) {
    return {
      success: false,
      error: "Invalid input for URL encoding",
    }
  }
}

export const encodeHex = (text: string): ConvertedResult => {
  try {
    const result = Array.from(text)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
    return {
      success: true,
      result,
    }
  } catch (e) {
    return {
      success: false,
      error: "Invalid input for Hex encoding",
    }
  }
}

export const encodeBase32 = (text: string): ConvertedResult => {
  try {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    let bits = 0
    let value = 0
    let output = ""

    for (let i = 0; i < text.length; i++) {
      value = (value << 8) | text.charCodeAt(i)
      bits += 8

      while (bits >= 5) {
        output += alphabet[(value >>> (bits - 5)) & 31]
        bits -= 5
      }
    }

    if (bits > 0) {
      output += alphabet[(value << (5 - bits)) & 31]
    }

    // Add padding
    while (output.length % 8 !== 0) {
      output += "="
    }

    return {
      success: true,
      result: output,
    }
  } catch (e) {
    return {
      success: false,
      error: "Invalid input for Base32 encoding",
    }
  }
}

// Decoding functions
export const decodeBase64 = (text: string): ConvertedResult => {
  try {
    return {
      success: true,
      result: atob(text),
    }
  } catch (e) {
    return {
      success: false,
      error: "Invalid Base64 input",
    }
  }
}

export const decodeUrl = (text: string): ConvertedResult => {
  try {
    return {
      success: true,
      result: decodeURIComponent(text),
    }
  } catch (e) {
    return {
      success: false,
      error: "Invalid URL encoded input",
    }
  }
}

export const decodeHex = (text: string): ConvertedResult => {
  try {
    // Remove any spaces or non-hex characters
    const cleanHex = text.replace(/[^0-9A-Fa-f]/g, "")

    // Check if we have an even number of hex digits
    if (cleanHex.length % 2 !== 0) {
      return {
        success: false,
        error: "Invalid Hex input (must have even number of digits)",
      }
    }

    let result = ""
    for (let i = 0; i < cleanHex.length; i += 2) {
      const hexPair = cleanHex.substring(i, i + 2)
      const charCode = Number.parseInt(hexPair, 16)
      result += String.fromCharCode(charCode)
    }
    return {
      success: true,
      result,
    }
  } catch (e) {
    return {
      success: false,
      error: "Invalid Hex input",
    }
  }
}

export const decodeBase32 = (text: string): ConvertedResult => {
  try {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    // Remove padding and whitespace
    const cleanText = text.replace(/[=\s]/g, "").toUpperCase()

    for (let i = 0; i < cleanText.length; i++) {
      const char = cleanText[i]
      if (alphabet.indexOf(char) === -1) {
        return {
          success: false,
          error: `Invalid Base32 character: ${char}`,
        }
      }
    }

    let bits = 0
    let value = 0
    let output = ""

    for (let i = 0; i < cleanText.length; i++) {
      const char = cleanText[i]
      const charValue = alphabet.indexOf(char)

      value = (value << 5) | charValue
      bits += 5

      if (bits >= 8) {
        output += String.fromCharCode((value >>> (bits - 8)) & 255)
        bits -= 8
      }
    }

    return {
      success: true,
      result: output,
    }
  } catch (e) {
    return {
      success: false,
      error: "Invalid Base32 input",
    }
  }
}

// Encoder list
export const encoders: Converter[] = [
  {
    name: "Base64 Encoded",
    description: "Encodes text to Base64",
    converterFunction: encodeBase64,
  },
  {
    name: "URL Encoded",
    description: "Encodes text for URLs",
    converterFunction: encodeUrl,
  },
  {
    name: "Hex Encoded",
    description: "Encodes text to hexadecimal",
    converterFunction: encodeHex,
  },
  {
    name: "Base32 Encoded",
    description: "Encodes text to Base32",
    converterFunction: encodeBase32,
  },
]

// Decoder list
export const decoders: Converter[] = [
  {
    name: "Base64 Decoded",
    description: "Decodes Base64 encoded text",
    converterFunction: decodeBase64,
  },
  {
    name: "URL Decoded",
    description: "Decodes URL encoded text",
    converterFunction: decodeUrl,
  },
  {
    name: "Hex Decoded",
    description: "Decodes hexadecimal to text",
    converterFunction: decodeHex,
  },
  {
    name: "Base32 Decoded",
    description: "Decodes Base32 to text",
    converterFunction: decodeBase32,
  },
]


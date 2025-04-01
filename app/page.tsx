"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ConverterCard } from "@/components/converter-card"
import { encoders, decoders } from "@/lib/converters"

export default function TextConverter() {
  const [inputText, setInputText] = useState("")
  const [processLinesSeparately, setProcessLinesSeparately] = useState(false)

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Text Encoder/Decoder</h1>

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid gap-6 mb-8">
          <div>
            <Label htmlFor="input-text" className="text-lg font-medium mb-2 block">
              Enter text to convert:
            </Label>
            <Textarea
              id="input-text"
              placeholder="Type or paste text here..."
              className="min-h-[120px] text-base"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="process-lines"
              checked={processLinesSeparately}
              onCheckedChange={(checked) => setProcessLinesSeparately(checked === true)}
            />
            <Label
              htmlFor="process-lines"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Process each line separately
            </Label>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">Decoded Results</h2>
            <div className="grid gap-4">
              {decoders.map((converter) => (
                <ConverterCard
                  key={converter.name}
                  title={converter.name}
                  description={converter.description}
                  converter={converter.converterFunction}
                  inputText={inputText}
                  processLinesSeparately={processLinesSeparately}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Encoded Results</h2>
            <div className="grid gap-4">
              {encoders.map((converter) => (
                <ConverterCard
                  key={converter.name}
                  title={converter.name}
                  description={converter.description}
                  converter={converter.converterFunction}
                  inputText={inputText}
                  processLinesSeparately={processLinesSeparately}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ConvertedResult } from "@/types/converter"
import { cn } from "@/lib/utils"

interface ConverterCardProps {
  title: string
  description: string
  converter: (text: string) => ConvertedResult
  inputText: string
  processLinesSeparately?: boolean
}

export function ConverterCard({
  title,
  description,
  converter,
  inputText,
  processLinesSeparately = false,
}: ConverterCardProps) {
  const { toast } = useToast()

  const convertText = (text: string): ConvertedResult => {
    if (!text) return { success: true, result: "" }

    if (processLinesSeparately) {
      // Process each line separately
      const lines = text.split("\n")
      const results = lines.map((line) => {
        if (!line.trim()) return { success: true, result: line }
        return converter(line)
      })

      // Check if any line failed
      const failedLine = results.find((result) => !result.success)
      if (failedLine && !failedLine.success) {
        return failedLine
      }

      // All lines succeeded
      const combinedResult = results.map((result) => (result.success ? result.result : "")).join("\n")

      return { success: true, result: combinedResult }
    } else {
      // Process the entire text as one
      return converter(text)
    }
  }

  const conversionResult = convertText(inputText)
  const hasError = !conversionResult.success

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
      duration: 2000,
    })
  }

  return (
    <Card className={cn(hasError && "opacity-70")}>
      <CardHeader className={cn("pb-2", hasError && "text-muted-foreground")}>
        <CardTitle className="flex items-center gap-2">
          {title}
          {hasError && <AlertCircle className="h-4 w-4 text-destructive" />}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Textarea
            readOnly
            value={conversionResult.success ? conversionResult.result : conversionResult.error}
            className={cn("pr-10 min-h-[100px]", hasError && "text-destructive bg-destructive/5")}
          />
          {!hasError && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(conversionResult.success ? conversionResult.result : "")}
              disabled={!inputText || hasError}
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


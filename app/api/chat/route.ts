import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system:
      "You are Alice Johnson, a professional colleague. Respond as a real person would in a secure, professional chat environment. Keep responses concise and natural.",
  })

  return result.toDataStreamResponse()
}

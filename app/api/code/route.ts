import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

const instructionMessage: ChatCompletionRequestMessage = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!config.apiKey)
      return new NextResponse('OpenAI Key Not Configured', { status: 500 })

    if (!messages)
      return new NextResponse('No messages provided', { status: 400 })

    const isPro = await checkSubscription()
    const freeTrial = await checkApiLimit()
    if (!freeTrial && !isPro)
      return new NextResponse('Free trial limit reached', { status: 403 })

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    })

    if (!isPro) await increaseApiLimit()

    return NextResponse.json(response.data.choices[0].message)
  } catch (err) {
    console.log('[CODE_ERROR]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

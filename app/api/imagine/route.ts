import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, amount = 1, resolution = '512x512' } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    if (!config.apiKey)
      return new NextResponse('OpenAI Key Not Configured', { status: 500 })

    if (!prompt) return new NextResponse('No prompt provided', { status: 400 })

    const isPro = await checkSubscription()
    const freeTrial = await checkApiLimit()
    if (!freeTrial && !isPro)
      return new NextResponse('Free trial limit reached', { status: 403 })

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    })

    if (!isPro) await increaseApiLimit()

    return NextResponse.json(response.data.data)
  } catch (err) {
    console.log('[IMAGINE_ERROR]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

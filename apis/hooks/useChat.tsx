'use client'

import OpenAIAPI from '@/apis/OpenAIAPI'
import { useToast } from '@/components/ui/use-toast'
import { useProModal } from '@/hooks/useProModal'
import { useRouter } from 'next/navigation'
import { ChatCompletionRequestMessage } from 'openai'
import { useState } from 'react'

interface UseChat {
  generate: (prompt: string) => Promise<void>
  messages: ChatCompletionRequestMessage[]
  thinking: boolean
}

export default function useChat(): UseChat {
  const router = useRouter()
  const proModal = useProModal()
  const { toast } = useToast()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const [thinking, setThinking] = useState(false)

  const generate = async (prompt: string) => {
    try {
      setThinking(true)
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: prompt,
      }
      const newMessages = [...messages, userMessage]
      setMessages(newMessages)
      const message = await OpenAIAPI.generate(newMessages)
      setMessages(curr => [...curr, message])
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.open()
        const { dismiss } = toast({
          title: 'You have reached the 5 / 5 free generations.',
          description: 'Please upgrade to Pro to continue using Arriba.',
        })
        setTimeout(dismiss, 8000)
      } else {
        const { dismiss } = toast({
          title: 'Something went wrong.',
          description: error?.response?.data?.error || error.message,
          variant: 'destructive',
        })
        setTimeout(dismiss, 8000)
      }
    } finally {
      setThinking(false)
      router.refresh()
    }
  }

  return { generate, messages, thinking }
}

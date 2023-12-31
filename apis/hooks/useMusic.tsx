import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ReplicateAPI from '../ReplicateAPI'
import { useProModal } from '@/hooks/useProModal'
import { useToast } from '@/components/ui/use-toast'

interface UseMusic {
  generate: (prompt: string) => Promise<void>
  thinking: boolean
  music: string
}

export default function useMusic(): UseMusic {
  const { toast } = useToast()
  const proModal = useProModal()
  const router = useRouter()
  const [music, setMusic] = useState<string>('')
  const [thinking, setThinking] = useState<boolean>(false)
  const generate = async (prompt: string) => {
    setMusic('')
    setThinking(true)

    try {
      const res = await ReplicateAPI.generateImage(prompt)
      if (typeof res.audio !== 'string')
        throw new Error('Trouble generating music. Please try again.')
      setMusic(res.audio)
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

  return { generate, thinking, music }
}

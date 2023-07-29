import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ReplicateAPI from '../ReplicateAPI'
import { useProModal } from '@/hooks/useProModal'
import { useToast } from '@/components/ui/use-toast'

interface UseMusic {
  generate: (prompt: string) => Promise<void>
  thinking: boolean
  video: string
}

export default function useVideo(): UseMusic {
  const { toast } = useToast()
  const proModal = useProModal()
  const router = useRouter()
  const [video, setVideo] = useState<string>('')
  const [thinking, setThinking] = useState<boolean>(false)
  const generate = async (prompt: string) => {
    setVideo('')
    setThinking(true)

    try {
      const res = await ReplicateAPI.generateVideo(prompt)
      if (typeof res[0] !== 'string')
        throw new Error('Trouble generating video. Please try again.')
      setVideo(res[0])
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

  return { generate, thinking, video }
}

import { useState } from 'react'
import OpenAIAPI from '../OpenAIAPI'
import { useRouter } from 'next/navigation'
import { useProModal } from '@/hooks/useProModal'
import { useToast } from '@/components/ui/use-toast'

interface UseImagine {
  generate: (values: {
    prompt: string
    amount: string
    resolution: string
  }) => Promise<void>
  thinking: boolean
  images: string[]
}

export default function useImagine(): UseImagine {
  const [thinking, setThinking] = useState<boolean>(false)
  const [images, setImages] = useState<string[]>([])
  const proModal = useProModal()

  const { toast } = useToast()
  const router = useRouter()

  const generate = async (values: {
    prompt: string
    amount: string
    resolution: string
  }) => {
    setImages([])
    try {
      setThinking(true)
      const res = await OpenAIAPI.generateImages(values)
      console.log(res)
      const urls = res.map((image: { url: string }) => image.url)
      setImages(urls)
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

  return { generate, thinking, images }
}

'use client'

import { useProModal } from '@/hooks/useProModal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Check, Zap } from 'lucide-react'
import { Button } from './ui/button'
import StripeAPI from '@/apis/StripeAPI'
import { useState } from 'react'
import { tools } from '@/constants'

export default function ProModal() {
  const proModal = useProModal()
  const [loading, setLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const url = await StripeAPI.subscribe()
      window.location.href = url
    } catch (error) {
      console.log('[STRIP_CLIENT_ERROR]', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 font-bold py-1'>
              Upgrade to Arriba
              <Badge variant='upgrade' className='uppercase text-sm py-1'>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            {tools.map(({ label, icon: Icon, color, bgColor }) => (
              <Card
                key={label}
                className='p-3 border-black/5 flex items-center justify-between'
              >
                <div className='flex items-center gap-x-4'>
                  <div className={cn(bgColor, 'p-2 w-fit rounded-md')}>
                    <Icon className={cn('h-6 w-6', color)} />
                  </div>
                  <h3 className='font-semibold text-sm'>{label}</h3>
                </div>
                <Check className='text-primary w-5 h-5' />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onSubscribe}
            size='lg'
            variant='upgrade'
            className='w-full'
            disabled={loading}
          >
            Upgrade
            <Zap className='h-4 w-4 ml-2 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

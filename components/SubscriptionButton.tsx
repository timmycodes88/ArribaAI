'use client'

import { Zap } from 'lucide-react'
import { Button } from './ui/button'
import StripeAPI from '@/apis/StripeAPI'
import { useState } from 'react'

interface SubscriptionButtonProps {
  isPro: boolean
}

export default function SubscriptionButton({
  isPro = false,
}: SubscriptionButtonProps) {
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    try {
      setLoading(true)
      const url = await StripeAPI.subscribe()
      window.location.href = url
    } catch (error) {
      console.log('[BILLING_CLIENT_ERROR]', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      disabled={loading}
      variant={isPro ? 'default' : 'upgrade'}
      onClick={onClick}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
      {!isPro && <Zap className='fill-white w-4 h-4 ml-2' />}
    </Button>
  )
}

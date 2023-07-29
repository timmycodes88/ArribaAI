'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export default function CrispProvider() {
  useEffect(() => {
    Crisp.configure('7bba299e-8c4f-4ce6-852a-70832124f5a1')
  }, [])

  return <CrispChat />
}

function CrispChat() {
  useEffect(() => {
    Crisp.configure('7bba299e-8c4f-4ce6-852a-70832124f5a1')
  }, [])

  return null
}

import { useEffect, useState } from 'react'

export default function useHydrated(): boolean {
  const [isHydrated, setIsHydrated] = useState(false)
  useEffect(() => setIsHydrated(true), [])
  return isHydrated
}

'use client'

import useHydrated from '@/hooks/useHydrated'
import ProModal from './ProModal'

export default function ModalProvider() {
  if (useHydrated()) return <ProModal />
}

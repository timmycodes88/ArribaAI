import { create } from 'zustand'

interface useProModal {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useProModal = create<useProModal>(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

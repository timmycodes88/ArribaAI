'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import Sidebar from '@/components/Sidebar'
import useHydrated from '@/hooks/useHydrated'

interface MobileSideBarProps {
  apiLimitCount: number
  isPro: boolean
}

export default function MobileSideBar({
  apiLimitCount = 0,
  isPro = false,
}: MobileSideBarProps) {
  if (useHydrated())
    return (
      <Sheet>
        <SheetTrigger>
          <Button variant='ghost' size='icon' className='md:hidden'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='p-0'>
          <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} isMobile />
        </SheetContent>
      </Sheet>
    )
}

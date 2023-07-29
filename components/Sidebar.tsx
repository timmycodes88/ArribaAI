'use client'

import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

export default function Sidebar() {
  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className='flex items-center pl-3 pb-14'>
          <div className='relative w-12 h-12 mr-4'>
            <Image fill alt='logo' src='/logo.png' />
          </div>
          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            ArribaAI
          </h1>
        </Link>
      </div>
    </div>
  )
}

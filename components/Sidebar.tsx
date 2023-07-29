'use client'

import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FreeCounter from './FreeCounter'
import { routes } from '@/constants'

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

interface SidebarProps {
  apiLimitCount: number
  isPro: boolean
}

export default function Sidebar({ apiLimitCount = 0, isPro }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className='flex items-center pl-3 pb-14'>
          <div className='relative w-12 h-12 -ml-3'>
            <Image fill alt='logo' src='/logo.png' />
          </div>
          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            ArribaAI
          </h1>
        </Link>
        <div className='space-y-1'>
          {routes.map(({ label, href, color, icon: Icon }) => (
            <Link
              className={cn(
                pathname === href ? 'text-white bg-white/10' : 'text-slate-400',
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition'
              )}
              href={href}
              key={href}
            >
              <div className='flex items-center flex-1'>
                <Icon className={cn('h-6 w-6 mr-3', color)} />
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  )
}

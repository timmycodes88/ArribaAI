'use client'

import { routes } from '@/components/Sidebar'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const tools = routes.filter(
  ({ href }) => href !== '/dashboard' && href !== '/settings'
)

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='font-bold text-center text-2xl md:text-4xl'>
          Explore the Power of Arriba
        </h2>
        <p className='text-center text-muted-foreground font-light text-sm md:text-lg'>
          Awe-striking, Really, Radiant, Intelligence, Being, Awesome
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map(({ label, href, color, bgColor, icon: Icon }) => (
          <Card
            onClick={() => router.push(href)}
            key={href}
            className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'
          >
            <div className='flex items-center gap-x-4'>
              <div className={cn(bgColor, 'p-2 w-fit rounded-md')}>
                <Icon className={cn('h-6 w-6', color)} />
              </div>
              <h3 className='font-semibold'>{label}</h3>
            </div>
            <ArrowRight className='w-5 h-5' />
          </Card>
        ))}
      </div>
    </div>
  )
}

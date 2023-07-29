import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()

  return (
    <div className='relative'>
      <div className='hidden h-full w-72 md:flex md:flex-col md:fixed md:inset-y-0 md:bg-slate-900'>
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className='md:pl-72'>
        <Navbar />
        {children}
        <Toaster />
      </main>
    </div>
  )
}

import { UserButton } from '@clerk/nextjs'
import MobileSideBar from '@/components/MobileSideBar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

export default async function Navbar() {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()

  return (
    <div className='flex items-center p-4'>
      <MobileSideBar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className='flex w-full justify-end h-[32px]'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

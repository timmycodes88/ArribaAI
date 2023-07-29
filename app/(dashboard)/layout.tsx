import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative'>
      <div className='hidden h-full w-72 md:flex md:flex-col md:fixed md:inset-y-0 md:z-[80] md:bg-slate-900'>
        <Sidebar />
      </div>
      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}

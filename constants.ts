import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from 'lucide-react'
export const MAX_FREE_COUNTS = 5

export const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
  },
  {
    label: 'Chat',
    icon: MessageSquare,
    href: '/chat',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Imagine',
    icon: ImageIcon,
    href: '/imagine',
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
  },
  {
    label: 'Motion',
    icon: VideoIcon,
    href: '/video',
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
  },
  {
    label: 'Sound',
    icon: Music,
    href: '/music',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Code',
    icon: Code,
    href: '/code',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]

export const tools = routes.filter(
  ({ href }) => href !== '/dashboard' && href !== '/settings'
)

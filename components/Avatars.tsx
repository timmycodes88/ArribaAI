import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function UserAvatar() {
  const { user } = useUser()

  return (
    <Avatar className='h-10 w-10'>
      <AvatarImage src={user?.profileImageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}

export function BotAvatar() {
  return (
    <Avatar className='h-10 w-10'>
      <AvatarImage className='p-1' src='/logo.png' />
    </Avatar>
  )
}

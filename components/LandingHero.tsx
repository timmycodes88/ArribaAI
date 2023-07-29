'use client'

import { useAuth } from '@clerk/nextjs'
import TypewriterComponent from 'typewriter-effect'
import { Button } from './ui/button'
import Link from 'next/link'

export default function LandingHero() {
  const { isSignedIn } = useAuth()

  return (
    <div className='text-white font-bold py-36 text-center space-y-5'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
        <h1>The Best AI Tool for</h1>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          <TypewriterComponent
            options={{
              strings: [
                'Photo Generation.',
                'Text Generation.',
                'Code Assistance.',
                'Music & Video Generation.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='text-sm md:text-xl font-light text-zinc-400'>
        {"BrightSide's newest tool to create content using AI 10x faster."}
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button
            variant='upgrade'
            className='md:text-lg p-4 md:p-6 rounded-full font-semibold'
          >
            {isSignedIn ? 'Enter Dashboard' : 'Start Generating For Free'}
          </Button>
        </Link>
      </div>
      <div className='text-zinc-400 text-xs md:text-msm font-normal'>
        No credit card required.
      </div>
    </div>
  )
}

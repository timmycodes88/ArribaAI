'use client'

import * as z from 'zod'
import Heading from '@/components/Heading'
import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './constant'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useChat from '@/apis/hooks/useChat'
import { Empty } from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { BotAvatar, UserAvatar } from '@/components/Avatars'

export default function ChatPage() {
  const { generate, messages, thinking } = useChat()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting || thinking

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await generate(values.prompt)
    form.reset()
  }

  return (
    <div>
      <Heading
        title='Arriba Chat'
        desc='Our most advance chat model.'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg  border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2'
            >
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        placeholder='How do I build a rocket to mars?'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full col-span-12 lg:col-span-2'
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label='Start a chat.' />
          )}
          <div className='flex flex-col-reverse gap-y-4'>
            {messages.map(({ role, content }) => (
              <div
                key={content}
                className={cn(
                  role === 'user'
                    ? 'bg-white border border-black/10'
                    : 'bg-muted',
                  'p-8 w-full flex items-center gap-x-8 rounded-lg'
                )}
              >
                {role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className='text-sm whitespace-break-spaces'>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import * as z from 'zod'
import Heading from '@/components/Heading'
import { Code } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './constant'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { BotAvatar, UserAvatar } from '@/components/Avatars'
import useCode from '@/apis/hooks/useCode'
import ReactMarkdown from 'react-markdown'

export default function CodePage() {
  const { generate, messages, thinking } = useCode()
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
        title='Code'
        desc='Generate Code for Your Project.'
        icon={Code}
        iconColor='text-blue-400'
        bgColor='bg-blue-400/10'
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
                        placeholder='Simple toggle button using React hooks.'
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
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                        <pre {...props} />
                      </div>
                    ),

                    code: ({ node, ...props }) => (
                      <code {...props} className='bg-black/10 rounded-lg p-1' />
                    ),
                  }}
                  className='text-sm overflow-hidden leading-7'
                >
                  {content || ''}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

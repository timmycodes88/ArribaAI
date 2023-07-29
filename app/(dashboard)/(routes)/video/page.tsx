'use client'

import * as z from 'zod'
import Heading from '@/components/Heading'
import { VideoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './constant'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/Empty'
import Loader from '@/components/Loader'
import useVideo from '@/apis/hooks/useVideo'

export default function VideoPage() {
  const { generate, video, thinking } = useVideo()
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
        title='Video'
        desc='Create Videos in Seconds.'
        icon={VideoIcon}
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'
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
                        placeholder='Clownfish swimming in a pool of money.'
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
            <div className='p-20'>
              <Loader />
            </div>
          )}
          {!video && !isLoading && <Empty label='Create some videos.' />}
          {video && (
            <video
              className='mt-8 aspect-video rounded-lg border bg-black w-full'
              controls
              autoPlay
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  )
}

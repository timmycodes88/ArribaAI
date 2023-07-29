'use client'

import * as z from 'zod'
import Heading from '@/components/Heading'
import { Download, ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { amountOptions, formSchema, resolutionOptions } from './constant'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/Empty'
import Loader from '@/components/Loader'
import useImagine from '@/apis/hooks/useImagine'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'

export default function ImaginePage() {
  const { generate, images, thinking } = useImagine()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  })

  const isLoading = form.formState.isSubmitting || thinking

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await generate(values)
    form.reset()
  }

  return (
    <div>
      <Heading
        title='Imagine'
        desc='Create stunning images in moments.'
        icon={ImageIcon}
        iconColor='text-pink-700'
        bgColor='bg-pink-700/10'
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
                  <FormItem className='col-span-12 lg:col-span-6'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        placeholder='A coder making millions of dollars with AI, hyper-realistic.'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name='amount'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name='resolution'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          {images.length === 0 && !isLoading && (
            <Empty label='Create some art.' />
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
            {images.map(src => (
              <Card key={src} className='rounded-lg overflow-hidden'>
                <div className='relative aspect-square'>
                  <Image src={src} fill alt='Generated image' />
                </div>
                <CardFooter className='p-2'>
                  <Button
                    onClick={() => window.open(src)}
                    variant='secondary'
                    className='w-full'
                  >
                    <Download className='w-4 h-4 mr-2' />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

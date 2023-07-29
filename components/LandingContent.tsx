import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const testimonials = [
  {
    name: 'Sarah Smith',
    title: 'Marketing Director',
    desc: 'Absolutely thrilled with this product. It has revolutionized our marketing strategies!',
  },
  {
    name: 'Michael Johnson',
    title: 'Financial Analyst',
    desc: 'I am beyond impressed with the results. This tool saved us countless hours of analysis.',
  },
  {
    name: 'Emily Chen',
    title: 'Software Engineer',
    desc: 'As a developer, I can say that this platform is a game-changer in the coding world.',
  },
  {
    name: 'Alex Martinez',
    title: 'Operations Manager',
    desc: 'This investment has paid off tenfold. Our operational efficiency has skyrocketed!',
  },
]

export default function LandingContent() {
  return (
    <div className='px-10 pb-20'>
      <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
        Testimonials
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {testimonials.map(({ name, title, desc }) => (
          <Card key={name} className='bg-[#192339] border-none text-white'>
            <CardHeader>
              <CardTitle className='flex items-center gap-x-2'>
                <div>
                  <p className='text-lg'>{name}</p>
                  <p className='text-zinc-400 text-sm'>{title}</p>
                </div>
              </CardTitle>
              <CardContent className='pt-4 px-0'>{desc}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

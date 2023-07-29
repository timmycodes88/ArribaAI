import axios from 'axios'

interface IStripeAPI {
  subscribe: () => Promise<string>
}

const StripeAPI: IStripeAPI = {
  subscribe: async () => {
    const res = await axios.get('/api/stripe')
    return res.data.url
  },
}

export default StripeAPI

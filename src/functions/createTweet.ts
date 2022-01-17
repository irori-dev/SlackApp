import { twitter } from '../initializers/twitter'

export default async (message: string): Promise<string> => {
  try {
    const result = await twitter.post('statuses/update', {status: message})
    return result['id_str']
  } catch (err) {
    return 'something happened!'
  }
}
import axios from 'axios'

export default async (bodyParameters: object): Promise<string | undefined> => {
  const headers = {
    headers: { 
      Authorization: `Bearer ${process.env.NOTION_API_TOKEN}`,
      'Notion-Version': '2022-06-28'
    }
  }

  try {
    const result = await axios.post(`https://api.notion.com/v1/pages`, bodyParameters, headers)
    return result.data['id']
  } catch (err) {
    return 'something happened!'
  }
}
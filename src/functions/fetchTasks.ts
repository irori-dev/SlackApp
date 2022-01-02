import axios from 'axios'
import formatTaskResult from './formatTaskResult'

interface Result {
  url: string
  title: string
  startsAt?: string
  endsAt?: string
  assignee?: string
  status?: string
  [key: string]: any
}

export default async (bodyParameters: object): Promise<Result[]> => {
  const headers = {
    headers: { 
      Authorization: `Bearer ${process.env.NOTION_API_TOKEN}`,
      'Notion-Version': '2021-08-16'
    }
  }

  try {
    const result = await axios.post(`https://api.notion.com/v1/databases/${process.env.NOTION_TASK_DATABASE_ID}/query`, bodyParameters, headers)
    const array: Result[] = []
    result.data['results'].forEach((result: any) => {
      array.push(formatTaskResult(result))
    })
    return array
  } catch (error) {
    return []
  }
}
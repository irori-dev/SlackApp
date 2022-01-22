import axios from 'axios'
import formatTaskResult from './formatTaskResult'
import fetchNotionDbId from './fetchNotionDbId'

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
  const tasksDbId = await fetchNotionDbId('Tasks')
  const headers = {
    headers: { 
      Authorization: `Bearer ${process.env.NOTION_API_TOKEN}`,
      'Notion-Version': '2021-08-16'
    }
  }

  try {
    const results = await axios.post(`https://api.notion.com/v1/databases/${tasksDbId}/query`, bodyParameters, headers)
    const array: Result[] = []
    for (const result of results.data['results']) {
      array.push(await formatTaskResult(result))
    }
    return array
  } catch (error) {
    return []
  }
}
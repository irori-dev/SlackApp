import { notionIdToSlackId } from './convertIds'

interface Result {
  url: string
  title: string
  startsAt?: string
  endsAt?: string
  assignee?: string
  status?: string
  [key: string]: any
}

export default async (result: JSON): Promise<Result> => {
  const regex = /[¥-]/g
  const url = `https://www.notion.so/${result['id'].replace(regex, '')}`
  const title = result['properties']['Name']['title'][0]['plain_text']
  const startsAt = result['properties']['Starts at']['date'] != null ? result['properties']['Starts at']['date']['start'] : '未記入'
  const endsAt = result['properties']['Ends at']['date'] != null ? result['properties']['Ends at']['date']['start'] : '未記入'
  const assignee = await getNames(result['properties']['Asignee']['people'])
  const status = result['properties']['status']['select'] != null ? result['properties']['status']['select']['name'] : '未設定'

  return {
    url: url,
    title: title,
    startsAt: startsAt,
    endsAt: endsAt,
    assignee: assignee,
    status: status,
  }
}

const getNames = async (people: JSON[]): Promise<string> => {
  let mentions: string = ''

  for (const person of people) {
    const slackId = await notionIdToSlackId(person['id'])
    mentions = `${mentions} <@${slackId}>`
  }
  return mentions
}


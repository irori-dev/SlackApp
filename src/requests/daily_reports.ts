import fetchNotionUserId from '../functions/fetchNotionUserId'
import fetchNotionDbId from '../functions/fetchNotionDbId'
import fetchSlackId from '../functions/fetchSlackId'
import createBlog from '../functions/createBlog'
import { app } from '../initializers/bolt'



export default (): void => {
  app.receiver.app.get(`/slack/daily_reports`, async (_req, res) => {
    res.sendStatus(200)
    const targetUserNames = ['adachi']
    const regex = /[¥-]/g
    const targetUsersNotionIds = await getUsersNotionIds(targetUserNames)
    const params = await formattedBodyParameter(targetUsersNotionIds[0])
    const createdNotionId =  await createBlog(params)
    await app.client.chat.postMessage({
      channel: await fetchSlackId('002-daily_reports'),
      text: `created!:tada: See <https://www.notion.so/${createdNotionId?.replace(regex, '')}|here>`
    })
  })

}

const getUsersNotionIds = async (names) => {
  const promises = names.map(name => {
    return fetchNotionUserId(name)
  })

  const ids = await Promise.all(promises)
  return ids
}

const formattedBodyParameter = async (notinoId: string): Promise<object> => {
  const dailyReportsDbId = await fetchNotionDbId('Daily_reports')
  console.log(dailyReportsDbId)
  return {
    parent: {database_id: dailyReportsDbId},
    properties: {
      Title: {
        title: [
          {
            type: 'text',
            text: {
              content: formattedDate(new Date())
            }
          }
        ],
      },
      Assignee: {
        people: [
          {
            object: 'user',
            id: notinoId
          }
        ]
      }, 
      Date: {
        date: {
          start: formattedDate(new Date())
        }
      }
    }
  }
}

const formattedDate = (date: Date): string => {
  var y = date.getFullYear();
  var m = ('00' + (date.getMonth()+1)).slice(-2);
  var d = ('00' + date.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

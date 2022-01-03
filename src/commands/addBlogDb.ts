import { app } from '../initializers/bolt'
import { slackIdToNotionId } from '../functions/convertIds'
import createBlog from '../functions/createBlog'

const regex = /[¥-]/g

export default (): void => {
  app.message(`:blog:`, async ({ message, say }): Promise<void> => {
    if (message.thread_ts){
      try {
        const replies = await app.client.conversations.replies({
          channel: message.channel,
          ts: message.thread_ts,
          inclusive: true
        });
        const firstMessage = replies.messages.sort(function(a,b){a.ts-b.ts})[0]
        const createdNotionId =  await createBlog(await formattedBodyParameter(firstMessage))
        await app.client.chat.postMessage({
          channel: message.channel,
          thread_ts: message.thread_ts,
          text: `created!:tada: See <https://www.notion.so/${createdNotionId?.replace(regex, '')}|here>`
        })
      } catch (_err) {
        await say('作成失敗')
      }
    } else {
      await say(':blog: スタンプは返信として使ってください')
    }
  })
}

const formattedBodyParameter = async (message): Promise<object> => {
  return {
    parent: {database_id: process.env.NOTION_BLOG_DATABASE_ID},
    properties: {
      Title: {
        title: [
          {
            type: 'text',
            text: {
              content: message.text
            }
          }
        ],
      },
      Assignee: {
        people: [
          {
            object: 'user',
            id: await slackIdToNotionId(message.user)
          }
        ]
      }
    }
  }
}

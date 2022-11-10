import { app } from '../initializers/bolt'
import fetchSlackId from '../functions/fetchSlackId'
import fetchNotionDbId from '../functions/fetchNotionDbId'
import createNotionPost from '../functions/createNotionPost'
const bodyParser = require('body-parser')
const regex = /[¥-]/g

export default function() {
  app.receiver.app.use(bodyParser.urlencoded({ extended: true }))
  app.receiver.app.use(bodyParser.json())
  app.receiver.app.post(`/slack/contact`, async (req, res) => {
    res.sendStatus(200)

    const createdNotionId =  await createNotionPost(await bodyParameter(req.body))

    const msg = {
      token: process.env.SLACK_BOT_TOKEN,
      text: `<!channel> お問い合わせがありました。 \n ${req.body.email} \n ${req.body.content} \n <https://www.notion.so/${createdNotionId?.replace(regex, '')}|Notionで見る>`,
      channel: await fetchSlackId('005-inquiries')
    }
    return app.client.chat.postMessage(msg)
  })
}

const bodyParameter = async (body): Promise<object> => {
  const inquiriesDbId = await fetchNotionDbId('Inquiries')
  return {
    parent: {database_id: inquiriesDbId},
    properties: {
      email: {
        title: [
          {
            type: 'text',
            text: {
              content: body.email
            }
          }
        ],
      },
      content: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: body.content
            }
          }
        ]
      }
    }
  }
}
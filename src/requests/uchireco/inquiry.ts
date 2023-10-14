import { app } from '../../initializers/bolt'
import fetchSlackId from '../../functions/fetchSlackId'
import fetchNotionDbId from '../../functions/fetchNotionDbId'
import createNotionPost from '../../functions/createNotionPost'
const bodyParser = require('body-parser')
const cors = require('cors');
const regex = /[¥-]/g

export default function() {
  app.receiver.app.use(bodyParser.urlencoded({ extended: true }))
  app.receiver.app.use(bodyParser.json())
  app.receiver.app.use(cors({
    origin: process.env.UCHIRECO_SITE_URL,
    credentials: true,
    optionsSuccessStatus: 201
  }))
  app.receiver.app.post(`/slack/uchireco/inquiry`, async (req, res) => {
    res.sendStatus(201)

    const createdNotionId =  await createNotionPost(await bodyParameter(req.body))

    const msg = {
      token: process.env.SLACK_BOT_TOKEN,
      text: `<!channel> うちレコにお問い合わせがありました。 \n 企業名: ${req.body.company_name} \n 氏名: ${req.body.name} \n お電話番号: ${req.body.phone} \n メールアドレス: ${req.body.email} \n 問い合わせ内容: ${req.body.content} \n <https://www.notion.so/${createdNotionId?.replace(regex, '')}|Notionで見る>`,
      channel: await fetchSlackId('005-inquiries')
    }
    return app.client.chat.postMessage(msg)
  })
}

const bodyParameter = async (body): Promise<object> => {
  const inquiriesDbId = await fetchNotionDbId('UchirecoInquiries')
  return {
    parent: {database_id: inquiriesDbId},
    properties: {
      CompanyName: {
        rich_text: [
          {
            text: {
              content: body.company_name
            }
          }
        ],
      },
      Name: {
        title: [
          {
            type: 'text',
            text: {
              content: body.name
            }
          }
        ],
      },
      Phone: {
        phone_number: body.phone
      },
      Email: {
        email: body.email
      },
      Content: {
        rich_text: [
          {
            text: {
              content: body.content
            }
          }
        ]
      }
    }
  }
}
import { app } from '../initializers/bolt'
import fetchSlackId from '../functions/fetchSlackId'

export default function() {
  app.receiver.app.get(`/slack/notify`, async (_req, res) => {
    res.sendStatus(200)

    const msg = {
      token: process.env.SLACK_BOT_TOKEN,
      text: `/slack/notify にアクセスがありました`,
      channel: await fetchSlackId('_test')
    }
    return app.client.chat.postMessage(msg)
  })
}
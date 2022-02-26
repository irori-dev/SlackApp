import { app } from '../initializers/bolt'

export default function() {
  app.receiver.app.get(`/slack/notify`, (_req, res) => {
    res.sendStatus(200)

    const msg = {
      token: process.env.SLACK_BOT_TOKEN,
      text: `<!channel>\nお知らせです`,
      channel: `C02T2ALTPDE`, // 表示するチャンネルのID
    }
    return app.client.chat.postMessage(msg)
  })
}
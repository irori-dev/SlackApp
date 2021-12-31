const { App } = require(`@slack/bolt`)

// Initializes your app with your bot token and signing secret
const config = {
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
}

export const app = new App(config)

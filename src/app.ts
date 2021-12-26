require('dotenv').config();

const { App } = require('@slack/bolt');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

app.message('hello', async ({ message, say }: {message: any, say: any}) => {
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.action('button_click', async ({ body, ack, say }: {body: any, ack: any, say: any}) => {
  await ack();
  
  await say(`<@${body.user.id}> clicked the button`);
});

// Start your app
(async () => {
  await app.start(3000);
  console.log('⚡️ Bolt app is running!');
})();

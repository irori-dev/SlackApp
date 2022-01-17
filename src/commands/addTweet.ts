import { app } from '../initializers/bolt'
import createTweet from '../functions/createTweet';

export default (): void => {
  app.message(`:twitter:`, async ({ message, say }): Promise<void> => {
    if (message.thread_ts){
      try {
        const replies = await app.client.conversations.replies({
          channel: message.channel,
          ts: message.thread_ts,
          inclusive: true
        });
        const firstMessage = replies.messages.sort(function(a,b){a.ts-b.ts})[0]
        const createdTweet = await createTweet(firstMessage['text'])
        await app.client.chat.postMessage({
          channel: message.channel,
          thread_ts: message.thread_ts,
          text: `created!:tada: See <https://twitter.com/irori_dev/status/${createdTweet}|here>`
        })
      } catch (_err) {
        await say('tweeted :tada:')
      }
    } else {
      await say(':twitter: スタンプは返信として使ってください')
    }
  })
}
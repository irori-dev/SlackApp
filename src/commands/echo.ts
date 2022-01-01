import { app } from '../initializers/bolt'

export default (): void => {
  app.command(`/echo`, async ({ command, ack, say }): Promise<void> => {
    await ack()
    await say(command.text)
  })
}
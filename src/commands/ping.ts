import { app } from '../initializers/bolt'

export default (): void => {
  app.message(`irori ping`, async ({ _message, say }): Promise<void> => {
    await say('pong')
  })
}
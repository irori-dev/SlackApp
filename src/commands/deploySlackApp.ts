import { app } from '../initializers/bolt'
import { octokit } from '../initializers/octokit'

const WORKFROW_ID = 17152436

export default (): void => {
  app.message(`irori deploy slack app`, async ({ _message, say }): Promise<void> => {
    try {
      await octokit.request(`POST /repos/irori-dev/SlackApp/actions/workflows/${WORKFROW_ID}/dispatches`, {ref: 'main'})
      await say('Deployment started')
    } catch (_err) {
      await say('Deployment not started')
    }
  })
}

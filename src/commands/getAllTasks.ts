import { app } from '../initializers/bolt'
import fetchTasks from '../functions/fetchTasks'

export default (): void => {
  app.message(`irori get all tasks`, async ({ _message, say }): Promise<void> => {
    const taskTitles = await formattedText()
    await say(taskTitles)
  })
}

const formattedText = async (): Promise<string> => {
  let text: string = ''
  const bodyParameters = {
    filter: {
      property: 'status',
      select: {
        does_not_equal: 'DONE'
      }
    }
  }
  try {
    const results = await fetchTasks(bodyParameters)
    results.forEach((result) => {
      text = `${text}\nassignee: ${result.assignee}, startsAt: ${result.startsAt}, endsAt: ${result.startsAt}, status: ${result.status}, <${result.url}|${result.title}>`
    })
    return text
  } catch (error) {
    return 'something happened'
  }
}
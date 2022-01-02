import { app } from './initializers/bolt'
import ping from './commands/ping'
import getAllTasks from './commands/getAllTasks'
import getMyTasks from './commands/getMyTasks'
import addBlogDb from './commands/addBlogDb'

;(async () => {
  // Start your app
  const server = await app.start(8080)

  console.log(`⚡️ Bolt app is running! PORT: ${server.address().port}`)
})()

ping()
getAllTasks()
getMyTasks()
addBlogDb()
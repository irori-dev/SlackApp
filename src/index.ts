import { app } from './initializers/bolt'
import ping from './commands/ping'
import getAllTasks from './commands/getAllTasks'
import getMyTasks from './commands/getMyTasks'
import addBlogDb from './commands/addBlogDb'
import deploySlackApp from './commands/deploySlackApp'
import addTweet from './commands/addTweet'
import notify from './requests/notify'
import contact from './requests/contact'
import uchirecoInquiry from './requests/uchireco/inquiry'

;(async () => {
  // Start your app
  const server = await app.start(8080)

  console.log(`⚡️ Bolt app is running! PORT: ${server.address().port}`)
})()

ping()
getAllTasks()
getMyTasks()
addBlogDb()
deploySlackApp()
addTweet()
notify()
contact()
uchirecoInquiry()
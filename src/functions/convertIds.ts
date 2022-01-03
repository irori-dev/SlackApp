import { firestore } from '../initializers/firestore'

const notionIdToSlackId = async (id: string): Promise<string> => {
  const targetUserRef = await firestore.collection('users').where('notion_id', '==', id).get()
  const targetUser = await targetUserRef.docs.map(doc => {
    return doc.data()
  })[0]
  return targetUser.slack_id
}

const slackIdToNotionId = async (id: string): Promise<string> => {
  const targetUserRef = await firestore.collection('users').where('slack_id', '==', id).get()
  const targetUser = await targetUserRef.docs.map(doc => {
    return doc.data()
  })[0]
  return targetUser.notion_id
}

export { notionIdToSlackId, slackIdToNotionId }
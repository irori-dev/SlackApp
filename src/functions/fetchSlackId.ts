import { firestore } from '../initializers/firestore'

export default async (name: string): Promise<string> => {
  const targetSlackDbRef = await firestore.collection('slack').where('name', '==', name).get()
  const targetSlackDb = await targetSlackDbRef.docs.map(doc => {
    return doc.data()
  })[0]
  return targetSlackDb.slack_id
}

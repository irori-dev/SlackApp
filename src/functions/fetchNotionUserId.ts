import { firestore } from '../initializers/firestore'

export default async (name: string): Promise<string> => {
  const targetNotionDbRef = await firestore.collection('users').where('name', '==', name).get()
  const targetNotionDb = await targetNotionDbRef.docs.map(doc => {
    return doc.data()
  })[0]
  return targetNotionDb.notion_id
}

import { firestore } from '../initializers/firestore'

export default async (title: string): Promise<string> => {
  const targetNotionDbRef = await firestore.collection('notion').where('title', '==', title).get()
  const targetNotionDb = await targetNotionDbRef.docs.map(doc => {
    return doc.data()
  })[0]
  return targetNotionDb.id
}

import { MongoClient } from 'mongodb'

type collectionType =
  | 'users'
  | 'topics'
  | 'board'
  | 'needs'
  | 'proposals'
  | 'comments'

let client: MongoClient

export async function connectToDB(url: string): Promise<void> {
  client = new MongoClient(url)
  await client.connect()
}

export function getCollection(collection: collectionType) {
  return client.db('dartagnan').collection(collection)
}

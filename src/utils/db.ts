import type { Collection } from 'mongodb'
import { MongoClient } from 'mongodb'

type collectionType = 'users' | 'topics' | 'boards'

let client: MongoClient

export async function connectToDB(url: string): Promise<void> {
  client = new MongoClient(url)
  await client.connect()
}

const getCollection = (collection: collectionType) => (): Collection => {
  return client.db('dartagnan').collection(collection)
}

export const getUsers = getCollection('users')
export const getBoards = getCollection('boards')
export const getTopics = getCollection('topics')

import type { ObjectId } from 'mongodb'

export type Need = {
  id: string
  text: string
  upvotes: number
}

export type Topic = {
  id: string
  title: string
  description: string
  needs: Need[]
  proposals: Proposal[]
}

export type Proposal = {
  id: string
  description: string
  votes: Vote[]
}

export type Board = {
  _id: ObjectId
  name: string
  topics: Topic[]
}

export type Vote = {
  id: string
  text: string
  type: string
}
export type fetchBody = {
  username?: string
  boardName?: string
  topicId?: string
  needId?: string
  proposalId?: string
  voteId?: string
  patchMsg?: string
  payload?: any
}

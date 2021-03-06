import type { ObjectId } from 'mongodb'

export type Need = {
  id: string
  text: string
  upvotes: string[]
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
  users: string[]
}

export type Vote = {
  id: string
  user?: string
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

export type User = {
  username: string
  boards: string[]
}

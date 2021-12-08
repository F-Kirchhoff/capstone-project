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
  votes: {
    pro: string[]
    neutral: string[]
    remarks: string[]
    concerns: string[]
  }
}

export type Board = {
  _id: ObjectId
  name: string
  topics: Topic[]
}

export type Vote = {
  id: string
  text: string
  voteType: string
}

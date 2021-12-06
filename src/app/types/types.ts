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

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

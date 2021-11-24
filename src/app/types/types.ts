export type Need = {
  upvotes: number
  text: string
}

export type Topic = {
  title: string
  description: string
  needs: Need[]
}

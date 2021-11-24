export type Need = {
  text: string
}

export type Topic = {
  id: number
  title: string
  description: string
  needs: Need[]
}

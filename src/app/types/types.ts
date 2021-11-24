export type Need = {
  id: number
  text: string
}

export type Topic = {
  id: number
  title: string
  description: string
  needs: Need[]
}

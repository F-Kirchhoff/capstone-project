export type Need = {
  id: string
  text: string
}

export type Topic = {
  id: string
  title: string
  description: string
  needs: Need[]
}

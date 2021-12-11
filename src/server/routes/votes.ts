import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody } from '../../app/types/types'
import { getBoards } from '../../utils/db'
import { nanoid } from 'nanoid'

const votes = express.Router()

const VoteTypes = ['pro', 'neutral', 'remarks', 'concerns']

votes.post('/', async (req: Request, res: Response) => {
  const {
    boardName: name,
    topicId,
    proposalId,
    payload: { text, type },
  }: fetchBody = req.body

  if (typeof text !== 'string' || !VoteTypes.includes(type)) {
    res.status(422).send(`Error: Input data invalid.`)
    return
  }

  const newVote = {
    id: nanoid(),
    type,
    text,
  }

  const boards = await getBoards()
  const msg = await boards.updateOne(
    { name },
    { $push: { 'topics.$[topic].proposals.$[proposal].votes': newVote } },
    { arrayFilters: [{ 'topic.id': topicId }, { 'proposal.id': proposalId }] }
  )
  res.send(msg)
})

export default votes

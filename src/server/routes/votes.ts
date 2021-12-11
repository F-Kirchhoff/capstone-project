import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody, Proposal, Topic } from '../../app/types/types'
import { getBoards } from '../../utils/db'

const votes = express.Router()

votes.get('/', async (_req: Request, _res: Response) => {
  return
})

votes.post('/', async (req: Request, res: Response) => {
  const {
    boardName: name,
    topicId,
    proposalId,
    payload: newVote,
  }: fetchBody = req.body

  const boards = await getBoards()
  const msg = await boards.updateOne(
    { name },
    { $push: { 'topics.$[topic].proposals.$[proposal].votes': newVote } },
    { arrayFilters: [{ 'topic.id': topicId }, { 'proposal.id': proposalId }] }
  )
  res.send(msg)
})

votes.patch('/', async (_req: Request, _res: Response) => {
  return
})

votes.delete('/', async (_req: Request, _res: Response) => {
  return
})

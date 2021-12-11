import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody, Proposal, Topic } from '../../app/types/types'
import { getBoards } from '../../utils/db'

const boards = express.Router()

boards.get('/', async (req: Request, res: Response) => {
  const { boardName: name }: fetchBody = req.query

  const boards = await getBoards()
  const board = await boards.findOne({ name })
  if (!board) {
    res.status(404).send(`Error: no board called ${name} found.`)
    return
  }
  res.send(board)
})

boards.post(
  '/:name/topics/:topicId/proposals/:proposalId/addVote',
  async (req: Request, res: Response) => {
    const { name, topicId, proposalId } = req.params
    const { newVote } = req.body

    const boards = await getBoards()
    const msg = await boards.updateOne(
      { name },
      { $push: { 'topics.$[topic].proposals.$[proposal].votes': newVote } },
      { arrayFilters: [{ 'topic.id': topicId }, { 'proposal.id': proposalId }] }
    )

    res.send(msg)
  }
)

export default boards

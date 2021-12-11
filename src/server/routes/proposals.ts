import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody, Proposal, Topic } from '../../app/types/types'
import { getBoards } from '../../utils/db'

const proposals = express.Router()

proposals.get('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId, proposalId }: fetchBody = req.query

  const boards = await getBoards()
  const board = await boards.findOne({ name })
  if (!board) {
    res.status(404).send(`Error: no board called ${name} found.`)
    return
  }

  const topic = board.topics.find((topic: Topic) => topic.id === topicId)

  if (!topic) {
    res.status(404).send(`Error: no topic with id ${topicId} found.`)
    return
  }

  const proposal = topic.proposals.find(
    (proposal: Proposal) => proposal.id === proposalId
  )

  if (!proposal) {
    res.status(404).send(`Error: no proposal with id ${topicId} found.`)
    return
  }

  res.send(proposal)
})

proposals.post('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId, payload: newProposal }: fetchBody = req.body

  const boards = await getBoards()
  const msg = await boards.updateOne(
    { name, 'topics.id': topicId },
    { $push: { 'topics.$.proposals': newProposal } }
  )
  res.send(msg)
})

export default proposals

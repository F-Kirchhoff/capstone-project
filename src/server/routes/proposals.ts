import express from 'express'
import type { Response, Request } from 'express'
import type { Proposal, Topic } from '../../app/types/types'
import { getBoards } from '../../utils/db'
import { nanoid } from 'nanoid'

const proposals = express.Router()

proposals.get('/', async (req: Request, res: Response) => {
  const { topicId, proposalId } = req.query

  const { board } = req.body

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
  const {
    boardName: name,
    topicId,
    payload: { description },
  } = req.body

  if (typeof description !== 'string' || description.length === 0) {
    res.status(422).send(`Error: Input data invalid.`)
    return
  }

  const newProposal = {
    id: nanoid(),
    description,
    votes: [],
  }

  const boards = await getBoards()
  const msg = await boards.updateOne(
    { name, 'topics.id': topicId },
    { $push: { 'topics.$.proposals': newProposal } }
  )
  res.send(msg)
})

proposals.patch('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId, proposalId, payload } = req.body

  if (typeof payload !== 'string') {
    res.status(422).send(`Error: Input data invalid.`)
    return
  }

  const boards = await getBoards()
  const msg = await boards.updateOne(
    { name },
    { $set: { 'topics.$[topic].proposals.$[proposal].description': payload } },
    { arrayFilters: [{ 'topic.id': topicId }, { 'proposal.id': proposalId }] }
  )

  res.send(msg)
})

proposals.delete('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId, proposalId } = req.body

  const boards = getBoards()

  const msg = await boards.updateOne(
    { name },
    { $pull: { 'topics.$[topic].proposals': { id: proposalId } } },
    { arrayFilters: [{ 'topic.id': topicId }] }
  )

  res.send(msg)
})

export default proposals

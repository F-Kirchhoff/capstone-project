import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody, Proposal, Topic } from '../../app/types/types'
import { getBoards } from '../../utils/db'

const boards = express.Router()

boards.get(
  '/:name/topics/:topicId/proposals/:proposalId',
  async (req: Request, res: Response) => {
    const { name, topicId, proposalId } = req.params

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
  }
)

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
  '/:name/topics/:topicId/addNeed',
  async (req: Request, res: Response) => {
    const { name, topicId } = req.params
    const { newNeed } = req.body

    const boards = await getBoards()
    const msg = await boards.updateOne(
      { name, 'topics.id': topicId },
      { $push: { 'topics.$.needs': newNeed } }
    )
    res.send(msg)
  }
)
boards.post(
  '/:name/topics/:topicId/addProposal',
  async (req: Request, res: Response) => {
    const { name, topicId } = req.params
    const { newProposal } = req.body

    const boards = await getBoards()
    const msg = await boards.updateOne(
      { name, 'topics.id': topicId },
      { $push: { 'topics.$.proposals': newProposal } }
    )
    res.send(msg)
  }
)
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

boards.patch(
  '/:name/topics/:topicId/needs/:needId',
  async (req: Request, res: Response) => {
    const { boardname: name, topicId, needId } = req.params
    const { patchMsg, payload } = req.body

    const boards = await getBoards()

    switch (patchMsg) {
      case 'UPVOTES': {
        const msg = await boards.updateOne(
          { name },
          { $set: { 'topics.$[topic].needs.$[need].upvotes': payload } },
          { arrayFilters: [{ 'topic.id': topicId }, { 'need.id': needId }] }
        )
        res.send(msg)
        break
      }
    }
  }
)

export default boards

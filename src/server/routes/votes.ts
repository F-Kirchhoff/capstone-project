import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody, Proposal, Topic, Vote } from '../../app/types/types'
import { getBoards } from '../../utils/db'

const votes = express.Router()

const VoteTypes = ['pro', 'neutral', 'remarks', 'concerns']

votes.post('/', async (req: Request, res: Response) => {
  const {
    boardName: name,
    topicId,
    proposalId,
    payload: { type },
  }: fetchBody = req.body

  const user = req.session?.user

  if (!user) {
    res.status(401).send('Unauthorized Request.')
    return
  }

  if (!VoteTypes.includes(type)) {
    res.status(422).send(`Error: Input data invalid.`)
    return
  }

  const boards = await getBoards()

  const board = await boards.findOne({ name })
  if (!board) {
    res.status(400).send('Bad request')
    return
  }

  const topic = board.topics.find((topic: Topic) => topic.id === topicId)
  if (!topic) {
    res.status(400).send('Bad request')
    return
  }

  const proposal = topic.proposals.find(
    (proposal: Proposal) => proposal.id === proposalId
  )
  if (!proposal) {
    res.status(400).send('Bad request')
    return
  }

  const userVote = proposal.votes.find((vote: Vote) => vote.user === user)

  if (!userVote) {
    // create new Vote

    const newVote = { user, type }
    const msg = await boards.updateOne(
      { name },
      { $push: { 'topics.$[topic].proposals.$[proposal].votes': newVote } },
      { arrayFilters: [{ 'topic.id': topicId }, { 'proposal.id': proposalId }] }
    )
    res.send(msg)
  } else {
    // update existing Vote

    const msg = await boards.updateOne(
      { name },
      {
        $set: {
          'topics.$[topic].proposals.$[proposal].votes.$[vote].type': type,
        },
      },
      {
        arrayFilters: [
          { 'topic.id': topicId },
          { 'proposal.id': proposalId },
          { 'vote.user': user },
        ],
      }
    )
    res.send(msg)
  }
})

export default votes

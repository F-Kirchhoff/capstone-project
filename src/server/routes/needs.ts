import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody, Need, Topic } from '../../app/types/types'
import { getBoards } from '../../utils/db'
import { nanoid } from 'nanoid'

const needs = express.Router()

needs.post('/', async (req: Request, res: Response) => {
  const {
    boardName: name,
    topicId,
    payload: { text },
  }: fetchBody = req.body

  const user = req.session?.user

  if (!user) {
    res.status(401).send('Unauthorized Request')
    return
  }

  if (typeof text !== 'string' || text.length === 0) {
    res.status(422).send(`Error: Input data invalid.`)
    return
  }
  const newNeed = {
    id: nanoid(),
    text,
    upvotes: [user],
  }

  const boards = getBoards()
  const msg = await boards.updateOne(
    { name, 'topics.id': topicId },
    { $push: { 'topics.$.needs': newNeed } }
  )
  res.send(msg)
})

needs.patch('/', async (req: Request, res: Response) => {
  const {
    boardName: name,
    topicId,
    needId,
    patchMsg,
    payload,
  }: fetchBody = req.body

  const user = req.session?.user

  if (!user) {
    res.status(401).send('Unauthorized Request')
    return
  }

  const boards = getBoards()

  switch (patchMsg) {
    case 'UPVOTES': {
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
      const need = topic.needs.find((need: Need) => need.id === needId)
      if (!topic) {
        res.status(400).send('Bad request')
        return
      }
      const isUpvoted = need.upvotes.includes(user)

      if (isUpvoted) {
        const msg = await boards.updateOne(
          { name },
          { $pull: { 'topics.$[topic].needs.$[need].upvotes': user } },
          { arrayFilters: [{ 'topic.id': topicId }, { 'need.id': needId }] }
        )
        res.send(msg)
        break
      } else {
        const msg = await boards.updateOne(
          { name },
          { $push: { 'topics.$[topic].needs.$[need].upvotes': user } },
          { arrayFilters: [{ 'topic.id': topicId }, { 'need.id': needId }] }
        )
        res.send(msg)
        break
      }
    }
    case 'TEXT': {
      if (typeof payload !== 'string') {
        res.status(422).send(`Error: Input data invalid.`)
        return
      }
      const msg = await boards.updateOne(
        { name },
        { $set: { 'topics.$[topic].needs.$[need].text': payload } },
        { arrayFilters: [{ 'topic.id': topicId }, { 'need.id': needId }] }
      )
      res.send(msg)
      break
    }
  }
})

needs.delete('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId, needId }: fetchBody = req.body

  const boards = getBoards()

  const msg = await boards.updateOne(
    { name },
    { $pull: { 'topics.$[topic].needs': { id: needId } } },
    { arrayFilters: [{ 'topic.id': topicId }] }
  )

  res.send(msg)
})

export default needs

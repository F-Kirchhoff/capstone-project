import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody } from '../../app/types/types'
import { getBoards } from '../../utils/db'
import { nanoid } from 'nanoid'

const needs = express.Router()

needs.post('/', async (req: Request, res: Response) => {
  const {
    boardName: name,
    topicId,
    payload: { text },
  }: fetchBody = req.body

  if (typeof text !== 'string' || text.length === 0) {
    res.status(422).send(`Error: Input data invalid.`)
    return
  }

  const newNeed = {
    id: nanoid(),
    text,
    upvotes: 1,
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

  const boards = getBoards()

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
    case 'TEXT': {
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

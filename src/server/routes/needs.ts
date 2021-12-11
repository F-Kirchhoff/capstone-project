import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody } from '../../app/types/types'
import { getBoards } from '../../utils/db'

const needs = express.Router()

needs.post('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId, payload: newNeed }: fetchBody = req.body

  const boards = await getBoards()
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
})

export default needs

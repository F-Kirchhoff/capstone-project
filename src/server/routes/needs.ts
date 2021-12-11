import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody, Topic } from '../../app/types/types'
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
    payload: topic,
  }: fetchBody = req.body

  const boards = await getBoards()

  res.send('patched!')
})

needs.delete('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId, needId }: fetchBody = req.body

  const boards = await getBoards()

  res.send('deleted!')
})

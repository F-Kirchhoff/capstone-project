import express from 'express'
import type { Response, Request } from 'express'
import { getBoards } from '../../utils/db'

const boards = express.Router()

boards.get('/:name', async (req: Request, res: Response) => {
  const { name } = req.params

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

boards.patch(
  '/:name/topics/:topicId/needs/:needId',
  async (req: Request, res: Response) => {
    const { name, topicId, needId } = req.params
    const { updatedNeed } = req.body

    const boards = await getBoards()
    const msg = await boards.updateOne(
      { name, 'topics.id': topicId, 'needs.id': needId },
      { $set: { 'topics.$.needs.$': updatedNeed } }
    )
    res.send(msg)
  }
)

boards.post('/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  const { topic } = req.body

  const boards = await getBoards()
  const msg = await boards.findOneAndUpdate(
    { name },
    { $push: { topics: topic } }
  )
  res.send(msg)
})

export default boards

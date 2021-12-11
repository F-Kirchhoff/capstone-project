import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody, Topic } from '../../app/types/types'
import { getBoards } from '../../utils/db'

const topics = express.Router()

topics.get('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId }: fetchBody = req.query

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
  res.send(topic)
})

topics.post('/', async (req: Request, res: Response) => {
  const { boardName: name, payload: topic }: fetchBody = req.body

  const boards = await getBoards()
  const msg = await boards.findOneAndUpdate(
    { name },
    { $push: { topics: topic } }
  )
  res.send(msg)
})

topics.patch('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId, payload: topic }: fetchBody = req.body

  const boards = await getBoards()

  res.send('patched!')
})

topics.delete('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId }: fetchBody = req.body

  const boards = await getBoards()

  res.send('deleted!')
})

export default topics

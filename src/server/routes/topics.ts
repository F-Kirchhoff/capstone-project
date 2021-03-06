import express from 'express'
import { getBoards } from '../../utils/db'
import { nanoid } from 'nanoid'

import type { Response, Request } from 'express'
import type { Board, fetchBody, Topic } from '../../app/types/types'
import type { PullOperator, PushOperator } from 'mongodb'

const topics = express.Router()

topics.get('/', async (req: Request, res: Response) => {
  const { topicId }: fetchBody = req.query

  const { board } = req.body

  const topic = board.topics.find((topic: Topic) => topic.id === topicId)

  if (!topic) {
    res.status(404).send(`Error: no topic with id ${topicId} found.`)
    return
  }

  res.send(topic)
})

topics.post('/', async (req: Request, res: Response) => {
  const {
    boardName: name,
    payload: { title, description },
  } = req.body

  if (typeof title !== 'string' || typeof description !== 'string') {
    res.status(422).send(`Error: Input data invalid.`)
    return
  }

  const topic: Topic = {
    id: nanoid(),
    title,
    description,
    needs: [],
    proposals: [],
  }

  const boards = await getBoards()
  const msg = await boards.updateOne(
    { name },
    { $push: <PushOperator<Board>>{ topics: topic } }
  )

  res.send(msg)
})

topics.patch('/', async (req: Request, res: Response) => {
  const {
    boardName: name,
    topicId,
    payload: { title, description },
  } = req.body

  if (typeof title !== 'string' || typeof description !== 'string') {
    res.status(422).send(`Error: Input data invalid.`)
    return
  }

  const boards = await getBoards()
  const msg = await boards.updateOne(
    { name },
    {
      $set: {
        'topics.$[topic].title': title,
        'topics.$[topic].description': description,
      },
    },
    { arrayFilters: [{ 'topic.id': topicId }] }
  )

  res.send(msg)
})

topics.delete('/', async (req: Request, res: Response) => {
  const { boardName: name, topicId } = req.body

  const boards = await getBoards()
  const msg = await boards.updateOne(
    { name },
    { $pull: <PullOperator<Board>>{ topics: { id: topicId } } }
  )
  res.send(msg)
})

export default topics

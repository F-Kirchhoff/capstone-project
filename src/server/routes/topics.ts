import express from 'express'
import type { Response, Request } from 'express'
import { getTopics } from '../../utils/db'
import { ObjectId } from 'mongodb'

const topics = express.Router()

topics
  .post('/', async (req: Request, res: Response) => {
    const topicIds = req.body
    console.log(topicIds)
    const topics = getTopics()
    const topic = await topics
      .find({ _id: { $in: topicIds.map((id: string) => ObjectId(id)) } })
      .toArray()
    if (topic.length === 0) {
      res.status(404).send(`Error: Topics not found.`)
      return
    }
    res.send(topic)
  })
  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const topics = getTopics()
    const topic = await topics.find({ _id: ObjectId(id) }).toArray()
    if (topic.length === 0) {
      res.status(404).send(`Error: Topic not found.`)
      return
    }
    res.send(topic)
  })

export default topics

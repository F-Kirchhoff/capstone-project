import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody, Proposal, Topic } from '../../app/types/types'
import { getBoards } from '../../utils/db'

const boards = express.Router()

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

export default boards

import express from 'express'
import type { Response, Request } from 'express'
import { getBoards } from '../../utils/db'

const boards = express.Router()

boards.get('/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  const boards = await getBoards()
  const board = await boards.find({ name: name }).toArray()
  if (board.length === 0) {
    res.status(404).send(`Error: no board called ${name} found.`)
    return
  }
  res.send(board)
})

export default boards

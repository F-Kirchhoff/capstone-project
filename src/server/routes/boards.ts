import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody } from '../../app/types/types'
import { getBoards, getUsers } from '../../utils/db'

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

boards.post('/', async (req: Request, res: Response) => {
  const {
    payload: { name, users },
  } = req.body

  const user = req.session?.user

  if (!user) {
    res.status(401).send('Unauthorised Request')
    return
  }

  const boards = await getBoards()

  const board = await boards.findOne({ name })

  if (board) {
    res.status(422).send('Error: Board already exists.')
    return
  }

  const newBoard = {
    name,
    topics: [],
    users: [user, ...users],
  }

  const msg = await boards.insertOne(newBoard)

  console.log(newBoard.users)

  newBoard.users.forEach(async user => {
    const users = await getUsers()
    await users.updateOne(
      {
        'public.username': user,
      },
      { $push: { 'public.boards': name } }
    )
  })
  res.send(msg)
})

export default boards

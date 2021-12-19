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

  await boards.insertOne(newBoard)

  await users.updateMany(
    {
      'public.username': { $in: newBoard.users },
    },
    { $push: { 'public.boards': name } }
  )

  res.send()
})

boards.patch('/', async (req: Request, res: Response) => {
  const {
    payload: { oldName, newName, users },
  } = req.body

  const user = req.session?.user

  if (!user) {
    res.status(401).send('Unauthorised Request')
    return
  }

  const boards = getBoards()
  const usersCollection = getUsers()

  const board = await boards.findOne({ name: oldName })

  if (!board) {
    res.status(422).send('Error: Board does not exist.')
    return
  }

  if (oldName === newName) {
    // Case: no renaming of Board
    await boards.updateOne({ name: oldName }, { $set: { users } })
  } else {
    await boards.updateOne(
      { name: oldName },
      { $set: { users, name: newName } }
    )
  }
  const oldUsers = board.users

  const addedUsers = users.filter((user: string) => !oldUsers.includes(user))
  const removedUsers = oldUsers.filter((user: string) => !users.includes(user))
  const remainingUsers = oldUsers.filter((user: string) => users.includes(user))
  console.log({ addedUsers, removedUsers, remainingUsers })

  // add Board to new Users
  await usersCollection.updateMany(
    {
      'public.username': { $in: addedUsers },
    },
    { $push: { 'public.boards': newName } }
  )

  // remove Board from deleted Users
  await usersCollection.updateMany(
    {
      'public.username': { $in: removedUsers },
    },
    { $pull: { 'public.boards': oldName } }
  )

  if (oldName !== newName) {
    // Case: boardname changed -> boardname must be updated in users data
    await usersCollection.updateMany(
      {
        'public.username': { $in: remainingUsers },
        'public.boards': oldName,
      },
      {
        $set: { 'public.boards.$': newName },
      }
    )
  }

  res.send()
})

export default boards

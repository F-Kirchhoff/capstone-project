import express from 'express'
import type { Response, Request } from 'express'
import { getBoards, getUsers } from '../../utils/db'
import validateString from '../../utils/validateString'
import { checkBoardAccess, checkLogin } from '../middleware/checkPermission'

const boards = express.Router()

boards.use(checkLogin)

boards.get('/', checkBoardAccess, async (req: Request, res: Response) => {
  const { board } = req.body

  res.send(board)
})

boards.post('/', async (req: Request, res: Response) => {
  const {
    payload: { name: rawName, users },
  } = req.body

  const name = rawName.split(' ').join('-')

  const user = req.session?.user

  const boards = getBoards()
  const usersCollection = getUsers()

  const validation = validateString(name)

  if (!validation.ok) {
    res.status(422).send(validation.msg)
    return
  }

  const board = await boards.findOne({ name })

  if (board) {
    res.status(422).send('Board already exists.')
    return
  }

  const newBoard = {
    name,
    topics: [],
    users: [user, ...users],
  }

  await boards.insertOne(newBoard)

  await usersCollection.updateMany(
    {
      'public.username': { $in: [user, ...users] },
    },
    { $push: { 'public.boards': name } }
  )

  res.end()
})

boards.patch('/', checkBoardAccess, async (req: Request, res: Response) => {
  const {
    payload: { oldName, newName: rawNewName, users },
    board,
  } = req.body

  const newName = rawNewName.split(' ').join('-')

  const boards = getBoards()
  const usersCollection = getUsers()

  const validation = validateString(newName)

  if (!validation.ok) {
    console.log(validation.msg)
    res.status(422).send(validation.msg)
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

  res.end()
})

export default boards

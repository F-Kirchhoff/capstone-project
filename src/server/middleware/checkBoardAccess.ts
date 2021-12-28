import express from 'express'
import type { Request, Response } from 'express'
import { getBoards } from '../../utils/db'

export const checkBoardAccess = express.Router()

checkBoardAccess.all('*', async (req: Request, res: Response, next) => {
  const { boardName: name } = req.method === 'GET' ? req.query : req.body
  const user = req.session?.user

  const board = await getBoards().findOne({ name })

  if (!board) {
    res.status(404).send('Error: Bad request.')
    return
  }

  const hasAccessRights = board.users.includes(user)

  console.log('Check Board Access')

  if (!hasAccessRights) {
    res.status(401).send('Access Denied!')
    return
  }

  req.body.board = board

  next()
})

import express from 'express'
import type { Request, Response } from 'express'

export const checkLoginStatus = express.Router()

checkLoginStatus.all('*', (req: Request, res: Response, next) => {
  const isLoggedIn = req.session?.user

  if (!isLoggedIn) {
    res.status(401).send('Access Denied.')
    return
  }

  console.log('check login')

  req.body.user = req.session?.user

  next()
})

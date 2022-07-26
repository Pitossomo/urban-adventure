import { NextFunction, Request, Response, Router } from "express"
import User from "../@types/User"

const usersDB: User[] = []
const usersRoute = Router()

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(usersDB)
})

usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  res.status(200).send({ uuid: uuid })
})

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.body.username 
  if (!username || username==='') return res.status(400)

  const newUser = {
    uuid: usersDB.length+1, 
    username: req.body.username 
  }

  usersDB.push(newUser)
  res.status(201).send(newUser)
})

usersRoute.put('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  const username: string = req.body.username 
  if (!username || username==='') return res.status(400)
  // TODO PUT method
  res.status(200)
})

usersRoute.delete('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  // TODO DELETE method
  res.status(200)
})

export default usersRoute
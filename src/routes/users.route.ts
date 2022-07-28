import { NextFunction, Request, Response, Router } from "express"
import User from "../@types/User"
import userRepository from "../repositories/user.repository"

const usersRoute = Router()
const usersDB = []

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers()
  res.status(200).send(users)
})

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  const user = await userRepository.findById(uuid)
  if (user) res.status(200).send(user)
  else res.status(404) 
})

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.body.username 
  const password: string = req.body.password 
  
  if (!username || username==='' || !password || password==='' ) return res.status(400)

  const newUser = { username, password }

  const newUserId = await userRepository.create(newUser)
  res.status(201).send(newUserId)
})

usersRoute.put('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  const username: string = req.body.username 
  const password: string = req.body.password 

  if (!username || username==='' || !password || password==='' ) return res.status(400)

  await userRepository.update({uuid, username, password})
  res.status(200).send()
})

usersRoute.delete('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  // TODO DELETE method
  res.status(200).send()
})

export default usersRoute
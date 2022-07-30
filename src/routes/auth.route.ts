import { NextFunction, Request, Response, Router } from "express"
import jwt from 'jsonwebtoken'
import ForbiddenError from "../models/errors/forbidden.error.model"
import userRepository from "../repositories/user.repository"

const authRoute = Router()

authRoute.post('/token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('authorization')
    if (!authHeader)
      throw new ForbiddenError('Credenciais não informadas')
  
    const [authType, token] = authHeader.split(' ')
    if (authType.toLowerCase() !== 'basic' || !token)
      throw new ForbiddenError('Autenticação inválida')
  
    const tokenContent = Buffer.from(token, 'base64').toString('utf-8')
    const [username, password] = tokenContent.split(':')
    if (!username || !password) throw new ForbiddenError('Dados não informados')
  
    const user = await userRepository.findByUsernameAndPassowrd(username, password)
    if (!user) throw new ForbiddenError('Usuário ou senha invalidos')

    console.log(user)

    const jwtPayload = { username: user.username }
    const jwtOptions = { subject: user?.uuid }
    const secretKey = process.env.JWT_SECRET_KEY as string

    const jwtSigned = jwt.sign(jwtPayload, secretKey , jwtOptions)
   
  
  } catch (error) {
    next(error)
  }
})

export default authRoute
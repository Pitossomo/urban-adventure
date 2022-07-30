import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleWare(req: Request, res: Response, next: NextFunction ): User{
  try {
    const authHeader = req.get('authorization')
    if (!authHeader) throw new ForbiddenError('Credenciais não informadas')
  
    const [authType, token] = authHeader.split(' ')
    if (authType.toLowerCase() !== 'basic' || !token) throw new ForbiddenError('Autenticação inválida')
  
    const tokenContent = Buffer.from(token, 'base64').toString('utf-8')
    const [username, password] = tokenContent.split(':')
    if (!username || !password) throw new ForbiddenError('Dados não informados')
  
    const user = await userRepository.findByUsernameAndPassowrd(username, password)
    if (!user) throw new ForbiddenError('Usuário ou senha invalidos')

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export default basicAuthenticationMiddleWare
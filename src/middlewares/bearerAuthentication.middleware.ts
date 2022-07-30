import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function bearerAuthenticationMiddleWare(req: Request, res: Response, next: NextFunction ): User{
  try {
    const authHeader = req.get('authorization')
    if (!authHeader) throw new ForbiddenError('Credenciais não informadas')
  
    const [authType, token] = authHeader.split(' ')
    if (authType.toLowerCase() !== 'bearer' || !token) throw new ForbiddenError('Autenticação inválida')
  
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    
    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) throw new ForbiddenError('Token inválido')
    const uuid = tokenPayload.sub

    const user = await userRepository.findById(uuid)

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export default bearerAuthenticationMiddleWare
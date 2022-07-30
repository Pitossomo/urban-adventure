import DatabaseError from "../models/errors/database.error.model"
import db from "../db"
import User from "../models/user.model"

const SALT = process.env.NODE_ENV === 'production' ? process.env.MY_SALT : "MY-SALT"

class UserRepository {
  
  async findAllUsers(): Promise<User[]> {
    const query = `
      SELECT uuid, username
      FROM app_user
    `

    const { rows } = await db.query<User>(query)

    return rows || []
  }

  async findById(uuid: string): Promise<User> {
    try {
      const query = `
        SELECT uuid, username
        FROM app_user
        WHERE uuid = $1
      `
      const values = [uuid]
      
      const { rows } = await db.query<User>(query, values)
      const [ user ] = rows
      return user

    } catch (error) {
      throw new DatabaseError("Id não encontrado", error)
    }
  }

  async findByUsernameAndPassowrd(username: string, password: string){
    try {
      const query = `
        SELECT uuid, username
        FROM app_user
        WHERE username = $1
        AND password = crypt($2, $3)
      `

      const values = [username, password, SALT]
      
      const { rows } = await db.query<User>(query, values) 
      const [ user ] = rows 

      return user || null
    } catch (error) {
      throw new DatabaseError('Não foi possível verificar os dados fornecidos')
    }
  }

  async create(user: User): Promise<string | null> {
    const script = `
      INSERT INTO app_user (
        username,
        password
      )
      VALUES ($1, crypt($2, $3))
      RETURNING uuid
    `

    const values = [user.username, user.password, SALT]

    const { rows } = await db.query<{ uuid: string }>(script, values)
    const newUserId = rows[0].uuid || null
    return newUserId   
  } 

  async update(user: User): Promise<void> {
    const script = `
      UPDATE app_user 
      SET
        username = $1,
        password = crypt($2, $3)
      WHERE uuid = $4
    `

    const values = [user.username, user.password, SALT, user.uuid]

    await db.query<User>(script, values)
  } 

  async delete(uuid: string): Promise<void> {
    const script = `
      DELETE 
      FROM app_user 
      WHERE uuid = $1
    `

    const values = [uuid]

    await db.query<User>(script, values)
  } 
}

export default new UserRepository()
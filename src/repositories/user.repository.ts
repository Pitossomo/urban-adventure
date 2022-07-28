import DatabaseError from "../models/errors/database.error.model"
import db from "../db"
import User from "../models/user.model"

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
      const user = rows[0]

      return user
    } catch (error) {
      throw new DatabaseError("Id não encontrado", error)
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

    const salt = process.env.NODE_ENV === 'production' ? process.env.MY_SALT : 'MY_SALT'
    const values = [user.username, user.password, salt]

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

    const salt = process.env.NODE_ENV === 'production' ? process.env.MY_SALT : 'MY_SALT'
    const values = [user.username, user.password, salt, user.uuid]

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
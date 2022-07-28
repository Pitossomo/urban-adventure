import axios from 'axios'
import db from '../src/db'

const server = axios.create({
  baseURL: 'http://localhost:3001/users'
})

describe('/users', () => {
  let firstUserId: string;
  let lastUserId: string;

  /* Before all tests (TODO):
    - run the scrit from /src/sql/initTest.sql on the test's database, or
    - restore some saved backup, or
    - mock it up :) 
  */
  
  it('returns all users', async () => {
    const response = await server.get('/')
    firstUserId = response.data[0].uuid
    expect(response.data).toHaveLength(5)
  })

  it('returns user data by on GET', async () => {
    const response = await server.get('/'+firstUserId)
    expect(response.data).toHaveProperty('uuid')
    expect(response.data).toMatchObject({ username: 'lisossomo' })
  })

  it('returns uuid of saved user on POST', async () => {
    const newUser = { username: "peroxissomo", password: 'MY_PASSWORD'}
    const response = await server.post('/', newUser)
    lastUserId = response.data
    console.log(lastUserId)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    expect(lastUserId).toMatch(uuidRegex)
  })

  it('changes the name of a user by his uuid on PUT', async () => {
    const modifiedUser = { 
      username: "coronassomo",
      password: 'MY_PASSWORD'
    }
    const response = await server.put('/'+lastUserId, modifiedUser)
    expect(response.status).toBe(200)
  })
})
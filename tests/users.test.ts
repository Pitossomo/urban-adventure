import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3001/users'
})

describe('/users', () => {
  let firstUserId: string = "9c8ec61f-0b8d-4466-87db-0ea48f364733";
  let lastUserId: string = "7e28f984-4a63-40f3-8186-8e0d5fa21145";

  /* Before all tests (TODO):
    - run the script from /src/sql/initTest.sql on the test's database, or
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

  /* TODO - Test status code 500 when get by wrong id failed
  it('returns status 500 when GET method is made to an invalid uuid', async () => {
    TODO
  })
  */

  it('returns uuid of saved user on POST', async () => {
    const newUser = { username: "peroxissomo", password: 'MY_PASSWORD'}
    const response = await server.post('/', newUser)
    lastUserId = response.data
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

  it('remove user by his uuid on DELETE', async () => {
    const response = await server.delete('/'+lastUserId)
    expect(response.status).toBe(200)
  })
})
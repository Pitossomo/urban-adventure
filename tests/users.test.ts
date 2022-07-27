import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3001/users'
})

describe('/users', () => {
  it('returns all users', async () => {
    const response = await server.get('/') 
    expect(response.data).toHaveLength(5)
  })

  it('returns user data', async () => {
    const response = await server.get('/1234')
    expect(response.data).toMatchObject({ uuid: '1234' })
  })

  it('returns succesfully the user posted', async () => {
    const response = await server.post('/', { username: 'Pitossomo'})
    expect(response.data).toHaveProperty('uuid')
    expect(response.data).toMatchObject({ username: 'Pitossomo' })
  })
})
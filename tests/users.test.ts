import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3001/users'
})

describe('/users', () => {
  it('returns all users', async () => {
    const response = await server.get('/') 
    expect(response.data).toHaveLength(5)
  })

  it('returns user data by on get', async () => {
    const response = await server.get('/8c6a2328-f285-461e-bf8e-7e74dc9c7913')
    expect(response.data).toHaveProperty('uuid')
    expect(response.data).toMatchObject({ username: 'lisossomo' })
  })

  it('returns saved user data on post', async () => {
    const response = await server.post('/', { username: "peroxissomo"})
    expect(response.data).toHaveProperty("uuid")
    expect(response.data).toMatchObject({ username: "peroxissomo" })
  })
})
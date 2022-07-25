import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3001/users'
})

describe('/users', () => {
  it('returns succesfully', async () => {
    const response = await server.get('/') 

    expect(response.data).toHaveLength(0)
  })
})
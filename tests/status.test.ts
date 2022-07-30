import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3001/status'
})

describe('/status', () => {
  it('returns succesfully', async () => {
    const response = await server.get('/') 
  })
})
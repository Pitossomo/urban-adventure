import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3000'
})

describe('/status', () => {
  it('returns succesfully', async () => {
    const response = await server.get('/status') 

    expect(response.data).toMatchObject({ 'foo': 'bar'})
  })
})
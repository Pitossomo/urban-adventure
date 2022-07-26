import 'dotenv/config'
import express from 'express'
import statusRoute from './routes/status.route'
import usersRoute from './routes/users.route'

const app = express()
app.use(express.json())
app.use(usersRoute)
app.use(statusRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Aplicação executando na porta ${PORT}`)
})
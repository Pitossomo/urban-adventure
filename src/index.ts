import 'dotenv/config'
import express from 'express'
import errorHandler from './middlewares/errorHandler.middleware'
import statusRoute from './routes/status.route'
import usersRoute from './routes/users.route'

// App configuration
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes configuration
app.use(usersRoute)
app.use(statusRoute)

// Error Handler middleware configuration
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Aplicação executando na porta ${PORT}`)
})
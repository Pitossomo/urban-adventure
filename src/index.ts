import 'dotenv/config'
import express from 'express'
import errorHandler from './middlewares/errorHandler.middleware'
import authRoute from './routes/auth.route'
import statusRoute from './routes/status.route'
import usersRoute from './routes/users.route'

// App configuration
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes configuration
app.use(usersRoute)
app.use(statusRoute)
app.use(authRoute)

// Error Handler middleware configuration
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Aplicação executando na porta ${PORT}`)
})
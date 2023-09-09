require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express()

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')
const connectDB = require('./db/connect')
const authenticationMiddleware = require('./middleware/authentication')

app.use(express.json())
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter)
app.use('/api/v1/auth', authRouter)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT

const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(`Server is listening on ${port}`))
    } catch (error) {
        console.log(error)
    }
}


start()

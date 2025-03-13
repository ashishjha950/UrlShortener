import express from 'express'
import dbConnection from './dbConnection.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import ShortUrl from './routes/ShortUrl.js'
import User from './routes/User.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

dbConnection()

app.use(cors({
    origin: ['http://localhost:5174/'],
    methods: ['GET','POST'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/ShortUrl',ShortUrl)
app.use('/api/User',User)

const port = process.env.PORT;

app.listen(port,()=>{
    console.log('server started at port',port)
})
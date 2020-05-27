import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import tasks from './routes/taskRoute'
import users from './routes/userRoute'
import mongoose from 'mongoose'
import expressSession from 'express-session'
import passport from 'passport'
import { setUpPassport } from './config/passportConfig'

// label constants 
const PORT = 3000
const DB_URL = 'mongodb://localhost/html_mastery' 
const API = '/api'
const USERS = '/users'

// built-up constants
const app = express()
const db = mongoose.connection

//set-up passport
setUpPassport()

// set-up app
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(expressSession({
  secret: 'itsasecretmessage',
  cookie: {
    maxAge : 3600000
  },
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// set-up database
mongoose.set('useCreateIndex', true)
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// routing
app.use(API, tasks)
app.use(API + USERS, users)

// connect and run
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
  })
})

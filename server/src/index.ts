import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import tasks from './routes/taskRoute'
import users from './routes/userRoute'
import mongoose from 'mongoose'
import expressSession from 'express-session'
import passport from 'passport'
import { setUpPassport } from './config/passportConfig'
import cors from "cors"

var router = express.Router()

const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "localhost:4200",
  preflightContinue: false
}

router.use(cors(options))

router.options("*", cors(options))

const PORT = 3000
const DB_URL = 'mongodb://localhost/html_mastery' 
const API = '/api'

const app = express()
const db = mongoose.connection

setUpPassport()

app.use(cors())
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

mongoose.set('useCreateIndex', true)
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(API, tasks)
app.use(API, users)

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
  })
})

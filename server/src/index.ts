/*

7. HTML Mastery
a) a backend különböző 
HTML feladatok leírását tárolja, minden feladathoz tartozzon egy 
  leírás, egy stringként tárolt 
  forráskód részlet és egy 
  másik forráskód részlet, amely a sikeres megoldást ellenőrzi. 
A szerver kezelje 
felhasználók regisztrációját is, minden felhasználó rendelkezzen egy
  “mastery” szinttel
, amely jelzi a felhasználó által sikeresen leküzdött feladatok számát.

*/

import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import tasks from './routes/taskRoute'
import mongoose from 'mongoose'
import expressSession from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

// label constants 
const PORT = 3000
const DB_URL = 'mongodb://localhost/html_mastery' 
const API = '/api'

// built-up constants
const app = express()
const db = mongoose.connection;

// set-up app
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// set-up database
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// routing
app.use(API, tasks)

// connect and run
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
  })
})

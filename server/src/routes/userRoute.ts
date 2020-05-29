import express from 'express'
import * as controller from '../controllers/user'
import { isLoggedIn } from '../middleware/auth'

const router = express.Router()
const USERS = '/users'

router.post(USERS + '/register', (req, res) => {
  controller.registerUser(req, res)
})

router.post(USERS + '/login', (req, res, next) => {
  controller.login(req, res, next)
})

router.post(USERS + '/logout', isLoggedIn, (req, res) => {
  controller.logout(req, res)
})

export default router
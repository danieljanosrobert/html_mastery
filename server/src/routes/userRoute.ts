import express from 'express'
import * as controller from '../controllers/user'
import { isLoggedIn } from '../middleware/auth'

const router = express.Router()

router.post('/register', (req, res) => {
  controller.registerUser(req, res)
})

router.post('/login', (req, res, next) => {
  controller.login(req, res, next)
})

router.post('/logout', isLoggedIn, (req, res) => {
  controller.logout(req, res)
})

export default router
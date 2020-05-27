import express from 'express'
import * as controller from '../controllers/user'

const router = express.Router()

router.post('/register', (req, res) => {
  controller.registerUser(req, res)
})

router.post('/login', (req, res, next) => {
  controller.login(req, res, next)
})

export default router
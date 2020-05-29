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

router.get(USERS + '/mastery_level/:username', (req, res) => {
  controller.getMasteryLevel(req, res)
})

router.get(USERS + '/solved/:username', (req, res) => {
  controller.getResolvedTasks(req, res)
})

/*
middleware nem működik - CORS nem engedi interceptorral sem ki a credential-öket..

router.post(USERS + '/logout', isLoggedIn, (req, res) => {
  controller.logout(req, res)
})

*/
router.post(USERS + '/logout', (req, res) => {
  controller.logout(req, res)
})


export default router

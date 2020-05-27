import express from 'express'
import * as controller from '../controllers/task'

const router = express.Router()

router.route('/task').get((req, res) => {
  res.status(200).send('Hello World!')
}).post((req, res) => {
  controller.createTask(req, res)
}).put((req, res) => {
  res.status(403).send('Don\'t do this')
})

export default router
import express from 'express'
import * as controller from '../controllers/task'

const router = express.Router()

router.route('/task').post((req, res) => {
  controller.createTask(req, res)
})

export default router
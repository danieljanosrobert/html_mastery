import express from 'express'
import * as controller from '../controllers/task'

const router = express.Router()

const TASK = '/task'

router.route(TASK).post((req, res) => {
  controller.createTask(req, res)
})

router.route(TASK + '/review').post((req, res) => {
  controller.reviewTask(req, res)
})

export default router
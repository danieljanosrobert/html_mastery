import express from 'express'
import * as controller from '../controllers/task'

const router = express.Router()

const TASK = '/task'

router.route('/tasks').get((req, res) => {
  controller.getTasks(req, res)
})

router.route(TASK + '/:tasktitle').get((req, res) => {
  controller.getTask(req, res)
})

router.route(TASK).post((req, res) => {
  controller.createTask(req, res)
})

router.route(TASK + '/review').post((req, res) => {
  controller.reviewTask(req, res)
})

export default router
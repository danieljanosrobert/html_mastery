import { Task } from '../models/Tasks'
import { constants } from 'http2'

export const createTask = async (req: any, res: any) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    base_source_code: req.body.base_source_code,
    solution: req.body.solution,
    max_duration: req.body.max_duration ? req.body.max_duration : 0
  })
  task.save((saveError) => {
    if (saveError) {
      if (saveError.code === 11000) {
        return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({msg: 'Task\'s title already in use'})
      }
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({msg: 'Error occured during saving the task.'})
    }
    return res.status(constants.HTTP_STATUS_OK).send({})
  })
}
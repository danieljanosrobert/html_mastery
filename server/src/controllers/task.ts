import { Task } from '../models/Tasks'
import { constants } from 'http2'

export const createTask = async (req: any, res: any) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    base_source_code: req.body.base_source_code,
    solution: req.body.solution
  })
  task.save((saveError) => {
    if (saveError) {
      if (saveError.code === 11000) {
        return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Task\'s name already in use')
      }
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Error occured during saving the task.')
    }
    return res.sendStatus(constants.HTTP_STATUS_OK)
  })
}
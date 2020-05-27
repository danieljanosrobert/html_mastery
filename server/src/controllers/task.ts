import { Task } from '../models/Tasks'
import { constants } from 'http2'

export const createTask = async (req: any, res: any) => {
  const task = new Task({
    description: req.body.description,
    base_source_code: req.body.base_source_code,
    solution: req.body.solution
  })
  task.save((saveError) => {
    if (saveError) {
      console.error(saveError)
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Error occured during saving the task.')
    }
    res.sendStatus(constants.HTTP_STATUS_OK)
  })
}
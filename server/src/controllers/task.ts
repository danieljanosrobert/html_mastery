import { Task } from '../models/Tasks'
import { constants } from 'http2'
import _ from 'lodash'
import * as userController from './user'

var html2json = require('html2json').html2json

export const getTasks = async (req: any, res: any) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({msg: 'Error occured'})
    }
    res.status(constants.HTTP_STATUS_OK).send(tasks)
  })
}

export const getTask = async (req: any, res: any) => {
  Task.findOne({title: req.params.tasktitle}, (err, task) => {
    if (err) {
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({msg: 'Error occured'})
    }
    res.status(constants.HTTP_STATUS_OK).send(task)
  })
}

export const createTask = async (req: any, res: any) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    base_source_code: req.body.base_source_code,
    solution: req.body.solution,
    max_duration: req.body.max_duration ? req.body.max_duration : 0
  })
  try {
    html2json(trimHtml(task.base_source_code))
    html2json(trimHtml(task.solution))
  } catch (err) {
    return res.status(constants.HTTP_STATUS_FORBIDDEN)
        .send({msg: 'Parse error. Please fix the code'})
  }
  if (!task.title) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({msg: 'Title is required'})
  }
  task.save((saveError) => {
    if (saveError) {
      if (saveError.code === 11000) {
        return res.status(constants.HTTP_STATUS_CONFLICT)
        .send({msg: 'Task\'s title already in use'})
      }
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({msg: 'Error occured during saving the task.'})
    }
    return res.status(constants.HTTP_STATUS_OK).send({})
  })
}

export const reviewTask = async (req: any, res: any) => {
  const completeTask: ReviewableTask =  {
    username: req.body.username,
    task_title: req.body.task_title,
    source_code: req.body.source_code
  }
  try {
    html2json(trimHtml(completeTask.source_code))
  } catch (err) {
    return res.status(constants.HTTP_STATUS_FORBIDDEN)
        .send({msg: 'Parse error. Please fix the code'})
  }
  Task.findOne({title: completeTask.task_title}, (err, task) => {
    if (err) {
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({msg: 'Error occured'})
    }
    if (!task) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST)
        .send({msg: 'No task found with given name'})
    }
    let comp = trimHtml(completeTask.source_code)
    let sol = trimHtml(task.solution)
    const result = _.isEqual(html2json(comp), html2json(sol)) ? "success" : "fail"
    if (result === "success") {
      userController.giveMasteryPointToUser(completeTask.username, completeTask.task_title,  res)
    }
    return res.status(constants.HTTP_STATUS_OK)
      .send({result: result})
  })
}

const trimHtml = function(str: string) {
  return str.replace(/(\r\n|\n|\r|\t)/gm, '')
    .replace(/  +/g, ' ').replace(/> </g, '><')
    .replace(/ <|< /g, '<').replace(/> | >/g, '>')
}

interface ReviewableTask {
  username: string
  task_title: string
  source_code: string
}
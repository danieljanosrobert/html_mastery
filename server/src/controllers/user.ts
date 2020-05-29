import { constants } from 'http2'
import { User } from '../models/Users'
import passport, { use } from 'passport'
import _ from 'lodash'

export const registerUser = async (req: any, res: any) => {
  if (req.body.password !== req.body.confirm_password) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST)
      .send({ msg: 'Passwords does not match!' })
  }
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    mastery: 0,
    resolved_tasks: []
  })
  if (!user.username || !user.password) {
    return res.status(constants.HTTP_STATUS_UNAVAILABLE_FOR_LEGAL_REASONS)
      .send({ msg: 'its empty..' })
  }
  user.save((saveError) => {
    if (saveError) {
      if (saveError.code === 11000) {
        return res.status(constants.HTTP_STATUS_CONFLICT)
          .send({ msg: 'Username already in use.' })
      }
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ msg: 'Error occured during saving the user.' })
    }
    return res.status(constants.HTTP_STATUS_OK).send({})
  })
}

export const login = async (req: any, res: any, next: any) => {
  passport.authenticate("local", (err: Error, user: any, info: any) => {
    if (err) { return next(err) }
    if (!user) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ msg: 'Invalid username or password' })
    }
    req.logIn(user, (err: any) => {
      if (err) { return next(err) }
      res.status(constants.HTTP_STATUS_OK).send({
        username: user.username,
        mastery_level: user.mastery
      })
    })
  })(req, res, next)
}


export const getMasteryLevel = async (req: any, res: any) => {
  User.findOne({ username: req.params.username }, (err, dbUser) => {
    if (err) {
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ msg: 'Some error occured' })
    }
    if (!dbUser) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({
        msg: 'User not found',
      })
    }
    return res.status(constants.HTTP_STATUS_OK).send({
      mastery_level: dbUser.mastery
    })
  })
}
export const getResolvedTasks = async (req: any, res: any) => {
  User.findOne({ username: req.params.username }, (err, dbUser) => {
    if (err) {
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ msg: 'Some error occured' })
    }
    if (!dbUser) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({
        msg: 'User not found',
      })
    }
    return res.status(constants.HTTP_STATUS_OK).send(dbUser.resolved_tasks)
  })
}

export const logout = async (req: any, res: any) => {
  req.logout()
  return res.status(constants.HTTP_STATUS_OK).send({})
}

export const giveMasteryPointToUser = async (username: string, task_title: string, res: any) => {
  User.findOne({ username: username }, (err, dbUser) => {
    if (err) {
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ msg: 'Some error occured' })
    }
    if (!dbUser) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({
        msg: 'User not found',
      })
    }
    if (!_.includes(dbUser.resolved_tasks, task_title)) {
      dbUser.resolved_tasks.push(task_title)
      dbUser.mastery += 1
    }
    dbUser.save((saveError) => {
      if (saveError) {
        if (saveError.code === 11000) {
          return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ msg: 'Username already in use.' })
        }
        return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ msg: 'Error occured during saving the user.' })
      }
    })
  })
}
import { constants } from 'http2'
import { User } from '../models/Users'
import passport from 'passport'

export const registerUser = async (req: any, res: any) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    mastery: 0,
    resolved_tasks: []
  })
  user.save((saveError) => {
    if (saveError) {
      if (saveError.code === 11000) {
        return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({msg: 'Username already in use.'})  
      }
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({msg: 'Error occured during saving the user.'})
    }
    return res.status(constants.HTTP_STATUS_OK).send({})
  })
}

export const login = async (req: any, res: any, next: any) => {
  passport.authenticate("local", (err: Error, user: any, info: any) => {
    if (err) { return next(err) }
    if (!user) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({msg: 'Invalid email or password'})
    }
    req.logIn(user, (err: any) => {
      if (err) { return next(err) }
      return res.status(constants.HTTP_STATUS_OK).send({
        username: user.username,
        mastery_level: user.mastery
      })
    })
  })(req, res, next)
}


export const getResolvedTasks = async (req: any, res: any) => {
  User.findOne({username: req.params.username}, (err, dbUser) => {
    if (err) {
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ msg: 'Some error occured' })
    }
    if (!dbUser) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send({
        msg: 'User not found',
      });
    }
    return res.status.status(constants.HTTP_STATUS_OK).send({
      resolved_tasks: dbUser.resolved_tasks
    })
  })
}

export const logout = async (req: any, res: any) => {
  req.logout()
  return res.status(constants.HTTP_STATUS_OK).send({})
}

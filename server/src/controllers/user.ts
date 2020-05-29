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
        .send('Username already in use.')  
      }
      return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Error occured during saving the user.')
    }
    return res.sendStatus(constants.HTTP_STATUS_OK)
  })
}

export const login = async (req: any, res: any, next: any) => {
  passport.authenticate("local", (err: Error, user: any, info: any) => {
    if (err) { return next(err) }
    if (!user) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).send('Invalid email or password')
    }
    req.logIn(user, (err: any) => {
      if (err) { return next(err) }
      return res.sendStatus(constants.HTTP_STATUS_OK)
    })
  })(req, res, next)
}

export const logout = async (req: any, res: any) => {
  req.logout()
  return res.sendStatus(constants.HTTP_STATUS_OK)
}

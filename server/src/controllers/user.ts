import { constants } from 'http2'
import { User } from '../models/Users'
import passport from 'passport'

export const registerUser = async (req: any, res: any) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    mastery: 0
  })
  user.save((saveError) => {
    if (saveError) {
      console.error(saveError)
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
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send('Invalid email or password')
    }
    req.logIn(user, (err: any) => {
      if (err) { return next(err) }
      res.sendStatus(constants.HTTP_STATUS_OK)
    })
  })(req, res, next)
}

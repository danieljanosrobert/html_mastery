import { User } from "../models/Users"
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

export function setUpPassport(): void {
  passport.serializeUser((user: any, done: any) => {
    if (!user) { return done('Error - User does not exist', undefined) }
    return done(null, user.id)
  })

  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err, user) => { done(err, user) })
  })

  passport.use(new LocalStrategy((username: any, password: any, done: any) => {
    User.findOne({
      username: username
    }, (err, user) => {
      if (err) { return done(err) }
      if (!user) { return done(undefined, false, { message: 'Invalid email or password' }) }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) { return done(err) }
        if (isMatch) { return done(undefined, user) }
        return done(undefined, false, { message: "Invalid email or password." })
      })
    })
  }))
}

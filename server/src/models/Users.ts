import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export type UserDocument = mongoose.Document & {
  username: string,
  password: string,
  mastery: number,
  resolved_tasks: string[],

  comparePassword: comparePasswordFunction
}

const userSchema  = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  mastery: Number,
  resolved_tasks: [String]
})

type comparePasswordFunction = (candidatePassword: string, callback: (err: any, isMatch: any) => {}) => void

const comparePassword: comparePasswordFunction = function (this: any, candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
      callback(err, isMatch)
  })
}

userSchema.methods.comparePassword = comparePassword

userSchema.pre('save', function save(next) {
  const user = this as UserDocument
  if (!user.isModified('password')) { return next() }
  bcrypt.hash(user.password, 10, (bcryptError: Error, hash) => {
    if (bcryptError) { return next(bcryptError) }
    user.password = hash
    next()
  })
})

export const User = mongoose.model<UserDocument>('User', userSchema)

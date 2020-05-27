/*
felhasználók regisztrációját is, minden felhasználó rendelkezzen egy
  “mastery” szinttel
, amely jelzi a felhasználó által sikeresen leküzdött feladatok számát.
*/

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export type UserDocument = mongoose.Document & {
  username: string,
  password: string,
  mastery: number
}

const userSchema  = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  mastery: Number
})

userSchema.pre('save', function save(next) {
  const user = this as UserDocument
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.hash(user.password, 10, (bcryptError: Error, hash) => {
    if (bcryptError) {
      return next(bcryptError)
    }
    user.password = hash
    next()
  })
})

export const User = mongoose.model<UserDocument>('User', userSchema)

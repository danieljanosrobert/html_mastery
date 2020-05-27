export default class PassportConfig {
  static serializeUser(user: any, done: any) {
    if (!user) {
      return done('Error - User does not exist', undefined)
    }
    console.log('serialize sikeres')
    return done(null, user)
  }

  static deserializeUser(user: any, done: any) {
    console.log('deserialize meghívva')
    if (!user) {
      return done('Error - User does not exist', undefined)
    }
    console.log('deserialize sikeres')
    return done(null, user)
  }
}

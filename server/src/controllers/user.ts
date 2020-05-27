import { constants } from 'http2'
import { User } from '../models/Users'

export const registerUser = async (req: any, res: any) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    mastery: 0
  })
  user.save((saveError) => {
    if (saveError) {
      console.error(saveError)
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Error occured during saving the user.')
    }
    res.sendStatus(constants.HTTP_STATUS_OK)
  })
}
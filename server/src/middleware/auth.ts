import { constants } from 'http2'

export const isLoggedIn = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()){ return next() }
  return res.status(constants.HTTP_STATUS_BAD_REQUEST)
    .send({msg: 'Not logged in'})
}
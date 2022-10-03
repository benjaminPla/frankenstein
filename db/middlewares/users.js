import { User } from '../index.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const users = {
  missingUsername: (req, res, next) => {
    const { username } = req.body
    return !username ? res.status(422).send('Missing username') : next()
  },
  missingPassword: (req, res, next) => {
    const { password } = req.body
    return !password ? res.status(422).send('Missing password') : next()
  },
  isAdmin: async (req, res, next) => {
    const decodedToken = await jwt.verify(req.token, process.env.SECRET)
    const user = await User.findOne({ where: { id: decodedToken.id } })
    req.user = user
    return !user.isAdmin ? res.status(403).send('Forbidden') : next()
  }
}

export default users

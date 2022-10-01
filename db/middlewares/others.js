import fs from 'fs'
import jwt from 'jsonwebtoken'

const others = {
  hasToken: async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(401)

    const pureToken = token.replace('Bearer ', '')
    const verifyToken = await jwt.verify(pureToken, process.env.SECRET, (err) => {
      if (err) return res.status(401)
    })

    next()
  },
  log: (data, error = false) => {
    const info = {
      error,
      date: new Date(),
      log: JSON.stringify(data)
    }
    fs.appendFileSync('./log.txt', `${JSON.stringify(info)} \n`)
  }
}

export default others

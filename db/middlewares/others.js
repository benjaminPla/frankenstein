import fs from 'fs'
import jwt from 'jsonwebtoken'

const others = {
  hasToken: async (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '')
    if (!token) return res.status(401)

    await jwt.verify(token, process.env.SECRET, (err) => {
      if (err) return res.status(401)
    })

    req.token = token
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

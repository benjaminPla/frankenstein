import express from 'express'
import { User, redis } from '../index.js'
import usersMiddlewares from '../middlewares/users.js'
import othersMiddlewares from '../middlewares/others.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const usersRouter = express.Router()
const {
  missingUsername,
  missingPassword,
  isAdmin
} = usersMiddlewares
const { hasToken, log } = othersMiddlewares

usersRouter.get('/getAll', hasToken, isAdmin, async (req, res) => {
  const redisExists = await redis.exists('UsersGetAll')
  if (redisExists) {
    const redisData = await redis.get('UsersGetAll')
    return res.send(JSON.parse(redisData))
  } else {
    await User.findAll()
      .then(async (data) => {
        await redis.set('UsersGetAll', JSON.stringify(data), { EX: 30 })
        log(data)
        return res.send(data)
      })
      .catch(err => {
        log(err, true)
        return res.send(err)
      })
  };
})

usersRouter.get('/getById/:userId', hasToken, isAdmin, async (req, res) => {
  await User.findOne({ where: { id: req.params.userId } })
    .then(data => {
      log(data)
      if (!data) return res.status(404).send('User not found')
      res.status(200).send(data)
    })
    .catch(err => {
      log(err)
      res.status(500).send(err)
    })
})

usersRouter.post('/register', missingUsername, missingPassword, async (req, res) => {
  const { username, password, isAdmin } = req.body
  const sanitizedUsername = req.sanitize(username)
  const sanitizedPassword = req.sanitize(password)
  await User.create({
    username: sanitizedUsername,
    password: bcrypt.hashSync(sanitizedPassword, 10),
    isAdmin
  })
    .then(async (data) => {
      const redisExists = await redis.exists('UsersGetAll')
      redisExists && await redis.del('UsersGetAll')
      log(data)
      return res.sendStatus(201)
    })
    .catch(err => {
      log(err, true)
      return res.send(err)
    })
})

usersRouter.post('/login', missingUsername, missingPassword, async (req, res) => {
  const { username, password } = req.body
  await User.findOne({ where: { username } })
    .then(async (data) => {
      const passMatch = bcrypt.compareSync(password, data.dataValues.password)
      if (!passMatch) {
        res.status(401).send('Incorrect username or password')
      } else {
        const token = jwt.sign(data.dataValues, process.env.SECRET)
        res.status(200).send({ token })
      };
    })
})

export default usersRouter

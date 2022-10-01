import { Sequelize, Model, DataTypes } from 'sequelize'
import { createClient } from 'redis'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const sequelize = new Sequelize('sqlite::memory:')
export const redis = createClient()

export const User = sequelize.define('User', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

try {
  await redis.connect()
  console.log('redis on')

  await sequelize.sync({ force: true })

  const users = []
  const admin = await User.create({
    username: 'admin',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true
  })
  const basic = await User.create({
    username: 'basic',
    password: bcrypt.hashSync('basic', 10)
  })

  users.push(admin.dataValues.username, basic.dataValues.username)

  console.log(`Successfuy created users [${users.join(', ')}]!`)
} catch (err) {
  console.log(err)
};

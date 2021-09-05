import { basename as _basename } from 'path'
import Sequelize from 'sequelize'

const config = require(__dirname + '/../config/config.js')
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db

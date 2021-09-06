import * as path from 'path'
import {readdirSync} from 'fs'
import Sequelize from 'sequelize'

const config = require(__dirname + '/../config/config.js')
const basename = path.basename(__filename)
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const {default: initModel} = require(path.join(__dirname, file));

    const model = initModel(sequelize)

    db[model.name] = model;
  });

Object.keys(db).forEach(name => {
  if (db[name].associate) {
    db[name].associate(db);
  }
});

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db

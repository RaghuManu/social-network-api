const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.local.database, env.local.username, env.local.password, {
    host: env.local.host,
    dialect:env.local.dialect
  });


let socialNWDB = {};

socialNWDB  = sequelize;

socialNWDB.user = require('../model/user')(sequelize,Sequelize)

socialNWDB.post = require('../model/post')(sequelize,Sequelize)
socialNWDB.vote = require('../model/votes')(sequelize,Sequelize)



  module.exports ={
      sequelize:sequelize,
      socialNWDB:socialNWDB
  }
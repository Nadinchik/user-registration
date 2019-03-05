const Sequelize = require('sequelize');
const sequelize = new Sequelize('user', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
});

var lib = {};

lib.user = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true	  
    },
    name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    is_active:{
        type:Sequelize.BOOLEAN
    },
    created_at:{
        type:Sequelize.DATE
    },
    updated_at:{
        type:Sequelize.DATE
    }
},{
    underscored:true
});

module.exports = lib
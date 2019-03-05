const express = require('express');
const app = express();
var bodyParser = require("body-parser");
const Sequelize = require('sequelize');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(require("path").resolve(__dirname, "../dist")));


/**
 * please first change the username and password and also db name in the sequelize configuration according to your env
 */

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

// Connection authentication

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })


// calling the routes
  app.use('/api',require('./routes/user'))



  /**
   * fallback handler
   */
app.get('*',(req,res)=>{
	res.sendFile(require('path').resolve(__dirname,'../dist/index.html'))
})

const port = process.env.PORT || 3000

app.listen(port,()=>console.log('node is listeing on port',port))
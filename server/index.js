const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')


var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(require("path").resolve(__dirname, "../dist")));


app.get("/test",(req,res)=>{
	res.json({message:'testesd'})
})


const users = [
	{
		id:1,
		name:'rehan',
		email:'rehan@gmail.com',
		password:'1234'
	},
	{
		id:2,
		name:'Ragnaar',
		email:'rehan@gmail.com',
		password:'1234'
	},
	{
		id:3,
		name:'Lothbrok',
		email:'rehan@gmail.com',
		password:'1234'
	},
]


app.post('/login',(req,res)=>{
	const user = users.filter(item=>item.email === req.body.email && item.password === req.body.password)[0]
	if(!user){
		res.status(400).json({message:'invalid credentials'})
	}else{
		const token = jwt.sign({name:user.name},'my-secret');
		res.status(200).json({token,name:user.name})
	}
})

app.post('/register',(req,res)=>{
	users.push(req.body)
	res.json({message:'success'})
});


app.get('*',(req,res)=>{
	res.sendFile(require('path').resolve(__dirname,'../dist/index.html'))
})

const port = process.env.PORT || 3000

app.listen(port,()=>console.log('node is listeing on port',port))
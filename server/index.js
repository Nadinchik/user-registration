const express = require('express');
const app = express();


app.get("/test",(req,res)=>{
	res.json({message:'testesd'})
})

const port = process.env.PORT || 3000

app.listen(port,()=>console.log('node is listeing on port',port))
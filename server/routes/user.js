const express = require('express');
const router = express.Router();
const {user} = require('../models/definition');
const userValidation = require('../validations/user');
const jwt = require('jsonwebtoken')


// route for the login 

router.post('/login',(req,res)=>{
	const {errors,isValid} = userValidation.login(req.body)
	if(!isValid){
		res.status(400).json(errors)
	}else{
		user.findOne({where:{email:req.body.email,password:req.body.password}})
		.then(user=>{
			if(!user){
				errors.form = 'Invalid credentials'
				res.status(400).json(errors)
			}else{
				const token = jwt.sign({name:user.name},'my-secret');
				res.status(200).json({token,name:user.name})
			}
		})
		.catch(e=>res.status(400).json(e))
	}
	
	
})
// route for registration
router.post('/register',(req,res)=>{
	const {errors,isValid} = userValidation.register(req.body)
	if(!isValid){
		res.status(400).json(errors)
	}else{
		user.create({
			name:req.body.name,
			email:req.body.email,
			password:req.body.password,
			is_active:true
		})
		.then(data=>{
			res.status(200).json(data)
		})
		.catch(err=>res.status(400).json({form:'Error comes in creating new user'}))
	}
	
});

function authenticate(req,res,next){
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1]:'dfgsdgf';
    console.log('this is th edsfsd',req.headers)
    jwt.verify(token,'my-secret',(err,decoded)=>{
        if(err){
            next()
        }else{
            req.user = decoded
            next()
        }
    })
}


// this is the authorized route and you have to pass in headers Authorization key as Bearer token
router.get('/users',authenticate,(req,res)=>{
    console.log('this is req.user',req.user)
    if(req.user){
        user.findAll({where:{is_active:true}})
        .then(users=>res.status(200).json(users))
        .catch(e=>res.status(400).json(e))
    }else{
        res.status(401).json({message:'you are not authorized'})
    }
})


module.exports = router
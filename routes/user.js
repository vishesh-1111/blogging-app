const {Router}  = require('express');
const UserRouter = Router();
const {User} = require('../models/user');
const { createHmac} = require('node:crypto');
var jwt = require('jsonwebtoken');
UserRouter
.get('/signup',(req,res)=>{
    return res.render('signup');
})
.post('/signup',async(req,res)=>{
   const {name,email,password}=req.body; 
 const thisuser = await User.create({
    name : name,
    email : email,
    password :password,
  })
  return res.redirect('/');
})
   .get('/login',(req,res)=>{
    return res.render('login');
})
   .post('/login',async(req,res)=>{
     const {email , password} = req.body;
     const user = await User.findOne(
      {
        email : email,
      } 
    )

    if(!user){
      return res.render('login',{
        error : "Incorrect Email or Pasword" 
     });
    }
    const salt = user.salt;
    const name = user.name;
    const hash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
    if(hash===user.hash){
  
      const payload = user.toObject();
      var token = jwt.sign(payload, 'secret'); 
      return res.cookie('token',token).redirect('/');
    }

    else {
      return res.render('login',{
         error : "Incorrect Email or Pasword" 
      });
    }

   })
   .get('/logout',(req,res)=>{
    res.cookie('token','',{maxAge:1});
    return res.redirect('/');
})

module.exports = UserRouter


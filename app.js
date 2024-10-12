require('dotenv').config()
const express =require('express');
const app =express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {VerifyUser} = require('./middlewares/authentication')
const port =  process.env.PORT
const {blog} = require('./models/blog');
const UserRouter= require('./routes/user');
const {BlogRouter}= require('./routes/blog');
const CommentRouter = require('./routes/comment');
app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended :false}));
app.use(VerifyUser);

mongoose.connect(`${process.env.MONGO_URL1}`).then((res)=>{
    console.log('Mongodb connected !!');
});

app.use('/users',UserRouter);
app.use('/blog',BlogRouter);
app.use('/comment',CommentRouter);


app.get('/',async(req,res)=>{
     const allblogs=await blog.find({});

     return res.render('home',{
            user : req.user,
            blogs : allblogs,
        });   
});


app.listen(port,()=>{
    console.log(`Port running at ${port} .`);
})

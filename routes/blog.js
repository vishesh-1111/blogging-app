const express = require('express');
const BlogRouter = express.Router();
const {blog} = require('../models/blog');
const multer  = require('multer')
const path = require('path');
const { comment } = require('../models/comment');
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, path.resolve(`./public/uploads`))
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now();
     cb(null,  uniqueSuffix+file.originalname);
   }
})
const upload = multer({ storage :storage });

BlogRouter
.get('/add-new',async(req,res)=>{
     return  res.render('addblog');
  })

 .get('/:id',async(req,res)=>{
   const userblog =await blog.findById(req.params.id);
   const user = req.user;
   const allcomments = await comment.find(
    {createdfor : userblog._id}
   );
   req.blog = userblog;         
   res.render('blog',{
     ublog : userblog, 
     comments :allcomments,
     user : user,
   });
})
  
.post('/add-new',upload.single('coverimageUri'),async(req,res)=>{
  const{title,body}= req.body;
  if (!req.file) {
   return res.status(400).send('No file uploaded.');
}


  const thisblog=  await(blog.create({
       title,
       body,
       createdby : req.user._id,
       coverimageUri : `/uploads/${req.file.filename}`,
    }));
     
     res.redirect(`/blog/${thisblog._id}`);

});




module.exports={
   BlogRouter, 
}
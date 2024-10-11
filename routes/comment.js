const {Router}  = require('express');
const CommentRouter = Router();
const {comment} = require('../models/comment');

CommentRouter
.post('/',async(req,res)=>{
  const {userComment} = req.body;
  const {blogId}= req.body;
  const uid = req.user._id;

 const cmnt = await comment.create({
    body : userComment,
    createdby : uid,
    createdfor : blogId,
    name : req.user.name,
  })

  res.redirect(`/blog/${blogId}`);
});

module.exports = CommentRouter


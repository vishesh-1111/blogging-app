const mongoose =require('mongoose');

const commentSchema = new mongoose.Schema({

    body : {
        type : String,
        required : true
    },

    createdby : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'user',
         required : true
    },
   
    createdfor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blog',
        required : true
   },

   name : {
    type : String,
    required : true
   },
    
},{timestamps : true})


const comment=mongoose.model('comment',commentSchema);
module.exports={
    comment,
}
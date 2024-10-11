const mongoose =require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    body : {
        type : String,
        required : true
    },
    coverimageUri : {
        type : String,
        required : false
    },

    createdby : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'user',
         required : true
    }   
    
})


const blog=mongoose.model('blog',blogSchema);

module.exports={
    blog,
}
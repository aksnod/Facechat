const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

const Posts=mongoose.model('Posts',postSchema);
module.exports=Posts;
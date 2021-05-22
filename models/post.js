const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include arrays of ids of all cooment at itselfs.
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]

},{
    timestamps:true
})

const Posts=mongoose.model('Posts',postSchema);
module.exports=Posts;
const Post=require('../models/post');
const Comment=require('../models/comment')

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err)
        {
            console.log('Error in creating post');
            return;
        }
       return res.redirect('back');
    })
}
module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){

        //when two id need to compare than for converting to string, _id write id
        if(post.user==req.user.id){
            {
                post.remove();
                Comment.deleteMany({post:req.params.id},function(err){
                    return res.redirect('back')
                })
            }
        }
        else
        return res.redirect('back');
    })
}
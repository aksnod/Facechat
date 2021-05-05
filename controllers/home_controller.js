const { populate } = require('../models/post');
const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',25);
  

// Posts.find({},function(err,posts){
//     return res.render('home',{
//         title:"Codian | Home",
//         allPost:posts
//     });
// })
   
// }


//populate the user for further use
Post.find({}).populate('user').populate({
   path:'comments',
   populate:{
       path:'user'
   } 
})
.exec(function(err,posts){
    User.find({},function(err,users){
        return res.render('home',{
            title:"Codian | Home",
            posts:posts,
            allUsers:users
        });
    });
    
});
   
}

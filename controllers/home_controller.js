const { populate } = require('../models/post');
const Posts=require('../models/post');
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
Posts.find({}).populate('user').exec(function(err,posts){
    return res.render('home',{
        title:"Codian | Home",
        allPost:posts
    });
})
   
}

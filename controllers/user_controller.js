const { find } = require('../models/user');
const User=require('../models/user');
//render the user profile page
module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                res.render('user_profile',{
                    title:'Profile',
                    user:user
                });
            }else
            return res.redirect('/users/sign-in');
        });
    }else
    return res.redirect('/users/sign-in');
    
}

//render the sign in page
module.exports.signIn=function(req,res){
    res.render('user_sign_in',{
        title:'User | sign in'
    })
}
//render the sign up page
module.exports.signUp=function(req,res){
    res.render('user_sign_up',{
        title:'User | sign up'
    })
}

//get user signup data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password)
    return res.redirect('back');
    User.findOne({email: req.body.email},function(err,user){
        if(err){
        console.log('error in finding user in signin');
        return;}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in create user');
                    return;}
                    return res.redirect('/users/sign-in');
            })
        }
        else
        return res.redirect('back');
    });
}

//sig in and create a session
module.exports.createSession=function(req,res){
//find the user
User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('error in finding user in signin');
        return;} 
        //handle user find
    if(user){

        //handle password doesn't match
        if(user.password!=req.body.password)
        return redirect('back');
        //handle session creation
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile');
    }else
    {
        //handle user not find
        return res.redirect('back');
    }
})




}
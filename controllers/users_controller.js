const passport = require('passport');
const User=require('../models/user');
//render the user profile page
module.exports.profile=function(req,res){
    res.render('user_profile',{
        title:'Profile'
    });
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

//sign in and create a session
module.exports.createSession=function(req,res){
    return res.redirect('/');

}

//destroy session
module.exports.destroySession=function(req,res)
{
    req.logout();
    return res.redirect('/');
}

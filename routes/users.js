const express=require('express');
const router=express.Router();
const usersContoller=require('../controllers/users_controller');
const passport=require('passport');

router.get('/profile',passport.checkAuthentication, usersContoller.profile);

router.get('/sign-in',passport.notCheckAuthentication ,usersContoller.signIn);

router.get('/sign-up',passport.notCheckAuthentication,usersContoller.signUp);

router.post('/create', usersContoller.create);

//passport using middleware for authentication
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
)

,usersContoller.createSession);

router.get('/sign-out', usersContoller.destroySession);

module.exports=router;
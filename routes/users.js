const express=require('express');
const router=express.Router();
const usersContoller=require('../controllers/user_controller');

router.get('/profile', usersContoller.profile);

router.get('/sign-in',usersContoller.signIn);

router.get('/sign-up',usersContoller.signUp);

router.post('/create', usersContoller.create);

router.post('/create-session',usersContoller.createSession);

router.get('/log-out',usersContoller.logOut);



module.exports=router;
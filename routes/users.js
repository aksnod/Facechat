const express=require('express');
const router=express.Router();
const usersContoller=require('../controllers/user_controller');

router.get('/profile', usersContoller.profile);

router.get('/sign-in',usersContoller.signIn);

router.get('/sign-up',usersContoller.signUp);

router.post('/create', usersContoller.create);



module.exports=router;
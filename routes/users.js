const express=require('express');
const router=express.Router();
const usersContoller=require('../controllers/user_controller');

router.get('/profile', usersContoller.profile);



module.exports=router;
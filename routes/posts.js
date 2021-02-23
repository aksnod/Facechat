const express=require('express');
const router=express.Router();
postsController=require('../controllers/posts_controller');
const passport=require('passport')

router.post('/create',passport.checkAuthentication, postsController.create);


module.exports=router;
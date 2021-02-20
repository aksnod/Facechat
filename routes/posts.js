const express=require('express');
const router=express.Router();
postsController=require('../controllers/posts_controller');

router.post('/create', postsController.create);


module.exports=router;
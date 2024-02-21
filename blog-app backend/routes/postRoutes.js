const express=require('express');
const router=express.Router();
const loginController=require('../controllers/LoginController');
const postController=require('../controllers/postController');
router.route('/').get(loginController.checkValidity,postController.getPosts);
router.route('/create').post(loginController.checkValidity,postController.createPost);
router.route('/:id').get(loginController.checkValidity,postController.getPostsbyId).post(loginController.checkValidity,postController.likePost).put(loginController.checkValidity,loginController.checkOwnerShip,postController.updatePost).delete(loginController.checkValidity,loginController.checkOwnerShip,postController.deletePost);
module.exports=router;
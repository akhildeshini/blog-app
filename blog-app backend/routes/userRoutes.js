const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const loginController=require('../controllers/LoginController');
router.route('/').post(userController.createUser).get(loginController.checkValidity,userController.getUsers);
router.route('/:id').get(loginController.checkValidity,userController.findUser);
module.exports=router;
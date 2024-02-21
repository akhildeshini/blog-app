const express=require('express');
const loginController=require('../controllers/LoginController');
const router=express.Router();
router.route('/').get(loginController.checkValidity,loginController.infoprofile);
router.route('/login').post(loginController.login);
router.route('/signup').post(loginController.signup);
module.exports=router;
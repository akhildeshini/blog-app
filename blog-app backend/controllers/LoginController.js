const jwt=require('jsonwebtoken');
const {User,Posts}=require('../models');
const bcrypt=require('bcrypt');
const { promisify } = require('util');
const AppError = require('../utils/appError');
exports.infoprofile=(req,res,next)=>{
    return res.send('Your profile will be evalvated shortly');
}
const signToken=id=>{
    return jwt.sign({id},'blog app',{
        expiresIn:'60m'
    })
};
exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({
            where:{
                email
            }
        });
        if(!user)
        {
            return next(new AppError('No Username found in DB',404));
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
            return next(new AppError('Username or password is incorrect',401));
        }

            // Passwords match, create and send token
            const token = signToken(user);
            return res.json({ token });
        
    }
    catch(err){
        return next(err);
    }
       
}
exports.signup=async(req,res,next)=>{
    try{
            const {email,username,password}=req.body;
           const hashPassword= await bcrypt.hash(password, 10);
            const user=await User.create({email,password:hashPassword,username});
     
            if(!user)
            {
                return next(new AppError('User cannot be created',401));
            }
            const token=signToken(user);
            return res.status(200).json({token});

    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json(err);
    }
}
exports.checkValidity=async(req,res,next)=>{
    try{
            let token;
           
            if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer'))
            {
                return next(new AppError('You are not logged in! Please log in to get access.', 401));
            }
           
            token=req.headers.authorization.split(' ')[1];
           
            const verifyToken = await promisify(jwt.verify)(token, 'blog app');
            if(!verifyToken)
            {
                return next(new AppError('Token has expired please login again',401));
            }
            console.log('verify token',verifyToken);
            const user=await User.findOne({
                where:{
                    id:verifyToken.id.id
                }
            });
            if(!user)
            {
                return next(new AppError('User has been deleted please create new account',401));
            }
           
            req.user=user;
            next();
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}
exports.checkOwnerShip=async(req,res,next)=>{
    try{
        const user=req.user;
        const {id}=req.params;
       const post=await Posts.findOne({
        where:{
            id
        }
       });
       if(!post)
       {
        return next(new AppError('No post found',404));
       }
       if(post.userId!==user.id)
       {
        return next(new AppError('Forbidden - Unauthorized user for this post',403));
       }
       next();
    }
    catch(err)
    {
        return res.status(400).json(err);
    }
}
const { User, Posts, LikePost } = require('../models');


exports.createUser=async(req,res,next)=>{
    try{
        const {email,username,password}=req.body;
        console.log(email,username,password)
        const user=await User.create({email,password,username});
        return res.status(200).json(user);
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json(err);
    }
  
}

exports.getUsers=async(req,res)=>{
    try{
        const users=await User.findAll({
            include: [
                {
                    model: Posts,
                    as: 'Posts',
                },
                {
                    model: LikePost,
                    as: 'LikePosts',
                },
            ],
        });
        return res.status(200).json(users);
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json(err);
    }
}
exports.findUser=async(req,res)=>{
    try{
        const {id}=req.params;
    const user=await User.findOne({
    
        where:{
            id:id
        },
        include:['Posts']
    });
    return res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
    
}
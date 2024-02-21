const {Posts,LikePost}=require('../models');
const AppError = require('../utils/appError');
exports.createPost=async(req,res)=>{
    try{
        const userId=req.user.id;
            const {title,description,image}=req.body;
                const likes=req.body.likes?req.body.likes:0;
            const postData = {
                title,
                description,
                userId,
                likes,
                image
            };
            console.log(postData);
          const post=  await Posts.create(postData);
            return res.status(200).json(post);
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json(err);
    }
}
exports.getPostsbyId=async(req,res,next)=>{
    try{
            const userId=req.user.id;
            const {id}=req.params;
            const post=await Posts.findOne({
                where:{
                    id
                }
            })
            if(!post)
            return next(new AppError('Posts not found',404));

        return res.status(200).json(post);
    }
    catch(err)
    {
        return res.status(400).json(err);
    }
}
exports.getPosts=async(req,res,next)=>{
    try{
        const posts=await Posts.findAll();
        if(!posts)
        {
            return next(new AppError('There are no posts',404));
        }
        return res.status(200).json(posts);
    }
    catch(err)
        {
            return res.status(400).json(err);
        }
}
exports.likePost=async(req,res,next)=>{
    try{
            const {id}=req.params;
            const userId=req.user.id;
            const post=await Posts.findOne({
                where:{
                    id
                }
            })
            if(!post)
            {
                return next(new AppError('Post not found',404));
            }
            const likeposts=await LikePost.findOne({
                where:{
                    postId:id,
                    userId
                }
            });
       
           if(!likeposts)
           {
            post.likes=post.likes+1;
            await post.save();
            const newlikes=await LikePost.create({userId,postId:id});
    
            return res.json(post);
           }
           else{
            post.likes=post.likes-1;
            await post.save();
            const destroyedLikes=await likeposts.destroy();
    
            return res.json(post);
           }
    }
    catch(err)
    {
        return res.status(400).json(err);
    }
}
exports.updatePost=async(req,res,next)=>{
    try{
            const {id}=req.params;
            const {title,description,image}=req.body;
            const post=await Posts.findOne({
                where:{
                    id
                }
            });
            if(!post)
            {
                return next(new AppError('No Post found',404));
            }
                    
            
                post.title=title;

            
                post.description=description;
            
            if(image)
            {
                post.image=image;
            }
            await post.save();
            return res.json(post);
    }
    catch(err)
    {
            return res.status(400).json(err);
    }
}
exports.deletePost=async(req,res,next)=>{
    try{
        const {id}=req.params;
            const post=await Posts.findOne({
                where:{
                    id
                }
            });
            await post.destroy();
            return res.status(206).json({
                message:"successfully deleted post"
            })
    }
    catch(err)
    {
        return res.status(400).json(err);
    }
}
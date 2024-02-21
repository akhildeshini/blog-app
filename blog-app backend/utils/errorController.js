module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||'err';
    console.log('err is from global ',err, 'message ',err.message);
    if(err.isOperational)
    {
        return res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        });
    }
    else{
        console.log('err ',err);
        return res.status(500).json({
            status:'err',
            message:'Something went wrong'
        });
    }
  

};
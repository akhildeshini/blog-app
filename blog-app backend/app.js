const express=require('express');
const app=express();
const loginRouter=require('./routes/loginRoutes');
const {sequelize}=require('./models');
const userRouter=require('./routes/userRoutes');
const postRouter=require('./routes/postRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler=require('./utils/errorController');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.get('/jso',(req,res)=>{
    return res.json({
        hello:'world'
    })
})
app.get('/',(req,res)=>{
    return res.json({
        hi:'hi'
    });
});
app.get('/test-error', (req, res, next) => {
    next(new AppError('Test error', 500));
});

app.use((req,res,next)=>{
    console.log("middle wares are working");
    next();
})
app.use('/api/',loginRouter);
app.use('/users',userRouter);
app.use('/posts',postRouter);
app.all('*',(req,res,next)=>{
   next(new AppError(`cant find endpoint  ${req.originalUrl} on this server `,404));
})
app.use(globalErrorHandler);
app.listen(5000,async()=>{
    await sequelize.authenticate();
    console.log('server is running at port 5000');
})
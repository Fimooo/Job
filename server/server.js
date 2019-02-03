const express = require('express');
const userRouter = require('./user')

const app = express();

app.use('/user',userRouter)  //app.use()开启一个中间件  只要和user前缀相关的就会进入userroute进行处理
app.listen(9093,function(){
    console.log("node start at port 9093");
})
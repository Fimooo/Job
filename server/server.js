const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user.js')
const model = require('./model.js')
const Chat = model.getModel('chat')
//关联express和socket.io
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
    // console.log('user login')
    // io是全局的请求，socket是当前请求
    socket.on('sendmsg',function(data){
        //监听发送事件
        const {from, to, msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
            //Object.assign 类似 ...
        })
    })
})
//连通后的操作


app.use(cookieParser());
// 解析cookie
app.use(bodyParser.json());
// 解析post的json
app.use('/user',userRouter)  //app.use()开启一个中间件  只要和user前缀相关的就会进入userroute进行处理
server.listen(9093,function(){
    console.log("node start at port 9093");
})
const mongoose = require('mongoose');
//链接mongodb 并且使用job集合
const DB_URL = 'mongodb://localhost:27017/job'
mongoose.connect(DB_URL)

const models = {
    user:{
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        'type':{'type':String,'require':true},
        //头像
        'avatar':{'type':String},
        //个人简介
        'content':{'type':String},
        //目标职位
        'title':{'type':String},
        //boss字段
        'company':{'type':String},
        'money':{'type':String}
    },
    //聊天
    chat:{
        //聊天唯一标识
        'chatid':{'type':String,'require':true},
        //聊天双方
        'from':{'type':String,'require':true},
        'to':{'type':String,'require':true},
        //是否已读
        'read':{'type':Boolean,'default':false},
        //内容
        'content':{'type':String,'require':true},
        //时间
        'create_time':{'type':Number,'default':new Date().getTime()}
    }
}

for( let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name);
    }
}
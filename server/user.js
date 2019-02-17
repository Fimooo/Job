
const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const Chat = model.getModel('chat')
const User = model.getModel('user')

const _filter = {'pwd':0, '__v':0}



Router.get('/list',function(req,res){
    // User.remove({},function(req,res){})  //{}清除所有代码
    const { type } = req.query
    //POST,用body获取数据；GET用query来获取数据
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc});
    })
})

Router.get('/getmsglist',function(req,res){
    const user = req.cookies.userid
    User.find({ },function(e,userdoc){
        let users={}
        userdoc.forEach(v=>{
            users[v._id] = { name:v.user, avatar:v.avatar }
        })
        //用户id、头像等信息都返回给前端
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
    
})

Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return res.json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})

Router.post('/readmsg',function(req,res){
    const userid = req.cookies.userid
    const { from } =req.body
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        //默认修改第一个，如果修改全局，需设置multi
        function(err,doc){
            if(!err){
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:'修改失败'})
    })
})

Router.post('/login',function(req,res){
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误！'})
        }
        res.cookie('userid',doc._id);//设置cookie
        return res.json({code:0,data:doc})
    })
})

Router.post('/register',function(req,res){
    // console.log(req.body)
    const { user,pwd,type } = req.body
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }

        const userModel = new User({user,type,pwd:md5Pwd(pwd)})  
        //model是在用户id生成后去拿到的，creat()拿不到用户id
        userModel.save(function(err,doc){
            if(err){
                return res.json({code:1,msg:'后端出错了'})
            }
            const { user, type, _id } = doc
            res.cookie('userid',_id)
            return  res.json({code:0,data:{ user, type, _id }})
        })
    })
})
Router.get('/info',function(req,res){
    const {userid} = req.cookies   //取cookie
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function (err,doc) {
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

function md5Pwd(pwd){
    const salt = 'imooc_is_good_39557ds@#$~~dsdfFGDE34'
    return utils.md5(utils.md5(pwd+salt))
}
// md5可以反向解码，需要后台人工加上随机复杂字符串，以保证数据的安全性
module.exports = Router 
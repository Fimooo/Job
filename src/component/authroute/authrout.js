import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname;
        // pathname路由地址
        if( publicList.indexOf(pathname) > -1 ){
            return null
        }
        //获取用户信息
        axios.get('/user/info')
            .then(res=>{
                if(res.status == 200){
                    if(res.data.code == 0){
                        //有登陆信息的
                        this.props.loadData(res.data.data)  //传入用户登陆信息给redux的入口，沿用
                    }else{
                        this.props.history.push('/login')
                    }
                }
            })
        //是否登陆
        //现在的URL地址   login是不需要跳转的
        //用的type（boss\牛人）
        //用户是否完善信息（头像，个人简介）
    }
    render(){
        return null
    }
}
export default AuthRoute
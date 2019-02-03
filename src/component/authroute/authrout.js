import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
@withRouter
class AuthRoute extends React.Component{
    componentDidMount(){
        //获取用户信息
        axios.get('/user/info').
            then(res=>{
                if(res.status == 200){
                    if(res.data.code == 0){

                    }else{
                        console.log(this.props.history)
                    }
                    console.log(res.data)
                }
            })
        //是否登陆
        //现在的URL地址   login是不需要跳转的
        //用户的type（boss\牛人）
        //用户是否完善信息（头像，个人简介）
    }
    render(){
        return <p>判断跳转的地方</p>
    }
}
export default AuthRoute
import axios from 'axios'
import { getRedirectPath } from '../util'
const ERROR_MSG = 'ERROR_MSG'
const LOG_OUT = 'LOG_OUT'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

const initState={
    redirectTo:'',
    isAuth:'',
    msg:'',
    user:'',
    type:'',
}

//reducer
export function user(state=initState,action){
    switch(action.type){
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        case LOG_OUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state;
    }
}

function authSuccess(obj){
    const { pwd, ...data} = obj            //过滤pwd数据
    return {type:AUTH_SUCCESS, payload:data}
}

function errorMsg(msg){
    return { msg, type:ERROR_MSG }
}

export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if( res.status===200 && res.data.code ===0 ){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function loadData(userInfo){
    return { type:LOAD_DATA, payload:userInfo }  //传进用户登陆数据redux，可沿用
}

export function logoutSubmit(){
    return { type:LOG_OUT }
}

export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if( res.status == 200 && res.data.code === 0 ){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}

export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入')
    }
    if( pwd !== repeatpwd ){
        return errorMsg('密码和确认密码不同')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if( res.status == 200 && res.data.code == 0 ){
                    dispatch(authSuccess({user,pwd,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}



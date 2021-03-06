import React from 'react'
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import jobForm from '../../component/jobform/jobform.js'
@connect(
    state=>state.user,
    { login }
)
@jobForm
class Login extends React.Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }

    handleLogin(){
        this.props.login(this.props.state)
        //redux里的login
    }
    render(){
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!='/login' ?<Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem
                            onChange={ v => this.props.handleChange('user',v)}
                        >用户名</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type = 'password'
                            onChange = {v=> this.props.handleChange('pwd',v)}
                        >密码</InputItem>                        
                    </List>
                    <Button type='primary'
                        onClick = {this.handleLogin}
                    >登陆</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>                    
                </WingBlank>
            </div>
        )     
    }
}

export default Login
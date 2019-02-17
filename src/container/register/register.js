import React from 'react'
import Logo from '../../component/logo/logo.js'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { register } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../../index.css'
import jobForm from '../../component/jobform/jobform.js'

@connect(
    state=>state.user,
    {register}
)
@jobForm
class Register extends React.Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    conmponentDidMount(){
        this.props.handleChange('type','genius')
    }

    handleRegister(){
        this.props.register(this.props.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                <h2>注册页</h2>
                <List>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem
                        onChange={ v => this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={v=> this.props.handleChange('pwd',v)}
                    >密码</InputItem> 
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem 
                        checked={this.props.state.type ==='boss'}
                        onChange={v=>this.props.handleChange('type','boss')}
                    >Boss
                    </RadioItem>  
                    <WhiteSpace />     
                    <RadioItem 
                        checked={this.props.state.type ==='genius'}
                        onChange={v=>this.props.handleChange('type','genius')}
                    >牛人
                    </RadioItem> 
                    <WhiteSpace /> 
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>
        </div>
        )
    }
}

export default Register
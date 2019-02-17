import React from 'react'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import BrowserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux.js'
import { Redirect } from 'react-router-dom'
import '../../index.css'   
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(){
        const alert = Modal.alert
        alert('注销','确认退出登录吗？',[
            { text:'取消', onPress:()=> console.log('cancle') },
            { text:'确认', onPress:()=>{
                BrowserCookie.erase('userid')
               this.props.logoutSubmit()
            } }
        ])
    }

    render(){
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        let i = 0
        return props.user?(
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt="" />}
                    title={props.user}
                    message={props.type==='boss'?props.company:null}
                />
                <List renderHeader={()=>'简介'}>
                    <Item wrap='true' multipleLine='true'>
                        {props.title}
                        {this.props.content.split('\n').map(v=><Brief multipleLine wrap key={i++}>{v}</Brief>)}
                        {props.money?<Brief>{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>
                        退出登录
                    </Item>
                </List>
            </div>
        ):<Redirect to={props.redirectTo} />
    }
}

export default User
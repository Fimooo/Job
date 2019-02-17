import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
    return (<div>

        { redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark" >Genius Info</NavBar>
        <AvatarSelector
            selectAvatar = { (imgname)=>{
                this.setState({
                    avatar:imgname
                })
            } }
        ></AvatarSelector>
        <InputItem
            onChange={(v)=>this.onChange('title',v)}
        >招聘职位
        </InputItem>
        <TextareaItem
            rows={3}
            title='职位介绍'
            autoHeight
            onChange={(v)=>this.onChange('content',v)}
        >
        </TextareaItem>
        <Button 
            onClick={()=>{
                this.props.update(this.state)
            }}
            type='primary'
        >保存</Button>
    </div>)
    }
}

export default GeniusInfo
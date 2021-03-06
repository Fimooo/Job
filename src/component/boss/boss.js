import React from 'react'
import { getUserList } from '../../redux/chatuser.redux.js'
import { connect } from 'react-redux'
import UserCard from '../usercard/usercard.js'
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentDidMount(){
        this.props.getUserList('genius')
    }
    render(){
        return (
            <UserCard userlist={this.props.userlist}></UserCard>
        )
    }
}

export default Boss
import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
@withRouter
@connect(
    state=>state.chat
)
//获取与路由相关的信息
class NavLinkBar extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired
        // 校验数据是否为数组，并且必填
    } 


    render(){
        // console.log(this.props)
        const navList = this.props.data.filter(v=>!v.hide)
        const { pathname } = this.props.location  //获取路由信息
        //筛选了页面权限
        return (
            <TabBar tabBarPosition='top'>
                {navList.map(v=>(
                    <TabBar.Item
                        badge={v.path==='/msg'?this.props.unread:0}
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        //当前路径与导航路径一致，则选中
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                        //当前需要跳转的pathname放入history
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }

}

export default NavLinkBar
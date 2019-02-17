import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component{
    static propTypes = {
        selectAvatar:PropTypes.func.isRequired
        //类型校验，判断是否为函数，且必须
        // selectAvatar:PropTypes.func
        //类型校验，判断是否为函数
    }

    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(v=>({
                            icon:require(`../img/${v}.png`),
                            text:v
                        }))
    const gridHeader = this.state.text
                        ?(<div>
                            <span>已选择头像</span>
                            <img style={{width:20}} src={this.state.icon} />
                        </div>)
                        :'请选择头像'
    return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid 
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                         }}
                        data={avatarList} 
                        columnNum={5}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector
export function getRedirectPath({type,avatar}){
    //根据用户信息  返回跳转地址
    // user.type ->boss/genius
    // user.avatar -> bossinfo/geniusinfo
    let url = (type ==='boss')?'/boss':'/genius';
    if(!avatar){
        url += 'info';
    }
    return url
}

export function getChatId(userId,targetId){
    // console.log(userId)
    // console.log(targetId)    
    // console.log([userId,targetId].sort().join('_'))
    return [userId,targetId].sort().join('_')
}
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './container/login/login.js'
import Register from './container/register/register.js'
import Bossinfo from './container/bossinfo/bossinfo.js'
import Geniusinfo from './container/geniusinfo/geniusinfo.js'
import Dashboard from './component/Dashboard/Dashboard.js'
import Chat from './component/chat/chat.js'
import AuthRoute from './component/authroute/authrout.js'
import reducer from './reducer.js'
import './config'

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
        <div>
            <AuthRoute></AuthRoute>
            <Switch>
                <Route path='/geniusinfo' component={Geniusinfo}></Route>
                <Route path='/bossinfo' component={Bossinfo}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>            
                <Route path='/chat/:user' component={Chat}></Route>                            
                <Route component={Dashboard}></Route>  
            </Switch>
        </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)


// swith中Route命中一个path就直接渲染，不会加载dashboard，没有switch则dashboard将在全部页面中加载

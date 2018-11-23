import {HashRouter,BrowserRouter,Route,Switch,NavLink} from 'react-router-dom'
import React from 'react'
import Home from '$Containers/home'
import User from '$Containers/user'
import NotFound from '$Containers/notFound'

export default function(props) {
    return (
        <HashRouter>
            {/*HashRouter匹配的是#/后的url
            Switch是从上往下的匹配第一个*/}
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/user" component={User}/>
                <Route path="/" component={NotFound}/>
            </Switch>
        </HashRouter>)
}
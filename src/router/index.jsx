import {HashRouter,BrowserRouter,Route,Switch,NavLink} from 'react-router-dom'
import React from 'react'
import Home from '$Containers/home'
import ReducerTest from '$Containers/reducerTest'
import RouteComponentTest from '$Containers/routeComponentTest'
import NotFound from '$Containers/notFound'
import HocTest from '$Containers/Hoc'

export default function(props) {
    return (
        <HashRouter>
            {/*HashRouter匹配的是#/后的url
            Switch是从上往下的匹配第一个*/}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path='/home' component={Home} />
                <Route path="/reducerTest" component={ReducerTest} />
                <Route path="/routerComponentTest" component={RouteComponentTest} />
                <Route path="/hocTest" component={HocTest}/>
                <Route path="/" component={NotFound} />
            </Switch>
        </HashRouter>)
}
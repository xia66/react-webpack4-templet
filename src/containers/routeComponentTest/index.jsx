import React from 'react'
import {HashRouter,Route,Switch,NavLink} from 'react-router-dom'

export default class RouteComponentTest extends React.PureComponent{
    constructor(props,context){
        super(props,context);
    }

    render(){
        let activeStyle={color:'red'};
        return(
            <div id='user'>
                <nav className='nav navbar-default'>
                    <div className="container-fluid">
                        <a className="navbar-brand">路由管理</a>
                    </div>
                    <ul className="nav">
                        <li className='navbar-nav'><NavLink activeStyle={activeStyle} to="/routerComponentTest/1">路由1</NavLink></li>
                        <li className='navbar-nav'><NavLink activeStyle={activeStyle} to="/routerComponentTest/2">路由2</NavLink></li> {/*也可以设置activeClassName来设置样式*/}
                        <li className='navbar-nav'><NavLink activeStyle={activeStyle} to="/home">跳转home页面</NavLink></li>
                    </ul>
                </nav>
                <div>
                    {/*Switch是匹配*/}
                    {/*exact 我们匹配/斜杠时候，就匹配第一个*/}
                    {/*想要实现这种根据url后缀显示不同组件，父组件route一定不能加exact属性，不然会因为严格匹配导致页面为空*/}
                    <Switch>
                        <Route path="/routerComponentTest/1" component={test1}/>
                        <Route path="/routerComponentTest/2" component={test2}/>
                    </Switch>
                </div>
            </div>

        )
    }
}
class test1 extends React.PureComponent{
    constructor(props,context){
        super(props,context);
    }
    render(){
        return(
            <div>
                路由组件1
            </div>
        )
    }
}
class test2 extends React.PureComponent{
    constructor(props,context){
        super(props,context);
    }
    render(){
        return(
            <div>
                路由组件2
            </div>
        )
    }
}

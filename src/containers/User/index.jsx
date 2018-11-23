import React from 'react'
import {HashRouter,Route,Switch,NavLink} from 'react-router-dom'

export default class User extends React.PureComponent{
	constructor(props,context){
    	super(props,context);
    }

    render(){
        let activeStyle={color:'red'};
    	return(
    		<div id='user'>
    			user
                <nav className='nav navbar-default'>
                    <div className="container-fluid">
                        <a className="navbar-brand">用户管理</a>
                    </div>
                    <ul className="nav">
                        <li className='navbar-nav'><NavLink activeStyle={activeStyle} to="/user/1">test1</NavLink></li>
                        <li className='navbar-nav'><NavLink activeStyle={activeStyle} to="/user/2">test2</NavLink></li> {/*也可以设置activeClassName来设置样式*/}
                    </ul>
                </nav>
                <div>
                    {/*Switch是匹配*/}
                    {/*exact 我们匹配/斜杠时候，就匹配第一个*/}
                    {/*想要实现这种根据url后缀显示不同组件，父组件route一定不能加exact属性，不然会因为严格匹配导致页面为空*/}
                    <Switch>
                        <Route path="/user/1" component={test1}/>
                        <Route path="/user/2" component={test2}/>
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
                test1
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
                test2
            </div>
        )
    }
}

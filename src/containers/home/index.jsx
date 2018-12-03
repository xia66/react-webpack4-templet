import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Home(props) {
    const activeStyle={color:'red'};
    return(
        <div>
            <ul className="nav">
                <li className='navbar-nav'><NavLink activeStyle={activeStyle} to="/reducerTest">redux测试</NavLink></li>
                <li className='navbar-nav'><NavLink activeStyle={activeStyle} to="/routerComponentTest">router-dom4，路由组件测试</NavLink></li> {/*也可以设置activeClassName来设置样式*/}
                <li className="navbar-nav"><NavLink activeStyle={activeStyle} to="/hocTest">高阶组件测试</NavLink></li>
            </ul>
        </div>)
}
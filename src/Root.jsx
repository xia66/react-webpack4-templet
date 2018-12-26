//引入antd样式
//这里注意把antd的样式文件放最上面，这样才能修改antd的样式
//import 'antd/dist/antd.css';
//引入公共样式
import './style/common.css';    //因为我是在每个组件页面单独写样式，所以样式文件放上面，如果样式统一放在这个文件，则需要将样式放在最后引入，用于覆盖antd
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'; 
import {reducer} from './reducer/index.jsx'
import Routes from './router/index.jsx'
import 'whatwg-fetch';

let store=createStore(reducer);

class App extends React.Component{
    render(){
        //console.log($('<div></div>'));
        return (
            //注入store
            <Provider store={store}>
                <Routes/>
            </Provider>
        )
    }
}
ReactDOM.render((
    <App/>
), document.getElementById('root'));

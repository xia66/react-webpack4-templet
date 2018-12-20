//引入antd样式
//这里注意把antd的样式文件放最上面，这样才能修改antd的样式
//import 'antd/dist/antd.css';
//引入公共样式
import './style/common.css';
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

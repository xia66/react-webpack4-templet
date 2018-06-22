//引入antd样式
//这里注意把antd的样式文件放最上面，这样才能修改antd的样式
import 'antd/dist/antd.css'
//引入公共样式
import './static/common.css'
import React from 'react'
import { render } from 'react-dom' 
import { Provider } from 'react-redux'
import { Router, Route, hashHistory,IndexRoute,browserHistory} from 'react-router'
import RootApp from './containers/app.jsx'
import Home from './containers/home/index.jsx'
import { createStore } from 'redux'; 
import {reducer} from './reducer/index.js';
let store = createStore(reducer);


export default class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>  
				<Router history={browserHistory}>
					<Route path="/" component={RootApp}>
						<IndexRoute component={Home}/>
					</Route>
				</Router>
			</Provider>
		);
	};
}
render(<Root/>,document.getElementById('root'));

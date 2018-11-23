import React from 'react';
import './index.less'
import {Icon} from 'antd'
import {connect } from 'react-redux'

import * as Utils from './../../utils/utils.js'

class Home extends React.PureComponent{
	constructor(props,context){
    	super(props,context);
        this.state = {
            test: 1
        }
    }
    
    componentDidMount() {
        Utils.deepCopy();
    }

    setStatePro(obj, callBack) {
        const _this = this;
        return new Promise((resolve, reject) => {
            _this.setState(obj, () => {
                if(callBack){
                    callBack();
                }
                resolve();
            })
        })
    }
    render(){
    	return(
    		<div id='home'>
                <div className='word'>{this.props.match.url}</div>
                <img src={require('./../../static/images/check.png')} width="100" height="100"/>
                <br/>
                <div className='test'>
                    <div>{this.props.num}</div>
                    <button className='left' onClick={()=>{this.props.delete();}}>-</button>
                    <button className='right' onClick={()=>{this.props.add()}}>+</button>
                </div>
    		</div>
    	)
    }
}
function mapStateToProps(state){
    return {
        num:state.testState.num
    }
}
function mapDispatchToProps(dispatch){
    return{
        delete:(num)=>{dispatch({type:'delete',num:num})},
        add:(num)=>{dispatch({type:'add',num:num})}
    }
}
export default Home=connect(mapStateToProps,mapDispatchToProps)(Home);
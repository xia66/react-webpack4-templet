import React from 'react';
import './index.less'
import {Icon} from 'antd'
import {connect } from 'react-redux'

import * as Utils from './../../utils/utils.js'

class ReducerTest extends React.PureComponent{

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
                <div>{this.props.match.url}</div>
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
export default ReducerTest=connect(mapStateToProps,mapDispatchToProps)(ReducerTest);
import React from 'react'
import './index.less'
import {Icon} from 'antd'
import {connect } from 'react-redux'
class Home extends React.PureComponent{
	constructor(props,context){
    	super(props,context);
    }
    componentDidMount(){
        //测试es6 promise可以运行
        let pro=new Promise(function(resolve,reject){
            setTimeout(()=>{resolve('promise')},1000);
        })
        pro.then((data)=>{
            console.log(data)
        }).catch(function(err){
            console.log(err);
        })
        //测试es7的函数也可以正常运行
        function test(){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{resolve('async/await')},1000)
            })
        }
        (async ()=>{
            try{
                let data=await test();
                console.log(data);
            }catch(err){
                console.log(err);
            }
        })();
    }
    render(){
    	return(
    		<div id='home'>
                <div className='word'>{this.props.match.url}    {this.props.match.params.id}</div>
                <img src={require('./../../static/images/check.png')}/>
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
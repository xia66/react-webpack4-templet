export default function testState(state={num:0},action){
	switch(action.type){
		case 'add':
			return {num:action.num?state.num+action.num:state.num+1};
		case 'delete':
			return {num:action.num?state.num-action.num:state.num-1};
		default :
			return {num:0}
	}
}
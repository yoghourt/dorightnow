import { combineReducers } from 'redux'

import { LOGIN } from '../actions'


function account(state = {},action){
	switch (action.type){
		case LOGIN:
			return [
			...state,
			]
		default:
			return state 
	}
}

function projects(state = {},action){
	switch (action.type){
		case LOGIN:
			return [
			...state,
			]
		default:
			return state 
	}
}


const rootReducer = combineReducers({
	account
})


export default rootReducer;

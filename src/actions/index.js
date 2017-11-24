import fetch from 'isomorphic-fetch';

export  const LOGIN = 'lOGIN';

export function login(params){
	return { type: LOGIN,params}
}

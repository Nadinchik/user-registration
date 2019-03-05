import * as types from '../constants';
import axios from 'axios';

// erdux action for login
export function loginUser(data) {
	return dispatch=>{
		return new Promise((resolve,reject)=>{
			dispatch({type:types.LOGIN_USER_ATTEMPT})
			axios.post('api/login',data)
			.then(res=>{
				if(res.data.errors){
					dispatch({type:types.LOGIN_USER_FAIL,payload:res.data.errors})
					reject(res.data.errors)
				}else{
					localStorage.setItem('token',res.data.token)
					localStorage.setItem('name',res.data.name)
					dispatch({type:types.LOGIN_USER_SUCCESS,payload:res.data})
					resolve(res.data)
				}
			})
			.catch(e=>{
			dispatch({type:types.LOGIN_USER_FAIL,payload:e})
			reject(e)
			})
		})
	}
}

// redux action for register
export function submitUser(data) {
	return dispatch=>{
		return new Promise((resolve,reject)=>{
			dispatch({type:types.SUBMIT_USER_ATTEMPT})
			axios.post('api/register',data)
			.then(res=>{
				if(res.data.errors){
					dispatch({type:types.SUBMIT_USER_FAIL,payload:res.data.errors})
					reject(res.data.errors)
				}else{
				dispatch({type:types.SUBMIT_USER_SUCCESS,payload:res.data})
				resolve(res.data)
				}
			})
			.catch(e=>{
			dispatch({type:types.SUBMIT_USER_FAIL,payload:e})
			reject(e)
			})
		})
	}
}
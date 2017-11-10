import React from 'react';
import { browserHistory } from 'react-router';

import TopBar from '../Public/TopBar';
import { createForm } from 'rc-form';
import { List, InputItem, Button } from 'antd-mobile';

const Item = List.Item;

class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title : "登录"
		}
	}
	submit = () => {
		this.props.form.validateFields((error, value) => {
			fetch('/user/login',{
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(value),
			}).then(response => {
				return response.json() 
			}).then(data => {
				console.log(data);
				alert("登录成功");
				browserHistory.goBack();
			})
		});
	}
	render(){
		const { getFieldProps } = this.props.form;
		return(
			<div>
				<TopBar title={this.state.title}
				/>
				<form>
					<List>
						<InputItem
							{...getFieldProps('username')}
							placeholder="请输入用户名"
						>
						用户名
						</InputItem>
						<InputItem
							{...getFieldProps('password')}
							type="password"
							placeholder="请输入密码"
						>
						密码
						</InputItem>
						<Item>
							<Button type="primary" onClick={this.submit}>登录</Button>
						</Item>
					</List>
				</form>
			</div>
		)
	}
}

const Login = createForm()(LoginForm);

export default Login;
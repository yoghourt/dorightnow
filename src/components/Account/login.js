import React from 'react';
import { browserHistory , Link } from 'react-router';

import TopBar from '../Public/TopBar';
import { createForm } from 'rc-form';
import { Flex , List, InputItem, Button, Toast } from 'antd-mobile';

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
			if(!error){
				fetch('/user/login',{
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(value),
				}).then(response => {
					return response.json() 
				}).then(data => {
					
					if(data.status === 0){
						Toast.info("登录成功",1);
						this.setState({
							uid : data.uid
						})
						browserHistory.goBack();
					}
					
				})
			}else{
				
			}
		});
	}
	render(){
		const { getFieldProps , getFieldError } = this.props.form;
		return(
			<div>
				<TopBar title={this.state.title}
				/>
				<form>
					<List>
						<InputItem
							{...getFieldProps('username',{
								rules: [
									{ required: true, message: '请输入用户名'}
								],
							})}
							clear
							error={!!getFieldError('username')}
							onErrorClick={() => {
								Toast.info(getFieldError('username').join('、'),1);
							}}
							placeholder="请输入用户名"
						>
						用户名
						</InputItem>
						<InputItem
							{...getFieldProps('password',{
								rules: [
									{ required: true, message: '请输入密码' }
								]
							})}
							clear
							error={!!getFieldError('password')}
							onErrorClick={() => {
								Toast.info(getFieldError('password').join('、'),1);
							}}
							type="password"
							placeholder="请输入密码"
						>
						密码
						</InputItem>
						<Item>
							<Button type="primary" onClick={this.submit}>登录</Button>
						</Item>
						<Item>
							<Flex justify="around">
						    	<Link to="/account/regsiter">注册</Link>
						      	<Link to="/account/forgotPwd">忘记密码</Link>
						    </Flex>
						</Item>
					</List>
				</form>
				
			</div>
		)
	}
}

const Login = createForm()(LoginForm);

export default Login;
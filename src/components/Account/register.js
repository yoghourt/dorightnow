import React from 'react';
import { browserHistory , Link } from 'react-router';

import TopBar from '../Public/TopBar';
import { createForm } from 'rc-form';
import { List, InputItem, Button, Toast } from 'antd-mobile';

const Item = List.Item;

class registerForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title : "注册"
		}
	}
	submit = () => {
		this.props.form.validateFields({force: true},(error, value) => {
			if(!error){
				fetch('/user/reg',{
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(value),
				}).then(response => {
					return response.json() 
				}).then(data => {
					if(data.status === 0){
						Toast.info("注册成功",1);
					browserHistory.goBack();
					}else{
						Toast.info(data.errmsg,1);	
					}
				})
			}else{
				//alert('验证失败');
			}
		});
	}
	render(){
		const { getFieldProps, getFieldError } = this.props.form;
		return(
			<div>
				<TopBar title={this.state.title}
				/>
				<form>
					<List>
						<InputItem
							{...getFieldProps('username',{
								rules: [
									{ required: true, message: '请输入用户名' }
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
						<InputItem
							{...getFieldProps('repassword',{
								rules: [
									{}
								]
							})}
							type="password"
							placeholder="请再次输入密码"
						>
						确认密码
						</InputItem>
						<Item>
							<Button type="primary" onClick={this.submit}>注册</Button>
						</Item>
					</List>
				</form>
			</div>
		)
	}
}

const Register = createForm()(registerForm);

export default Register;
import React from 'react';

import { browserHistory } from 'react-router';

import { List, InputItem, ImagePicker , Switch, Button } from 'antd-mobile';

import TopBar from '../Public/TopBar';

import { createForm } from 'rc-form';

const Item = List.Item;

class ProjectCreateForm extends React.Component{
	constructor(props) {
		super(props);
		
		this.state ={
			title : "新建小计划",
			files : []
		}
	}
	onChange = (files, type, index) => {
		if(files.length === 1){
			this.uploadImage(files);	
		}
		console.log(files,type,index);
	}
	uploadImage = (files) => {
		let self = this;
		let formData = new FormData();
		formData.append('project-poster',files[0].file);
		fetch('/projects/uploadPoster',{
			method: 'POST',
			body: formData,
			redirect: "error",
			origin:"cors"
		})
		.then(response => {
			if(response.ok){
				response.json().then(data => {
					console.log(data);
					alert(2);
					data = JSON.parse(data);
				return	self.setState({
						files: [{
							id: '1',
							url: "/upload/" + data.posterImg.filename
						}]
					});
				})
			}else{
				alert('Network response was not ok.');
			}
		})
		.catch(function(error){
			console.log(error);
		  alert(3);
		})
		
	}
	submit = () => {
		this.props.form.validateFields((error, value) => {
			var poster = { posterImg : this.state.files[0].url};
			var params = Object.assign(value,poster);
			console.log(params);
			if(!error){
				fetch('/projects/create',{
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(params),
				}).then(response => {
					return response.json()
				}).then(data => {
					browserHistory.replace('/project/id/'+JSON.parse(data).id);
				})
			}
		})
	}
	render (){
		const { getFieldProps } = this.props.form;
		return(
			<div>
				<TopBar 
					title={this.state.title}
				/>
				<form>
					<List>
						<InputItem
						{...getFieldProps('projectname')}
						placeholder="你要干啥"
						>
							项目名称
						</InputItem>
						<ImagePicker
							files = {this.state.files}
							onChange={this.onChange}
							selectable={this.state.files.length < 1}
						/>
						<InputItem 
						{...getFieldProps('projectdes')}
						placeholder="那是什么呢">
							项目简介
						</InputItem>
						
						<Item
							extra={<Switch 
								{...getFieldProps('isPublic',{ 
									initialValue: true,
									valuePropName: 'checked'
								})} 
							/>}
						>是否公开
						</Item>
						<Item>
							<Button type="primary" onClick={this.submit}>提交</Button>
						</Item>
					</List>
				</form>
			</div>
		)
	}
}

const ProjectCreate = createForm()(ProjectCreateForm);

export default ProjectCreate;
import React from 'react';

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
		this.setState({
			files
		});
		console.log(files,type,index);
	}
	render (){
		const { getFieldProps } = this.props.form;
		const { files } = this.state;
		return(
			<div>
				<TopBar 
					title={this.state.title}
				/>
				<form>
					<List>
						<InputItem placeholder="你要干啥">
							项目名称
						</InputItem>
						<ImagePicker
							files = {files}
							onChange={this.onChange}
							selectable={files.length < 1}
						/>
						<InputItem placeholder="那是什么呢">
							项目简介
						</InputItem>
						<Item
							extra={<Switch 
								{...getFieldProps('1',{ 
									initialValue: true,
									valuePropName: 'checked'
								})} 
							/>}
						>是否公开
						</Item>
						<Item>
							<Button type="primary">提交</Button>
						</Item>
					</List>
				</form>
			</div>
		)
	}
}

const ProjectCreate = createForm()(ProjectCreateForm);

export default ProjectCreate;
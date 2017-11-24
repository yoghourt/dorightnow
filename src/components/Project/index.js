import React from 'react';
import { Steps , WhiteSpace } from 'antd-mobile';

import TopBar from '../Public/TopBar';

const Step = Steps.Step;

class Project extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id : this.props.params.id,
			project : {}
		}
	}
	
	componentDidMount(){
		fetch('/projects/detail',{
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({id : this.state.id}),
		}).then(response => {
			return response.json() 
		}).then(data => {
			this.setState({
				project : JSON.parse(data)
			})
		})
	}
	
	render (){
		let project = this.state.project;
		console.log(project);
		return(
			<div className="project">
				<TopBar title={project.projectname}
				/>
				<WhiteSpace />
				<Steps direction="horizontal" current={1}>
					<Step title="立项" />
					<Step title="执行" />
					<Step title="完成" />
				</Steps>
				<img src={project.posterImg} />
			</div>
		)
	}
}

export default Project;
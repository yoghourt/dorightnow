import React from 'react';
import { Steps , WhiteSpace } from 'antd-mobile';

const Step = Steps.Step;

class Project extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
	}
	render (){
		
		return(
			<div className="project">
				<WhiteSpace />
				<Steps direction="horizontal" current={1}>
					<Step title="立项" />
					<Step title="执行" />
					<Step title="完成" />
				</Steps>
			</div>
		)
	}
}

export default Project;
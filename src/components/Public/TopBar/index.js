import React from 'react';
import { browserHistory } from 'react-router';

import { NavBar , Icon } from 'antd-mobile';

class TopBar extends React.Component{
	
	render(){
		return(
			<NavBar 
				mode="dark"
				leftContent={<Icon type="left" />}
				onLeftClick={() => browserHistory.goBack()}
			>
			{this.props.title}
			</NavBar>
		)
	}
}

export default TopBar;
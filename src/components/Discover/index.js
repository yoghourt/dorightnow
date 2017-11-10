import React from 'react';

import Nav from '../Public/Nav';


class Discover extends React.Component{
	constructor(props) {
		super(props);
		
		this.state ={
			selectedTab : 'discoverTab',
		}
	}
	render (){
		return(
			<div>
				<div>Discover</div>
				<Nav selectedTab={this.state.selectedTab} />
			</div>
		)
	}
}

export default Discover;
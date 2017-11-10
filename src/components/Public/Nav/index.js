import React from 'react';
import { browserHistory } from 'react-router';

import { TabBar } from 'antd-mobile';

class Nav extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hidden: false,
			fullScreen: true,
		}
	}
	render(){
		const selectedTab = this.props.selectedTab;
		return (
			<div style={this.state.fullScreen ? { position:'fixed', height: 'auto', width: '100%', bottom: 0} : {height: 400 }}>
				<TabBar 
					unselectedTintColor="#949494"
					tintColor="#33A3F4"
					barTintColor="white"
					hidden={this.state.hidden}
				>
					<TabBar.Item
					title="首页"
					key="home"
					icon={<div style={{
						width: '22px',
						height: '22px',
						background: 'url(./img/home.png) center center /  21px 21px no-repeat'
					}}
					/>
					}
					selectedIcon={<div style={{
						width: '22px',
						height: '22px',
						background: 'url(./img/home_a.png) center center /  21px 21px no-repeat'
					}}
					/>
					}
					selected={selectedTab === 'homeTab'}
					onPress={() => {
							browserHistory.push('/');
						}	
					}
					>
					</TabBar.Item>
					
					<TabBar.Item
					title="发现"
					icon={<div style={{
						width: '22px',
						height: '22px',
						background: 'url(./img/discover.png) center center /  21px 21px no-repeat'
					}}
					/>
					}
					selectedIcon={<div style={{
						width: '22px',
						height: '22px',
						background: 'url(./img/discover_a.png) center center /  21px 21px no-repeat'
					}}
					/>
					}
					selected={selectedTab === 'discoverTab'}
					onPress={() => {
							browserHistory.push('/discover');
						}
					}
					>
					</TabBar.Item>
					
					<TabBar.Item
					title="我"
					icon={<div style={{
						width: '22px',
						height: '22px',
						background: 'url(./img/my.png) center center /  21px 21px no-repeat'
					}}
					/>
					}
					selectedIcon={<div style={{
						width: '22px',
						height: '22px',
						background: 'url(./img/my_a.png) center center /  21px 21px no-repeat'
					}}
					/>
					}
					selected={selectedTab === 'myTab'}
					onPress={() => {
							browserHistory.push('/my');
						}
					}
					>
					</TabBar.Item>
				</TabBar>
			</div>
		)
	}
}

export default Nav;
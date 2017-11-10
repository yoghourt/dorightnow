import React from 'react';
import { List , Card , WhiteSpace , Button } from 'antd-mobile';

import { browserHistory, Link } from 'react-router';

import Nav from '../Public/Nav';

const Item =List.Item;

class My extends React.Component{
	constructor(props) {
		super(props);
		
		this.state ={
			selectedTab : 'myTab',
		}
	}
	
	render (){
		return(
			<div>
				<WhiteSpace size="lg" />
				<Card full>
					<Card.Header
						title="陈bro"
						thumb={<img style={{width: "72px", height: "72px",borderRadius: "100%"}} src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1755039712,1084909715&fm=27&gp=0.jpg" alt='' />}
					/>
					<Card.Footer
						content={<Link to="/account/login">登录注册</Link>}
					/>
				</Card>
				<List>
					<Item 
						arrow="horizontal"
						onClick={() =>{
							browserHistory.push('/project/create');
							}
						}
					>
					新建项目
					</Item>
				</List>
				<Nav selectedTab={this.state.selectedTab} />
			</div>
		)
	}
}

export default My;
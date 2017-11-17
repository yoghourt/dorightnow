import React from 'react';
import {Link} from 'react-router';
import { ListView, Card , WhiteSpace } from 'antd-mobile';
import Nav from '../Public/Nav';

//const data = [
//	{
//		id: 1,
//		Author: {
//			name: '陈bro',
//			thumb: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1755039712,1084909715&fm=27&gp=0.jpg'
//		},
//		title: 'b-box十天速成',
//		des: '目标：掌握b-ox四大基本手法',
//		postImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510049724509&di=53e90a5adf99a2eeee726c6c3fcdc985&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fsoft%2Fimages%2F2013%2F0823%2F20130823110140187.jpg',
//		state: 1
//	},
//	{
//		id: 2,
//		Author: {
//			name: '郝sis',
//			thumb: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4250696313,681315509&fm=27&gp=0.jpg'
//		},
//		title: '瑜伽三十天自修',
//		des: '修身养性：30天闭关修炼',
//		postImg: 'https://f12.baidu.com/it/u=13379516,1183273943&fm=72',
//		state: 0
//	}
//]
const NUM_ROWS = 20;
let pageIndex = 0;

class Home extends React.Component{
	constructor(props) {
		super(props);
				
		const dataSource =  new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		})
		
		this.state ={
			selectedTab : 'homeTab',
			dataSource ,
			isLoading: true,
			data: []
		}
	}
	
	componentDidMount() {
		
		
		fetch('/projects/list',{
			method: 'GET'
		}).then(response => {
			return response.json();
		}).then(data => {
			let rData = JSON.parse(data);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(rData),
				isLoading: false,
				data: rData
			});
		})
		
//		setTimeout(() => {
//			this.rData = data;
//			this.setState({
//				dataSource: this.state.dataSource.cloneWithRows(this.rData),
//				isLoading: false,
//			});
//		},600);
	}
	
	render (){
		let data = this.state.data;
		let index = data.length - 1;
		const row = (rowData, sectionID, rowID) => {
			if(index < 0){
				index = data.length - 1;
			}
			const obj = data[index--];
			return (
				<div key={rowID}>
					<WhiteSpace size="lg" />
						<Card full>
							<Card.Header
//								title={obj.Author.name}
//								thumb={<img style={{width: "36px", height: "36px",borderRadius: "100%"}} src={obj.Author.thumb}/>}
								extra={<Link to={`/project/id/${obj.idprojects}`} >{obj.projectname}</Link>}
							/>
							<Card.Body style={{padding: '0 0 6px'}}>
								<img style={{display : 'block',width : '100%'}} className="corner-badge" src={obj.postImg}/>
							</Card.Body>
							<Card.Footer 
								content={obj.projectdes}
								extra={'123'}
							/>
						</Card>
				</div>
			)
		}
		
		
		return(
			<div>
				<ListView
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderRow = {row}
					useBodyScroll
				/>
				<Nav selectedTab={this.state.selectedTab}/>
			</div>
		);
	}
}

export default Home;
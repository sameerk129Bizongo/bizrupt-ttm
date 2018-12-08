import React from 'react'
import { Line } from '@nivo/line'
import SellerData from "./data/SellerData";
import {Button, Checkbox, ButtonToolbar} from "react-bootstrap";
import './App.css';

const colors = ['#fae04d', '#ff744c', '#789792', '#b1646a', '#efa9a1', '#8470c7', '#97a66f'];

class GraphView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			filterToggles: {
				sellingCost: false,
				grossIncome: false,
				eod: false,
			}
		};
	}
	toggleFilter = (id, event) => {
		this.setState(prevState => {
			return {
				filterToggles: {
					...prevState.filterToggles,
				[id]: !prevState.filterToggles[id],
				}
			}
		});
	};
	applyFilter = () => {
		Object.keys(this.state.filterToggles).map(filter => {
			if(this.state.filterToggles[filter]){
				console.log('segse');
			} else {
				console.log(undefined);
			}
		});
	};

	render() {
		return (
			<div className={'filter-details'}>
				<h3 style={{fontSize:22, color:'#3E4977',marginTop:30,marginLeft:14}}>Selling - West </h3>
				<div className="graph-card">
				<Line
					width={360}
					height={400}
					margin={{
						top: 20,
						right: 20,
						bottom: 60,
						left: 80
					}}
					data={[
						{id: 'Minimum',color: 'hsl(356, 70%, 50%)',data: [
							{color: 'hsl(191, 70%, 50%)',x: 'HR',y: 20},
							{color: 'hsl(236, 70%, 50%)',x: 'SR',y: 20},
						]},
						{id: 'Average',color: 'hsl(230, 70%, 50%)',data: [
							{color: 'hsl(278, 70%, 50%)',x: 'HR',y: 47},
							{color: 'hsl(333, 70%, 50%)',x: 'SR',y: 47},
							]},
						{id: 'Maximum',color: 'hsl(342, 70%, 50%)',data: [
							{color: 'hsl(242, 70%, 50%)',x: 'HR',y: 8},
							{color: 'hsl(226, 70%, 50%)',x: 'SR',y: 8},
							]},
						]}
					legends={[
						{
							"anchor": "bottom-right",
							"direction": "column",
							"translateX": 100,
							"itemWidth": 80,
							"itemHeight": 20,
							"itemTextColor": "#999",
							"symbolSize": 12,
							"symbolShape": "circle",
							"effects": [
								{
									"on": "hover",
									"style": {
										"itemTextColor": "#000"
									}
								}
							]
						}
					]}
					animate
				/>
					<Line
						width={400}
						height={400}
						margin={{
							top: 20,
							right: 20,
							bottom: 60,
							left: 80
						}}
						data={[{id: 'Maximum ',data: [
								{x: 1.5,y: 0.7},
								{x: 2,y: 0.9},
								{x: 2.5,y: 0.8},
							]},{id: 'Average',data: [
						{x: 1.5,y: 0},
						{x: 2,y: -0.3},
						{x: 2.5,y: -0.5},
							]},{id:'Minimum',data:[{x:1.5,y:0.6},{x:2,y:0.4},{x:2.5,y:0.2}]}]}
						animate
						curve="monotoneX"
						enableDotLabel
						dotSize={14}
						dotBorderWidth={1}
						dotBorderColor="inherit:darker(0.3)"
						dotLabelYOffset={-20}
						enableGridX={false}
						colors={['rgb(97, 205, 187)','rgb(244, 117,96)','rgb(244, 227, 196)']}
						xScale={{type: 'linear'}}
						yScale={{
							type: 'linear',
							stacked: false,
							min: -1,
							max: 1
						}}
						enableArea
						areaOpacity={0.07}
					/>
				</div>
				<h3 style={{fontSize:22, color:'#3E4977',marginTop:30,marginLeft:14}}>Order To Delivery - West </h3>
				<div className="graph-card">
					<Line
						width={500}
						height={400}
						margin={{
							top: 20,
							right: 20,
							bottom: 60,
							left: 80
						}}
						data={[{id: 'Order to ProcurementA',data: [
								{x: '2018-01-01',y: 1},
								{x: '2018-01-02',y: 2},
								{x: '2018-01-03',y: 3},
							]},
							{id: 'Raw Material to Production',data: [
						{x: '2018-01-03',y: 3},
						{x: '2018-01-03',y: 3},
						{x: '2018-01-03',y: 3},
							]},
							{id: 'Production Start to Dispatch',data: [
									{x: '2018-01-03',y: 3},
									{x: '2018-01-05',y: 5},
									{x: '2018-01-06',y: 6},
								]}
							]}
						animate
						xScale={{type: 'time',format: '%Y-%m-%d',precision: 'day'}}
						yScale={{type: 'linear',stacked: false}}
						axisBottom={{format: '%b %d'}}
						curve="step"
						enableDotLabel
						dotSize={16}
						colors={['rgb(97, 205, 187)','rgb(244, 117,96)','rgb(244, 227,' +
						' 196)','rgb(97,244,81)']}
						dotBorderWidth={1}
						dotBorderColor="inherit:darker(0.3)"
					/>
					<Line
						width={400}
						height={400}
						margin={{
							top: 20,
							right: 20,
							bottom: 60,
							left: 80
						}}
						data={[{id: 'positive :)',data: [
								{x: 0,y: 0.7},
								{x: 1,y: 0.9},
								{x: 2,y: 0.8},
							]},{id: 'Delay :(',data: [
								{x: 5,y: 0},
								{x: 6,y: -0.3},
								{x: 7,y: -0.5},
							]},{id:'on Time',data:[{x:3,y:0.6},{x:4,y:0.4},{x:4.7,y:0.2}]}]}
						animate
						curve="monotoneX"
						enableDotLabel
						dotSize={14}
						dotBorderWidth={1}
						dotBorderColor="inherit:darker(0.3)"
						dotLabelYOffset={-20}
						enableGridX={false}
						colors={['rgb(97, 205, 187)','rgb(244, 117,96)','rgb(244, 227, 196)']}
						xScale={{type: 'linear'}}
						yScale={{
							type: 'linear',
							stacked: false,
							min: -1,
							max: 1
						}}
						enableArea
						areaOpacity={0.07}
					/>
				</div>
			</div>
		);
	}
}

export default GraphView;

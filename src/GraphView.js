import React from 'react'
import { Line } from '@nivo/line'
import SellerData from "./data/SellerData";
import {Button, Checkbox, ButtonToolbar} from "react-bootstrap";

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
				<div className={'filter-controls'}>
					<Checkbox onChange={(event) => this.toggleFilter('sellingCost', event)} checked={this.state.filterToggles['sellingCost']}>
						Selling cost
					</Checkbox>
					<Checkbox onChange={(event) => this.toggleFilter('grossIncome', event)} checked={this.state.filterToggles['grossIncome']}>
						gross income
					</Checkbox>
					<Checkbox onChange={(event) => this.toggleFilter('eod', event)} checked={this.state.filterToggles['eod']}>
						eod
					</Checkbox>
					<Button bsStyle={'primary'} onClick={() => this.applyFilter()}>
						Apply
					</Button>
				</div>
				<div>
					<div style={{}}>
						<div>
							Quadrent 1
						</div>
						<div>
							Quadrent 2
						</div>
						<div>
							Quadrent 3
						</div>
						<div>
							Quadrent 4
						</div>
					</div>
				<Line
					width={900}
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
					animate
				/>
				</div>
			</div>
		);
	}
}

export default GraphView;

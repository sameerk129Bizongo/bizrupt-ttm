import React, {Component} from 'react';
import Checkbox from "react-bootstrap/es/Checkbox";
import moment from 'moment';
import './App.css';
import { Radio } from 'react-bootstrap';
import GraphView from "./GraphView";

const RegionalWiseSellingCost = ({data, region}) => {
	if(data){
		return (
			<React.Fragment>
				<h4>{region} Region</h4>
				<p><span className="inc-dec">1.2% </span>increase</p>
				<p><strong>Minimum: </strong><span>{data['min']}</span></p>
				<p><strong>Average: </strong><span>{data['avg']}</span></p>
				<p><strong>Maximum: </strong><span>{data['max']}</span></p>
			</React.Fragment>
		)
	} else {
		return null
	}
};

const OrderToDeliveryReport = ({data, region}) => {
	console.log('OrderToDeliveryReport', data, 'region', region);
	if(Object.keys(data).length > 0){
		console.log('inside');
			return (
				<div>
			<h3 style={{fontSize:22, color:'#3E4977',marginTop:30,marginLeft:14}}>Order To Delivery - {region} </h3>
					<div style={{display:'flex', width:'100%', overflowX: 'auto', justifyContent: 'space-around'}}>
				{
					Object.keys(data).map(i => {
						console.log('data[i]', data[i]);
						return (

							<div className="each-card">
								<div className="small-card-container">
									<div className="small-card">
										<div style={{borderBottom:'1px solid #EEEEEE'}}>
											<p style={{fontSize:13}}><strong>{moment(data[i]['order_created_at']).format('LL')}</strong></p>
										</div>
										<p><strong>O2RM: </strong><span>{data[i]['order_to_raw_material_procurement']}</span>
										</p>
										<p><strong>RM2PS: </strong><span>{data[i]['raw_material_procurement_to_production_start']}</span>
										</p>
										<p><strong>PS2D: </strong><span>{data[i]['production_start_to_dispatch']}</span>
										</p>
										<p><strong>D2D: </strong><span>{data[i]['dispatch_to_delivery']}</span></p>
									</div>
								</div>
							</div>
						);
					})
				}
					</div>
			</div>
			)
	} else {
		return null
	}
};

const OrderToSupplierReport = ({data, region}) => {
	console.log('OrderToDeliveryReport', data, 'region', region);
	if(Object.keys(data).length > 0){
		console.log('inside');
		return (
			<div>
				<h3 style={{fontSize:22, color:'#3E4977',marginTop:30,marginLeft:14}}>Order, Supplier - {region} </h3>
				<div style={{display:'flex', width:'100%', overflowX: 'auto', boxShadow:'none', border:'none'}}>
					{
						Object.keys(data).map(i => {
							console.log('data[i]', data[i]);
							return (
								<div className="each-card">
									<div className="small-card-container">
										<div className="small-card">
											<p><strong>Quantity: </strong><span>{data[i]['quantity']}</span>
											</p>
											<p><strong>Buyer: </strong><span>{data[i]['buyer_name']}</span>
											</p>
											<p><strong>Seller: </strong><span>{data[i]['seller_name']}</span></p>
										</div>
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		)
	} else {
		return null
	}
};

class ResultContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			graphMode: false
		}
	}
	getRegionalData = (data, region) => data.filter(x => x.region === region);

	getSellingCostReport = (data, region) => {
		console.log('data', data);
		let filteredData = this.getRegionalData(data, region);
		if(filteredData.length > 0){
			let x = filteredData.reduce((res, curr, index) => {
				let result = {...res};
				// console.log('round', index, 'res', res, 'curr', curr);
				if (curr.selling_price_per_unit < res.min){
					result['min'] = curr.selling_price_per_unit
				}
				result.avg = (( parseInt(res.avg,10) + parseInt(curr.selling_price_per_unit, 10)));
				if (curr.selling_price_per_unit > res.max){
					result['max'] = curr.selling_price_per_unit
				}
				console.log('result', result);
				return result;
			},{min:100000,avg:0,max:0});
			x['avg'] = x['avg']/data.length;
			return x;
		}
	};

	getOrderToDeliveryReport = (data, region) => {
		let filteredData = this.getRegionalData(data, region);
		let orders = {};
		if(filteredData.length > 0) {
			console.log('filtered data', filteredData);
			orders = filteredData.reduce((res, curr, index) => {
				res = {
					...res,
					[index]: {
						order_created_at: curr.creation_date,
						order_to_raw_material_procurement: curr.order_to_raw_material_procurement,
						raw_material_procurement_to_production_start: curr.raw_material_procurement_to_production_start,
						production_start_to_dispatch: curr.production_start_to_dispatch,
						dispatch_to_delivery: curr.dispatch_to_delivery
					}
				};
				return res;
			}, {});
		}
		console.log('orders', orders);
		return orders;
	};

	getOrderSupplierReport (data, region) {
		let filteredData = this.getRegionalData(data, region);
		let orders = {};
		if(filteredData.length > 0) {
			console.log('filtered data', filteredData);
			orders = filteredData.reduce((res, curr, index) => {
				res = {
					...res,
					[index]: {
						quantity: curr.order_amount,
						buyer_name: curr.buyer_company[0],
						seller_name: curr.seller_company,
						order_name: curr.name,
					}
				};
				return res;
			}, {});
		}
		console.log('orders', orders);
		return orders;
	}
	isAtleastOneFilterApplied = () => {
		return Object.keys(this.props.filters).reduce((res, curr) => (res || this.props.filters[curr]),false)
	};
	setGraphMode = isGraphMode => {
		this.setState({
			graphMode: isGraphMode
		});
	};
	render() {
		console.log('Result container',this.props);
		const { toggleFilter, filters } = this.props;
		return (
				<div className="right-container">
					<h2>Report</h2>

					<div className="right-filter">
						<div className="dropdown">
							<div className="dropdown-text">Last 30 days</div>
							<div className="dropdown-arrow"><img src="img/dropdown.svg"/>
							</div>
						</div>
						<div className="dropdown">
							<div className="dropdown-text">PAN India</div>
							<div className="dropdown-arrow"><img src="img/dropdown.svg"/>
							</div>
						</div>
					</div>
					<div className="checkbox-container">
						<Radio onChange={() => this.setGraphMode(false)} checked={!this.state.graphMode}>
							<span className="checkbox-text">Information</span>
						</Radio>
						<Radio onChange={() => this.setGraphMode(true)} checked={this.state.graphMode}>
							<span className="checkbox-text">Graph</span>
						</Radio>
					</div>
					<div className="checkbox-container">
						<Checkbox type="checkbox" name="overview" value="overview"
						          onChange={ () => toggleFilter('overview')}
						          checked={filters['overview']}>
							<span className="checkbox-text">Overview</span>
						</Checkbox>
						<Checkbox type="checkbox" name="selling_cost"
						          onChange={ () => toggleFilter('sellingCost')}
						          checked={filters['sellingCost']}
						       value="Selling Cost"><span className="checkbox-text">Selling Cost</span></Checkbox>
						{/*<Checkbox type="checkbox" name="gross_margin"*/}
						       {/*value="Gross Margin"><span className="checkbox-text">Gross Margin</span></Checkbox>*/}
						{/*<Checkbox type="checkbox" name="lead_time" value="Lead Time"><span*/}
							{/*className="checkbox-text">Lead Time</span></Checkbox>*/}
						<Checkbox type="checkbox" name="order_to_delivery"
						       value="Order To Delivery"
						          onChange={ () => toggleFilter('orderToDelivery')}
						          checked={filters['orderToDelivery']}
						><span className="checkbox-text">Order To Delivery(Lead Time)</span></Checkbox>
						<Checkbox type="checkbox" name="order" value="Order"
						          onChange={ () => toggleFilter('orderSupplier')}
						          checked={filters['orderSupplier']}
						><span
							className="checkbox-text">Order and Supplier</span></Checkbox>
						{/*<Checkbox type="checkbox" name="supplier" value="Supplier"><span*/}
							{/*className="checkbox-text">Supplier</span></Checkbox>*/}
					</div>
					{!this.state.graphMode ? <div>
							{
								this.isAtleastOneFilterApplied() ? <div>

										{
											(filters['overview'] || filters['sellingCost']) && (
												<div className="each-card">
													<h3>Selling Cost</h3>
													<div className="small-card-container">
														{
															this.props.regions.map(region => {
																return (
																	<div className="small-card">
																		<RegionalWiseSellingCost
																			data={this.getSellingCostReport(this.props.data, region)}
																			region={region}/>
																	</div>
																)
															})
														}
													</div>
												</div>
											)
										}
										{
											(filters['overview'] || filters['orderToDelivery']) && (this.props.regions.map(region => {
													return (
														<React.Fragment>
															<OrderToDeliveryReport
																data={this.getOrderToDeliveryReport(this.props.data, region)}
																region={region}/>
														</React.Fragment>
													)
												})
											)
										}
										{
											(filters['overview'] || filters['orderSupplier']) && (this.props.regions.map(region => {
													return (
														<React.Fragment>
															<OrderToSupplierReport
																data={this.getOrderSupplierReport(this.props.data, region)}
																region={region}/>
														</React.Fragment>
													)
												})
											)
										}
									</div> :
									<div className={'no-filter-wrapper'}>
										<p className={'filter-error'}>Apply atleast one filter</p>
									</div>
							}
						</div> :
						<GraphView/>
					}
				</div>
		);
	}
}

export default ResultContainer;
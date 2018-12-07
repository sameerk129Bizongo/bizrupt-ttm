import React from 'react'
import { Stream } from '@nivo/stream'
import SellerData from "./data/SellerData";
import {Button, ButtonToolbar} from "react-bootstrap";

const colors = ['#fae04d', '#ff744c', '#789792', '#b1646a', '#efa9a1', '#8470c7', '#97a66f'];

const x = () => {
	return (
		<div>
			<ButtonToolbar>
				{/* Standard button */}
				<Button>Default</Button>

				{/* Provides extra visual weight and identifies the primary action in a set of buttons */}
				<Button bsStyle="primary">Primary</Button>

				{/* Indicates a successful or positive action */}
				<Button bsStyle="success">Success</Button>

				{/* Contextual button for informational alert messages */}
				<Button bsStyle="info">Info</Button>

				{/* Indicates caution should be taken with this action */}
				<Button bsStyle="warning">Warning</Button>

				{/* Indicates a dangerous or potentially negative action */}
				<Button bsStyle="danger">Danger</Button>

				{/* Deemphasize a button by making it look like a link while maintaining button behavior */}
				<Button bsStyle="link">Link</Button>
			</ButtonToolbar>
			<Stream
				width={900}
				height={360}
				margin={{
					top: 60,
					right: 80,
					bottom: 60,
					left: 80
				}}
				keys={[
					'Minimum',
					'Average',
					'Maximum',
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
				data={SellerData}
				animate
			/>
		</div>
	);
};

export default x;
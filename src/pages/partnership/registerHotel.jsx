import Head from 'next/head';
import React, { Component } from 'react';

import HotelForm from '../../components/HotelForm';

export default class register extends Component {
	render() {
		return (
			<div>
				<Head>
					<title>
						Register Hotel - Partnership | Shuttlelane.com
					</title>
					<meta
						name='viewport'
						content='initial-scale=1.0, width=device-width'
					/>
				</Head>
				<HotelForm />
			</div>
		);
	}
}

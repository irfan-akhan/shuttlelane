import Head from 'next/head';
import React, { Component } from 'react';

import Form from '../../components/FleetManagement';

export default class register extends Component {
	render() {
		return (
			<div>
				<Head>
					<title>
						Register Fleet - Partnership | Shuttlelane.com
					</title>
					<meta
						name='viewport'
						content='initial-scale=1.0, width=device-width'
					/>
				</Head>
				<Form />
			</div>
		);
	}
}

import React from 'react';
import { Grid } from '@material-ui/core';
const Message = () => {
	return (
		<Grid
			container
			justifyContent='center'
			style={{ marginTop: '10vh', height: '60vh' }}
		>
			<Grid item xl={10} sm={8} md={10} xl={6}>
				<p style={{ textAlign: 'center', fontSize: '1.4rem' }}>
					<strong
						style={{ marginBottom: '2rem' }}
					>{`We’ve got something Special for you. And we can’t wait for
					you to see it. Please check back soon.`}</strong>{' '}
					<br /> For booking Please contact us Via
					<br />
					<br />
					Phone:&nbsp;
					<a style={{ color: 'blue' }} href='tel:+234 903 000 9108'>
						+234 903 000 9108
					</a>
					<br /> Instagram &nbsp;
					<a
						style={{ color: 'blue' }}
						href='https://www.instagram.com/shuttlelane/?hl=en'
					>
						@shuttlelane
					</a>
					<br /> Email:&nbsp;
					<a
						style={{ color: 'blue' }}
						href='mailto:booking@shuttlelane.com'
					>
						booking@shuttlelane.com
					</a>
				</p>
			</Grid>
		</Grid>
	);
};

export default Message;

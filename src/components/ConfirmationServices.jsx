import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import styles from '../styles/services.module.css';

const ConfirmationServices = ({ name }) => {
	return (
		<section>
			<Grid
				container
				spacing={2}
				style={{
					margin: '5rem auto',
				}}
				className={styles.main}
			>
				<Grid
					item
					xs={12}
					sm={8}
					md={6}
					xl={4}
					style={{ textAlign: 'center', margin: '0 auto' }}
				>
					<img
						src='/assets/images/logo.png'
						alt='logo'
						style={{ width: '150px' }}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
					md={6}
					xl={4}
					className={styles.header}
				>
					<div className='Header'>Registration Confirmation.</div>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
					md={6}
					xl={4}
					container
					style={{ border: '1px solid #ccc' }}
				>
					<Typography variant='paragraph' className={styles.message}>
						{`Thank You for your interest in${name[1]}  with Shuttlelane.`}
						<br />
						{name &&
							name.includes('hotel') &&
							`We'll now check the availibility of your preferred Hotel
						and we will get back to you as soon as possible.`}
					</Typography>
					<br />
					<Typography variant='paragraph' className={styles.message}>
						Your Booking Reference is &nbsp;
						<span
							style={{
								textDecoration: 'underline',
								color: '#0393be',
							}}
						>
							A1B65tr
						</span>{' '}
						.
					</Typography>
					<Typography variant='paragraph' className={styles.message}>
						Need assistance? You can reach us on
						<strong>
							+2349030009452, +2349030009486 or +2349030009108
						</strong>
					</Typography>
				</Grid>
			</Grid>
		</section>
	);
};

export default ConfirmationServices;

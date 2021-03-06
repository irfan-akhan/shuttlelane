import React from 'react';
import { Grid } from '@material-ui/core';
import {
	Flight,
	LocalShipping,
	LocalTaxi,
	TransferWithinAStation,
} from '@material-ui/icons';

import styles from '../../styles/Dashboard.module.css';

const card = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '1rem',
	maxWidth: '300px',
	maxHeight: '18vh',
	margin: '10px',
	color: '#f3f3f3',
	borderRadius: '5px',
	boxShadow: '0 0 15px 5px #e7e7e7',
};

const Overview = ({
	bookings,
	carBooking,
	hotelBookings,
	priorityBookings,
}) => {
	return (
		<>
			<Grid item sm={3}>
				<div className={styles.purpleBackground} style={card}>
					<div>
						<h1>{bookings?.length}</h1>
						<p>Airport Bookings</p>
					</div>
					<Flight fontSize='large' />
				</div>
			</Grid>
			<Grid item sm={3}>
				<div className={styles.greenBackground} style={card}>
					<div>
						<h1>{carBooking?.length}</h1>
						<p>Car Bookings</p>
					</div>
					<LocalTaxi fontSize='large' />
				</div>
			</Grid>
			<Grid item sm={3}>
				<div className={styles.pinkBackground} style={card}>
					<div>
						<h1>{hotelBookings?.length}</h1>
						<p>Hotel Bookings</p>
					</div>
					<TransferWithinAStation fontSize='large' />
				</div>
			</Grid>
			<Grid item sm={3}>
				<div className={styles.blueBackground} style={card}>
					<div>
						<h1>{priorityBookings?.length}</h1>
						<p>Priority Pass Bookings</p>
					</div>
					<LocalShipping fontSize='large' />
				</div>
			</Grid>
			<Grid item sm={6} className={styles.cardStat}>
				<h4>Last 5 Airport Bookings</h4>
				<p className={styles.entry}>
					<span>No</span> <span>Booking Ref</span>
					<span>Date & Time</span> <span>Transfer Type</span>
					<span>Payment </span>
				</p>
				{bookings?.slice(0, 5).map((item, idx) => {
					return (
						<p key={item.bookingReference} className={styles.entry}>
							<span>{++idx}</span>{' '}
							<span>{item.bookingReference}</span>
							<span>
								{item.arrivalDate?.slice(0, 10) ||
									item.pickupDate?.slice(0, 10)}{' '}
								<br />& {item.time}
							</span>
							<span>{item.formType.split('-').join(' ')}</span>
							<span>{item.paymentStatus}</span>
						</p>
					);
				})}
			</Grid>
			<Grid item sm={6} className={styles.cardStat}>
				<h4>Last 5 Car Bookings</h4>
				<p className={styles.entry}>
					<span>No</span> <span>Booking Ref</span>
					<span>Date & Time</span> <span>Car Type</span>
					<span>Amount </span>
				</p>
				{carBooking?.slice(0, 5).map((item, idx) => {
					return (
						<p key={item.bookingReference} className={styles.entry}>
							<span>{++idx}</span>{' '}
							<span>{item.bookingReference}</span>
							<span>
								{item.date?.slice(0, 10)} <br />& {item.time}
							</span>
							<span>{item.carType}</span>
							<span>{item.amount}</span>
						</p>
					);
				})}
			</Grid>
			<Grid item sm={6} className={styles.cardStat}>
				<h4>Last 5 Hotel Bookings</h4>
				<p className={styles.entry}>
					<span>
						<strong>No</strong>
					</span>
					<span>
						<strong>Booking Ref</strong>
					</span>
					<span>
						<strong>Hotel Name </strong>
					</span>{' '}
					<span>
						<strong>Booking Date</strong>
					</span>
				</p>
				{hotelBookings?.slice(0, 5).map((item, idx) => {
					return (
						<p key={item.bookingReference} className={styles.entry}>
							<span>{++idx}</span>{' '}
							<span>{item.bookingReference}</span>
							<span>{item?.hotelName}</span>
							<span>{item?.createdAt.slice(0, 10)}</span>
						</p>
					);
				})}
			</Grid>
			<Grid item sm={6} className={styles.cardStat}>
				<div>
					<h4>Last 5 Priority Pass Bookings </h4>
				</div>
				<p className={styles.entry}>
					<span>No</span> <span>Booking Ref</span>
					<span>Date & Time</span> <span>Transfer Type</span>
					<span>Payment Status</span>
				</p>
			</Grid>
		</>
	);
};

export default Overview;

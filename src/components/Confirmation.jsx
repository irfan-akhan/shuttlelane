import React from 'react';
import { Grid, Typography, Card } from '@material-ui/core';
import {
	FlightLand,
	Today,
	AccessTime,
	LocalAirport,
	ArrowForward,
	PeopleAlt,
	LocationOn,
	DriveEta,
	Contacts,
	Facebook,
	Twitter,
	Instagram,
	Person,
	Work,
} from '@material-ui/icons';

import success from '../styles/Success.module.css';
const currencySymbols = {
	dollar: '$',
	euro: '€',
	pound: '£',
	niera: '₦',
};
const Confirmation = ({ booking }) => {
	// console.log("FROM CONF", booking);

	return (
		<section style={{ marginTop: '6rem' }}>
			<Grid
				container
				spacing={2}
				xs={12}
				sm={8}
				md={6}
				xl={3}
				style={{
					margin: 'auto',
				}}
				className={success.main}
			>
				<Grid item style={{ textAlign: 'center', margin: '0 auto' }}>
					<img
						src='/assets/images/logo.png'
						alt='logo'
						style={{ width: '150px' }}
					/>
				</Grid>
				<Grid item className={success.header}>
					<div className='Header'>Booking Confirmation.</div>
				</Grid>
				<Grid item container style={{ border: '1px solid #ccc' }}>
					{booking?.days ? (
						<Typography
							variant='paragraph'
							className={success.message}
						>
							Thank You for your Car Hire booking with
							Shuttlelane. <br />
							`We'll now check the availibility of your preferred
							car and we will get back to you as soon as
							possible`.
						</Typography>
					) : booking?.formType ? (
						<Typography
							variant='paragraph'
							className={success.message}
						>
							Thank You for your &nbsp;
							{booking?.formType} &nbsp;booking with Shuttlelane.
						</Typography>
					) : (
						<Typography
							variant='paragraph'
							className={success.message}
						>
							Thank You for your Priority Pass booking with
							Shuttlelane.
						</Typography>
					)}

					<br />

					<Typography variant='paragraph' className={success.message}>
						Your Booking Reference is&nbsp;
						<span
							style={{
								textDecoration: 'underline',
								color: '#0393be',
							}}
						>
							{booking?.bookingReference}
						</span>{' '}
						.
					</Typography>
					<Typography variant='paragraph' className={success.message}>
						Need assistance? You can reach us on
						<strong>
							+2349030009452, +2349030009486 or +2349030009108
						</strong>
					</Typography>
				</Grid>
				<Grid item className={success.header}>
					<div className='Header'>BOOKING DETAILS</div>
				</Grid>
				<Grid
					item
					container
					style={{ border: '1px solid #ccc', borderBottom: 'none' }}
				>
					<div className={success.detailContainer}>
						{booking?.formType ? (
							<div className={success.itemDetails}>
								<div className={success.icon}>
									<FlightLand color='#0393be' />
								</div>
								<div
									className={success.detail}
									style={{ marginLeft: '1.5rem' }}
								>
									<Typography variant='paragraph'>
										<strong>Pick-up</strong>
									</Typography>
									<br />
									<Typography
										variant='paragraph'
										className={success.para}
									>
										{booking?.arrivalDate
											? `Airport Name: ${booking?.pickupAirport}`
											: booking?.pickupDate
											? `Address: ${booking?.pickupAddress}`
											: ''}
									</Typography>
									<br />

									{booking?.arrivalDate ? (
										<Typography
											variant='paragraph'
											className={success.para}
										>
											Flight Number:
											{booking?.flightNumber} <br />
											Meeting Point: Proceed to trolly
											stand behind Baggage Conveyor for
											your free trolley and porter
											service.
										</Typography>
									) : (
										''
									)}

									<br />
								</div>
							</div>
						) : booking?.days ? (
							<div className={success.itemDetails}>
								<div className={success.icon}>
									<FlightLand color='#0393be' />
								</div>
								<div
									className={success.detail}
									style={{ marginLeft: '1.5rem' }}
								>
									<Typography variant='paragraph'>
										<strong>Pick-up</strong>
									</Typography>
									<br />
									<Typography
										variant='paragraph'
										className={success.para}
									>
										Address: {booking?.pickupAddress}
									</Typography>
									<br />
									<Typography
										variant='paragraph'
										className={success.para}
									>
										Date:
										{booking?.date?.toString().slice(0, 10)}
									</Typography>
									<br />
								</div>
							</div>
						) : (
							<div className={success.itemDetails}>
								<div className={success.icon}>
									<FlightLand color='#0393be' />
								</div>
								<div
									className={success.detail}
									style={{ marginLeft: '1.5rem' }}
								>
									<Typography variant='paragraph'>
										<strong>Airport</strong>
									</Typography>
									<br />
									<Typography
										variant='paragraph'
										className={success.para}
									>
										{booking?.airport}
									</Typography>
									<br />
								</div>
							</div>
						)}
					</div>
				</Grid>
				<Grid
					item
					container
					style={{ border: '1px solid #ccc', borderBottom: 'none' }}
				>
					<div
						className={success.detailContainer}
						style={{ width: '100%' }}
					>
						{booking?.formType ? (
							<div className={success.itemDetails}>
								<div className={success.icon}>
									<LocationOn />
								</div>
								<div
									className={success.detail}
									style={{ marginLeft: '1.5rem' }}
								>
									<Typography variant='paragraph'>
										<strong>Drop-off</strong>
									</Typography>
									<br />
									<Typography
										variant='paragraph'
										className={success.para}
									>
										{booking?.arrivalDate
											? `Address: ${booking?.dropoffAddress}`
											: booking?.pickupDate
											? `Airport Name: ${booking?.dropoffAirport}`
											: ''}
									</Typography>
								</div>
							</div>
						) : booking?.days ? (
							<div className={success.itemDetails}>
								<div className={success.icon}>
									<LocationOn />
								</div>
								<div
									className={success.detail}
									style={{ marginLeft: '1.5rem' }}
								>
									<Typography variant='paragraph'>
										<strong>Drop-off</strong>
									</Typography>
									<br />
									<Typography
										variant='paragraph'
										className={success.para}
									>
										Destination: {booking?.destination}
									</Typography>
								</div>
							</div>
						) : (
							<div className={success.itemDetails}>
								<div className={success.icon}>
									<Contacts color='#0393be' />
								</div>
								<div
									className={success.detail}
									style={{ marginLeft: '1.5rem' }}
								>
									<Typography variant='paragraph'>
										<strong>Contact</strong>
									</Typography>
									<br />
									<Typography
										variant='paragraph'
										className={success.para}
									>
										{booking?.countryCode}&nbsp;
										{booking?.mobile}
									</Typography>{' '}
									<br />
									<Typography
										variant='paragraph'
										className={success.para}
									>
										{booking?.email}
									</Typography>
								</div>
							</div>
						)}
					</div>
				</Grid>
				<Grid
					item
					container
					style={{
						border: '1px solid #ccc',
						borderBottom: 'none',
					}}
				>
					<div className={success.detailContainer}>
						{booking?.formType ? (
							<>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<AccessTime color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Date and Time</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.pickupDate ||
											booking?.arrivalDate
												? booking?.pickupDate
													? booking?.pickupDate
															.toString()
															.slice(0, 10)
													: booking?.arrivalDate
													? booking?.arrivalDate
															.toString()
															.slice(0, 10)
													: booking?.arrivalDate
															.toString()
															.slice(0, 10)
												: ''}
											&nbsp;{booking?.time}
										</Typography>
									</div>
								</div>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<DriveEta color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Vehicle Class</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.carType}
											<br />
											<span
												style={{
													marginRight: '.4rem',
												}}
											>
												<Person fontSize='small' />
												{booking?.carCapacity}
											</span>
											<span>
												<Work fontSize='small' />
												{booking?.carLuggage}
											</span>
										</Typography>
									</div>
								</div>
							</>
						) : booking?.days ? (
							<>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<AccessTime color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Date and Time</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.date
												?.toString()
												.slice(0, 10)}
											&nbsp;
											{booking?.time}
										</Typography>
									</div>
								</div>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<DriveEta color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Vehicle </strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.carType}
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											Hired for&nbsp;
											{booking?.days}
											&nbsp;day
											{parseInt(booking.days) > 1
												? 's'
												: ''}
											&nbsp;in total
										</Typography>
									</div>
								</div>
							</>
						) : (
							<>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<AccessTime color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Date and Time</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.date
												?.toString()
												.slice(0, 10)}
											&nbsp;
											{booking?.time}
										</Typography>
									</div>
								</div>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<DriveEta color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Cabin Class </strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.cabinClass}
										</Typography>
									</div>
								</div>
							</>
						)}
					</div>
				</Grid>
				<Grid
					item
					container
					style={{
						border: '1px solid #ccc',
						borderBottom: 'none',
					}}
				>
					<div className={success.detailContainer}>
						{booking?.formType ? (
							<>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<PeopleAlt color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Passenger</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.title}&nbsp;
											{booking?.firstName}
											&nbsp;{booking?.lastName} <br />
										</Typography>
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.passengers} passenger
											{parseInt(booking.passengers) > 1
												? 's'
												: ''}{' '}
											in total
										</Typography>
									</div>
								</div>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<Contacts color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Contact</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.countryCode}&nbsp;
											{booking?.mobile}
										</Typography>{' '}
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.email}
										</Typography>
									</div>
								</div>
							</>
						) : booking?.days ? (
							<>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<PeopleAlt color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Passenger</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.title}&nbsp;
											{booking?.firstName}
											&nbsp;{booking?.lastName}
										</Typography>
									</div>
								</div>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<Contacts color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Contact</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.countryCode}&nbsp;
											{booking?.mobile}
										</Typography>{' '}
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.email}
										</Typography>
									</div>
								</div>
							</>
						) : (
							<>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<PeopleAlt color='#0393be' />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Passenger</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.title}&nbsp;
											{booking?.firstName}
											&nbsp;{booking?.lastName} <br />
										</Typography>
										<Typography
											variant='paragraph'
											className={success.para}
										>
											{booking?.passengers} passenger
											{parseInt(booking.passengers) > 1
												? 's'
												: ''}{' '}
											in total
										</Typography>
									</div>
								</div>
							</>
						)}
					</div>
				</Grid>
				<Grid
					item
					container
					style={{
						border: '1px solid #ccc',
						display: 'flex',
						justifyContent: 'space-between',
						padding: '1rem 1.5rem',
					}}
				>
					<Typography variant='paragraph'>
						<strong>Total</strong>
					</Typography>
					<Typography variant='paragraph'>
						<strong>
							{currencySymbols[booking?.currency]}
							{booking?.amount}
						</strong>
					</Typography>
				</Grid>
				<Grid
					item
					container
					style={{
						border: '1px solid #ccc',
						display: 'flex',
						justifyContent: 'space-between',
						padding: '1rem 1.5rem',
					}}
				>
					<Typography variant='paragraph' style={{ margin: 'auto' }}>
						<span>
							<a
								target='_blank'
								href='https://www.instagram.com/shuttlelane/'
								style={{
									color: '#868686d8',
									marginLeft: '1.4rem',

									fontSize: '20px',
								}}
							>
								<img
									style={{ width: '30px' }}
									src='/assets/images/socials/instagram.png'
								/>
							</a>
							<a
								target='_blank'
								href='https://twitter.com/Shuttlelane'
								style={{
									color: '#868686d8',
									marginLeft: '1.4rem',
									width: '50px',
									fontSize: '20px',
								}}
							>
								<img
									style={{ width: '30px' }}
									src='/assets/images/socials/twitter.png'
								/>
							</a>
							<a
								target='_blank'
								href='https://www.facebook.com/shuttlelane1'
								style={{
									color: '#868686d8',
									marginLeft: '1.4rem',
									width: '50px',
									fontSize: '20px',
								}}
							>
								<img
									style={{ width: '30px' }}
									src='/assets/images/socials/facebook.png'
								/>
							</a>
						</span>
					</Typography>
				</Grid>
			</Grid>
		</section>
	);
};

export default Confirmation;

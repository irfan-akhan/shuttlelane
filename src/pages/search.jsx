import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
	Cancel,
	Person,
	Work,
} from '@material-ui/icons';
let date = new Date().toISOString().substr(0, 10);
import success from '../styles/Success.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../styles/services.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Typography } from '@material-ui/core';
const currencySymbols = {
	dollar: '$',
	euro: '€',
	pound: '£',
	niera: '₦',
};

const initialValues = {
	time: '',
	date: '',
	airport: '',
	address: '',
	flightNumber: '',
};
const Search = (props) => {
	const router = useRouter();
	const [modal, setModal] = useState(false);

	const [updateFields, setUpdateFields] = useState(initialValues);
	const [booking, setBooking] = useState(null);
	const ref = router?.asPath?.split('?')[1]?.split('=')[1];
	const [selectedDate, handleDateChange] = useState(new Date());
	// let data = console.log("data", data);
	useEffect(() => {
		console.log('ref useEffect', ref);
		const string = {
			bookingId: ref,
		};
		console.log('string useEffect', string);
		fetch('https://shuttlelaneee.herokuapp.com/api/booking/search', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(string),
		})
			.then((res) => res.json())
			.then((result) => {
				// console.log("result,", result);
				if (!result.data) {
					setBooking(null);

					return;
				}
				setBooking(result.data);
				return;
			})
			.catch((err) => {
				console.log('err', err);
				toast.error('Something went wrong, Please try again later', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				});
			});
	}, [ref]);

	const onChangeHandler = (e) => {
		setUpdateFields({ ...updateFields, [e.target.name]: e.target.value });
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log('IN SUBMIT');
		console.log(updateFields);
		let values = {};
		for (const [key, value] of Object.entries(updateFields)) {
			if (value) {
				console.log('in');
				values[key] = value;
			}
			console.log(`${key}: ${value}`);
		}
		fetch('http://localhost:3001/api/booking/search', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...values, bookingId: ref }),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log('UPDATE result,', result);
				onCloseHandler();
				if (!result.data) {
					// setBooking(null);
					toast.error(
						'Something went wrong, Please try again later',
						{
							position: 'top-center',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: 0,
						}
					);
					return;
				}
				setBooking(result.data);
				setUpdateFields(initialValues);
				toast.success('Updated successfully', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				});
				return;
			})
			.catch((err) => {
				console.log('err', err);
				toast.error('Something went wrong, Please try again later', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				});
			});
	};
	const onCloseHandler = () => {
		setModal(false);
	};

	{
		console.log('booking', booking);
		return booking ? (
			<section
				style={{
					marginTop: '6rem',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				{modal && (
					<section className={success.modal}>
						<Cancel
							onClick={onCloseHandler}
							className={success.close}
						/>
						{booking?.bookingType === 'airport' ? (
							<div>
								<select
									name='airport'
									id='airport'
									className={success.fields}
									value={updateFields.airport}
									onChange={onChangeHandler}
									style={{
										marginTop: '2rem',
									}}
								>
									<option selected disabled value=''>
										Change Airport
									</option>
									<option value='Murtala Muhammed International Airport'>
										Murtala Muhammed International Airport
									</option>
									<option value='Murtala Muhammed Domestic Airport'>
										Murtala Muhammed Domestic Airport
									</option>
								</select>

								<div
									className={success.fields}
									style={{
										marginBottom: '0',
									}}
								>
									<input
										type='text'
										name='address'
										id='Address'
										placeholder='Change Address'
										value={updateFields.address}
										onChange={onChangeHandler}
									/>
								</div>
							</div>
						) : booking?.bookingType === 'car' ? (
							<div className={success.fields}>
								<input
									type='text'
									name='address'
									id='Address'
									placeholder='Pickup Address'
									value={updateFields.address}
									onChange={onChangeHandler}
									style={{
										marginTop: '2rem',
									}}
								/>
							</div>
						) : (
							<div className={success.fields}>
								<input
									type='text'
									name='address'
									id='Address'
									placeholder='Flight Number'
									value={updateFields.flightNumber}
									onChange={onChangeHandler}
									style={{
										marginTop: '2rem',
									}}
								/>
							</div>
						)}
						<div className='' style={{ marginTop: '.8rem' }}>
							<div className={success.fields}>
								<input
									type='date'
									name='date'
									id='date'
									min={date}
									value={updateFields.date}
									onChange={onChangeHandler}
								/>
							</div>
							<div className={success.fields}>
								<input
									type='time'
									name='time'
									id='time'
									value={updateFields.time}
									onChange={onChangeHandler}
								/>
							</div>
						</div>
						<button
							onClick={onSubmitHandler}
							className='btnGrad'
							style={{ marginTop: 0 }}
						>
							Save
						</button>
					</section>
				)}

				<Grid
					container
					spacing={2}
					xs={12}
					sm={8}
					md={7}
					xl={4}
					style={{
						margin: 'auto',
					}}
					className={success.main}
				>
					<Grid
						item
						style={{ textAlign: 'center', margin: '0 auto' }}
					>
						<img
							src='/assets/images/logo.png'
							alt='logo'
							style={{ width: '150px' }}
						/>
					</Grid>
					<Grid item className={success.header}>
						<div className='Header'>BOOKING DETAILS</div>
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
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<LocationOn color='#0393be' />
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
												<strong>
													Meeting Point:
												</strong>{' '}
												Proceed to trolly stand behind
												Baggage Conveyor for your free
												trolley and porter service.
											</Typography>
										) : (
											''
										)}

										<br />
									</div>

									<button
										onClick={() =>
											setModal((prev) => !prev)
										}
										className={success.editBtn}
									>
										Edit
									</button>
								</div>
							) : booking?.days ? (
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<LocationOn color='#0393be' />
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
											{booking?.date
												?.toString()
												.slice(0, 10)}
										</Typography>
										<br />
									</div>

									<button
										onClick={() =>
											setModal((prev) => !prev)
										}
										className={success.editBtn}
									>
										Edit
									</button>
								</div>
							) : (
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<LocationOn color='#0393be' />
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

									<button
										onClick={() =>
											setModal((prev) => !prev)
										}
										className={success.editBtn}
									>
										Edit
									</button>
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
					{booking?.bookingType != 'priority' && (
						<Grid
							item
							container
							style={{
								border: '1px solid #ccc',
								borderBottom: 'none',
							}}
						>
							<div
								className={success.detailContainer}
								style={{ width: '100%' }}
							>
								<div className={success.itemDetails}>
									<div className={success.icon}>
										<Person />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong>Driver Details</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											<strong
												style={{ color: '#212121' }}
											>
												Name:&nbsp;
											</strong>
											{booking?.assignedDriver &&
											booking?.assignedDriver.length > 0
												? booking?.assignedDriver[0]
														.name
												: 'Assigning a Driver'}
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											<strong
												style={{ color: '#212121' }}
											>
												Number:&nbsp;
											</strong>
											{booking.assignedDriver &&
											booking.assignedDriver.length > 0
												? booking.assignedDriver[0]
														.mobile
												: 'Assigning a Driver'}
										</Typography>
									</div>
								</div>

								<div className={success.itemDetails}>
									<div className={success.icon}>
										<DriveEta />
									</div>
									<div
										className={success.detail}
										style={{ marginLeft: '1.5rem' }}
									>
										<Typography variant='paragraph'>
											<strong> Car Details</strong>
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											<strong
												style={{ color: '#212121' }}
											>
												Type:&nbsp;{' '}
											</strong>
											{booking?.assignedCar &&
											booking?.assignedCar.length > 0
												? booking?.assignedCar[0].type
												: 'Not Assigned yet'}
										</Typography>
										<br />
										<Typography
											variant='paragraph'
											className={success.para}
										>
											<strong
												style={{ color: '#212121' }}
											>
												Plate Number:&nbsp;
											</strong>
											{booking?.assignedCar &&
											booking?.assignedCar.length > 0
												? booking?.assignedCar[0]
														.plateNumber
												: 'Not Assigned yet'}
											<br />
										</Typography>
										<Typography
											variant='paragraph'
											className={success.para}
										>
											<strong
												style={{ color: '#212121' }}
											>
												Color:&nbsp;
											</strong>
											{booking?.assignedCar &&
											booking?.assignedCar.length > 0
												? booking?.assignedCar[0].color
												: 'Not Assigned yet'}
											<br />
										</Typography>
									</div>
								</div>
							</div>
						</Grid>
					)}
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
												{parseInt(booking.passengers) >
												1
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
												{parseInt(booking?.passengers) >
												1
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
						<Typography
							variant='paragraph'
							style={{ margin: 'auto' }}
						>
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
		) : (
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
						className={styles.headerError}
					>
						<div className='header'>No Booking Found!</div>
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
						<Typography
							variant='paragraph'
							className={styles.message}
						>
							Thank You for Choosing Shuttlelane. <br />
							We are sorry but we couldn't find any booking under
							this Reference Number.To make a Booking visit{' '}
							<a href='/' color='#000080'>
								shuttlelane
							</a>
						</Typography>
						<Typography
							variant='paragraph'
							className={styles.message}
						>
							Need assistance? You can reach us on
							<strong>
								+2349030009452, +2349030009486 or +2349030009108
							</strong>
						</Typography>
					</Grid>
				</Grid>
				<ToastContainer />
			</section>
		);
	}
};
export default Search;

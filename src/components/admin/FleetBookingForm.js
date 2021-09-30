import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import styles from '../../styles/BookingForm.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
	Business,
	DriveEta,
	Apartment,
	LocationOn,
	Explore,
	EmojiTransportation,
	Mail,
	Person,
	Phone,
	Dialpad,
	LocalAirport,
} from '@material-ui/icons';
const FleetBookingForm = ({ closeForm }) => {
	const [inputValues, setInputValues] = useState({
		companyName: '',
		address: '',
		city: '',
		country: '',
		name: '',
		email: '',
		mobile: '',
		bookingEmail: '',
		bookingNumber: '',
		operatingHours: false,
		operatingAirports: '',
		openHours: false,
		vehicleType: [],
		fleetSize: '',
		operatingCities: '',
	});
	const onSubmitHandler = (e) => {
		e.preventDefault();
		toast.info('Please Wait', {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: 0,
		});
		try {
			fetch('https://shuttlelane.herokuapp.com/api/booking/fleet', {
				method: 'POST',
				body: JSON.stringify(inputValues),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					if (res.data) {
						toast.success('Booking Confirmed', {
							position: 'top-center',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: 0,
						});
						closeForm();
					}
				});
		} catch (err) {
			console.log(err);
			toast.error(err, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
		}
	};
	const onChangeHandler = (e) => {
		console.log(e.target.name);
		console.log(e.target.value);
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
	};
	function vehicleChange(e) {
		console.log(e.target);
		console.log(e.target.innerText);
		let vehicles = inputValues.vehicleType;
		!vehicles.includes(e.target.value)
			? vehicles.push(e.target.value)
			: (vehicles = vehicles.filter((item) => item != e.target.value));

		setInputValues({
			...inputValues,
			vehicleType: vehicles,
		});
	}
	return (
		<>
			<Grid item sm={12}>
				<h2 style={{ textAlign: 'center', color: '#554986' }}>
					<span
						onClick={closeForm}
						style={{
							textAlign: 'center',
							color: '#554986',
							marginRight: '5rem',
						}}
					>
						&times;
					</span>{' '}
					Add New Fleet Booking
				</h2>
			</Grid>
			<ToastContainer />
			<Grid item xs={12}>
				<main className={styles.formContainer}>
					<form
						className='checkoutForm'
						style={{ overflowY: 'scroll', height: '80vh' }}
						onSubmit={onSubmitHandler}
					>
						<div className='formGroup'>
							<div className='inputControl'>
								<span>
									<Business />
								</span>
								<input
									type='text'
									name='companyName'
									id='companyName'
									placeholder='Company Name'
									required
									value={inputValues.companyName}
									onChange={onChangeHandler}
								/>
							</div>
							<div className='inputControl'>
								<span>
									<Mail />
								</span>
								<input
									type='text'
									name='bookingEmail'
									id=''
									placeholder='Booking Email'
									required
									value={inputValues.bookingEmail}
									onChange={onChangeHandler}
								/>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl'>
								<span>
									<EmojiTransportation />
								</span>
								<input
									type='text'
									name='city'
									id=''
									placeholder='City'
									required
									value={inputValues.city}
									onChange={onChangeHandler}
								/>
							</div>
							<div className='inputControl'>
								<span>
									<Explore />
								</span>
								<input
									type='text'
									name='country'
									id=''
									placeholder='Country'
									required
									value={inputValues.country}
									onChange={onChangeHandler}
								/>
							</div>
						</div>

						<div className='formGroup'>
							<div className='inputControl'>
								<span>
									<Person />
								</span>
								<input
									type='text'
									name='name'
									id='name'
									placeholder='Name'
									required
									value={inputValues.name}
									onChange={onChangeHandler}
								/>
							</div>

							<div className='inputControl'>
								<span>
									<Mail />
								</span>
								<input
									type='text'
									name='contactEmail'
									id='email'
									placeholder='Email'
									required
									value={inputValues.contactEmail}
									onChange={onChangeHandler}
								/>
							</div>
						</div>

						<div className='formGroup'>
							<div className='inputControl'>
								<span>
									<Phone />
								</span>
								<input
									type='text'
									name='mobile'
									id=''
									placeholder='Telephone'
									required
									maxLength='10'
									value={inputValues.mobile}
									onChange={onChangeHandler}
								/>
							</div>

							<div className='inputControl'>
								<span>
									<Dialpad />
								</span>
								<input
									type='text'
									name='bookingNumber'
									id=''
									placeholder='Booking Number'
									required
									value={inputValues.bookingNumber}
									onChange={onChangeHandler}
								/>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl'>
								<span>
									<Apartment />
								</span>
								<input
									type='text'
									name='operatingCities'
									id=''
									placeholder='Operating cities'
									required
									value={inputValues.operatingCities}
									onChange={onChangeHandler}
								/>
							</div>

							<div className='inputControl'>
								<span>
									<LocalAirport />
								</span>
								<input
									type='text'
									name='operatingAirports'
									id=''
									placeholder='Operating Airports'
									required
									value={inputValues.operatingAirports}
									onChange={onChangeHandler}
								/>
							</div>
						</div>

						<div className='formGroup'>
							<div className='inputControl'>
								<span>
									<LocationOn />
								</span>
								<input
									type='text'
									name='address'
									id=''
									placeholder='Address'
									required
									value={inputValues.address}
									onChange={onChangeHandler}
								/>
							</div>
							<div className='inputControl'>
								<span>
									<DriveEta />
								</span>
								<select
									name='fleetSize'
									id='fleetSize'
									value={inputValues.fleetSize}
									onChange={onChangeHandler}
								>
									<option disabled value='' selected>
										Fleet Size
									</option>

									<option value='1-5'>1-5 Vehicles</option>
									<option value='6-10'>6-10 Vehicles</option>
									<option value='11-20'>
										11-20 Vehicles
									</option>
									<option value='21-50'>
										21-50 Vehicles
									</option>
									<option value='50-100'>
										50-100 Vehicles
									</option>
								</select>
							</div>
						</div>
						{/* <div className="inputControl">
            <label htmlFor="radio">
              <strong>Can You Pickup 24hrs per Day &nbsp;</strong>
            </label>
            <br />
            <input type="radio" name="gender" id="gender" />
            <label htmlFor="male">Yes</label>
            <input type="radio" name="gender" id="gender" />
            <label htmlFor="female">No</label>
          </div> */}

						<div className='formGroup'>
							<div
								className='inputControl'
								style={{ border: ' none ' }}
							>
								<p style={{ margin: '0' }}>
									Can you Pick 24 hours per Day
								</p>
							</div>

							<div className='inputControl'>
								<label htmlFor='operatingHours'>Yes</label>
								<input
									type='radio'
									name='operatingHours'
									id='operatingHours'
									value={inputValues.operatingHours}
									onChange={(e) =>
										setInputValues({
											...inputValues,
											operatingHours: true,
										})
									}
								/>
								<br />{' '}
								<label htmlFor='operatingHours'>No</label>
								<input
									type='radio'
									name='operatingHours'
									id='operatingHours'
									value={inputValues.operatingHours}
									onChange={(e) =>
										setInputValues({
											...inputValues,
											operatingHours: false,
										})
									}
								/>
							</div>
						</div>
						<div className='formGroup'>
							<div
								className='inputControl'
								style={{ border: ' none ' }}
							>
								<p style={{ margin: '0' }}>Office Open 24hrs</p>
							</div>

							<div className='inputControl'>
								<label>Yes</label>
								<input
									type='radio'
									name='openHours'
									value={inputValues.openHours}
									onChange={(e) =>
										setInputValues({
											...inputValues,
											openHours: true,
										})
									}
								/>
								<br />
								<label>No</label>
								<input
									type='radio'
									name='openHours'
									id=''
									value={inputValues.openHours}
									onChange={(e) =>
										setInputValues({
											...inputValues,
											openHours: false,
										})
									}
								/>
							</div>
						</div>
						<hr />
						<h3 style={{ textAlign: 'center', color: '#000080' }}>
							Fleet Type
						</h3>
						<div className='formGroup'>
							<div className='fleetGrid'>
								<div>
									<input
										type='checkbox'
										name='vehicleType'
										value='Standard-Sedan'
										onChange={vehicleChange}
									/>

									<p>
										Standard Sedan (Toyota Corolla or
										Similar)
									</p>
									<img
										src='/assets/images/smallsedan.png'
										alt=''
									/>
								</div>
								<div>
									<input
										type='checkbox'
										name='vehicleType'
										value='Mini-Suv'
										id=''
										onChange={vehicleChange}
									/>

									<p>Mini Suv (Toyota Rav 4 or Similar)</p>
									<img
										src='/assets/images/MiniSuv.png'
										alt=''
									/>
								</div>
								<div>
									<input
										type='checkbox'
										name='vehicleType'
										value='Large-Suv'
										id=''
										onChange={(e) => {
											if (
												!inputValues.vehicleType.includes(
													e.target.value
												)
											)
												inputValues.vehicleType.push(
													e.target.value
												);
										}}
									/>
									<p>Large Suv (Toyota Prado or Similar)</p>
									<img
										src='/assets/images/largesuv.png'
										alt=''
									/>
								</div>
								<div>
									<input
										type='checkbox'
										name='vehicleType'
										value='Executive-Sedan'
										id=''
										onChange={vehicleChange}
									/>
									<p>
										Executive Sedan (Mercedes E-Class or
										Similar)
									</p>
									<img
										src='/assets/images/exsedan.png'
										alt=''
									/>
								</div>
								<div>
									<input
										type='checkbox'
										name='vehicleType'
										value='Mini-Bus'
										id=''
										onChange={vehicleChange}
									/>
									<p> Mini Bus (Toyota Hiace or Similar)</p>
									<img
										src='/assets/images/minibus.png'
										alt=''
									/>
								</div>
							</div>
						</div>

						<button className='btnGrad' type='submit'>
							Add Fleet
						</button>
					</form>
				</main>
			</Grid>
		</>
	);
};

export default FleetBookingForm;

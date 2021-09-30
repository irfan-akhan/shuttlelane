import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import
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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// COMPONENT
const FleetManagement = () => {
	const router = useRouter();
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
	const vehicleChange = (e) => {
		let vehicles = inputValues.vehicleType;
		vehicles.includes(e.target.value)
			? (vehicles = vehicles.filter((item) => item != e.target.value))
			: vehicles.push(e.target.value);
		setInputValues({ ...inputValues, vehicleType: vehicles });
	};
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
						if (res.data) {
							router.push('/partnership/fleet-confirmation');
						}
					}
				});
		} catch (err) {
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

	return (
		<div className='hotelForm'>
			<ToastContainer />
			<h2 style={{ color: '#000080', textAlign: 'center' }}>
				Fleet Management Solution
			</h2>
			<form className='checkoutForm' onSubmit={onSubmitHandler}>
				<div className='formGroup'>
					<div className='inputControl'>
						<span>
							<Business />
						</span>
						<input
							type='text'
							name='companyName'
							id=''
							placeholder='Company Name'
							required
							value={inputValues.companyName}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									companyName: e.target.value,
								})
							}
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
							onChange={(e) =>
								setInputValues({
									...inputValues,
									bookingEmail: e.target.value,
								})
							}
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
							onChange={(e) =>
								setInputValues({
									...inputValues,
									city: e.target.value,
								})
							}
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
							onChange={(e) =>
								setInputValues({
									...inputValues,
									country: e.target.value,
								})
							}
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
							onChange={(e) =>
								setInputValues({
									...inputValues,
									name: e.target.value,
								})
							}
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
							onChange={(e) =>
								setInputValues({
									...inputValues,
									contactEmail: e.target.value,
								})
							}
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
							value={inputValues.mobile}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									mobile: e.target.value,
								})
							}
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
							onChange={(e) =>
								setInputValues({
									...inputValues,
									bookingNumber: e.target.value,
								})
							}
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
							onChange={(e) =>
								setInputValues({
									...inputValues,
									operatingCities: e.target.value,
								})
							}
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
							onChange={(e) =>
								setInputValues({
									...inputValues,
									operatingAirports: e.target.value,
								})
							}
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
							onChange={(e) =>
								setInputValues({
									...inputValues,
									address: e.target.value,
								})
							}
						/>
					</div>
					<div className='inputControl'>
						<span>
							<DriveEta />
						</span>
						<select
							name='fleetSize'
							id=''
							value={inputValues.fleetSize}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									fleetSize: e.target.value,
								})
							}
						>
							<option disabled value=' ' selected>
								Fleet Size
							</option>

							<option value='' selected disabled>
								Select Fleet Size
							</option>
							<option value='1-5'>1-5 Vehicles</option>
							<option value='6-10'>6-10 Vehicles</option>
							<option value='11-20'>11-20 Vehicles</option>
							<option value='21-50'>21-50 Vehicles</option>
							<option value='50-100'>50-100 Vehicles</option>
						</select>
					</div>
				</div>

				<div className='formGroup'>
					<div className='inputControl' style={{ border: ' none ' }}>
						<p style={{ margin: '0' }}>
							Can you Pick 24 hours per Day
						</p>
					</div>

					<div className='inputControl'>
						<label htmlFor='male'>Yes</label>
						<input
							type='radio'
							name='operatingHours'
							value={inputValues.operatingHours}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									operatingHours: true,
								})
							}
						/>
						<br /> <label htmlFor='male'>No</label>
						<input
							type='radio'
							name='operatingHours'
							id=''
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
					<div className='inputControl' style={{ border: ' none ' }}>
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
								value='Standard-Sedan'
								name='vehicleType'
								id=''
								onChange={vehicleChange}
							/>
							<p>Toyota Corolla or Similar</p>
							<img src='/assets/images/smallsedan.png' alt='' />
						</div>
						<div>
							<input
								type='checkbox'
								value='Mini-Suv'
								name='vehicleType'
								id=''
								onChange={vehicleChange}
							/>
							<p>Toyota Rav 4 or Similar</p>
							<img src='/assets/images/MiniSuv.png' alt='' />
						</div>
						<div>
							<input
								type='checkbox'
								value='Large-Suv'
								name='vehicleType'
								id=''
								onChange={vehicleChange}
							/>
							<p>Toyota Prado or Similar</p>
							<img src='/assets/images/largesuv.png' alt='' />
						</div>
						<div>
							<input
								type='checkbox'
								value='Executive-Sedan'
								name='vehicleType'
								id=''
								onChange={vehicleChange}
							/>
							<p>Mercedes E-Class or Similar</p>
							<img src='/assets/images/exsedan.png' alt='' />
						</div>
						<div>
							<input
								type='checkbox'
								value='Mini-Bus'
								name='vehicleType'
								id=''
								onChange={vehicleChange}
							/>
							<p>Toyota Hiace or Similar</p>
							<img src='/assets/images/minibus.png' alt='' />
						</div>
					</div>
				</div>

				<button className='btnGrad' type='submit'>
					Register
				</button>
			</form>
		</div>
	);
};

export default FleetManagement;

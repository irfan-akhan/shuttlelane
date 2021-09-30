import React, { useState, useEffect } from 'react';
import { LocationCity, LocationOn, Person, Phone } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HotelForm = () => {
	const [inputValues, setInputValues] = useState({
		firstName: '',
		lastName: '',
		position: '',
		number: '',
		hotelName: '',
		location: '',
	});
	const router = useRouter();
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
			fetch('https://shuttlelane.herokuapp.com/api/booking/hotel', {
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
						toast.success('Registered successfully', {
							position: 'top-center',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: 0,
						});
						router.push('/partnership/hotel-confirmation');
					} else {
						console.log('err', res.message);
						toast.success(res.message, {
							position: 'top-center',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: 0,
						});
					}
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='hotelForm' style={{ minHeight: '75vh' }}>
			<h2
				style={{
					color: '#000080',
					textAlign: 'center',
				}}
			>
				Hotel Transfer Solution
			</h2>
			<form onSubmit={onSubmitHandler} className='checkoutForm'>
				<div className='formGroup'>
					<div className='inputControl'>
						<span>
							<Person />
						</span>
						<input
							type='text'
							name='firstName'
							id='firstName'
							placeholder='First Name'
							required
							value={inputValues.firstName}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									firstName: e.target.value,
								})
							}
						/>
					</div>
					<div className='inputControl'>
						<span>
							<Person />
						</span>
						<input
							type='text'
							name='lastName'
							id='lastName'
							placeholder='Last Name'
							required
							value={inputValues.lastName}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									lastName: e.target.value,
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
							name='position'
							id='position'
							placeholder='Position'
							required
							value={inputValues.position}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									position: e.target.value,
								})
							}
						/>
					</div>

					<div className='inputControl'>
						<span>
							<Phone />
						</span>
						<input
							type='tel'
							name='number'
							id='number'
							maxLength='10'
							placeholder='Contact'
							required
							value={inputValues.number}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									number: e.target.value,
								})
							}
						/>
					</div>
				</div>

				<div className='formGroup'>
					<div className='inputControl'>
						<span>
							<LocationCity />
						</span>
						<input
							type='text'
							name='hotelName'
							id='hotelName'
							placeholder='Hotel Name'
							required
							value={inputValues.hotel}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									hotelName: e.target.value,
								})
							}
						/>
					</div>
					<div className='inputControl'>
						<span>
							<LocationOn />
						</span>
						<input
							type='text'
							name='location'
							id='location'
							placeholder='Location'
							required
							value={inputValues.location}
							onChange={(e) =>
								setInputValues({
									...inputValues,
									location: e.target.value,
								})
							}
						/>
					</div>
				</div>
				<button className='btnGrad' type='submit'>
					Register
				</button>
			</form>
		</div>
	);
};

export default HotelForm;

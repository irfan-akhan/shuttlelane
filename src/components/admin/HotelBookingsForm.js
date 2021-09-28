import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import styles from '../../styles/BookingForm.module.css';

// HELPER FUNCTIONS
function createBooking(data, closeForm) {
	fetch('https://shuttlelane.herokuapp.com/api/booking/hotel', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...data,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
			closeForm();
		})
		.catch((err) => {
			console.log('err in catch', err);
		});
	return 'created';
}
function validataDate(data) {
	return (
		Object.values(data).includes('') || Object.values(data).includes(' ')
	);
}

// COMPONENT

const HotelBookingsForm = ({ closeForm }) => {
	const [inputValues, setInputValues] = useState({
		firstName: '',
		lastName: '',
		position: '',
		number: '',
		hotelName: '',
		location: '',
	});

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const verified = validataDate(inputValues);
		if (!verified) {
			const response = createBooking(inputValues, closeForm);
			console.log('VACK', response);
		} else {
			console.log('validation Error');
		}
	};
	const onChangeHandler = (e) => {
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
	};
	return (
		<>
			<Grid item sm={12}>
				<h2 style={{ textAlign: 'center', color: '#554986' }}>
					Add Hotel Booking
				</h2>
			</Grid>

			<Grid item xs={12}>
				<main
					className={styles.formContainer}
					style={{ height: '70vh', overflow: 'scroll' }}
				>
					<form onSubmit={onSubmitHandler} className={styles.form}>
						<div className={styles.inputGroup}>
							<label htmlFor='firstName'>First Name</label>
							<input
								required
								type='text'
								placeholder='First Name'
								id='firstName'
								name='firstName'
								onChange={onChangeHandler}
								value={inputValues.firstName}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor='lastName'>Last Name</label>
							<input
								required
								type='text'
								placeholder='Last Name'
								id='lastName'
								name='lastName'
								onChange={onChangeHandler}
								value={inputValues.lastName}
							/>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='number'>Contact Number</label>
							<input
								required
								type='number'
								placeholder='Contact Number'
								id='number'
								name='number'
								onChange={onChangeHandler}
								value={inputValues.number}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor='position'>Position</label>
							<input
								required
								type='position'
								placeholder='Position'
								id='position'
								name='position'
								onChange={onChangeHandler}
								value={inputValues.position}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor='hotelName'>Hotel Name</label>
							<input
								required
								type='hotelName'
								placeholder='Hotel Name'
								id='hotelName'
								name='hotelName'
								onChange={onChangeHandler}
								value={inputValues.hotelName}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor='location'>Location</label>
							<input
								required
								type='location'
								placeholder='Location'
								id='location'
								name='location'
								onChange={onChangeHandler}
								value={inputValues.location}
							/>
						</div>

						<button type='submit' className={styles.button}>
							Add Booking
						</button>
					</form>
				</main>
			</Grid>
		</>
	);
};

export default HotelBookingsForm;

import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import styles from '../../styles/BookingForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// HELPER FUNCTIONS
function createBooking(data, setEditMode) {
	console.log('SUBMOISSSSSSs', data);
	toast.info('Please wait', {
		position: 'top-center',
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: 0,
	});
	fetch('https://shuttlelane.herokuapp.com/api/cars', {
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
		.then((result) => {
			console.log('result fro server', result);
			toast.success(result.message, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
			setEditMode();
			return result.data;
		})
		.catch((err) => {
			console.log('err in catch', err);
			toast.error('Please try again later', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
		});
	return 'created';
}
function validataDate(data) {
	console.log('validate data', data);
	return (
		Object.values(data).includes('') || Object.values(data).includes(' ')
	);
}

// COMPONENT

const NewCarForm = ({ setEditMode }) => {
	const [inputValues, setInputValues] = useState({ rate: '', name: '' });
	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log('values are: ', inputValues);
		const verified = validataDate(inputValues);
		if (!verified) {
			const response = createBooking(inputValues, setEditMode);
			console.log('VACK', response);
		} else {
			console.log('validation Error');
			toast.error('Check all input fields', {
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
		console.log(e.target);
		console.log(e.target.value);
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
	};
	return (
		<>
			<Grid item sm={12}>
				<h2
					style={{
						textAlign: 'center',
						color: '#554986',
					}}
				>
					Add New Car
				</h2>
			</Grid>
			<Grid item xs={12}>
				<main
					className={styles.formContainer}
					style={{ height: '70vh', overflow: 'scroll' }}
				>
					<form onSubmit={onSubmitHandler} className={styles.form}>
						<div className={styles.inputGroup}>
							<label htmlFor='name'>Car Name: </label>
							<input
								required
								type='name'
								placeholder='name'
								id='name'
								name='name'
								onChange={onChangeHandler}
								value={inputValues.name}
							/>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor='rate'>RATE: </label>
							<input
								required
								type='number'
								placeholder='rate '
								id='rate'
								name='rate'
								onChange={onChangeHandler}
								value={inputValues.rate}
							/>
						</div>

						<button type='submit' className={styles.button}>
							Save
						</button>
					</form>
				</main>
			</Grid>
		</>
	);
};

export default NewCarForm;

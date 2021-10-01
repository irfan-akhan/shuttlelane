import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import styles from '../../styles/BookingForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// HELPER FUNCTIONS
function updateRates(data, closeForm) {
	toast.info('Please wait', {
		position: 'top-center',
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: 0,
	});
	fetch(`https://shuttlelane.com/api/rates/${data.id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			pound: data.pound,
			euro: data.euro,
			dollar: data.dollar,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			toast.success('updated Successfully', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
			closeForm();
			return data;
		})
		.catch((err) => {});
	return 'created';
}
function validateData(data) {
	return (
		Object.values(data).includes('') || Object.values(data).includes(' ')
	);
}

// COMPoNENT
const ExchangeForm = ({ closeForm }) => {
	const [rates, setRates] = useState({});
	useEffect(() => {
		fetch('https://shuttlelane.com/api/rates')
			.then((res) => res.json())
			.then((data) => {
				setRates({
					pound: data.data[0].pound,
					euro: data.data[0].euro,
					dollar: data.data[0].dollar,
					id: data.data[0]._id,
				});
			})
			.catch((err) => console.log(err));
	}, []);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const verified = validateData(rates);
		if (!verified) {
			const response = updateRates(rates, closeForm);
		} else {
		}
	};
	const onChangeHandler = (e) => {
		setRates({ ...rates, [e.target.name]: e.target.value });
	};
	return (
		<>
			<Grid item sm={12}>
				<h2
					style={{
						textAlign: 'center',
						marginTop: '0',
						color: '#554986',
					}}
				>
					Update Exchange Rates
				</h2>
			</Grid>
			<Grid xs={12}>
				<main className={styles.formContainer}>
					<form onSubmit={onSubmitHandler} className={styles.form}>
						<div className={styles.inputGroup}>
							<label htmlFor='Euro'>Naira to Euro</label>
							<input
								type='number'
								placeholder='1 NairaEuro'
								id='euro'
								name='euro'
								onChange={onChangeHandler}
								value={rates?.euro}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor='pound'>Naira to Pound</label>
							<input
								type='number'
								placeholder='1 Naira to Pound'
								id='pound'
								name='pound'
								onChange={onChangeHandler}
								value={rates?.pound}
							/>
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor='dollar'>Naira to USD</label>
							<input
								type='number'
								placeholder='1 Naira to USD'
								id='dollar'
								name='dollar'
								onChange={onChangeHandler}
								value={rates?.dollar}
							/>
						</div>
						<button type='submit' className={styles.button}>
							Update Rates
						</button>
					</form>
				</main>
			</Grid>
			<ToastContainer />
		</>
	);
};

export default ExchangeForm;

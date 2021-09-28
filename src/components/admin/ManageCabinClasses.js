import React, { useState, useEffect } from 'react';
import styles from '../../styles/Admin.module.css';
import { Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCabinClasses = () => {
	const [classes, setClasses] = useState([]);
	const [rate, setRate] = useState(null);

	useEffect(() => {
		try {
			fetch('https://shuttlelane.herokuapp.com/api/priority')
				.then((res) => res.json())
				.then((result) => {
					setClasses(result.data);
					console.log(result);
				})
				.catch((error) => console.log('error in fetch', error));
		} catch (error) {
			console.log(error);
		}
	}, []);
	function updateHandler(e, id) {
		if (!rate) {
			toast.error('Please Enter valid rate', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
			return;
		}
		try {
			fetch(`https://shuttlelane.herokuapp.com/api/priority/${id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json ',
					'Content-Type': 'application/json ',
				},
				body: JSON.stringify({
					rate: rate,
				}),
			})
				.then((res) => res.json())
				.then((result) => {
					setClasses(result.data);
					console.log(result);
					setRate(null);
					toast.success('Updated', {
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: 0,
					});
					e.target.value = 0;
				})
				.catch((error) => console.log('error in fetch', error));
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<>
			<Grid item xs={12}>
				<h1 style={{ textAlign: 'center' }}>Manage Cars and Prices</h1>
				<hr />
			</Grid>
			<ToastContainer />
			{classes?.map((item) => {
				return (
					<Grid item xs={5}>
						<div className={styles.vehicles}>
							<h3>{item.name}</h3>
							<h4>Rate: {item.rate}</h4>
							<input
								style={{
									width: '90px',
									border: '1px solid #b2b2b2',
									padding: '3px',
								}}
								type='number'
								onChange={(e) => {
									setRate(e.target.value);
								}}
								placeholder='New Price'
							/>{' '}
							<br />
							<button
								onClick={(e) => {
									updateHandler(e, item._id);
								}}
								style={{
									display: 'inline-block',
									margin: '15px 0',
									display: 'inline-block',
									padding: '5px ',
								}}
							>
								Save Changes
							</button>
						</div>
					</Grid>
				);
			})}
		</>
	);
};

export default ManageCabinClasses;

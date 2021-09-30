import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import NewCarForm from './NewCarForm.js';

import styles from '../../styles/Admin.module.css';
import { Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCars = () => {
	const [vehicles, setVehicles] = useState([]);
	const [rate, setRate] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [reload, setReload] = useState(false);

	// modal togller
	const onClickHandler = () => {
		setEditMode(true);
	};
	useEffect(() => {
		try {
			fetch('https://shuttlelane.herokuapp.com/api/cars')
				.then((res) => res.json())
				.then((result) => {
					setVehicles(result.data);
				})
				.catch((error) => {});
		} catch (error) {}
	}, [reload]);
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
			fetch(`https://shuttlelane.herokuapp.com/api/cars/${id}`, {
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
					setVehicles(result.data);
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
				.catch((error) => {});
		} catch (error) {}
	}
	function deleteHandler(e, id) {
		try {
			fetch(`https://shuttlelane.herokuapp.com/api/cars/${id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json ',
					'Content-Type': 'application/json ',
				},
			})
				.then((res) => res.json())
				.then((result) => {
					if (result.message) {
						toast.success(result.message, {
							position: 'top-center',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: 0,
						});
						setReload((prev) => !prev);
						return;
					}
					toast.error(result.error, {
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: 0,
					});
				})
				.catch((error) => {});
		} catch (error) {}
	}
	return (
		<>
			{editMode && (
				<Modal
					isOpen={editMode}
					onCloseHandler={() => {
						setEditMode(false);
					}}
				>
					<NewCarForm
						setEditMode={(e) => {
							setEditMode(false);
						}}
					/>
				</Modal>
			)}
			<Grid item xs={12}>
				<h1 style={{ textAlign: 'center', width: '70%' }}>
					Manage Cars and Prices
				</h1>
				<button
					style={{
						display: 'inline-block',
						margin: '15px 0',
						display: 'inline-block',
						padding: '5px ',
						backgroundColor: '#4D96FF',
						border: 'none',
						borderRadius: '5px',
						color: '#fff',
					}}
					onClick={onClickHandler}
				>
					Add New Car
				</button>
				<hr />
			</Grid>
			<ToastContainer />
			{vehicles?.map((item) => {
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
							/>
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
							<button
								onClick={(e) => {
									deleteHandler(e, item._id);
								}}
								style={{
									display: 'inline-block',
									margin: '15px',
									display: 'inline-block',
									padding: '5px ',
								}}
							>
								Delete
							</button>
						</div>
					</Grid>
				);
			})}
		</>
	);
};

export default ManageCars;

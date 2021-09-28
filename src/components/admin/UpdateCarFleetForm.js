import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import styles from '../../styles/Admin.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCarFleetForm = ({ vehicle, closeForm }) => {
	const [newCar, setNewCar] = useState('');
	const [inputValues, setInputValues] = useState(
		vehicle || { rate: '', cars: [], name: '' }
	);
	const updateVehicle = (e) => {
		console.log(inputValues);
		const id = vehicle._id;
		toast.info(`Please Wait, update in progress`, {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
		});
		try {
			fetch(`https://shuttlelane.herokuapp.com/api/vehicles/${id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					rate: inputValues.rate,
					cars: inputValues.cars,
				}),
			})
				.then((res) => res.json())
				.then((result) => {
					if (result.data) {
						toast.success('Update done', {
							position: 'top-center',
							autoClose: 2000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: false,
							draggable: false,
							progress: undefined,
						});
						closeForm();
					}
					console.log('response', result);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		}
	};
	const addNewCarHandler = (e) => {
		if (!newCar) {
			return;
		}
		setInputValues({ ...inputValues, cars: [...inputValues.cars, newCar] });
		setNewCar('');
	};
	const deleteCarHandler = (idx) => {
		let cars = inputValues.cars;
		cars.splice(idx, 1);
		setInputValues({ ...inputValues, cars: cars });
	};
	return (
		<Grid item sm={8}>
			<div className={styles.vehicles}>
				<form>
					<h3>{vehicle?.name}</h3>

					<label>Current rate: </label>
					<input
						type='number'
						placeholder='Update Vehicle Rate'
						name='rate'
						value={inputValues?.rate}
						onChange={(e) => {
							setInputValues({
								...inputValues,
								rate: e.target.value,
							});
						}}
					/>
				</form>
				<div
					style={{
						border: '1px solid grey',
						margin: '1rem auto',
						padding: '1rem',
					}}
				>
					{inputValues?.cars?.map((car, idx) => {
						return (
							<button
								key={car}
								style={{
									margin: '5px',
									display: 'inline-block',
									padding: '5px ',
								}}
							>
								{car}
								<span
									onClick={(e) => {
										deleteCarHandler(idx);
									}}
								>
									&times;
								</span>
							</button>
						);
					})}
					<div>
						<input
							type='text'
							placeholder='Add new car'
							name='newCar'
							value={newCar}
							onChange={(e) => {
								setNewCar(e.target.value);
							}}
						/>
						<button
							style={{ marginLeft: '2rem' }}
							onClick={addNewCarHandler}
						>
							Add
						</button>
						<ToastContainer />
					</div>
				</div>
				<div>
					<button onClick={updateVehicle}>Save Changes</button>
				</div>
			</div>
		</Grid>
	);
};

export default UpdateCarFleetForm;

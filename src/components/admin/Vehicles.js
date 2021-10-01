import React, { useState, useEffect } from 'react';
import styles from '../../styles/Admin.module.css';
import { Grid } from '@material-ui/core';
import UpdateVehicleForm from './UpdateVehicleForm';
import Modal from './Modal';
const Vehicles = () => {
	const [vehicles, setVehicles] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [itemSelected, setItemSelected] = useState('');
	const onClickHandler = () => {
		setEditMode(true);
	};
	useEffect(() => {
		try {
			fetch('https://shuttlelane.com/api/vehicles')
				.then((res) => res.json())
				.then((result) => {
					setVehicles(result.data);
				})
				.catch((error) => {});
		} catch (error) {}
	}, []);
	return (
		<>
			{editMode && (
				<Modal
					isOpen={editMode}
					onCloseHandler={() => {
						setEditMode(false);
					}}
				>
					<UpdateVehicleForm
						vehicle={itemSelected}
						closeForm={() => {
							setEditMode(false);
						}}
					/>
				</Modal>
			)}
			<Grid item xs={12}>
				<h1 style={{ textAlign: 'center' }}>
					Vehicle Classes and Prices
				</h1>
				<hr />
			</Grid>
			{vehicles?.map((item) => {
				return (
					<Grid item xs={10}>
						<div className={styles.vehicles}>
							<h3>{item.name}</h3>
							<h4>Rate: {item.rate}</h4>
							<div>
								{item.cars.map((car) => {
									return <span>{car}</span>;
								})}
							</div>
							<div>
								<button
									onClick={() => {
										setItemSelected(item);
										onClickHandler();
									}}
								>
									Update
								</button>
							</div>
						</div>
					</Grid>
				);
			})}
		</>
	);
};

export default Vehicles;

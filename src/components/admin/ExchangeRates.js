import React, { useState, useEffect } from 'react';
import styles from '../../styles/Dashboard.module.css';
import ExchangeForm from './ExchangeForm';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Grid } from '@material-ui/core';
import {
	Flight,
	LocalShipping,
	LocalTaxi,
	TransferWithinAStation,
} from '@material-ui/icons';

const card = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '1rem',
	maxWidth: '300px',
	maxHeight: '18vh',
	margin: '10px',
	color: '#f3f3f3',
	borderRadius: '5px',
	boxShadow: '0 0 15px 5px #e7e7e7',
};

//   component
const ExchangeRates = () => {
	const [editMode, setEditMode] = useState(false);
	const [rates, setRates] = useState({});
	const [reload, setReload] = useState(false);
	const onClickHandler = () => {
		setEditMode(true);
	};

	useEffect(() => {
		fetch('https://shuttlelane.herokuapp.com/api/rates')
			.then((res) => res.json())
			.then((data) => {
				console.log('rates', data.data[0]);
				setRates({
					pound: data.data[0].pound,
					euro: data.data[0].euro,
					dollar: data.data[0].dollar,
				});
			})
			.catch((err) => console.log(err));
	}, [reload]);
	return (
		<>
			{editMode && (
				<Modal
					isOpen={editMode}
					onCloseHandler={() => {
						setEditMode(false);
					}}
				>
					<ExchangeForm
						closeForm={(e) => {
							setEditMode(false);
							setReload((prevState) => !prevState);
						}}
					/>
				</Modal>
			)}
			<Grid item xs={12}>
				<button className={styles.button} onClick={onClickHandler}>
					Update Rates
				</button>
			</Grid>
			<Grid item sm={4} xs={10}>
				<div className={styles.purpleBackground} style={card}>
					<div>
						<h1>$ {rates?.dollar}</h1>
						<p>US DOLLARS</p>
					</div>
				</div>
			</Grid>
			<Grid item sm={4} xs={10}>
				<div className={styles.greenBackground} style={card}>
					<div>
						<h1>&euro; {rates?.euro}</h1>
						<p> EURO</p>
					</div>
				</div>
			</Grid>
			<Grid item sm={4} xs={10}>
				<div className={styles.pinkBackground} style={card}>
					<div>
						<h1>&#163; {rates?.pound}</h1>
						<p>BRITISH POUND</p>
					</div>
				</div>
			</Grid>
		</>
	);
};

export default ExchangeRates;

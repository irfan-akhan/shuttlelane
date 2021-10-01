import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import car from '../styles/Carform.module.css';
let date = new Date().toISOString().substr(0, 10);
let initialValues = {
	carType: '',
	pickupAddress: '',
	destination: 'Lagos',
	date: '',
};
const Carhire = () => {
	const [state, setState] = useState(initialValues);
	const router = useRouter();

	// handler
	function onSubmitHandler(e) {
		e.preventDefault();
		let data = { ...state, formType: 'Car-Hire' };

		router.push({
			pathname: '/checkoutCar',
			query: data,
		});
	}
	const [cars, setCars] = useState([]);
	useEffect(() => {
		fetch('https://shuttlelane.com/api/cars')
			.then((res) => res.json())
			.then((response) => {
				// console.log('Cars', response);
				setCars(response.data);
			})
			.catch((err) => {
				// console.log('Request failed', err);
			});
	}, []);

	return (
		<div className={car.form} style={{ borderTopRightRadius: '10px' }}>
			<form
				onSubmit={onSubmitHandler}
				className={car.form}
				id='car_hire'
				style={{ background: 'none' }}
			>
				<input
					required
					placeholder='Pickup Address'
					type='text'
					name='pickupAddress'
					id='pickupAddress'
					value={state.pickupAddress}
					onChange={(e) =>
						setState({ ...state, pickupAddress: e.target.value })
					}
				/>
				<select
					name='carType'
					id='carType'
					value={state.carType}
					required
					onChange={(e) =>
						setState({ ...state, carType: e.target.value })
					}
				>
					<option value='' disabled selected>
						Select Car
					</option>
					{cars.map((item) => {
						return <option value={item.name}>{item.name}</option>;
					})}
				</select>

				<input
					required
					placeholder='Destination Address'
					type='text'
					name='destination'
					id=''
					value={state.destination}
					// onChange={(e) => setState({ ...state, destination: e.target.value })}
				/>
				<input
					required
					type='date'
					min={date}
					name='date'
					id='date'
					value={state.date}
					onChange={(e) =>
						setState({ ...state, date: e.target.value })
					}
				/>
				<button
					type='submit'
					className='btnGrad'
					style={{ display: 'block' }}
				>
					Proceed
				</button>
			</form>
		</div>
	);
};
export default Carhire;

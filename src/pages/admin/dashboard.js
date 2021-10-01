import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import jwt from 'jsonwebtoken';

import AirportTransferBooking from '../../components/admin/AirportTransferBooking';
import PriorityPassBookings from '../../components/admin/PriorityPassBookings';
import CarBooking from '../../components/admin/CarBooking';
import Overview from '../../components/admin/Overview';
import AdminAside from '../../components/admin/AdminAside';
import User from '../../components/admin/User';
import Vehicles from '../../components/admin/Vehicles';
import ExchangeRates from '../../components/admin/ExchangeRates';
import ManageCabinClasses from '../../components/admin/ManageCabinClasses';
import HotelBookings from '../../components/admin/HotelBookings';
import FleetManagementBooking from '../../components/admin/FleetManagementBooking';
import DriverManagement from '../../components/admin/DriverManagement';

import ManageCars from '../../components/admin/ManageCars';
import styles from '../../styles/Dashboard.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// COMPONNENT

const dashboard = () => {
	const router = useRouter();
	const [state, setState] = useState('Overview');
	const [user, setUser] = useState({});

	const [airportBookings, setAirportBookings] = useState([]);
	const [carBookings, setCarBookings] = useState([]);
	const [hotelBookings, setHotelBookings] = useState([]);
	const [priorityBookings, setPriorityBookings] = useState([]);
	const onStateChange = (value) => {
		console.log('value', value);
		setState(value);
	};
	useEffect(() => {
		// Airport Bookings
		const token = localStorage.getItem('token');

		if (!token) {
			localStorage.removeItem('token');
			router.push('/admin');
			return;
		}
		const user = jwt.decode(token);
		console.log('USER', user);

		if (!user) {
			toast.info(
				'Looks like your session has expired, Please login again',
				{
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				}
			);
			localStorage.removeItem('token');
			router.push('/admin');
			return;
		}
		if (user?.role == 'blogger') {
			console.log('not amtvh', user);
			localStorage.removeItem('token');
			router.push('/admin');
			return;
		}
		// else {
		// if (
		// 	!user.role?.includes('admin') &&
		// 	!user.role?.includes('blogger')
		// ) {
		// 	console.log('not amtvh', user);
		// 	localStorage.removeItem('token');
		// 	router.push('/admin');
		// 	return;
		// } else if (user.role?.includes('blogger')) {
		// 	router.push('/admin/blogger');
		// 	return;
		// }
		// }
		// setLoggedUser(user);

		fetch('https://shuttlelane.com/api/booking/airport')
			.then((res) => res.json())
			.then((data) => {
				{
					console.log('IN DASH', data);
					setAirportBookings(data.data);
				}
			})
			.catch((err) => console.log(err));

		// Car Bookings
		fetch('https://shuttlelane.com/api/booking/car')
			.then((res) => res.json())
			.then((data) => {
				{
					console.log('IN car DASh', data.data);
					setCarBookings(data.data);
				}
			})
			.catch((err) => console.log(err));

		// Hotel Bookings
		fetch('https://shuttlelane.com/api/booking/hotel')
			.then((res) => res.json())
			.then((data) => {
				{
					console.log('IN hotel DASh', data.data);
					setHotelBookings(data.data);
				}
			})
			.catch((err) => console.log(err));

		// Priority Pass Bookings
		fetch('https://shuttlelane.com/api/booking/priority')
			.then((res) => res.json())
			.then((data) => {
				{
					console.log('IN priorty DASh', data.data);
					setPriorityBookings(data.data);
				}
			})
			.catch((err) => console.log(err));
		console.log('token', localStorage.getItem('token'));
	}, []);

	return (
		<Grid
			container
			justifyContent='center'
			alignItems='flex-start'
			className={styles.container}
		>
			<Head>
				<title>Management Dashboard | shuttlelane.com</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Grid item sm={2}>
				<AdminAside onStateChange={onStateChange} user={user} />
				<ToastContainer />
			</Grid>
			<Grid item container justifyContent='space-evenly' sm={10}>
				{state == 'Overview' ? (
					<Overview
						bookings={airportBookings}
						carBooking={carBookings}
						hotelBookings={hotelBookings}
						priorityBookings={priorityBookings}
					/>
				) : state?.includes('Hire') ? (
					<ManageCars />
				) : state?.includes('Car') ? (
					<CarBooking />
				) : state?.includes('Cabin') ? (
					<ManageCabinClasses />
				) : state?.includes('Airport') ? (
					<AirportTransferBooking />
				) : state?.includes('Priority') ? (
					<PriorityPassBookings />
				) : state?.includes('Vehicles') ? (
					<Vehicles />
				) : state?.includes('User') ? (
					<User />
				) : state?.includes('Fleet') ? (
					<FleetManagementBooking />
				) : state?.includes('Rates') ? (
					<ExchangeRates />
				) : state?.includes('Hotel') ? (
					<HotelBookings />
				) : state?.includes('Driver') ? (
					<DriverManagement />
				) : (
					<div>Loading..!</div>
				)}
			</Grid>
		</Grid>
	);
};

export default dashboard;

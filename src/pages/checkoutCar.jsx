import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Airport from '../components/AirportNext';
import AirportDropoff from '../components/AirportDropoff';
import Passenger from '../components/Passenger';
import PickCar from '../components/PickCar';
import Contact from '../components/Contact';
import PaymentMethod from '../components/PaymentMethod';
import Rental from '../components/Rental';
import Summary from '../components/Summary';
import CarHire from '../components/CarHireNext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message) => toast(message);

import { Grid } from '@material-ui/core';
import Head from 'next/head';

//   variables
let bookingData = {};

let fields = {};
const currencySymbols = {
	dollar: '$',
	euro: '€',
	pound: '£',
	niera: '₦',
};
const pound = ['United Kingdom'];
const euro = [
	'Azores',
	'the Canaries',
	'Ceuta and Melilla',
	'French Guiana',
	'Guadeloupe',
	'Madeira',
	'Martinique',
	' Mayotte',
	'Réunion',
	'Saint Barthélemy',
	'Saint Pierre and Miquelon',
];
const niera = ['Nigeria'];
const passengerFields = {
	title: '',
	firstName: '',
	lastName: '',
	email: '',
	countryCode: '',
	mobile: '',
};

// HELPER FUNCTIONS

// create Booking
function createBooking(data, router, currency) {
	fetch('https://shuttlelane.herokuapp.com/api/booking/car', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...data,
			currency,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log('result fro server', data);
			toast.success(data.message, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
			const params = `car=${data.data._id}`;
			router.push({
				pathname: '/success',
				query: params,
			});
		})
		.catch((err) => {
			console.log('err in catch', err);
			toast.error(err, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
		});
}

// validate

function validataDate(data) {
	console.log('validate data', data);
	return (
		Object.values(data).includes('') || Object.values(data).includes(' ')
	);
}

// COMPONENT
const CarBooking = () => {
	const [selectedCurrency, setSelectedCurrency] = useState({});
	const [exchangeRates, setExchangeRates] = useState({});
	const [vehicles, setVehicles] = useState([]);
	const router = useRouter();
	useEffect(() => {
		fetch('https://shuttlelane.herokuapp.com/api/cars')
			.then((res) => res.json())
			.then((result) => {
				setVehicles(result.data);
				console.log(result);
			})
			.catch((error) => console.log('error in fetch', error));
		fetch('https://shuttlelane.herokuapp.com/api/rates', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				setExchangeRates(response.data[0]);
			})
			.catch((err) => {
				console.log('Request failed for rates', err);
			});
	}, []);
	useEffect(() => {
		try {
			fetch('https://geolocation-db.com/json/', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			})
				.then((res) => res.json())
				.then((response) => {
					console.log('geo respoinse ', response);
					// setcountry(response.country);
					if (response.country_name) {
						console.log(
							'after check if country from fetch, ',
							response.country_name
						);
						const country = response.country_name;

						if (euro.includes(country)) {
							console.log('country found for euro');
							setSelectedCurrency({
								name: 'euro',
							});
							return;
						}
						if (niera.includes(country)) {
							console.log('country found for niera');
							setSelectedCurrency({
								name: 'niera',
							});
							return;
						}
						if (pound.includes(country)) {
							console.log('country found for pound');
							setSelectedCurrency({
								name: 'pound',
							});
							return;
						}
						if (country == 'India') {
							console.log('country found  INDIA');
							setSelectedCurrency({
								name: 'dollar',
							});
							return;
						} else {
							console.log('country Not found');
							setSelectedCurrency({
								name: 'dollar',
							});
						}
					}
				})
				.catch((err) => {
					console.log('Request failed', err);
					setSelectedCurrency({
						name: 'dollar',
					});
				});
		} catch (err) {
			console.log('trycatch', err);
			setSelectedCurrency({
				name: 'dollar',
			});
		}
	}, []);
	try {
		router.asPath &&
			router.asPath
				.split('?')[1]
				.split('&')
				.forEach((item) => {
					let entry = item.split('=');
					fields[entry[0]] = entry[1].split('+').join(' ');
				});
		console.log('fields', fields);
	} catch (error) {
		console.log('split err', error);
	}

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log(
			'TRYIN GTO CREAT CAR BOOKING',
			bookingData,
			selectedCurrency
		);
		const verified = validataDate(bookingData);
		if (!verified) {
			const response = createBooking(
				bookingData,
				router,
				selectedCurrency.name
			);
			console.log('VACK', response);
			toast.info('Thank you for choosing shuttlelane, Please wait', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
		} else {
			toast.error('Please Provide valid inputs', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
			console.log('validation Error');
		}
	};

	const [data, setData] = useState(fields);
	const [selectedCar, setSelectedCar] = useState(fields.selectedCar || '');
	const [passengerDetails, setPassengerDetails] = useState(passengerFields);

	const carHandler = (e) => {
		setSelectedCar(() => {
			return e.target.value;
		});
	};

	const passengerHandler = (name, value) => {
		console.log(name, value);
		setPassengerDetails((e) => {
			return { ...passengerDetails, [name]: value };
		});
	};

	bookingData = {
		carType: selectedCar,
		...passengerDetails,
		...data,
	};
	const exchangeRate = exchangeRates[selectedCurrency.name] || 1;
	console.log('RATEEEEEEEEEEEEEEEEEEEEEEEEEEE', exchangeRate);

	bookingData['amount'] = isNaN(
		(vehicles.filter((car) => car?.name == bookingData.carType)[0]?.rate *
			parseInt(data.days)) /
			parseInt(exchangeRate)
	)
		? 0.0
		: parseFloat(
				(vehicles.filter((car) => car?.name == bookingData.carType)[0]
					?.rate *
					parseInt(data.days)) /
					parseInt(exchangeRate)
		  ).toFixed(2);
	const currencySymbol = currencySymbols[selectedCurrency.name];

	return (
		<section style={{ width: '80vw', margin: 'auto' }}>
			<Head>
				<title>{bookingData?.formType} service | shuttlelane.com</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Grid container spacing={2} justifyContent='center'>
				<Grid item xs={12} sm={10} md={7} xl={6}>
					<div className='topMargin'>
						<Passenger
							values={passengerDetails}
							handler={passengerHandler}
						/>
					</div>
					<CarHire data={data} setData={setData} />
					<div className='showSummaryDesktop'>
						<Summary
							title='Car Hire'
							amount={bookingData.amount}
							airportAmount={bookingData.amount}
							selectedCurrency={{
								...selectedCurrency,
								rate: exchangeRates[selectedCurrency.name],
							}}
							changeCurrency={setSelectedCurrency}
							exchangeRates={exchangeRates}
							currencySymbol={currencySymbol}
						/>
					</div>

					<button
						onClick={onSubmitHandler}
						type='text'
						style={{ marginTop: '2rem' }}
						className='btnGrad'
					>
						Hire
					</button>
					<ToastContainer />
				</Grid>
				<Grid item xs={12} sm={10} md={4} xl={3}>
					<div className='showSummaryPhone'>
						<Summary
							title='Car Hire'
							amount={bookingData.amount}
							airportAmount={bookingData.amount}
							selectedCurrency={{
								...selectedCurrency,
								rate: exchangeRates[selectedCurrency.name],
							}}
							changeCurrency={setSelectedCurrency}
							exchangeRates={exchangeRates}
							currencySymbol={currencySymbol}
						/>
					</div>
					<Rental />
				</Grid>
				<Grid item xs={12}>
					<Contact />
				</Grid>
			</Grid>
		</section>
	);
};
export default CarBooking;

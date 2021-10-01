import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Airport from '../components/AirportNext';
import AirportDropoff from '../components/AirportDropoff';
import Passenger from '../components/Passenger';
import PickCar from '../components/PickCar';
import PriorityPassNext from '../components/PriorityPassNext';
import Contact from '../components/Contact';
import PaymentMethod from '../components/PaymentMethod';
import Included from '../components/Included';
import Summary from '../components/Summary';

import { Grid } from '@material-ui/core';
import Head from 'next/head';

//   variables
let bookingObj = {};

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

let fields = {
	flightNumber: '',
	date: '',
	time: '',
	mobile: '',
};

const passengerFields = {
	title: '',
	firstName: '',
	lastName: '',
	email: '',
	countryCode: '',
	mobile: '',
};

// COMPONENT
const PriorityPass = () => {
	const [selectedCurrency, setSelectedCurrency] = useState({});
	const [exchangeRates, setExchangeRates] = useState({});
	const [classes, setClasses] = useState([]);
	useEffect(() => {
		try {
			fetch('https://shuttlelane.com/api/priority')
				.then((res) => res.json())
				.then((response) => {
					// console.log('CANIB CLASS FROM', response);
					setClasses(response.data);
				})
				.catch((err) => {
					// console.log('Request failed', err);
				});
			fetch('https://shuttlelane.com/api/rates', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((response) => {
					// console.log(response);
					setExchangeRates(response.data[0]);
				})
				.catch((err) => {
					// console.log('Request failed', err);
				});
		} catch (error) {
			console.log(error);
		}
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
					// console.log('geo respoinse ', response);
					// setcountry(response.country);
					if (response.country_name) {
						// console.log(
						// 	'after check if country from fetch, ',
						// 	response.country_name
						// );
						const country = response.country_name;

						if (euro.includes(country)) {
							// console.log('country found for euro');
							setSelectedCurrency({
								name: 'euro',
							});
							return;
						}
						if (niera.includes(country)) {
							// console.log('country found for niera');
							setSelectedCurrency({
								name: 'niera',
							});
							return;
						}
						if (pound.includes(country)) {
							// console.log('country found for pound');
							setSelectedCurrency({
								name: 'pound',
							});
							return;
						} else {
							// console.log('country Not found');
							setSelectedCurrency({
								name: 'dollar',
							});
						}
					}
				})
				.catch((err) => {
					// console.log('Request failed', err);
					setSelectedCurrency({
						name: 'dollar',
					});
				});
		} catch (err) {
			// console.log('trycatch', err);
			setSelectedCurrency({
				name: 'dollar',
			});
		}
	}, []);
	const router = useRouter();
	try {
		router.asPath
			.split('?')[1]
			.split('&')
			.forEach((item) => {
				let entry = item.split('=');
				fields[entry[0]] = entry[1].split('+').join(' ');
			});
		// console.log('fields', fields);
	} catch (error) {
		// console.log('split err', error);
	}
	const [data, setData] = useState(fields);

	// const [selectedCar, setSelectedCar] = useState(fields.selectedCar || "");
	const [total, setTotal] = useState('');
	const [passengerDetails, setPassengerDetails] = useState(passengerFields);
	const passengerHandler = (name, value) => {
		setPassengerDetails((e) => {
			return { ...passengerDetails, [name]: value };
		});
	};
	const exchangeRate = exchangeRates[selectedCurrency.name] || 1;
	// console.log('RATEEEEEEEEEEEEEEEEEEEEEEEEEEE', exchangeRate);
	bookingObj = {
		...data,
		...passengerDetails,
		amount:
			(
				(parseFloat(data.passengers) *
					classes.filter((cabin) => cabin?.name == data.cabinClass)[0]
						?.rate) /
				parseFloat(exchangeRate)
			).toFixed(2) || 0.0,
	};
	// console.log('CABIN', bookingObj.cabinClass);
	// console.log('passengerDetails', passengerDetails);
	// console.log('Airport Details', data);

	const currencySymbol = currencySymbols[selectedCurrency.name];
	return (
		<section style={{ width: '80vw', margin: 'auto' }}>
			<Head>
				<title>{bookingObj?.formType} service | shuttlelane.com</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Grid container spacing={2} justifyContent='center'>
				<Grid item xs={12} sm={10} md={7} xl={6}>
					<PriorityPassNext data={data} setData={setData} />
					{/* <PickCar handler={carHandler} car={selectedCar} /> */}
					<Passenger
						values={passengerDetails}
						handler={passengerHandler}
					/>
					<div className='showSummaryPhone'>
						<Summary
							title='Priority Pass'
							amount={bookingObj.amount}
							airportAmount={bookingObj.amount}
							selectedCurrency={{
								...selectedCurrency,
								rate: exchangeRates[selectedCurrency.name],
							}}
							changeCurrency={setSelectedCurrency}
							exchangeRates={exchangeRates}
							currencySymbol={currencySymbol}
						/>
					</div>
					<PaymentMethod
						bookingData={{
							...bookingObj,
							currency: selectedCurrency.name,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={10} md={4} xl={3}>
					<div className='showSummaryDesktop'>
						<Summary
							showSummaryPhone
							title='Priority Pass'
							amount={bookingObj.amount}
							airportAmount={bookingObj.amount}
							selectedCurrency={{
								...selectedCurrency,
								rate: exchangeRates[selectedCurrency.name],
							}}
							changeCurrency={setSelectedCurrency}
							exchangeRates={exchangeRates}
							currencySymbol={currencySymbol}
						/>
					</div>
					<Included />
				</Grid>
				{/* <Grid item xs={12} sm={10} md={7} xl={6}>
				</Grid> */}

				{/* <Grid item xs={12} sm={10} md={4} xl={3}>
				</Grid> */}
				<Grid item xs={12}>
					<Contact />
				</Grid>
			</Grid>
		</section>
	);
};
export default PriorityPass;

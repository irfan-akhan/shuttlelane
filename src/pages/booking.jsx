import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Airport from '../components/AirportNext';
import AirportDropoff from '../components/AirportDropoff';
import Passenger from '../components/Passenger';
import PickCar from '../components/PickCar';
import Contact from '../components/Contact';
import PaymentMethod from '../components/PaymentMethod';
import Included from '../components/Included';
import Summary from '../components/Summary';
import { Grid } from '@material-ui/core';
const style = {
	display: 'none',
	// Adding media querry..
	'@media (max-width: 500px)': {
		display: 'block',
	},
};
//   variables
let bookingObj = {};
let fields = {
	time: '',
};
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
// COMPONENT
const Booking = () => {
	const [carRates, setCarRates] = useState([]);
	const [selectedCurrency, setSelectedCurrency] = useState({});
	const [exchangeRates, setExchangeRates] = useState({});
	const [cabinClasses, setCabinClasses] = useState([]);
	const [isPriorityPass, setIsPriorityPass] = useState(false);
	const [priorityPassCount, setPriorityPassCount] = useState('1');
	const [selectedCabinClass, setSelectedCabinClass] = useState(null);
	useEffect(() => {
		fetch('https://shuttlelane.com/api/priority')
			.then((res) => res.json())
			.then((response) => {
				// console.log('CABIN CLASS FROM', response);
				setCabinClasses(response.data);
			})
			.catch((err) => {
				// console.log('Request failed', err);
			});
		fetch('https://shuttlelane.com/api/vehicles', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((response) => {
				// console.log(response);
				setCarRates(response.data);
			})
			.catch((err) => {
				// console.log('vehicles request failed inner catch', err);
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
				// console.log('rates Request failed inner catch', err);
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
					// console.log('geolocation Request failed', err);
					setSelectedCurrency({
						name: 'dollar',
					});
				});
		} catch (err) {
			// console.log('outter geolocation trycatch', err);
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
		if (fields.formType == 'Airport-Pickup') {
			// console.log('ADD FLIGHTNUBER FIELD');
			fields['flightNumber'] = '';
		}
	} catch (error) {
		// console.log('booking router split err', error);
	}
	const [data, setData] = useState(fields);
	const [selectedCar, setSelectedCar] = useState(fields.selectedCar || '');
	const [passengerDetails, setPassengerDetails] = useState(passengerFields);

	const carHandler = (e) => {
		setSelectedCar(() => {
			return e.target.value;
		});
	};

	const passengerHandler = (name, value) => {
		setPassengerDetails((e) => {
			return { ...passengerDetails, [name]: value };
		});
	};
	const exchangeRate = exchangeRates[selectedCurrency.name] || 1;
	// console.log('RATEEEEEEEEEEEEEEEEEEEEEEEEEEE', exchangeRate);
	const airportAmount = isNaN(
		parseFloat(carRates.filter((car) => car.name == selectedCar)[0]?.rate) /
			parseFloat(exchangeRate)
	)
		? 0.0
		: parseFloat(
				(
					parseFloat(
						carRates.filter((car) => car.name == selectedCar)[0]
							?.rate
					) / parseFloat(exchangeRate)
				).toFixed(2)
		  );
	let priorityPassAmount = isPriorityPass
		? isNaN(
				parseFloat(
					cabinClasses.filter(
						(cabin) => cabin.name == selectedCabinClass
					)[0]?.rate
				) / parseFloat(exchangeRate)
		  )
			? 0.0
			: parseFloat(
					(
						parseFloat(
							cabinClasses.filter(
								(cabin) => cabin.name == selectedCabinClass
							)[0]?.rate
						) / parseFloat(exchangeRate)
					).toFixed(2)
			  )
		: 0.0;
	priorityPassAmount = priorityPassAmount * parseInt(priorityPassCount);
	console.log('priorityPassAmount i bookin', priorityPassAmount);
	console.log('priorityPassCount i bookin', priorityPassCount);
	bookingObj = {
		carType: selectedCar,
		...passengerDetails,
		...data,
		isPriorityPass: isPriorityPass,
		priorityPassCount: priorityPassCount,
		amount: parseFloat(airportAmount + priorityPassAmount).toFixed(2),
		carCapacity: carRates?.filter((car) => car.name == selectedCar)[0]
			?.capacity,
		carLuggage: carRates?.filter((car) => car.name == selectedCar)[0]
			?.luggage,
	};
	isPriorityPass && (bookingObj.cabinClass = selectedCabinClass);

	// console.log(bookingObj);
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
				<Grid item xs={12} sm={10} md={8} xl={6}>
					{data.formType === 'Airport-Dropoff' ? (
						<AirportDropoff
							data={data}
							setData={setData}
							carCapacity={bookingObj.carCapacity || 10}
						/>
					) : data.formType === 'Airport-Pickup' ? (
						<Airport
							data={data}
							setData={setData}
							carCapacity={bookingObj.carCapacity || 10}
						/>
					) : (
						<div> Loading</div>
					)}
					<PickCar
						selectedCurrency={{
							...selectedCurrency,
							rate: exchangeRates[selectedCurrency.name],
						}}
						handler={carHandler}
						car={selectedCar}
						currencySymbol={currencySymbol}
					/>
					<Passenger
						values={passengerDetails}
						handler={passengerHandler}
					/>
					<div className='showSummaryPhone'>
						<Summary
							title='Airport Transfer'
							data={data}
							priorityPassAmount={
								isPriorityPass
									? priorityPassAmount.toFixed(2)
									: 0
							}
							priorityPassCount={priorityPassCount}
							setPriorityPassCount={(value) => {
								setPriorityPassCount(value);
							}}
							airportAmount={airportAmount.toFixed(2)}
							amount={bookingObj.amount}
							isPriorityPass={isPriorityPass}
							setIsPriorityPass={() => {
								setIsPriorityPass((prev) => !prev);
								setSelectedCabinClass('');
								setPriorityPassCount(1);
							}}
							setSelectedCabinClass={(value) => {
								setSelectedCabinClass(value);
							}}
							selectedCabinClass={selectedCabinClass}
							selectedCurrency={{
								...selectedCurrency,
								rate: exchangeRates[selectedCurrency.name],
							}}
							changeCurrency={setSelectedCurrency}
							exchangeRates={exchangeRates}
							currencySymbol={currencySymbol}
							cabinClasses={cabinClasses}
							setData={setData}
						/>
					</div>
					<PaymentMethod
						bookingData={{
							...bookingObj,
							currency: selectedCurrency?.name,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={10} md={3} xl={3}>
					<div className='showSummaryDesktop'>
						<Summary
							title='Airport Transfer'
							data={data}
							priorityPassAmount={
								isPriorityPass
									? priorityPassAmount.toFixed(2)
									: 0
							}
							airportAmount={airportAmount.toFixed(2)}
							amount={bookingObj.amount}
							isPriorityPass={isPriorityPass}
							setIsPriorityPass={() => {
								setIsPriorityPass((prev) => !prev);
								setSelectedCabinClass('');
							}}
							// setSelectedCabinClass={setSelectedCabinClass}
							setSelectedCabinClass={(value) => {
								setSelectedCabinClass(value);
							}}
							selectedCabinClass={selectedCabinClass}
							selectedCurrency={{
								...selectedCurrency,
								rate: exchangeRates[selectedCurrency.name],
							}}
							changeCurrency={setSelectedCurrency}
							exchangeRates={exchangeRates}
							currencySymbol={currencySymbol}
							cabinClasses={cabinClasses}
							setData={setData}
						/>
					</div>
					<Included formType={data?.formType} />
				</Grid>
				{/* <Grid item xs={12} sm={10} md={8} xl={6}>
				</Grid> */}
				{/* <Grid item xs={12} sm={10} md={3} xl={3}>
				</Grid> */}

				<Grid item xs={12}>
					<Contact />
				</Grid>
			</Grid>
		</section>
	);
};
export default Booking;

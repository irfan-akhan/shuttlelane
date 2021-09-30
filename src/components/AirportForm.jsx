import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import form from '../styles/Carform.module.css';

let intialPickupValues = {
	pickupAirport: '',
	dropoffAddress: '',
	arrivalDate: '',
	passengers: null,
};

let date = new Date().toISOString().substr(0, 10);

let intialDropoffValues = {
	dropoffAirport: '',
	pickupAddress: '',
	pickupDate: '',
	passengers: null,
};

const AirportForm = () => {
	// console.log(date);
	const router = useRouter();
	let [formType, setFormType] = useState('Airport-Pickup');
	let [airportPickupValues, setAirportPickupValues] =
		useState(intialPickupValues);
	let [airportDropoffValues, setAirportDropoffValues] =
		useState(intialDropoffValues);

	function onChangeHandler(e) {
		e.persist();
		// console.log(e.target);
		formType === 'Airport-Pickup'
			? setAirportPickupValues({
					...airportPickupValues,
					[e.target.id]: e.target.value,
			  })
			: setAirportDropoffValues({
					...airportDropoffValues,
					[e.target.id]: e.target.value,
			  });
		// console.log("airportPickupValues:", airportPickupValues);
		// console.log("airportDropoffValues:", airportDropoffValues);
	}
	function onDropoffSubmitHandler(e) {
		e.preventDefault();
		// console.log('airportDropoffValues:', airportDropoffValues);
		let data = { ...airportDropoffValues, formType: formType };

		// console.log('data in Dropoff', data);
		router.push({
			pathname: '/booking',
			query: data,
		});
	}
	function onPickupSubmitHandler(e) {
		e.preventDefault();
		// console.log('airportPickupValues:', airportPickupValues);
		let data = { ...airportPickupValues, formType: formType };
		router.push({
			pathname: '/booking',
			query: data,
		});
	}

	return (
		<div style={{ width: '100%' }}>
			<div className={form.radios} style={{ paddingTop: '1rem' }}>
				<label
					htmlFor='Airport-Pickup'
					style={{
						color: '#fff',
						paddingLeft: '1rem',
						fontSize: '.9rem',
					}}
				>
					Airport Pickup
				</label>
				<input
					onClick={(e) => {
						// console.log('Pickup');
						setFormType('Airport-Pickup');

						setAirportDropoffValues({ ...intialDropoffValues });
						setAirportPickupValues({ ...intialPickupValues });
					}}
					type='radio'
					name='Pickup'
					id='Airport-Pickup'
					value='Airport-Pickup'
					defaultChecked={formType == 'Airport-Pickup' ? true : false}
				/>
				<label
					htmlFor='Airport-Dropoff'
					style={{
						color: '#fff',
						paddingLeft: '1rem',
						fontSize: '.9rem',
					}}
				>
					Airport Dropoff
				</label>
				<input
					onClick={(e) => {
						// console.log('Dropoff');
						setFormType('Airport-Dropoff');
						setAirportDropoffValues({ ...intialDropoffValues });
						setAirportPickupValues({ ...intialPickupValues });
					}}
					type='radio'
					name='Pickup'
					id='Airport-Dropoff'
					value='Airport-Dropoff'
					defaultChecked={
						formType == 'Airport-Dropoff' ? true : false
					}
				/>
			</div>

			{formType === 'Airport-Dropoff' ? (
				<div>
					<form
						onSubmit={onDropoffSubmitHandler}
						className={form.form}
					>
						<input
							type='text'
							onChange={onChangeHandler}
							name='pickupAddress'
							id='pickupAddress'
							placeholder='Pick-up Address'
							value={airportDropoffValues.pickupAddress}
						/>
						<select
							name='dropoffAirport'
							onChange={onChangeHandler}
							id='dropoffAirport'
						>
							<option selected disabled value='null' id='null'>
								Select Dropoff Airport
							</option>
							<option value='Murtala Muhammed International Airport'>
								Murtala Muhammed International Airport
							</option>
							<option value='Murtala Muhammed Domestic Airport'>
								Murtala Muhammed Domestic Airport
							</option>
							{/* <option value="Port Harcourt International Airport">
                Port Harcourt International Airport
              </option>
              <option value="Nnamdi Azikwe International Airport">
                Nnamdi Azikwe International Airport
              </option>
              <option value="Kotoka International Airport">
                Kotoka International Airport
              </option>
              <option value="Kumasi Airport">Kumasi Airport</option>
              <option value="London Heathrow Airport">
                London Heathrow Airport
              </option>
              <option value="Gatwick Airport">Gatwick Airport</option>
              <option value="London City Airport">London City Airport</option> */}
						</select>
						<input
							required
							type='text'
							onChange={onChangeHandler}
							id='pickupDate'
							placeholder='Pickup Date'
							min={date}
							onFocus={(e) => {
								e.target.type = 'date';
							}}
							style={{ textAlign: 'left', fontSize: '16.2px' }}
						/>

						<input
							type='number'
							name='passengers'
							onChange={onChangeHandler}
							id='passengers'
							placeholder='Number of Passengers'
							min='1'
							max='10'
							value={airportDropoffValues.passengers}
						/>

						<button className='btnGrad' type='submit'>
							Make Booking
						</button>
					</form>
				</div>
			) : (
				<div className={form.formMain}>
					<form
						onSubmit={onPickupSubmitHandler}
						className={form.form}
						id='airport'
					>
						<select
							required
							onChange={onChangeHandler}
							name='pickupAirport'
							id='pickupAirport'
						>
							<option selected disabled value=''>
								Select Pickup Airport
							</option>
							<option value='Murtala Muhammed International Airport'>
								Murtala Muhammed International Airport
							</option>
							<option value='Murtala Muhammed Domestic Airport'>
								Murtala Muhammed Domestic Airport
							</option>
							{/* <option value="Port Harcourt International Airport">
                Port Harcourt International Airport
              </option>
              <option value="Nnamdi Azikwe International Airport">
                Nnamdi Azikwe International Airport
              </option>
              <option value="Kotoka International Airport">
                Kotoka International Airport
              </option>
              <option value="Kumasi Airport">Kumasi Airport</option>
              <option value="London Heathrow Airport">
                London Heathrow Airport
              </option>
              <option value="Gatwick Airport">Gatwick Airport</option>
              <option value="London City Airport">London City Airport</option> */}
						</select>
						<input
							required
							type='text'
							name='dropAddress'
							placeholder='Drop-off Address'
							id='dropoffAddress'
							onChange={onChangeHandler}
							value={airportPickupValues.dropoffAddress}
						/>
						<input
							required
							type='text'
							placeholder='Arrival Date'
							onFocus={(e) => {
								e.target.type = 'date';
							}}
							id='arrivalDate'
							onChange={onChangeHandler}
							value={airportPickupValues.arrivalDate}
							style={{ textAlign: 'left', fontSize: '16.2px' }}
							min={date}
						/>

						<input
							required
							type='number'
							name='passengers'
							min='1'
							max='10'
							onChange={onChangeHandler}
							value={airportPickupValues.passengers}
							id='passengers'
							placeholder='Number of Passengers'
						/>

						<button className='btnGrad' type='submit'>
							Make Booking
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default AirportForm;

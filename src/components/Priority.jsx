import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import car from '../styles/Carform.module.css';

let initialValues = {
	service: '',
	airport: '',
	passengers: 'Lagos',
	cabinClass: '',
};
const Priority = () => {
	const [state, setState] = useState(initialValues);
	const router = useRouter();

	// handler
	function onSubmitHandler(e) {
		e.preventDefault();
		let data = { ...state, formType: 'Priority-Pass' };

		router.push({
			pathname: '/PriorityPass',
			query: data,
		});
		return;
	}
	return (
		<div className={car.form} style={{ borderTopRightRadius: '10px' }}>
			<form
				onSubmit={onSubmitHandler}
				className={car.form}
				id='pass'
				style={{ background: 'none' }}
			>
				<select
					name='service'
					onChange={(e) =>
						setState({ ...state, service: e.target.value })
					}
					id=''
					required
				>
					<option selected disabled>
						Select Service
					</option>
					<option value='Arrival'>Arrival Protocol Service </option>
					<option value='Departure'>
						Departure Protocol Service{' '}
					</option>
				</select>
				<select
					name='airport'
					id='airport'
					onChange={(e) =>
						setState({ ...state, airport: e.target.value })
					}
					required
				>
					<option value='' selected disabled>
						Select Airport
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
					placeholder='Number of Passengers'
					min='1'
					max='100'
					type='number'
					name='passengers'
					id='passengers'
					required
					value={state.passengers}
					onChange={(e) =>
						setState({ ...state, passengers: e.target.value })
					}
				/>
				<select
					name='cabinClass'
					value={state.cabinClass}
					onChange={(e) =>
						setState({ ...state, cabinClass: e.target.value })
					}
					required
				>
					<option value='' selected disabled>
						Select Cabin Class
					</option>

					<option value='First Class'>First Class</option>
					<option value='Business Class'>Business Class </option>
					<option value='Premium Economy'>Premium Economy</option>
					<option value='Economy'>Economy</option>
				</select>
				<button type='submit' className='btnGrad'>
					Proceed
				</button>
			</form>
		</div>
	);
};
export default Priority;

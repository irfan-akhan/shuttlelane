import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import { useRouter } from 'next/router';
import {
	Person,
	AccessTime,
	Mail,
	DateRange,
	DriveEta,
	CalendarToday,
} from '@material-ui/icons';
import next from '../styles/Next.module.css';
let date = new Date().toISOString().substr(0, 10);
const CarHireNext = ({ data, setData }) => {
	// console.log('DROPOFFFFFFFFFFFF..', data);
	const onChangeHandler = (e) => {
		// console.log('Nameeeee', e.target.name, e.target.value);
		setData({ ...data, [e.target.name]: e.target.value });
	};

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
		<div>
			<Card
				className={next.checkoutForm}
				style={{ backgroundColor: '#fff', marginTop: '2rem' }}
			>
				<h4
					style={{
						margin: '0',
						paddingLeft: '1.4rem',
						textTransform: 'uppercase',
					}}
					className='typeCenter'
				>
					Car Hire Details
				</h4>
				<hr />
				<form className='checkoutForm'>
					<div className='formGroup'>
						<div className='inputControl'>
							<span>
								<DriveEta />
							</span>
							<select
								name='carType'
								id='carType'
								value={data.carType}
								onChange={onChangeHandler}
								required
							>
								<option value='' disabled selected>
									Select Car
								</option>
								{cars.map((item) => {
									return (
										<option value={item.name}>
											{item.name}
										</option>
									);
								})}
							</select>
						</div>

						<div className='inputControl'>
							<span>
								<DateRange />
							</span>
							<input
								type='date'
								name='date'
								min={date}
								placeholder='Date'
								id=''
								value={data.date}
								onChange={onChangeHandler}
							/>
						</div>
					</div>
					<div className='formGroup'>
						<div className='inputControl'>
							<span>
								<Mail />
							</span>
							<input
								type='text'
								placeholder='Destination'
								name='destination'
								id=''
								value={data.destination}
								onChange={onChangeHandler}
							/>
						</div>

						<div className='inputControl'>
							<span>
								<Person />
							</span>
							<input
								type='text'
								placeholder='Pickup Address'
								name='pickupAddress'
								id=''
								value={data.pickupAddress}
								onChange={onChangeHandler}
							/>
						</div>
					</div>
					<div className='formGroup'>
						<div className='inputControl'>
							<span>
								<CalendarToday />
							</span>
							<input
								type='number'
								name='days'
								min='1'
								max='100'
								placeholder='Number of Days'
								id=''
								required
								value={data.days}
								onChange={onChangeHandler}
							/>
						</div>
						<div className='inputControl'>
							<span>
								<AccessTime />
							</span>
							<input
								type='time'
								name='time'
								id=''
								value={data.time}
								onChange={onChangeHandler}
							/>
						</div>
					</div>
				</form>
			</Card>
		</div>
	);
};
export default CarHireNext;

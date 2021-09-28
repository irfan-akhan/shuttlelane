import { Card, Grid, Typography } from '@material-ui/core';
import { Person, Work } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import pick from '../styles/Pick.module.css';
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const PickCar = ({ car, handler, selectedCurrency, currencySymbol }) => {
	console.log('selectedCurrency in pickcar:- ', selectedCurrency);

	const [vehicles, setVehicles] = useState([]);
	useEffect(() => {
		fetch('https://shuttlelane.herokuapp.com/api/vehicles', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((result) => {
				console.log('response from server', result);
				setVehicles(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div style={{ margin: '1rem 0' }} className={pick.component}>
			<div
				style={{
					backgroundColor: '#fff',
					borderBottom: '1px solid #212121',
					padding: '.5rem 1.5rem',
				}}
			>
				<h4
					style={{
						margin: '0',
						padding: '0',
						textTransform: 'uppercase',
					}}
					className='typeCenter'
				>
					Pick Your Car
				</h4>
			</div>

			{/* Economy  */}

			{vehicles?.map((vehicle) => {
				return (
					<Card className={pick.carCard} key={vehicle.name}>
						<div className={pick.image}>
							<img
								src={`${prefix}/assets/images/${vehicle.name}.png`}
								alt=''
							/>
						</div>
						<div className={pick.description}>
							<Typography variant='h6'>{vehicle.name}</Typography>
							<div className={pick.details}>
								<span
									style={{
										marginRight: '.4rem',
									}}
								>
									<Person fontSize='small' />
									{vehicle?.capacity}
								</span>
								<span>
									<Work fontSize='small' />
									{vehicle?.luggage}
								</span>
							</div>
							<Typography
								variant='body1'
								style={{ opacity: '.7' }}
							>
								{vehicle?.cars.map((car) => car + ', ')} etc
							</Typography>
						</div>
						<div className={pick.buttons}>
							<Typography
								variant='subtitle1'
								style={{ fontWeight: 'bolder' }}
							>
								{currencySymbol}
								{selectedCurrency.rate
									? (
											parseInt(vehicle.rate) /
											parseInt(selectedCurrency.rate)
									  )
											.toFixed(2)
											.toLocaleString()
									: parseInt(vehicle.rate).toLocaleString()}
							</Typography>
							<button
								value={vehicle.name}
								onClick={handler}
								className='btnNotSelected'
								style={{
									backgroundColor:
										car === vehicle.name ? '#e3b645' : '',
									fontWeight:
										car === vehicle.name ? 'bold' : '',
								}}
							>
								{car === vehicle.name ? 'Selected' : 'Select'}
							</button>
						</div>
					</Card>
				);
			})}
		</div>
	);
};
export default PickCar;

// import { Grid } from '@material-ui/core';
import styles from '../styles/Summary.module.css';
import { useState, useEffect } from 'react';

const Summary = ({
	amount,
	title,
	subTotal,
	selectedCurrency,
	changeCurrency,
	exchangeRates,
	currencySymbol,
	cabinClasses,
	data,
	isPriorityPass,
	setIsPriorityPass,
	setSelectedCabinClass,
	selectedCabinClass,
	priorityPassAmount,
	airportAmount,
}) => {
	console.log(priorityPassAmount, '+', airportAmount, '=', amount);
	const onChangeHandler = (e) => {
		changeCurrency({
			name: e.target.value,
		});
	};
	return (
		<div className={styles.card}>
			<h4>Booking Summary</h4>
			<div>
				<p>
					<span>{title}</span>
					<span>
						{currencySymbol}&nbsp;
						{airportAmount.toString().length > 6
							? airportAmount.slice(0, 1) +
							  ',' +
							  airportAmount.slice(1)
							: airportAmount}
					</span>
				</p>
				{data?.formType?.includes('Airport') ? (
					<div className=''>
						<div className={styles.add}>
							<div style={{ margin: '5px 0' }}>
								<input
									type='checkbox'
									name='priority'
									checked={isPriorityPass}
									value={isPriorityPass}
									id='priority'
									onChange={setIsPriorityPass}
								/>
								<label
									htmlFor='priority'
									style={{ fontSize: '1rem' }}
								>
									Add Priority Pass
								</label>
							</div>
							{isPriorityPass && (
								<span style={{ opacity: '0.8' }}>
									{currencySymbol}&nbsp;
									{priorityPassAmount.toString().lenght > 6
										? priorityPassAmount
												.toString()
												.slice(0, 1) +
										  ',' +
										  priorityPassAmount.toString().slice(1)
										: priorityPassAmount}
								</span>
							)}
						</div>
						{isPriorityPass === true ? (
							<select
								style={{ width: '80%', margin: '0' }}
								onChange={(e) =>
									setSelectedCabinClass(e.target.value)
								}
							>
								<option selected disabled>
									Select Cabin Class
								</option>
								{cabinClasses.map((item, idx) => {
									return (
										<option key={idx} value={item.name}>
											{item.name}
										</option>
									);
								})}
							</select>
						) : (
							''
						)}
					</div>
				) : (
					''
				)}

				<p className={styles.total}>
					<span>Total</span>
					<span>
						{currencySymbol}&nbsp;
						{amount.toString().length > 6
							? amount.toString().slice(0, 1) +
							  ',' +
							  amount.toString().slice(1)
							: amount}
					</span>
				</p>
				<select
					name='currency'
					id='currency'
					value={selectedCurrency.name}
					onChange={onChangeHandler}
				>
					<option value='niera'>NGN &#8358; </option>

					<option value='euro'>EUR &euro;</option>

					<option value='pound'>GBP &#163;</option>

					<option value='dollar'>USD $</option>
				</select>
			</div>
		</div>
	);
};
export default Summary;
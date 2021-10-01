import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Modal from './Modal';
import HotelBookingsForm from './HotelBookingsForm';
import styles from '../../styles/Dashboard.module.css';

const HotelBooking = () => {
	const [bookings, setBookings] = useState([]);
	useEffect(() => {
		fetch('https://shuttlelane.com/api/booking/hotel')
			.then((res) => res.json())
			.then((data) => {
				setBookings(data.data);
			})
			.catch((err) => console.log(err));
	}, []);
	const [editMode, setEditMode] = useState(false);
	const onClickHandler = () => {
		setEditMode(true);
	};
	return (
		<>
			{editMode && (
				<Modal
					isOpen={editMode}
					onCloseHandler={() => {
						setEditMode(false);
					}}
				>
					<HotelBookingsForm
						closeForm={() => {
							setEditMode(false);
						}}
					/>
				</Modal>
			)}
			<Grid item xs={12}>
				<main style={{ width: '98%' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							marginBottom: '1rem',
						}}
					>
						<h3>Existing Bookings</h3>
						<button
							className={styles.button}
							onClick={onClickHandler}
						>
							Add Hotel
						</button>
					</div>

					<table className={styles.table}>
						<thead style={{ backgroundColor: 'red' }}>
							<tr className={styles.theading}>
								<th
									style={{
										textAlign: 'start',
										paddingLeft: '15px',
									}}
								>
									#
								</th>
								<th style={{ textAlign: 'start' }}>
									Booking reference
								</th>
								<th style={{ textAlign: 'start' }}>Contact</th>
								<th style={{ textAlign: 'start' }}>
									Hotel Details
								</th>
								<th style={{ textAlign: 'start' }}>
									Booking Date
								</th>
								<th style={{ textAlign: 'start' }}>
									Service Status
								</th>
							</tr>
						</thead>
						<tbody className={styles.tableContent}>
							{bookings?.map((item, idx) => {
								return (
									<tr key={item.bookingReference}>
										<td
											style={{
												marginRight: '15px',
												paddingLeft: '5px',
												display: 'inline-block',
											}}
										>
											{++idx}
										</td>
										<td>{item.bookingReference}</td>

										<td>
											<p>
												<strong>Name:&nbsp;</strong>
												<span>
													{item?.firstName} &nbsp;
												</span>
												<span>{item?.lastName}</span>
											</p>
											<p>
												<strong>Mobile:&nbsp;</strong>
												<span>{item?.number}</span>
											</p>
											<p>
												<strong>Position:&nbsp;</strong>
												<span>{item?.position}</span>
											</p>
										</td>

										<td>
											<p>
												<strong>
													Hotel Name:&nbsp;
												</strong>
												<span>{item?.hotelName}</span>
											</p>
											<p>
												<strong>Location:&nbsp;</strong>
												<span>{item?.location}</span>
											</p>
										</td>
										<td>
											{item.createdAt.slice(0, 10)} <br />
										</td>
										<td>Pending</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</main>
			</Grid>
		</>
	);
};

export default HotelBooking;

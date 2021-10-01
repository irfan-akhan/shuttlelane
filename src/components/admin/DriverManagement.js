import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import FleetBookingForm from './FleetBookingForm';
import Modal from './Modal';
import styles from '../../styles/Dashboard.module.css';

const DriverManagement = () => {
	const [drivers, setDrivers] = useState([]);
	useEffect(() => {
		fetch('https://shuttlelane.com/api/driver')
			.then((response) => response.json())
			.then((result) => {
				setDrivers(result.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<Grid item sm={12}>
				<h2
					style={{
						textAlign: 'center',
						color: '#554986',
					}}
				>
					Driver Management Overview
				</h2>
			</Grid>
			{drivers && drivers.length > 0 ? (
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
						</div>

						<table className={styles.table}>
							<thead style={{ backgroundColor: 'red' }}>
								<tr className={styles.theading}>
									<th>#</th>
									<th>Booking Reference</th>
									<th>Driver Details</th>
									<th>Car Details</th>
									<th>Emergency Contact Details</th>
									<th>Booking Date</th>
								</tr>
							</thead>
							<tbody className={styles.tableContent}>
								{drivers.map((driver, idx) => {
									return (
										<tr>
											<td>{idx + 1}</td>
											<td>{driver.bookingReference}</td>
											<td>
												<p>
													<strong>Name:</strong>

													{`${driver.firstName} ${driver.middleName} ${driver.lastName}`}
												</p>
												<p>
													<strong>Email:</strong>
													{driver.email}
												</p>
												<p>
													<strong>Mobile:</strong>
													{`${driver.mobile} ${driver.altMobile} `}
												</p>
												<p>
													<strong>Address:</strong>
													{driver.address}
												</p>
												<p>
													<strong>City:</strong>
													{driver.city}
												</p>
												<p>
													<strong>Country:</strong>
													{driver.country}
												</p>
											</td>
											<td>
												<p>
													<strong>Name:</strong>
													{driver.carName}
												</p>
												<p>
													<strong>Model: </strong>
													{driver.carModel}
												</p>
												<p>
													<strong>Type: </strong>
													{driver.carType}
												</p>
												<p>
													<strong>
														Manufactured Year:
													</strong>
													{driver.carYear}
												</p>
											</td>
											<td>
												<p>
													<strong>Name:</strong>
													{`${driver.eFirstName} ${driver.eMiddleName} ${driver.eLastName}`}
												</p>
												<p>
													<strong>Email:</strong>
													{driver.eEmail}
												</p>
												<p>
													<strong>Phone:</strong>
													{driver.eMobile}
												</p>
											</td>
											<td>
												{driver?.createdAt.slice(0, 10)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</main>
				</Grid>
			) : (
				<Grid item>
					<h2 style={{ color: 'red' }}>No Bookings Yet</h2>
				</Grid>
			)}
		</>
	);
};

export default DriverManagement;

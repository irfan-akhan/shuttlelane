import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';

import styles from '../../styles/Dashboard.module.css';
import AirportBookingForm from './AirportBookingForm';
import Modal from './Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inputStyles = {
	padding: '10px',
	margin: '1rem',
	border: '1px solid #c7c7c7',
	borderRadius: '3px',
};
const currencySymbols = {
	dollar: '$',
	euro: '€',
	pound: '£',
	niera: '₦',
};

const AirportTransferBooking = () => {
	const [updateFields, setUpdateFields] = useState({
		name: '',
		mobile: '',
		plateNumber: '',
		color: '',
		type: '',
	});
	const [bookings, setBookings] = useState([]);
	const [selectedItem, setSelectedItem] = useState();
	const [reload, setReload] = useState(false);
	const updateModalRef = useRef(null);
	const [editMode, setEditMode] = useState(false);
	useEffect(() => {
		fetch('https://shuttlelane.com/api/booking/airport')
			.then((res) => res.json())
			.then((data) => {
				setBookings(data.data);
			})
			.catch((err) => {});
	}, [reload]);
	const updateModalToggler = (e) => {
		setUpdateFields({
			name: '',
			mobile: '',
			plateNumber: '',
			color: '',
			type: '',
		});
		if (updateModalRef.current.style.display != 'none') {
			updateModalRef.current.style.display = 'none';
		} else {
			updateModalRef.current.style.display = 'block';
		}
	};
	const onChangeHandler = (e) => {
		setUpdateFields({ ...updateFields, [e.target.name]: e.target.value });
	};
	const onClickHandler = () => {
		setEditMode(true);
	};
	const updateBooking = (e) => {
		toast.info(`Please wait, Update in progress`, {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
		});

		let data = {
			serviceStatus: updateFields.status,
			assignedDriver: [
				{
					name: updateFields.name,
					mobile: updateFields.mobile,
				},
			],
			assignedCar: [
				{
					plateNumber: updateFields.plateNumber,
					color: updateFields.color,
					type: updateFields.type,
				},
			],
		};
		let id = selectedItem._id;

		fetch(`https://shuttlelane.com/api/booking/airport/${id}`, {
			method: 'PUT',
			headers: {
				// wan ya illl call you back
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.data) {
					toast.success(result.message, {
						position: 'top-center',
						autoClose: 2000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
					});
				}
				updateModalToggler();
				setReload(!reload);
			})
			.catch((err) => {
				toast.error(err, {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
				});
			});
	};
	const updateStatus = (e) => {
		toast.info(`Please Wait, update in progress`, {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
		});
		let status = e.target.innerText.trim();
		const data = { serviceStatus: status };
		fetch(`https://shuttlelane.com/api/booking/airport/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.data) {
					toast.success(result.message, {
						position: 'top-center',
						autoClose: 2000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
					});
				}
				statusModalToggler();
				setReload(!reload);
			})
			.catch((err) => {
				toast.error('err', {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
				});
			});
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
					<AirportBookingForm
						closeForm={(e) => {
							setEditMode(false);
						}}
					/>
				</Modal>
			)}

			<Grid item xs={12}>
				<main
					style={{
						width: '98%',
					}}
				>
					<div
						ref={updateModalRef}
						className={styles.statusModal}
						style={{ display: 'none' }}
					>
						<h3>update status </h3>
						<h2 onClick={updateModalToggler}>&times;</h2>
						<div>
							<div style={{ display: 'inline-block' }}>
								<button
									className={styles.button}
									style={{ padding: '12px', margin: '5px' }}
									onClick={(e) => {
										setUpdateFields({
											...updateFields,
											status: 'Pending',
										});
									}}
								>
									Pending
								</button>
								<h5>
									{updateFields &&
									updateFields.status == 'Pending'
										? 'selected'
										: null}
								</h5>
							</div>

							<div style={{ display: 'inline-block' }}>
								<button
									className={styles.button}
									style={{
										padding: '12px',
										margin: '5px',
										backgroundColor: 'teal',
									}}
									onClick={(e) => {
										setUpdateFields({
											...updateFields,
											status: 'Approved',
										});
									}}
								>
									Approved
								</button>
								<h5>
									{updateFields &&
									updateFields.status == 'Approved'
										? 'selected'
										: null}
								</h5>
							</div>
							<div style={{ display: 'inline-block' }}>
								<button
									className={styles.button}
									style={{
										padding: '12px',
										margin: '5px',
										backgroundColor: 'red',
									}}
									onClick={(e) => {
										setUpdateFields({
											...updateFields,
											status: 'Cancelled',
										});
									}}
								>
									Cancelled
								</button>
								<h5>
									{updateFields &&
									updateFields.status == 'Cancelled'
										? 'selected'
										: null}
								</h5>
							</div>
							<div style={{ display: 'inline-block' }}>
								<button
									className={styles.button}
									style={{
										padding: '12px',
										margin: '5px',
										backgroundColor: 'green',
									}}
									onClick={(e) => {
										setUpdateFields({
											...updateFields,
											status: 'Completed',
										});
									}}
								>
									Completed
								</button>
								<h5>
									{updateFields &&
									updateFields.status == 'Completed'
										? 'selected'
										: null}
								</h5>
							</div>
							<div style={{ display: 'inline-block' }}>
								<button
									className={styles.button}
									style={{
										padding: '12px',
										margin: '5px',
										backgroundColor: 'orange',
									}}
									onClick={(e) => {
										setUpdateFields({
											...updateFields,
											status: 'Scheduled',
										});
									}}
								>
									Scheduled
								</button>
								<h5>
									{updateFields &&
									updateFields.status == 'Scheduled'
										? 'selected'
										: null}
								</h5>
							</div>
						</div>
						<div>
							<h3>Add Driver Details </h3>
							<input
								style={inputStyles}
								type='text'
								placeholder='Driver Name'
								id='name'
								name='name'
								onChange={onChangeHandler}
								value={updateFields.name}
							/>
							<input
								style={inputStyles}
								type='tel'
								placeholder='Driver Phone Number'
								maxLength='10'
								id='mobile'
								name='mobile'
								onChange={onChangeHandler}
								value={updateFields.mobile}
							/>
						</div>
						<div>
							<h3>Add Car Details </h3>
							<input
								style={inputStyles}
								type='text'
								placeholder='Plate number'
								id='plateNumber'
								name='plateNumber'
								onChange={onChangeHandler}
								value={updateFields.plateNumber}
							/>
							<input
								style={inputStyles}
								type='text'
								placeholder='Car color'
								id='color'
								name='color'
								onChange={onChangeHandler}
								value={updateFields.color}
							/>
							<input
								style={inputStyles}
								type='text'
								placeholder='Car Type'
								id='type'
								name='type'
								onChange={onChangeHandler}
								value={updateFields.type}
							/>
						</div>
						<button
							className={styles.button}
							onClick={updateBooking}
						>
							Save Changes
						</button>
					</div>

					<ToastContainer />
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							marginBottom: '1rem',
						}}
					>
						<h3>Airport Bookings</h3>
						<button
							className={styles.button}
							onClick={onClickHandler}
						>
							Add Booking
						</button>
					</div>
					<table className={styles.table}>
						<thead>
							<tr className={styles.theading}>
								<th>#</th>
								<th>Booking reference</th>
								<th>Details</th>

								<th>Contact</th>
								<th>Driver & Car details</th>
								{/* <th>Payment </th> */}
								<th>Booking Date</th>
								<th>Service </th>
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
												<strong>Transfer Type:</strong>{' '}
												<u
													style={{
														fontStyle: 'italic',
														color: '#4D96FF',
													}}
												>
													{item.formType}
													{item.isPriorityPass ? (
														<strong
															style={{
																color: 'green',
															}}
														>
															&nbsp; & Priority
															Pass
														</strong>
													) : undefined}
												</u>
											</p>

											{item.isPriorityPass ? (
												<p style={{ color: 'green' }}>
													<strong>
														Cabin Class:
													</strong>{' '}
													&nbsp;
													{item.cabinClass}
												</p>
											) : undefined}

											<p
												style={{
													width: '80%',
													height: 'fit-content',
												}}
											>
												<strong>Airport:</strong>
												{item?.pickupAirport ||
													item?.dropoffAirport}
											</p>
											<p>
												<strong>Flight Number:</strong>{' '}
												{item.flightNumber || ' '}
											</p>

											<p>
												<strong>Address:</strong>{' '}
												{item.dropoffAddress ||
													item.pickupAddress}
											</p>
											<p>
												<strong>Vehicle Class:</strong>{' '}
												{item.carType}
											</p>

											<p>
												<strong>Passengers:</strong>{' '}
												{item.passengers}
											</p>
											<p>
												<strong>Date:- </strong>
												{item.arrivalDate?.slice(
													0,
													10
												) ||
													item.pickupDate?.slice(
														0,
														10
													)}
												<br />
												<strong>Time:- </strong>
												{item.time}
											</p>
											<p>
												<strong>Amount:</strong> &nbsp;
												{currencySymbols[item.currency]}
												&nbsp;
												{item.amount}
											</p>

											<p>
												<strong>Payment Status:</strong>{' '}
												{item.paymentStatus}
											</p>
										</td>

										<td>
											<p>
												<span
													style={{
														marginRight: '3px',
													}}
												>
													{item.title}
												</span>{' '}
												<span
													style={{
														marginRight: '3px',
													}}
												>
													{item.firstName}
												</span>
												<span
													style={{
														marginRight: '3px',
													}}
												>
													{item.lastName}
												</span>
											</p>
											<p>{item.email}</p>
											<p>
												<span>+{item.countryCode}</span>{' '}
												<span>{item.mobile}</span>{' '}
											</p>
										</td>
										{/* <td>
                      NGN <br />
                      {item.amount}
                    </td> */}
										<td>
											<strong>Driver:-</strong>
											{item.assignedDriver &&
											item.assignedDriver.length > 0
												? ` ${item.assignedDriver[0].name} ${item.assignedDriver[0].mobile}`
												: 'Not Assigned yet'}
											<br />
											<strong>Car:-</strong>
											{item.assignedCar &&
											item.assignedCar.length > 0
												? `${item.assignedCar[0].plateNumber} ${item.assignedCar[0].color} ${item.assignedCar[0].type}`
												: 'Not Assigned yet'}
										</td>
										<td>
											{item.createdAt.slice(0, 10)} <br />
										</td>
										<td>
											{item.serviceStatus} <br /> <br />
											<button
												className={styles.button}
												style={{ padding: '8px' }}
												onClick={(e) => {
													setSelectedItem(item);
													updateModalToggler(e);
												}}
											>
												Update Booking
											</button>
										</td>
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

export default AirportTransferBooking;

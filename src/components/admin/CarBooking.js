import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import Modal from './Modal';
import CarBookingForm from './CarBookingForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/Dashboard.module.css';

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

const CarBooking = () => {
	const [bookings, setBookings] = useState([]);
	const [updateFields, setUpdateFields] = useState({
		name: '',
		mobile: '',
		plateNumber: '',
		color: '',
		type: '',
		status: '',
	});
	const [selectedItem, setSelectedItem] = useState();
	const [reload, setReload] = useState(false);
	const updateModalRef = useRef(null);
	useEffect(() => {
		fetch('https://shuttlelane.com/api/booking/car')
			.then((res) => res.json())
			.then((data) => {
				setBookings(data.data);
			})
			.catch((err) => {});
	}, [reload]);
	const [editMode, setEditMode] = useState(false);
	// modal togller
	const onClickHandler = () => {
		setEditMode(true);
	};
	const onChangeHandler = (e) => {
		setUpdateFields({ ...updateFields, [e.target.name]: e.target.value });
	};
	const updateModalToggler = (e) => {
		setUpdateFields({
			name: '',
			mobile: '',
			plateNumber: '',
			color: '',
			type: '',
			status: '',
		});
		if (updateModalRef.current.style.display != 'none') {
			updateModalRef.current.style.display = 'none';
		} else {
			updateModalRef.current.style.display = 'block';
		}
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

		let data = {};

		if (updateFields.status.trim()) {
			data.serviceStatus = updateFields.status;
		}
		if (updateFields.name.trim()) {
			data.assignedDriver = [
				{
					name: updateFields.name,
					mobile: updateFields.mobile,
				},
			];
		}
		if (updateFields.plateNumber.trim() && updateFields.type.trim()) {
			data.assignedCar = [
				{
					plateNumber: updateFields.plateNumber,
					color: updateFields.color,
					type: updateFields.type,
				},
			];
		}

		let id = selectedItem._id;

		fetch(`https://shuttlelane.com/api/booking/car/${id}`, {
			method: 'PUT',
			headers: {
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

	return (
		<>
			{editMode && (
				<Modal
					isOpen={editMode}
					onCloseHandler={() => {
						setEditMode(false);
					}}
				>
					<CarBookingForm
						closeForm={(e) => {
							setEditMode(false);
						}}
					/>
				</Modal>
			)}
			<Grid item xs={12}>
				<main style={{ width: '98%' }}>
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
							Add Booking
						</button>
					</div>
					<ToastContainer />
					{bookings && bookings.length > 0 ? (
						<table className={styles.table}>
							<thead style={{ backgroundColor: 'red' }}>
								<tr className={styles.theading}>
									<th>#</th>
									<th>Booking reference</th>
									<th style={{ marginLeft: '-15px' }}>
										Details
									</th>
									<th>Date & Time</th>
									<th>Contact</th>
									<th>Assigned Driver & car </th>
									<th>Booking Date</th>
									<th>Service Status</th>
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
													<strong>Pickup:</strong>{' '}
													{item?.pickupAddress}
												</p>
												<p>Vehicle : {item?.carType}</p>

												<p>
													{' '}
													<strong>Days:</strong>{' '}
													{item?.days}
												</p>

												<p>
													{' '}
													<strong>
														Destination::
													</strong>{' '}
													{item?.destination}
												</p>
												<p>
													<strong> Amount: </strong>
													&nbsp;
													{
														currencySymbols[
															item.currency
														]
													}
													&nbsp;
													{item.amount}
												</p>
											</td>

											<td>
												{item?.date?.slice(0, 10)}{' '}
												<br /> & {item.time}
											</td>
											<td>
												<p>
													<span
														style={{
															marginRight: '3px',
														}}
													>
														{item?.title}
													</span>
													<span
														style={{
															marginRight: '3px',
														}}
													>
														{item?.firstName}
													</span>
													<span
														style={{
															marginRight: '3px',
														}}
													>
														{item?.lastName}
													</span>
												</p>
												<p>{item?.email}</p>
												<p>
													<span>
														{item?.countryCode}
													</span>
													<span>{item?.mobile}</span>
												</p>
											</td>
											<td>
												{item.assignedDriver &&
												item.assignedDriver.length > 0
													? `Driver:- ${item.assignedDriver[0].name} ${item.assignedDriver[0].mobile}`
													: 'Not Assigned yet'}
												<br />
												{item.assignedCar &&
												item.assignedCar.length > 0
													? `Car:- ${item.assignedCar[0].plateNumber} ${item.assignedCar[0].color} ${item.assignedCar[0].type}`
													: 'Not Assigned yet'}
											</td>

											<td>
												{item.createdAt.slice(0, 10)}{' '}
												<br />
											</td>
											<td>
												{item.serviceStatus} <br />{' '}
												<br />
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
					) : (
						<h2 style={{ color: 'red', textAlign: 'center' }}>
							No Bookings Yet
						</h2>
					)}
				</main>
			</Grid>
		</>
	);
};

export default CarBooking;

import { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';

import styles from '../../styles/Dashboard.module.css';
import PriorityBookingForm from './PriorityBookingForm';
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

const PriorityPassBookings = () => {
	const [status, setStatus] = useState('');
	const [bookings, setBookings] = useState([]);
	const [selectedItem, setSelectedItem] = useState();
	const [reload, setReload] = useState(false);
	const updateModalRef = useRef(null);
	useEffect(() => {
		fetch('https://shuttlelane.herokuapp.com/api/booking/priority')
			.then((res) => res.json())
			.then((data) => {
				setBookings(data.data);
			})
			.catch((err) => console.log(err));
	}, [reload]);
	console.log(bookings);
	const [editMode, setEditMode] = useState(false);
	const onClickHandler = () => {
		setEditMode(true);
	};

	const updateModalToggler = (e) => {
		setStatus('');
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

		let data = {
			serviceStatus: status,
		};
		let id = selectedItem._id;
		console.log(selectedItem.bookingReference);
		console.log(id);
		console.log(data);
		fetch(`https://shuttlelane.herokuapp.com/api/booking/priority/${id}`, {
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
				console.log('update Catch', err);
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
					<PriorityBookingForm
						closeForm={() => {
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
										setStatus('Pending');
									}}
								>
									Pending
								</button>
								<h5>
									{status == 'Pending' ? 'selected' : null}
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
										setStatus('Approved');
									}}
								>
									Approved
								</button>
								<h5>
									{status == 'Approved' ? 'selected' : null}
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
										setStatus('Cancelled');
									}}
								>
									Cancelled
								</button>
								<h5>
									{status == 'Cancelled' ? 'selected' : null}
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
										setStatus('Completed');
									}}
								>
									Completed
								</button>
								<h5>
									{status == 'Completed' ? 'selected' : null}
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
										setStatus('Scheduled');
									}}
								>
									Scheduled
								</button>
								<h5>
									{status == 'Scheduled' ? 'selected' : null}
								</h5>
							</div>
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
					<table className={styles.table}>
						<thead>
							<tr className={styles.theading}>
								<th>#</th>
								<th>Booking reference</th>
								<th>Details</th>
								<th>Contact</th>
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
												<strong>Transfer Type: </strong>
												<u
													style={{
														fontStyle: 'italic',
														color: '#4D96FF',
													}}
												>
													{item.service}
												</u>
											</p>

											<p
												style={{
													width: '80%',
													height: 'fit-content',
												}}
											>
												<strong>Airport: </strong>
												{item?.airport}
											</p>
											<p>
												<strong>Flight Number: </strong>
												{item.flightNumber}
											</p>

											<p>
												<strong>Cabin Class: </strong>
												{item.cabinClass}
											</p>
											<p>
												<strong>Date:</strong>{' '}
												{item.date?.slice(0, 10)} <br />{' '}
												<strong>Time:</strong>{' '}
												{item.time}
											</p>
											<p>
												<strong>Passengers: </strong>
												{item.passengers}
											</p>

											<p>
												<strong>Amount:</strong>&nbsp;
												{currencySymbols[item.currency]}
												&nbsp;
												{item.amount}
											</p>
											<p>
												<strong>Payment Status:</strong>
												&nbsp; {item.paymentStatus}
											</p>
										</td>

										<td>
											<p>
												<span>{item.title} &nbsp;</span>
												<span>
													{item.firstName} &nbsp;
												</span>
												<span>
													{item.lastName} &nbsp;
												</span>
											</p>
											<p>{item.email}</p>
											<p>
												<span>{item.countryCode}</span>
												<span>{item.mobile}</span>
											</p>
										</td>

										{/* <td>
                      <strong>Driver:- </strong>
                      {item.assignedDriver && item.assignedDriver.length > 0
                        ? `${item.assignedDriver[0].name} ${item.assignedDriver[0].mobile}`
                        : "Not Assigned yet"}
                      <br />
                      <strong>Car:- </strong>

                      {item.assignedCar && item.assignedCar.length > 0
                        ? ` ${item.assignedCar[0].plateNumber} ${item.assignedCar[0].color} ${item.assignedCar[0].type}`
                        : "Not Assigned yet"}
                    </td> */}
										<td>
											{item.createdAt.slice(0, 10)} <br />
										</td>
										<td>
											{item.serviceStatus || ' '} <br />{' '}
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
				</main>
			</Grid>
		</>
	);
};

export default PriorityPassBookings;

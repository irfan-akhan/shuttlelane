import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import UpdateUserForm from './UpdateUserForm';
import jwt from 'jsonwebtoken';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/Admin.module.css';
import dashboard from '../../styles/Dashboard.module.css';

const btnRed = {
	background: 'red',
};
const btnGreen = {
	background: 'green',
};

// COMPONENT

const CreateUser = () => {
	const router = useRouter();
	const [users, setUsers] = useState([]);
	const [action, setAction] = useState(false);
	const [type, setType] = useState('blogger');
	const [editMode, setEditMode] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [userPermissions, setUserPermissions] = useState([]);

	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			toast.error(`Please login to perform this action`, {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			router.push('/admin');
			return;
		}
		const user = jwt.decode(token);
		console.log('USER', user);

		if (!user) {
			localStorage.removeItem('token');
			router.push('/admin');
			return;
		}
		fetch('https://shuttlelane.herokuapp.com/api/users')
			.then((response) => response.json())
			.then((result) => {
				setUsers(result.data);
			})
			.catch((err) => console.log(err));
	}, [action]);

	const deleteUserHandler = (id) => {
		try {
			console.log('in delete USerData');
			fetch(`https://shuttlelane.herokuapp.com/api/users/${id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token'),
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					toast.success(` user ${result.data.name} Deleted`, {
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
					});
					setAction((prevState) => !prevState);
				});
		} catch (error) {
			toast.error(`${error}`, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
		}
	};

	// Create User Handler
	const onSubmitHandler = (e) => {
		e.preventDefault();
		let data = {};
		let response;
		data.name = nameRef.current.value;
		data.email = emailRef.current.value;
		data.password = passwordRef.current.value;
		data.role = type;
		data.permissions = [...new Set(userPermissions)];
		toast.info(`Please Wait`, {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
		});
		if (!localStorage.getItem('token')) {
			toast.error(`Please login to perform this action`, {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			router.push('/admin');
			return;
		}
		fetch('https://shuttlelane.herokuapp.com/api/users', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// 'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((user) => {
				response = user;
				if (user.error) {
					toast.error(`👌 ${user.error}`, {
						position: 'top-center',
						autoClose: 2000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
					});
					if (user.error == 'Invalid token') {
						router.push('/admin');
					}
					return;
				} else {
					toast.success(` user Created`, {
						position: 'top-center',
						autoClose: 2000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
					});
					setAction((prevState) => !prevState);
				}
			})
			.catch((error) => {
				console.log('error', error);
				toast.error(
					'👌 Something went wrong check internet connection or contact Admin',
					{
						position: 'top-center',
						autoClose: 2000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
					}
				);
			});
	};
	return (
		<Grid item sm={12}>
			<div className={dashboard.cardStat}>
				<h4 style={{ margin: '1rem .8rem' }}>Existing Users</h4>
				<p className={dashboard.entry}>
					<span>No</span> <span>Name</span>
					<span>Type</span>
					<span>Update</span>
					<span>Delete</span>
				</p>
				{users?.map((user, idx) => {
					return (
						<p key={user._id} className={dashboard.entry}>
							<span>{idx + 1}</span> <span>{user.name}</span>
							<span>{user.role}</span>
							<span>
								<button
									className={styles.btn}
									style={btnGreen}
									onClick={(e) => {
										setEditMode(true);
										setSelectedUser(user);
									}}
								>
									Update
								</button>
							</span>
							<span>
								<button
									className={styles.btn}
									style={btnRed}
									onClick={(e) => deleteUserHandler(user._id)}
								>
									Delete
								</button>
							</span>
						</p>
					);
				})}
			</div>
			{editMode && (
				<Modal
					isOpen={editMode}
					onCloseHandler={() => {
						setEditMode(false);
						setSelectedUser(null);
					}}
				>
					<UpdateUserForm
						user={selectedUser}
						setAction={setAction}
						closeForm={() => {
							setEditMode(false);
							setSelectedUser(null);
						}}
					/>
				</Modal>
			)}
			<div className='userPermissions'>
				<h3>Add Permissions</h3>
				<div>
					<button
						style={{
							backgroundColor: userPermissions.includes('Airport')
								? 'green'
								: null,
							color: userPermissions.includes('Airport')
								? '#fff'
								: null,
						}}
						id='Airport'
						onClick={(e) => {
							e.stopPropagation();
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Airport Transfer
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('Car')
								? 'green'
								: null,
							color: userPermissions.includes('Car')
								? '#fff'
								: null,
						}}
						id='Car'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Car Hire
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('Fleet')
								? 'green'
								: null,
							color: userPermissions.includes('Fleet')
								? '#fff'
								: null,
						}}
						id='Fleet'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Fleet Management
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes(
								'Priority'
							)
								? 'green'
								: null,
							color: userPermissions.includes('Priority')
								? '#fff'
								: null,
						}}
						id='Priority'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Priority Pass Booking
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('Hotel')
								? 'green'
								: null,
							color: userPermissions.includes('Hotel')
								? '#fff'
								: null,
						}}
						id='Hotel'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Hotel Transfer
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('User')
								? 'green'
								: null,
							color: userPermissions.includes('User')
								? '#fff'
								: null,
						}}
						id='User'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						User Management
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('Rates')
								? 'green'
								: null,
							color: userPermissions.includes('Rates')
								? '#fff'
								: null,
						}}
						id='Rates'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Rates
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes(
								'Vehicles'
							)
								? 'green'
								: null,
							color: userPermissions.includes('Vehicles')
								? '#fff'
								: null,
						}}
						id='Vehicles'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Vehicles
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('Rates')
								? 'green'
								: null,
							color: userPermissions.includes('Rates')
								? '#fff'
								: null,
						}}
						id='Rates'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Rates
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('Cabin')
								? 'green'
								: null,
							color: userPermissions.includes('Cabin')
								? '#fff'
								: null,
						}}
						id='Cabin'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Cabin
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('Hire')
								? 'green'
								: null,
							color: userPermissions.includes('Hire')
								? '#fff'
								: null,
						}}
						id='Hire'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Manage Cars
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('Driver')
								? 'green'
								: null,
							color: userPermissions.includes('Driver')
								? '#fff'
								: null,
						}}
						id='Driver'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Drive Service
					</button>
					<button
						style={{
							backgroundColor: userPermissions.includes('Cabin')
								? 'green'
								: null,
							color: userPermissions.includes('Cabin')
								? '#fff'
								: null,
						}}
						id='Cabin'
						onClick={(e) => {
							setUserPermissions([
								...userPermissions,
								e.target.id,
							]);
						}}
					>
						Cabin
					</button>
				</div>
			</div>
			<form
				className={styles.signUp}
				onSubmit={onSubmitHandler}
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<h1 className={styles.heading}>Add New User</h1>
				<input
					type='text'
					name='name'
					id='name'
					placeholder='name'
					required
					ref={nameRef}
				/>
				<input
					type='email'
					name='email'
					id='email'
					placeholder='email'
					required
					ref={emailRef}
				/>
				<select
					id='type'
					name='type'
					value={type}
					// required
					onChange={(e) => setType(e.target.value)}
					placeholder='Select user a Role'
				>
					<option value='blogger'>Blogger</option>
					<option value='admin'>Admin</option>
				</select>

				<input
					type='password'
					name='password'
					id='password'
					placeholder='password'
					required
					ref={passwordRef}
				/>
				<button type='submit'>Add</button>
				<ToastContainer />
			</form>
		</Grid>
	);
};

export default CreateUser;

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/Admin.module.css';
import dashboard from '../../styles/Dashboard.module.css';

const UpdateUserForm = ({ user, setAction, closeForm }) => {
	const [userPermissions, setUserPermissions] = useState(user.permissions);

	const [inputValues, setInputValues] = useState(
		user
			? {
					email: user.email,
					name: user.name,
					password: '',
					role: user.role,
			  }
			: {}
	);
	const onChangeHandler = (e) => {
		e.persist();
		setInputValues({
			...inputValues,
			[e.target.name]: e.target.value,
		});
	};

	const onUpdateHandler = (e) => {
		e.preventDefault();
		toast.info(`Please Wait`, {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
		});
		try {
			fetch(`https://shuttlelane.com/api/users/${user._id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token'),
				},

				body: JSON.stringify({
					...inputValues,
					permissions: [...new Set(userPermissions)],
				}),
			})
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					if (result.data) {
						toast.success(` user ${result.data.name} Updated`, {
							position: 'top-center',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: false,
							draggable: false,
							progress: undefined,
						});
						setAction((prevState) => !prevState);
						closeForm();
					}
				});
		} catch (error) {
			toast.error(` ${error}`, {
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
	const toggleUserPerm = (e) => {
		let newPerms = userPermissions.includes(e.target.id)
			? userPermissions.filter((perm) => perm != e.target.id)
			: [...userPermissions, e.target.id];
		setUserPermissions(newPerms);
	};
	return (
		<>
			<form
				className={styles.signUp}
				onSubmit={onUpdateHandler}
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<h1 className={styles.heading}>Update User</h1>
				<input
					type='text'
					name='name'
					id='name'
					placeholder='name'
					required
					onChange={onChangeHandler}
					value={inputValues?.name || ' '}
				/>
				<input
					type='email'
					name='email'
					id='email'
					placeholder='email'
					required
					onChange={onChangeHandler}
					value={inputValues?.email || ' '}
				/>
				<select
					id='role'
					name='role'
					value={inputValues?.role || ' '}
					onChange={onChangeHandler}
					placeholder='Select a person'
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
					onChange={onChangeHandler}
					value={inputValues.password}
				/>

				<button
					onClick={() => {
						toast();
					}}
					type='submit'
				>
					Add User
				</button>
			</form>
			<div classNmae='userPermissions'>
				<h3>Add Permissions</h3>
				<div>
					<button
						id='Airport'
						style={{
							backgroundColor: userPermissions.includes('Airport')
								? 'green'
								: null,
							color: userPermissions.includes('Airport')
								? '#fff'
								: null,
						}}
						onClick={toggleUserPerm}
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
						onClick={toggleUserPerm}
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
						onClick={toggleUserPerm}
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
						onClick={toggleUserPerm}
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
						onClick={toggleUserPerm}
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
						onClick={toggleUserPerm}
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
						onClick={toggleUserPerm}
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
						onClick={toggleUserPerm}
					>
						Vehicles
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
						onClick={toggleUserPerm}
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
						onClick={toggleUserPerm}
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
						onClick={toggleUserPerm}
					>
						Cabin
					</button>
				</div>
			</div>
		</>
	);
};
export default UpdateUserForm;

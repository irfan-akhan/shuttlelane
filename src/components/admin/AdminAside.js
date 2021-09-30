import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

import {
	Home,
	Flight,
	LocalShipping,
	Money,
	TransferWithinAStation,
	AirportShuttle,
	PersonAdd,
	LocationCity,
	DescriptionSharp,
	Bookmark,
} from '@material-ui/icons';

import styles from '../../styles/Dashboard.module.css';
import { useRouter } from 'next/router';

const colorWhite = {
	color: '#000',
};
const AdminAside = ({ onStateChange, user }) => {
	const router = useRouter();
	const [loggedUser, setLoggedUser] = useState(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			localStorage.removeItem('token');
			router.push('/admin');
			return;
		}
		const user = jwt.decode(token);
		if (!user) {
			localStorage.removeItem('token');
			router.push('/admin');
			return;
		} else {
			// console
			setLoggedUser(() => {
				return user;
			});
		}
	}, []);
	function logoutHandler() {
		localStorage.removeItem('token');
		router.push('/admin');
	}
	let [link, setLink] = useState('Overview');
	return (
		<aside className={styles.aside}>
			<div
				onClick={() => {
					onStateChange('Overview');
					setLink('Overview');
				}}
				className={styles.links}
				style={{
					background: link == 'Overview' ? '#ECF0F5' : '',
					color: link == 'Overview' ? '#000' : '',
				}}
			>
				<Home fontSize='small' style={colorWhite} />
				<h4 className={styles.asideHeading}>Dashboard</h4>
			</div>
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Blog') ? (
				<div
					className={styles.links}
					onClick={() => {
						router.push('/admin/blogger');
					}}
				>
					{/* <DescriptionSharp fontSize='small' style={colorWhite} /> */}
					<h4 className={styles.asideHeading}>Visit Blog</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Airport') ? (
				<div
					className={styles.links}
					style={{
						background: link == 'Airport' ? '#ECF0F5' : '',
						color: link == 'Airport' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('Airport');
						setLink('Airport');
					}}
				>
					<Flight fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>Airport Transfer</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Car') ? (
				<div
					className={styles.links}
					style={{
						background: link == 'Car' ? '#ECF0F5' : '',
						color: link == 'Car' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('Car');
						setLink('Car');
					}}
				>
					<LocalShipping fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>Car Hire</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Fleet') ? (
				<div
					className={styles.links}
					style={{
						background: link == 'Fleet' ? '#ECF0F5' : '',
						color: link == 'Fleet' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('Fleet');
						setLink('Fleet');
					}}
				>
					<AirportShuttle fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>Fleet Management</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Priority') ? (
				<div
					onClick={() => {
						onStateChange('Priority');
						setLink('Priority');
					}}
					className={styles.links}
					style={{
						background: link == 'Priority' ? '#ECF0F5' : '',
						color: link == 'Priority' ? '#000' : '',
					}}
				>
					<TransferWithinAStation
						fontSize='small'
						style={colorWhite}
					/>
					<h4 className={styles.asideHeading}>Priority Pass</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Hotel') ? (
				<div
					className={styles.links}
					className={styles.links}
					style={{
						background: link == 'Hotel' ? '#ECF0F5' : '',
						color: link == 'Hotel' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('Hotel');
						setLink('Hotel');
					}}
				>
					<LocationCity fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>Hotel Transfer</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('User') ? (
				<div
					className={styles.links}
					style={{
						background: link == 'User' ? '#ECF0F5' : '',
						color: link == 'User' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('User');
						setLink('User');
					}}
				>
					<PersonAdd fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>User Management</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Rates') ? (
				<div
					className={styles.links}
					style={{
						background: link == 'Rates' ? '#ECF0F5' : '',
						color: link == 'Rates' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('Rates');
						setLink('Rates');
					}}
				>
					<Money fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>Exchange Rates</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Hire') ? (
				<div
					className={styles.links}
					style={{
						background: link == 'Hire' ? '#ECF0F5' : '',
						color: link == 'Hire' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('Hire');
						setLink('Hire');
					}}
				>
					<Money fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>Manage Cars</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Vehicles') ? (
				<div
					className={styles.links}
					style={{
						background: link == 'Vehicles' ? '#ECF0F5' : '',
						color: link == 'Vehicles' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('Vehicles');
						setLink('Vehicles');
					}}
				>
					<Money fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>Vehicles</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Cabin') ? (
				<div
					className={styles.links}
					style={{
						background: link == 'Cabin' ? '#ECF0F5' : '',
						color: link == 'Cabin' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('Cabin');
						setLink('Cabin');
					}}
				>
					<Money fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>Cabin Classes</h4>
				</div>
			) : null}
			{loggedUser?.role == 'superAdmin' ||
			loggedUser?.permissions?.includes('Driver') ? (
				<div
					className={styles.links}
					style={{
						background: link == 'Driver' ? '#ECF0F5' : '',
						color: link == 'Driver' ? '#000' : '',
					}}
					onClick={() => {
						onStateChange('Driver');
						setLink('Driver');
					}}
				>
					<PersonAdd fontSize='small' style={colorWhite} />
					<h4 className={styles.asideHeading}>Driver Management</h4>
				</div>
			) : null}
			<div className={styles.links} onClick={logoutHandler}>
				{/* <LogoutIcon fontSize='small' style={colorWhite} /> */}
				<h4 className={styles.asideHeading}>Logout</h4>
			</div>
		</aside>
	);
};

export default AdminAside;

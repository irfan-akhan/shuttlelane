import { useEffect, useRef } from 'react';
import React from 'react';
import Link from 'next/link';
import { Grid, Typography, Top } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AOS from 'aos';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import 'aos/dist/aos.css';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutline from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

import ClickAway from '../components/navbar';

import { makeStyles } from '@material-ui/core/styles';
import '../styles/globals.css';
import topbar from '../styles/Topbar.module.css';
import footer from '../styles/Footer.module.css';
import styles from '../styles/Navbar.module.css';

import { useRouter } from 'next/router';
import Whatsapp from '../components/Whatsapp';
import { Facebook, Instagram, Twitter } from '@material-ui/icons';
import WhatsApp from '@material-ui/icons/WhatsApp';
import Head from 'next/head';

// theme overrides
const theme = createMuiTheme({
	typography: {
		fontFamily: 'Poppins, Roboto, sans-serif',
	},
	palette: {
		primary: {
			main: '#D8A23A',
		},
		secondary: {
			main: '#262472',
		},
		text: {
			secondary: '#000000bf',
		},
	},
});

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const routes1 = {
	'About Us': '/company/about',
	'Who We Are': '/company/whoweare',
	Partnership: '/company/partner',
};
const routes = {
	'Airport Transfer': '/services/airport_transfer',
	'Car Hire': '/services/car_hire',
	'Priority Pass': '/services/priority_pass',
	'Corporate Travel': '/services/corporate_travel',
	'Wedding Services': '/services/wedding_services',
};
const routes3 = {
	'Drive for Shuttlelane': '/partnership/drive',
	'Fleet Management': '/partnership/registerfleet',
	'Hotel Transfer Solution': '/partnership/registerHotel',
};

function MyApp({ Component, pageProps }) {
	const toggleRef = useRef(null);
	const navToggleHandler = (e) => {
		toggleRef.current.classList.toggle('hide');
	};
	const onClickHandler = (e) => {
		// console.log(e.target.parentNode.lastChild);
		if (e.target.parentNode.lastChild.style.display == 'flex') {
			e.target.parentNode.lastChild.style.display = 'none';
			return;
		}

		e.target.parentNode.lastChild.style.display = 'flex';
	};

	const router = useRouter();

	useEffect(() => {
		AOS.init({
			offset: 100,
			duration: 600,
			easing: 'ease-in-sine',
			delay: 200,
		});
	}, []);
	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}));
	const [state, setState] = React.useState({
		age: '',
		name: 'hai',
	});
	const [booking, setBooking] = React.useState('');
	const onSearchHandler = (e) => {
		setBooking(e.target.value);
	};
	const onGoHandler = () => {
		if (!booking.trim()) return;
		router.push({
			pathname: '/search',
			query: { data: booking.trim() },
		});

		navToggleHandler();

		console.log(booking);
	};
	const handleChange = (event) => {
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<link rel='icon' href='./assets/images/favicon.ico' />
			</Head>
			{/* Topbar */}
			<div onClick={navToggleHandler} className={styles.navToggle}>
				<span></span>
				<span></span>
				<span></span>
			</div>

			{router.route.includes('blog') ? (
				<nav
					style={{
						display: 'flex',
						justifyContent: 'center',
						borderBottom: '1px solid #e4dede',
					}}
				>
					<img
						src={`${prefix}/assets/images/shuttleblog.png`}
						alt=''
						style={{
							width: '300px',
							padding: '1rem',
						}}
					/>
				</nav>
			) : router.route.includes('admin') ? (
				' '
			) : (
				<>
					<div data-aos='fade-down' className={topbar.topbar}>
						<div className={topbar.left}>
							<div className={topbar.item}>
								<WhatsAppIcon
									style={{
										fontSize: '17px',
										marginRight: '4px',
										color: 'green',
									}}
								/>
								<a
									href='https://api.whatsapp.com/send?phone=2349030009108&text=Hello'
									target='_blank'
								>
									+234 903 000 9108
								</a>
							</div>
							<div className={topbar.item}>
								<PhoneIcon
									color='secondary'
									style={{
										fontSize: '17px',
										marginRight: '4px',
										color: 'blue',
									}}
								/>
								<a href='tel:+2349030009452' target='_blank'>
									+234 903 000 9452
								</a>
							</div>
							<div className={topbar.item}>
								<MailOutline
									color='secondary'
									style={{
										fontSize: '17px',
										marginRight: '4px',
										color: 'red',
									}}
								/>
								<a
									href='mailto:info@shuttlelane.com'
									target='_blank'
								>
									info@shuttlelane.com
								</a>
							</div>
						</div>
						<div className={topbar.right}>
							<Link href='/#how-it-works'>
								<a> How it works </a>
							</Link>
							<Link href='/customerservice/faq'>
								<a>FAQ</a>
							</Link>
							<Link href='/customerservice/contact'>
								<a>Contact Us</a>
							</Link>
						</div>
					</div>
					<nav className={styles.navbar}>
						<Grid container spacing={2}>
							<Grid item sm={2} style={{ paddingTop: '0' }}>
								<div>
									<p className='mobileNav'>
										<PhoneIcon
											color='secondary'
											style={{
												fontSize: '17px',
												marginRight: '4px',
												color: '#E3B546',
											}}
										/>
										<a
											href='tel:+2349030009452'
											target='_blank'
										>
											+234 903 000 9452
										</a>
									</p>
									<a href='/' className={styles.logo}>
										<img
											src={`${prefix}/assets/images/logo.png`}
											alt='logo'
										/>
									</a>
								</div>
							</Grid>
							<Grid
								item
								container
								justifyContent='flex-end'
								alignItems='center'
								sm={10}
								style={{ maxWidth: 'initial' }}
								spacing={3}
								ref={toggleRef}
								className='hide rolex'
							>
								<Grid item>
									<a
										onClick={navToggleHandler}
										href='/'
										className={styles.dropdownToggle}
										type='button'
									>
										Home
									</a>
								</Grid>
								<Grid item>
									<ClickAway
										navToggleHandler={navToggleHandler}
										heading='About'
										routes={routes1}
									/>
								</Grid>
								<Grid item>
									<ClickAway
										navToggleHandler={navToggleHandler}
										heading='Services'
										routes={routes}
									/>
								</Grid>
								<Grid item>
									<ClickAway
										navToggleHandler={navToggleHandler}
										heading='Become a Partner'
										routes={routes3}
									/>
								</Grid>

								<Grid item>
									<Link href='/blog'>
										<a
											target='_blank'
											className={styles.dropdownToggle}
											type='button'
										>
											Blog
										</a>
									</Link>
								</Grid>
								<Grid item>
									<div>
										<input
											type='text'
											name=''
											id=''
											placeholder='Booking Ref.'
											class='search'
											style={{ outline: 'none' }}
											onChange={onSearchHandler}
										/>
										<button
											class='searchBtn'
											onClick={onGoHandler}
										>
											Go
										</button>
									</div>
								</Grid>
							</Grid>
						</Grid>
					</nav>
				</>
			)}
			<main className={styles.main}>
				<PayPalScriptProvider deferLoading={true}>
					<Component {...pageProps} />
				</PayPalScriptProvider>
			</main>
			{router.route.includes('admin') ? '' : <Whatsapp />}
			<footer className={footer.footer}>
				<Grid container justify='space-evenly' spacing={3}>
					<Grid item xs={12} sm={3} className={footer.sections}>
						<Typography
							variant='h6'
							gutterBottom
							style={{ color: '#fff' }}
						>
							COMPANY
						</Typography>
						<Link href='/company/about'>
							<a>About Shuttlelane</a>
						</Link>
						<Link href='/company/whoweare'>
							<a>Who We Are</a>
						</Link>
						<Link href='/company/partner'>
							<a>Partnership</a>
						</Link>
						<Link href='/customerservice/contact'>
							<a>Get in touch</a>
						</Link>
						<Link href='/company/terms'>
							<a>Terms of Use</a>
						</Link>
						<Link href='/company/policy'>
							<a>Privacy Policy</a>
						</Link>
					</Grid>
					<Grid item xs={12} sm={3} className={footer.sections}>
						<Typography
							variant='h6'
							gutterBottom
							style={{ color: '#fff' }}
						>
							SERVICES
						</Typography>
						<Link href='/services/airport_transfer'>
							<a>Airport Transfer</a>
						</Link>
						<Link href='/services/car_hire'>
							<a>Car Hire</a>
						</Link>
						<Link href='/services/priority_pass'>
							<a>Priority Pass</a>
						</Link>
						<Link href='/services/corporate_travel'>
							<a>Corporate Travel</a>
						</Link>
						<Link href='/services/wedding_services'>
							<a>Wedding Services</a>
						</Link>
					</Grid>
					<Grid item xs={12} sm={3} className={footer.sections}>
						<Typography
							variant='h6'
							gutterBottom
							style={{ color: '#fff' }}
						>
							CUSTOMER SERVICE
						</Typography>

						<Link href='/#how-it-works'>
							<a>
								<a>How It Works</a>
							</a>
						</Link>
						<Link href='/customerservice/faq'>
							<a>Frequently Asked Questions</a>
						</Link>
						<Link href='/customerservice/contact'>
							<a>
								<a>Report a Problem</a>
							</a>
						</Link>
					</Grid>
					<Grid item xs={12} sm={3} className={footer.sections}>
						<Typography
							variant='h6'
							gutterBottom
							style={{ color: '#fff' }}
						>
							BOOK ONLINE
						</Typography>
						<Link href='/#header'>
							<a>Airport Transfer</a>
						</Link>
						<Link href='/#header'>
							<a>Car Hire</a>
						</Link>
						<Link href='/#header'>
							<a>Priority Pass</a>
						</Link>
					</Grid>
				</Grid>

				<section className={footer.social}>
					<span>
						<a
							target='_blank'
							href='https://www.instagram.com/shuttlelane/'
							style={{
								color: '#868686d8',
								marginLeft: '1.4rem',
								width: '40px',
								fontSize: '20px',
							}}
						>
							<Instagram />
						</a>
						<a
							target='_blank'
							href='https://twitter.com/Shuttlelane'
							style={{
								color: '#868686d8',
								marginLeft: '1.4rem',
								width: '40px',
								fontSize: '20px',
							}}
						>
							<Twitter />
						</a>
						<a
							target='_blank'
							href='https://www.facebook.com/shuttlelane1'
							style={{
								color: '#868686d8',
								marginLeft: '1.4rem',
								width: '40px',
								fontSize: '20px',
							}}
						>
							<Facebook />
						</a>
						<a
							target='_blank'
							href='https://api.whatsapp.com/send?phone=2349030009108&text=Hello'
							style={{
								color: '#868686d8',
								marginLeft: '1.4rem',
								width: '40px',
								fontSize: '20px',
							}}
						>
							<WhatsApp />
						</a>
					</span>
					<span id='copy'>
						&copy; 2021 Shuttlelane Limited. All Rights Reserved.
					</span>
				</section>
			</footer>
		</ThemeProvider>
	);
}
export default MyApp;

import { Grid, Typography, Card, StylesProvider } from '@material-ui/core';
import Sidebar from '../../components/Sidebar';
import Contact from '../../components/Contact';
import about from '../../styles/About.module.css';
import Styles from '../../styles/Summary.module.css';
import Link from 'next/link';
import Head from 'next/head';
const partner = () => {
	const routes = {
		'About Shuttlelane': '/company/about',
		'Who We Are': '/company/whoweare',
		'Become a Partner': '/company/partner',
		'Get In Touch': '/customerservice/contact',
		'Terms of Use': '/company/terms',
		'Privacy Policy': '/company/policy',
	};
	return (
		<section className={about.container}>
			<Head>
				<title>Partner Services | shuttlelane.com</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Grid container justifyContent='center' spacing={3}>
				<Grid item xs={11} sm={3} xl={2} style={{ padding: '0px' }}>
					<Sidebar heading='Company' routes={routes} />
				</Grid>
				<Grid item xs={11} sm={7} xl={5}>
					<div className={about.right}>
						<Typography
							variant='h5'
							gutterBottom
							color='textPrimary'
						>
							Become a partner
						</Typography>
						<Typography
							variant='body1'
							gutterBottom
							paragraph
							color='textSecondary'
						>
							As a customer-oriented company constantly striving
							for excellence, we are always on the lookout for
							opportunities to expand our reach and more
							importantly, improving on the quality of service
							rendered to our customers. We are open to mutually
							beneficial partnerships in various capacities. If
							you wish to partner with us, kindly choose the
							service that applies to you below .
						</Typography>
						<Typography variant='h5' paragraph color='textPrimary'>
							Partner Services
						</Typography>
						<Grid
							item
							container
							spacing={2}
							xs={12}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Grid item xs={12} md={4}>
								<div
									className={Styles.card}
									data-aos='flip-left'
								>
									<img
										src='/assets/images/drive.png'
										alt='Car'
										style={{
											width: '100%',
											borderRadius: '10px',
										}}
									/>
									<h5
										style={{
											textAlign: 'center',
											color: '#000080',
										}}
									>
										Drive for Shuttlelane
									</h5>
									<button
										className='btnGrad'
										style={{
											textAlign: 'center',
											width: '60%',
										}}
									>
										<Link href='/partnership/register'>
											<a>Sign Up</a>
										</Link>
									</button>
								</div>
							</Grid>
							<Grid item xs={12} md={4}>
								<div className={Styles.card} data-aos='flip-up'>
									<img
										src='/assets/images/hotel.png'
										alt='Hotel'
										style={{
											width: '100%',
											borderRadius: '10px',
										}}
									/>
									<h5
										style={{
											textAlign: 'center',
											color: '#000080',
										}}
									>
										Hotel Management
									</h5>
									<button
										className='btnGrad'
										style={{
											textAlign: 'center',
											width: '60%',
										}}
									>
										<Link href='/partnership/registerHotel'>
											<a>Sign Up</a>
										</Link>{' '}
									</button>
								</div>
							</Grid>
							<Grid item xs={12} md={4}>
								<div
									className={Styles.card}
									data-aos='flip-right'
								>
									<img
										src='/assets/images/fleet.png'
										alt='Car'
										style={{
											width: '100%',
											borderRadius: '10px',
										}}
									/>
									<h5
										style={{
											textAlign: 'center',
											color: '#000080',
										}}
									>
										Fleet Management
									</h5>
									<button
										className='btnGrad'
										style={{
											textAlign: 'center',
											width: '60%',
										}}
									>
										<Link href='/partnership/registerfleet'>
											<a>Sign Up</a>
										</Link>
									</button>
								</div>
							</Grid>
						</Grid>
						<Grid item xs={12}></Grid>
					</div>
				</Grid>
				<Grid item xs={12}>
					<Contact />
				</Grid>
			</Grid>
		</section>
	);
};
export default partner;

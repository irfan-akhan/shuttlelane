import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Summary.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import StripeCheckout from 'react-stripe-checkout';

function createBooking(
	data,
	paymentMethod,
	router,
	paymentStatus,
	paymentReceiptLink,
	paymentTxnNumber
) {
	console.log('SUBMOISSSSSSs', paymentMethod);
	console.log(
		'new Fileds',
		paymentStatus,
		paymentReceiptLink,
		paymentTxnNumber
	);
	console.log('data', data);

	if (data.formType == 'Priority-Pass') {
		console.log('IN PRIO');
		fetch('https://shuttlelane.herokuapp.com/api/booking/priority', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...data,
				paymentMethod: paymentMethod,
				paymentStatus,
				paymentReceiptLink,
				paymentTxnNumber,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('result fro server', data);
				toast.success(data.message, {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				});
				const params = `priority=${data.data._id}`;
				router.push({
					pathname: '/success',
					query: params,
				});
			})
			.catch((err) => {
				console.log('err in catch', err);
				toast.error(err, {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				});
			});
	} else {
		fetch('https://shuttlelane.herokuapp.com/api/booking/airport', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...data,
				paymentMethod: paymentMethod,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('result fro server', data);
				toast.success(data.message, {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				});
				const params = `airport=${data.data._id}`;
				router.push({
					pathname: '/success',
					query: params,
				});
			})
			.catch((err) => {
				console.log('err in catch', err);
				toast.error(err, {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				});
			});
	}
}

function validataDate(data) {
	console.log('validate data', data);

	return (
		Object.values(data).includes('') ||
		Object.values(data).includes(' ') ||
		Object.values(data).includes(null)
	);
}
const onClosed = (res) => {
	console.log('CLOSE PANED');
	console.log(res);
};

// COMPONENT

const PaymentMethod = ({ bookingData, cabinClasses }) => {
	console.log('IN PAYMENT METHOD', bookingData);
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	const router = useRouter();
	let [selectedPayment, setSelectedPayment] = useState('');

	const handleFlutterPayment = useFlutterwave(config);
	let config = {};
	useEffect(() => {
		console.log('LOAD SCRIPT');
		config = {
			public_key: `${process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY}`,
			tx_ref: Date.now(),
			amount: bookingData.amount,
			currency:
				bookingData.currency == 'niera'
					? 'NGN'
					: bookingData.currency == 'pound'
					? 'GBP'
					: bookingData.currency == 'euro'
					? 'EUR'
					: 'USD',
			payment_options: 'card,mobilemoney,ussd',
			customer: {
				email: bookingData.email,
				phonenumber: bookingData.mobile,
				name: `${bookingData.title} ${bookingData.firstName} ${bookingData.lastName} `,
			},
			customizations: {
				title: bookingData.carType
					? `${bookingData.carType} ${bookingData.formType} Service`
					: `Airport ${bookingData.formType} Service`,
				logo: 'https://shuttlelane.herokuapp.com/assets/paymentlogo.png',
			},
		};
		const paypalLoadScript = async () => {
			fetch('https://shuttlelane.herokuapp.com/api/payment/paypal')
				.then((res) => res.json())
				.then((res) => {
					console.log('JSON', res);
					paypalDispatch({
						type: 'resetOptions',
						value: {
							'client-id': res.data,
							currency:
								bookingData.currency == 'pound'
									? 'GBP'
									: bookingData.currency == 'euro'
									? 'EUR'
									: bookingData.currency == 'dollar'
									? 'USD'
									: 'USD',
						},
					});
					paypalDispatch({
						type: 'setLoadingStatus',
						value: 'pending',
					});
				})
				.catch((err) => {
					console.log('in fetch err', err);
				});
		};
		paypalLoadScript();
	}, [bookingData.amount, bookingData.currency]);
	const onSubmitHandler = async (
		paymentReceiptLink,
		paymentId,
		paymentStatus
	) => {
		// e.preventDefault();

		const verified =
			selectedPayment !== '' ? validataDate(bookingData) : true;
		if (!verified) {
			toast.info('Thank you for choosing shuttlelane, Please wait', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
			const response = await createBooking(
				bookingData,
				selectedPayment,
				router,
				paymentStatus,
				paymentReceiptLink,
				paymentId
			);
			console.log('VACK', response);
		} else {
			console.log('validation Error');
			toast.error('Please provide valid inputs', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
		}
	};
	function makePayment(token) {
		const body = {
			token,
			bookingData,
		};
		const headers = {
			'Content-Type': 'application/json',
		};
		// call api
		fetch('https://shuttlelane.herokuapp.com/api/payment/stripe', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('stripe payment res', res);
				if (res.data.status === 'succeeded') {
					console.log('stripe payment succeded', res);

					onSubmitHandler(
						res.data.id,
						res.data.receipt_url,
						'Successful'
					);
				} else {
					console.log('stripe payment error', res);
					toast.error('Payment Failed, Please try again', {
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: 0,
					});
				}
			})
			.catch((err) => {
				console.log('payment catch err', err);
				toast.error('Payment Failed, Please try again later', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				});
			});
	}
	function paymentOptionHandler(e) {
		console.log(e.target.id);
		console.log('IN PAYMENT METHOD data', bookingData);

		if (validataDate(bookingData)) {
			toast.error('Please Fill all fields to make payment', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: 0,
			});
			return;
		}
		if (e.target.id == 'Paypal' && bookingData.currency == 'niera') {
			toast.info(
				'Please use Flutterwave or Stripe to pay in niera(NGN)',
				{
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				}
			);
			return;
		}
		setSelectedPayment(e.target.id);
	}
	// Paypal handler create
	function createOrder(data, actions) {
		console.log('creatinOrder', data, actions.order);
		return actions.order
			.create({
				payer: {
					name: {
						given_name:
							bookingData.title + ' ' + bookingData.firstName,
						surname: bookingData.lastName,
					},
					email_address: bookingData.email,
				},
				purchase_units: [
					{
						description: bookingData.carType
							? `${bookingData.carType} ${bookingData.formType} Service`
							: `Airport ${bookingData.formType} Service`,
						amount: {
							value: bookingData.amount,
							currency: bookingData.currency,
						},
					},
				],
			})
			.then((orderId) => orderId);
	}

	// Paypal handler approve
	function onApprove(data, actions) {
		console.log('Approve Order', data, actions);

		return actions.order.capture().then(async (details) => {
			try {
				console.log('Paypal capture details', details);
				onSubmitHandler(res.id, '', 'Successful');
			} catch (error) {
				console.log('capture err', error);
				toast.error('Payment Failed, Please try again', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				});
			}
		});
	}
	//  Error Paypal handler

	function onError(err) {
		console.log('Paypal onError: ', err);
		toast.error('Payment failed, Please try again', {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: 0,
		});
	}
	return (
		<div className={styles.card} style={{ marginTop: '3rem' }}>
			<div
				style={{
					backgroundColor: '#fff',
					borderBottom: '1px solid #212121',
					padding: '.5rem 1.5rem',
					marginBottom: '1.5rem',
				}}
			>
				<h4
					style={{
						margin: '0',
						padding: '0',
						textTransform: 'uppercase',
					}}
					className='typeCenter'
				>
					Select Payment Option
				</h4>
			</div>
			<div className={styles.paymentOption}>
				<div
					id='Flutterwave'
					onClick={paymentOptionHandler}
					style={{
						backgroundImage: `url('https://shuttlelane.com/images/flutterwaveP.png')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						backgroundPosition: 'center center',
						border:
							selectedPayment === 'Flutterwave'
								? '3px solid #e2b443'
								: '',
						borderRadius: '5px',
					}}
				></div>
				<div
					id='Paypal'
					onClick={paymentOptionHandler}
					style={{
						background: `url('https://shuttlelane.com/images/paypalP.png')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						backgroundPosition: 'center center',
						border: '3px solid  #e2b443',
						borderRadius: '5px',
						border:
							selectedPayment === 'Paypal'
								? '3px solid #e2b443'
								: '',
					}}
				></div>
				<div
					id='Stripe'
					onClick={paymentOptionHandler}
					style={{
						background: `url('https://shuttlelane.com/images/stripeP.png')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						backgroundPosition: 'center center',
						border: '3px solid #e2b443',
						borderRadius: '5px',
						border:
							selectedPayment === 'Stripe'
								? '3px solid #e2b443'
								: '',
					}}
				></div>
			</div>
			{/* <button className='btnGrad' type='submit' onClick={onSubmitHandler}>
				Proceed to Payment
			</button> */}
			{selectedPayment == 'Stripe' ? (
				<StripeCheckout
					name={`${bookingData.formType} booking `}
					description={
						bookingData.carType
							? `${bookingData.carType} ${bookingData.formType} Service`
							: `Airport ${bookingData.formType} Service`
					}
					image='/assets/paymentlogo.png'
					label='LABEL'
					currency={
						bookingData.currency == 'niera'
							? 'NGN'
							: bookingData.currency == 'pound'
							? 'GBP'
							: bookingData.currency == 'euro'
							? 'EUR'
							: 'USD'
					}
					stripeKey={`${process.env.NEXT_PUBLIC_STRIPE_KEY_LIVE}`}
					token={makePayment}
					amount={parseFloat(bookingData.amount) * 100}
					closed={onClosed}
					email={`${bookingData.email} `}
				>
					<button className='btnGrad'> Pay with Stripe </button>
				</StripeCheckout>
			) : selectedPayment == 'Paypal' && !isPending ? (
				<PayPalButtons
					style={{ layout: 'horizontal' }}
					createOrder={createOrder}
					onApprove={onApprove}
					onError={onError}
				/>
			) : selectedPayment == 'Flutterwave' ? (
				<button
					className='btnGrad'
					onClick={() => {
						handleFlutterPayment({
							callback: (response) => {
								console.log('flutterwave response', response);
								if (
									response &&
									response.flw_refstatus == 'successfull'
								) {
									onSubmitHandler(
										response.transaction_id,
										'',
										'Successful'
									);
								} else {
									toast.errror(
										`Please try agian,Something went wrong`,
										{
											position: 'top-center',
											autoClose: 2000,
											hideProgressBar: true,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: 0,
										}
									);
								}
								closePaymentModal(); // this will close the modal programmatically
							},
							onClose: () => {
								toast.error('Payment Cancelled', {
									position: 'top-center',
									autoClose: 3000,
									hideProgressBar: true,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: 0,
								});
							},
						});
					}}
				>
					Pay with FlutterWave
				</button>
			) : null}

			<ToastContainer />
		</div>
	);
};

export default PaymentMethod;

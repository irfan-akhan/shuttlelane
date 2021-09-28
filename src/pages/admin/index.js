import fetch from 'isomorphic-unfetch';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/Admin.module.css';
import Head from 'next/head';
import jwt from 'jsonwebtoken';

function redirect(user, router) {
	user?.role?.includes('blogger')
		? setTimeout(() => {
				router.push('/admin/blogger');
		  }, 1000)
		: user?.role?.includes('admin') || user?.role?.includes('superAdmin')
		? setTimeout(() => {
				router.push('/admin/dashboard');
		  }, 1000)
		: toast.error(
				'Something went wrong check internet connection or contact Admin',
				{
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
				}
		  );
}

// COMPONENT

const Signin = () => {
	const router = useRouter();
	let emailRef = useRef();
	let passwordRef = useRef();

	useEffect(() => {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const user = jwt.decode(token);
				console.log('user is already signed in', user);

				if (user) {
					redirect(user, router);
				} else {
					toast.info(
						'Previous session has expired, Please login again',
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
					localStorage.removeItem('token');
				}
			}
		} catch (error) {
			console.log('catch signn', error);
		}
	});

	async function onSubmitHandler(e) {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			const response = await fetch(
				'https://shuttlelane.herokuapp.com/api/signin',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				}
			);
			const user = await response.json();
			console.log(user);
			if (user.error) {
				toast.error(` ${user.error}`, {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
				});
				return;
			} else {
				toast.success(`Please wait logging you in.`, {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
				});
				localStorage.setItem('token', user.token);
				redirect(user.data, router);
			}
		} catch (error) {
			console.log('in catch', error);
			toast.error(
				'👌 Something went wrong check internet connection or contact Admin',
				{
					position: 'top-center',
					autoClose: 4000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
				}
			);
		}
		return;
	}
	return (
		<section className={styles.admin}>
			<Head>
				<title>Sign in | shuttlelane.com</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<img src='/assets/images/shuttle.png' alt='' />

			<div className={styles.formContainer}>
				<form onSubmit={onSubmitHandler} className={styles.signIn}>
					<h1 className={styles.heading}>Sign in</h1>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='Enter email'
						required
						ref={emailRef}
					/>
					<input
						type='password'
						name='email'
						id='email'
						placeholder='Enter Password'
						required
						ref={passwordRef}
					/>
					<button
						onClick={(e) => {
							toast();
						}}
						type='submit'
					>
						Sign in
					</button>
					<ToastContainer />
				</form>
			</div>
		</section>
	);
};

export default Signin;

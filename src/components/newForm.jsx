import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import input from '../styles/Drivefor.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
	Person,
	Mail,
	Phone,
	School,
	DriveEta,
	LocationOn,
} from '@material-ui/icons';

let driverRequirements = {
	firstName: '',
	middleName: '',
	lastName: '',
	gender: '',
	email: '',
	mobile: '',
	altMobile: '',
	education: '',
	policy: false,
	carName: '',
	carType: '',
	carModel: '',
	carYear: '',
	maritalStatus: '',
	address: '',
	city: '',
	state: '',
	eFirstName: '',
	eMiddleName: '',
	eLastName: '',
	eMobile: '',
	eAddress: '',
	otherPlatform: false,
	platformName: '',
};

const newForm = () => {
	const [driverInput, setDriverInput] = useState(driverRequirements);
	const [interior, setInterior] = useState([]);
	const [exterior, setExterior] = useState([]);
	const [passport, setPassport] = useState();
	const [policy, setPolicy] = useState(false);
	const router = useRouter();

	const onChangeHandler = (e) => {
		console.log(e.target.name, e.target.value);
		setDriverInput({ ...driverInput, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		toast.info('Please Wait', {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: 0,
		});

		console.log(driverInput);
		try {
			fetch('https://shuttlelane.herokuapp.com/api/driver', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(driverInput),
			})
				.then((res) => res.json())
				.then((result) => {
					toast.success('Booking Confirmed', {
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: 0,
					});
					console.log(result);
					if (result.data) {
						router.push('/partnership/drive-confirmation');
					}
				})
				.catch((err) => console.log('err catch', err));
		} catch (err) {
			console.log('Something wen wrong, Check you internet');
		}
	};
	return (
		<>
			<Grid
				container
				spacing={2}
				justifyContent='center'
				alignItem='flexStart'
				style={{ marginTop: '3rem' }}
			>
				<Grid item xs={12} md={10} xl={7}>
					<form onSubmit={onSubmitHandler} className='checkoutForm'>
						<h4 style={{ textAlign: 'center' }}>
							Personal Details
						</h4>
						<div className='formGroup'>
							<div className='inputControl'>
								<span>
									<Person />
								</span>
								<input
									value={driverInput.firstName}
									onChange={onChangeHandler}
									type='text'
									name='firstName'
									placeholder='First Name'
								/>
							</div>
							<div className='inputControl'>
								<span>
									<Person />
								</span>
								<input
									value={driverInput.middleName}
									onChange={onChangeHandler}
									type='text'
									name='middleName'
									placeholder='Middle Name'
								/>
							</div>
						</div>
						<div id='radio' className='formGroup'>
							<div className='inputControl'>
								<span>
									<Person />
								</span>
								<input
									value={driverInput.lastName}
									onChange={onChangeHandler}
									type='text'
									name='lastName'
									placeholder='Last Name'
								/>
							</div>
							<div className='inputControl'>
								<label>
									<strong>Gender &nbsp;</strong>
								</label>
								<input
									onChange={onChangeHandler}
									type='radio'
									name='gender'
									id='gender'
								/>
								<label htmlFor='male'>Male</label>
								<input
									onChange={onChangeHandler}
									type='radio'
									name='gender'
									id='gender'
								/>
								<label htmlFor='female'>Female</label>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl'>
								<span>
									<Mail />
								</span>
								<input
									value={driverInput.email}
									onChange={onChangeHandler}
									type='email'
									required
									name='email'
									placeholder='Email Address'
								/>
							</div>
							<div className='inputControl'>
								<span>
									<Phone />
								</span>
								<input
									value={driverInput.mobile}
									onChange={onChangeHandler}
									type='tel'
									maxLength='10'
									required
									name='mobile'
									placeholder='Phone'
								/>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl'>
								<span>
									<Phone />
								</span>
								<input
									value={driverInput.altMobile}
									onChange={onChangeHandler}
									type='tel'
									maxLength='10'
									required
									name='altMobile'
									placeholder='Alternate Number'
								/>
							</div>
							<div className='inputControl'>
								<span>
									<School />
								</span>
								<select
									name='education'
									value={driverInput.education}
									onChange={onChangeHandler}
									className={input.extra}
								>
									<option value='' disabled selected>
										Education
									</option>
									<option value='primary'>Primary</option>
									<option value='secondary'>Secondary</option>
									<option value='polytechnic'>
										Polytechnic
									</option>
									<option value='university'>
										University
									</option>
									<option value='other'>Other</option>
								</select>
							</div>
						</div>
						<div className='formGroup'>
							<div className={input.policy}>
								<input
									onChange={() => setPolicy((prev) => !prev)}
									type='checkbox'
									required
									name='policy'
								/>
								I agree to the Privacy Policy
							</div>
						</div>

						{policy && (
							<>
								<h4 style={{ textAlign: 'center' }}>
									Additional Information
								</h4>
								<div className='formGroup'>
									<div className='inputControl'>
										<span>
											<DriveEta />
										</span>
										<select
											name='carType'
											value={driverInput.carType}
											onChange={onChangeHandler}
										>
											<option disabled selected>
												Car Type
											</option>
											<option value='salon'>Salon</option>
											<option value='suv'>SUV</option>
											<option value='mini-bus'>
												Mini Bus
											</option>
										</select>
									</div>
									<div className='inputControl'>
										<span>
											<DriveEta />
										</span>
										<input
											value={driverInput.carName}
											onChange={onChangeHandler}
											type='text'
											name='carName'
											placeholder='Car Name'
										/>
									</div>
								</div>
								<div className='formGroup'>
									<div className='inputControl'>
										<span>
											<DriveEta />
										</span>
										<input
											value={driverInput.carModel}
											onChange={onChangeHandler}
											type='text'
											name='carModel'
											placeholder='Model'
										/>
									</div>
									<div className='inputControl'>
										<span>
											<DriveEta />
										</span>
										<input
											value={driverInput.carYear}
											onChange={onChangeHandler}
											type='number'
											name='carYear'
											placeholder='Year'
										/>
									</div>
								</div>

								<div id='radio' className='formGroup'>
									<div class='inputControl'>
										<label for='radio'>
											<strong>Marital Status</strong>
										</label>
										<input
											onChange={onChangeHandler}
											type='radio'
											name='maritalStatus'
											id='maritalstatus'
										/>
										<label for='male'>Married</label>
										<input
											// value={driverInput.}
											onChange={onChangeHandler}
											type='radio'
											name='maritalStatus'
											id='maritalstatus'
										/>
										<label for='female'>Single</label>
									</div>
									<div className='inputControl'>
										<span>
											<Person />
										</span>
										<input
											value={driverInput.address}
											onChange={onChangeHandler}
											type='text'
											required
											name='address'
											placeholder='Address'
										/>
									</div>
								</div>

								<div className='formGroup'>
									<div className='inputControl'>
										<span>
											<Person />
										</span>
										<input
											value={driverInput.city}
											onChange={onChangeHandler}
											type='text'
											required
											name='city'
											placeholder='City'
										/>
									</div>
									<div className='inputControl'>
										<span>
											<Person />
										</span>
										<input
											value={driverInput.state}
											onChange={onChangeHandler}
											type='text'
											required
											name='state'
											placeholder='State'
										/>
									</div>
								</div>
								<h3 style={{ textAlign: 'center' }}>
									Emergency Contact
								</h3>
								<div className='formGroup'>
									<div className='inputControl'>
										<span>
											<Person />
										</span>
										<input
											value={driverInput.eFirstName}
											onChange={onChangeHandler}
											type='text'
											name='eFirstName'
											placeholder='First Name'
										/>
									</div>
									<div className='inputControl'>
										<span>
											<Person />
										</span>
										<input
											value={driverInput.eLastName}
											onChange={onChangeHandler}
											type='text'
											name='eLastName'
											placeholder='Last Name'
										/>
									</div>
								</div>
								<div className='formGroup'>
									<div className='inputControl'>
										<span>
											<LocationOn />
										</span>
										<input
											value={driverInput.eAddress}
											onChange={onChangeHandler}
											type='text'
											name='eAddress'
											placeholder='Address'
										/>
									</div>
									<div className='inputControl'>
										<span>
											<Person />
										</span>
										<input
											value={driverInput.eMobile}
											onChange={onChangeHandler}
											type='tel'
											maxLength='10'
											name='eMobile'
											placeholder='Phone Number'
										/>
									</div>
								</div>
								<hr />
								<div className='formGroup drive'>
									Are you currently driving for any
									ride-hailing platforms? (eg. Uber, Taxify,
									Oride,etc.)
								</div>
								<div className='formGroup'>
									<div className='inputControl'>
										<label htmlFor=''>Yes</label>
										<input
											onchange={onChangeHandler}
											type='radio'
											name='platformName'
											id='platformName'
										/>
										<label htmlFor=''>No</label>
										<input
											onchange={onChangeHandler}
											type='radio'
											name='platformName'
											id='platformName'
										/>
									</div>
									<div className='inputControl'>
										<input
											onchange={onChangeHandler}
											type='text'
											name='platformName'
											placeholder='if yes Please Specify the name  '
										/>
									</div>
								</div>
								{/* <h4>Files</h4>
						<div className='formGroup'>
							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='passport'
									id='passport'
								/>
								<label htmlFor='passport'>Passport</label>
							</div>
							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='license'
									id='license'
								/>
								<label htmlFor='license'>Driver License</label>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='compInsurance'
									id='compInsuarance'
								/>
								<label htmlFor='compInsuarance'>
									Comprehensive Insuarance
								</label>
							</div>

							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='certfInsuarance'
									id='certfInsuarance'
								/>
								<label htmlFor='certfInsuarance'>
									Certificate of Insuarance
								</label>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='lasdri'
									id='lasdri'
								/>
								<label htmlFor='lasdri'>Lasdri</label>
							</div>

							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='interior1'
									id='interior1'
								/>
								<label htmlFor='interior1'>
									Interior (Photo1)
								</label>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='interior2'
									id='interior2'
								/>
								<label htmlFor='interior2'>
									Interior (Photo2)
								</label>
							</div>

							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='interior3'
									id='interior3'
								/>
								<label htmlFor='interior3'>
									Interior (Photo3)
								</label>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='interior4'
									id='interior4'
								/>
								<label htmlFor='interior4'>
									Interior (Photo4)
								</label>
							</div>

							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='exterior1'
									id='exterior1'
								/>
								<label htmlFor='exterior1'>
									Exterior (Photo1)
								</label>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='exterior2'
									id='exterior2'
								/>
								<label htmlFor='exterior2'>
									Exterior (Photo2)
								</label>
							</div>

							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='exterior3'
									id='exterior3'
								/>
								<label htmlFor='exterior3'>
									Exterior (Photo3)
								</label>
							</div>
						</div>
						<div className='formGroup'>
							<div className='inputControl' id='files'>
								<span>
									<Person />
								</span>
								<input onchange={onChangeHandler}
									
									type='file'
									name='exterior4'
									id='exterior4'
								/>
								<label htmlFor='exterior4'>
									Exterior (Photo4)
								</label>
							</div>
						</div> */}
								<button type='submit' className='btnGrad'>
									Submit
								</button>
							</>
						)}
					</form>
				</Grid>
			</Grid>
		</>
	);
};

export default newForm;

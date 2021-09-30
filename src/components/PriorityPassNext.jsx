import React, { Component } from 'react';
import {
	Person,
	AccessTime,
	Mail,
	DateRange,
	Phone,
	FlightLand,
} from '@material-ui/icons';
let date = new Date().toISOString().substr(0, 10);
export default class PriorityPassNext extends Component {
	onChangeHandler = (e) => {
		this.props.setData({
			...this.props.data,
			[e.target.name]: e.target.value,
		});
	};
	render() {
		return (
			<div style={{ marginTop: '6rem' }}>
				<h4
					style={{
						margin: '0',
						paddingLeft: '1.4rem',
						textTransform: 'uppercase',
					}}
				>
					Priority Pass Info
				</h4>
				<hr />
				<form className='checkoutForm'>
					<div className='formGroup'>
						<div className='inputControl'>
							<span>
								<Person />
							</span>
							<select
								name='service'
								onChange={this.onChangeHandler}
								value={this.props.data.service}
								id=''
								required
							>
								<option selected disabled>
									Select Service
								</option>
								<option value='Arival'>
									Arrival Protocol Service{' '}
								</option>
								<option value='Departure'>
									Departure Protocol Service{' '}
								</option>
							</select>
						</div>

						<div className='inputControl'>
							<span>
								<Person />
							</span>
							<select
								name='airport'
								id='airport'
								onChange={this.onChangeHandler}
								required
							>
								<option value='' defaultValue disabled>
									Select Airport
								</option>
								<option value='Murtala Muhammed International Airport'>
									Murtala Muhammed International Airport
								</option>
								<option value='Murtala Muhammed Domestic Airport'>
									Murtala Muhammed Domestic Airport
								</option>
								{/* <option value="Port Harcourt International Airport">
          Port Harcourt International Airport
        </option>
        <option value="Nnamdi Azikwe International Airport">
          Nnamdi Azikwe International Airport
        </option>
        <option value="Kotoka International Airport">
          Kotoka International Airport
        </option>
        <option value="Kumasi Airport">Kumasi Airport</option>
        <option value="London Heathrow Airport">
          London Heathrow Airport
        </option>
        <option value="Gatwick Airport">Gatwick Airport</option>
        <option value="London City Airport">London City Airport</option> */}
							</select>
						</div>
					</div>
					<div className='formGroup'>
						<div className='inputControl'>
							<span>
								<Person />
							</span>
							<input
								required
								placeholder='Number of Passengers'
								min='1'
								max='10'
								type='number'
								name='passengers'
								id='passengers'
								value={this.props.data.passengers}
								onChange={this.onChangeHandler}
							/>
						</div>

						<div className='inputControl'>
							<span>
								<Person />
							</span>
							<select
								name='cabinClass'
								value={this.props.data.cabinClass}
								onChange={this.onChangeHandler}
								required
							>
								<option value='' selected disabled>
									Select Cabin Class
								</option>

								<option value='First Class'>First Class</option>
								<option value='Business Class'>
									Business Class{' '}
								</option>
								<option value='Premium Economy'>
									Premium Economy
								</option>
								<option value='Economy'>Economy</option>
							</select>
						</div>
					</div>
					{/* dummy */}

					<div className='formGroup'>
						<div className='inputControl'>
							<span>
								<FlightLand />
							</span>
							<input
								type='text'
								placeholder='Flight Number'
								name='flightNumber'
								id='flightNumber'
								required
								value={this.props.data.flightNumber}
								onChange={this.onChangeHandler}
							/>
						</div>

						<div className='inputControl'>
							<span>
								<DateRange />
							</span>
							<input
								type='date'
								name='date'
								min={date}
								placeholder='Date'
								id='date'
								required
								value={this.props.data.date}
								onChange={this.onChangeHandler}
							/>
						</div>
					</div>
					<div className='formGroup'>
						<div className='inputControl'>
							<span>
								<AccessTime />
							</span>
							<input
								type='time'
								placeholder='time'
								name='time'
								id='time'
								required
								value={this.props.data.time}
								onChange={this.onChangeHandler}
							/>
						</div>
						<div className='inputControl'>
							<span>
								<FlightLand />
							</span>
							<input
								type='text'
								Placeholder='Airline'
								name='airline'
								id='airline'
								time
								value={this.props.data.airline}
								onChange={this.onChangeHandler}
							/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

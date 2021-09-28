import { Grid } from '@material-ui/core';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import styles from '../styles/Summary.module.css';

const Rental = () => {
	return (
		<div className={styles.card} style={{ marginTop: '0px' }}>
			<h4>Rental Conditions</h4>
			<div className={styles.included}>
				<p>
					<span>
						<LibraryAddCheckIcon
							fontSize='small'
							style={{ color: '#81c784' }}
						/>
					</span>
					<span>
						Please note that our working period is between 7am-7pm
					</span>
				</p>
				<p>
					<span>
						<LibraryAddCheckIcon
							fontSize='small'
							style={{ color: '#81c784' }}
						/>
					</span>
					<span>
						Normal Overtime Rate (7pm -12 midnight) Excluded.
					</span>
				</p>
				<p>
					<span>
						<LibraryAddCheckIcon
							fontSize='small'
							style={{ color: '#81c784' }}
						/>
					</span>
					<span>
						Abnormal Overtime Rate (12 midnight -6 am) Excluded.
					</span>
				</p>
				<p>
					<span>
						<LibraryAddCheckIcon
							fontSize='small'
							style={{ color: '#81c784' }}
						/>
					</span>
					<span>Weekend Allowance Excluded.</span>
				</p>
				<p>
					<span>
						<LibraryAddCheckIcon
							fontSize='small'
							style={{ color: '#81c784' }}
						/>
					</span>
					<span>Public Holiday Allowance Excluded.</span>
				</p>
				<p>
					<span>
						<LibraryAddCheckIcon
							fontSize='small'
							style={{ color: '#81c784' }}
						/>
					</span>
					<span>Travel Allowance Excluded.</span>
				</p>
				<p>
					<span>
						<LibraryAddCheckIcon
							fontSize='small'
							style={{ color: '#81c784' }}
						/>
					</span>
					<span>Outstation Allowance Excluded.</span>
				</p>
			</div>
		</div>
	);
};

export default Rental;

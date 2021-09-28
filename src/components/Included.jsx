import { Grid } from '@material-ui/core';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import styles from '../styles/Summary.module.css';

const Included = ({ formType }) => {
	return (
		<div className={styles.card} style={{ marginTop: '10px' }}>
			<h4>Also Included</h4>
			{formType == 'Airport-Pickup' ? (
				<div className={styles.included}>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free airport meet and greet.</span>
					</p>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free Porter Service.</span>
					</p>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free bottled water.</span>
					</p>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>
							Free cancellation up to 24 hours before pick-up.
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
							60 minutes waiting time after flight arrival.
						</span>
					</p>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free Trolley.</span>
					</p>
				</div>
			) : formType == 'Airport-Dropoff' ? (
				<div className={styles.included}>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free Porter Service.</span>
					</p>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free bottled water.</span>
					</p>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>
							Free cancellation up to 24 hours before pick-up.
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
							{`20 minutes waiting time after driver's arrival.`}
						</span>
					</p>

					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free Trolley.</span>
					</p>
				</div>
			) : (
				<div className={styles.included}>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free airport meet and greet.</span>
					</p>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free Porter Service.</span>
					</p>
					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>
							Free cancellation up to 24 hours before pick-up.
						</span>
					</p>

					<p>
						<span>
							<LibraryAddCheckIcon
								fontSize='small'
								style={{ color: '#81c784' }}
							/>
						</span>
						<span>Free Trolley.</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default Included;

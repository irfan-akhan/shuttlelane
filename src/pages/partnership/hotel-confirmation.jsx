import { Grid } from '@material-ui/core';

const HotelConfirmation = () => {
	return (
		<Grid
			container
			justifyContent='center'
			alignItems='center'
			style={{ minHeight: '60vh', marginTop: '5rem' }}
		>
			<Grid item xs={10} sm={8} md={6} xl={6}>
				<h1 style={{ textAlign: 'center' }}>
					Thank you for Signing Up. A Member of the team will be in
					touch shortly.
				</h1>
			</Grid>
		</Grid>
	);
};

export default HotelConfirmation;

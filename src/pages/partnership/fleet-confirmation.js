import { Grid } from '@material-ui/core';

const FleetConfirmation = () => {
	return (
		<Grid
			container
			spacing={3}
			alignItems='center'
			justifyContent='center'
			style={{ minHeight: '60vh', marginTop: '5rem' }}
		>
			<Grid item xs={10} sm={8} md={6} xl={6}>
				<h1 style={{ textAlign: 'center' }}>
					Thank you for Signing Up You are now one step closer to
					becoming a supplier to Shuttlelane.
				</h1>
			</Grid>
		</Grid>
	);
};

export default FleetConfirmation;

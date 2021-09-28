import { Grid } from '@material-ui/core';

const DriveConfirmation = () => {
	return (
		<Grid
			container
			spacing={3}
			justifyContent='center'
			alignItems='center'
			style={{ minHeight: '60vh', marginTop: '5rem' }}
		>
			<Grid item xs={10} sm={8} md={6} xl={6}>
				<h1 style={{ textAlign: 'center' }}>
					Thank you for contacting Shuttlelane about our driver jobs.{' '}
					<br />A Member of the team will be in touch shortly.
				</h1>
			</Grid>
		</Grid>
	);
};

export default DriveConfirmation;

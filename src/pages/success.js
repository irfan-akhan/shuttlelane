import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Confirmation from '../components/Confirmation';
const success = () => {
	const router = useRouter();
	const [booking, setBooking] = useState({});
	console.log('1111111', router.asPath?.split('?')[1]);
	console.log('2222222', router.asPath?.split('?')[1]?.split('='));
	const params = router.asPath?.split('?')[1]?.split('=');
	useEffect(() => {
		fetch(
			`https://shuttlelane.herokuapp.com/api/booking/${params[0]}/${params[1]}`
		)
			.then((res) => res.json())
			.then((result) => {
				console.log('result', result);
				setBooking(result.data);
			})
			.catch((err) => console.log('err in fetch catch', err));
	}, []);
	return (
		<section>
			<Confirmation booking={booking} />
		</section>
	);
};
export default success;
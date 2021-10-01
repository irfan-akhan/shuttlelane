import React from 'react';
import { Grid } from '@material-ui/core';
import Post from '../../components/Singlepost';
import postStyles from '../../styles/SinglePost.module.css';
const single = ({ post }) => {
	return (
		<div className={postStyles.postMain}>
			<Grid container xs={10} justifyContent='center'>
				{console.log(post)}
				<Post post={post} />
			</Grid>
		</div>
	);
};

export default single;

export async function getServerSideProps(context) {
	console.log('context', context.query.heading);
	const id = context.query.heading;
	let post = {};
	try {
		post = await fetch(`https://shuttlelane.com/api/posts/${id}`)
			.then((res) => res.json())
			.then((res) => res.data);
	} catch (err) {
		console.log(err);
		return {
			props: {
				post,
			},
		};
	}
	return {
		props: {
			post,
		},
	};
}

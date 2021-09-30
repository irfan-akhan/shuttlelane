import BlogCard from '../../components/BlogCard';
import BlogHeader from '../../components/BlogHeader';
import BlogAside from '../../components/BlogAside';
import blog from '../../styles/Blog.module.css';
// import fetch from 'isomorphic-fetch';
import { useRouter } from 'next/router';

import {
	Card,
	CardActions,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	Button,
	Typography,
	Grid,
} from '@material-ui/core';
import Head from 'next/head';

const BlogList = ({ posts }) => {
	return (
		<>
			<section className={blog.blogMain}>
				<Head>
					<title>Blog | shuttlelane.com</title>
					<meta
						name='viewport'
						content='initial-scale=1.0, width=device-width'
					/>
				</Head>
				<Grid container spacing={5} className={blog.cards}>
					{posts?.map((post) => {
						return (
							<Grid key={post._id} item xs={12} sm={5}>
								<BlogCard post={post} />
							</Grid>
						);
					})}
				</Grid>
				<BlogAside />
			</section>
		</>
	);
};

export default BlogList;

export async function getServerSideProps(context) {
	const posts = await fetch(`https://shuttlelane.herokuapp.com/api/posts/`)
		.then((res) => res.json())
		.catch((err) => {
			return {
				props: {
					posts: [],
				},
			};
		});
	return {
		props: {
			posts: posts.data,
		},
	};
}

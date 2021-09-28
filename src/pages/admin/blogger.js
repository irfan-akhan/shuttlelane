import Head from 'next/head';
import { useState, useEffect } from 'react';
import ActionCard from '../../components/admin/ActionCard';
import BlogForm from '../../components/admin/BlogForm';
import Modal from '../../components/admin/Modal';
import styles from '../../styles/Blogger.module.css';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogger = ({ error }) => {
	const router = useRouter();
	const [posts, setPosts] = useState([]);
	const [reload, setReload] = useState(false);
	const [action, setAction] = useState(null);
	const [postAction, setPostAction] = useState(null);
	const [editMode, setEditMode] = useState(null);
	const [selectedPost, setSelectedPost] = useState({});
	const [loggedUser, setLoggedUser] = useState({});

	useEffect(() => {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				toast.error(`Please login to perform this action`, {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
				});
				router.push('/admin');
				return;
			}
			const user = jwt.decode(token);
			console.log('USER', user);
			if (!user) {
				toast.info(
					'Looks like your session has expired, Please login again',
					{
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: 0,
					}
				);
				localStorage.removeItem('token');
				router.push('/admin');
				return;
			} else if (
				user.role != 'admin' &&
				user.role != 'blogger' &&
				user.role != 'superAdmin'
			) {
				localStorage.removeItem('token');
				router.push('/admin');
				return;
			}
			setLoggedUser(user);

			fetch('https://shuttlelane.herokuapp.com/api/posts')
				.then((response) => response.json())
				.then((res) => {
					console.log(res);
					if (res.data) {
						setPosts(res.data);
					} else {
						console.log('empty data');
						return;
					}
				})
				.then((err) => console.log('err', err));
		} catch (error) {
			console.log('in catch', error);
		}
		console.log('token', localStorage.getItem('token'));
	}, [reload]);
	function logoutHandler() {
		localStorage.removeItem('token');
		router.push('/admin');
	}
	function deletePostHandler(post) {
		try {
			fetch(`https://shuttlelane.herokuapp.com/api/posts/${post._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token'),
				},
			})
				.then((res) => res.json())
				.then((result) => {
					console.log('post delete', result);
					if (result.error) {
						toast.error(result.error, {
							position: 'top-center',
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: 0,
						});

						setReload((prev) => !prev);
						return;
					}
					toast.success(result.message, {
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: 0,
					});
				})
				.catch((err) => console.log('in catch', err));
		} catch (err) {
			console.log('post delete catcj', err);
			toast.error(
				'Something went wrong check your internet and try again',
				{
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
				}
			);
		}
	}
	function onClickHandler(e) {
		e.persist();
		setAction((prevState) => {
			return e.target.id;
		});
	}
	function showProfile(e) {
		const profile = document.querySelector('#profile');
		if (profile.style.display == 'flex') {
			profile.style.display = 'none';
		} else {
			profile.style.display = 'flex';
		}
	}
	return (
		<section className={styles.blogger}>
			<Head>
				<title>Blogger Dashboard | shuttlelane.com</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<aside className={styles.aside}>
				<div>
					<div className={styles.mobNav}>
						<img src='/assets/images/logo.png' alt='logo' />
						<div
							onClick={showProfile}
							style={{
								display: 'flex',
								flexDirection: 'column',
								zIndex: '10',
							}}
							className={styles.burger}
						>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<h2
						style={{
							opacity: '0.7',
							fontWeight: 'bold',
							color: '#613DE6',
							margin: '0',
							marginTop: '1rem',
						}}
					>
						Actions
					</h2>
					<ActionCard
						id='create'
						actionName='create post'
						onClickHandler={onClickHandler}
					/>
					<ActionCard
						id='posts'
						onClickHandler={onClickHandler}
						actionName='View posts'
					/>
					<button
						onClick={logoutHandler}
						style={{
							background: 'red',
							border: 'none',
							padding: '1rem',
							marginTop: '15px',
							color: '#fff',
							fontWeight: 'bold',
						}}
					>
						Logout
					</button>
				</div>
			</aside>
			<main className={styles.mainContent}>
				<ToastContainer />
				{action === 'create' ? (
					<div className={styles.formContainer}>
						<BlogForm />
					</div>
				) : action === 'posts' ? (
					<div className={styles.heading}>
						<h1 style={{ textAlign: 'center' }}>
							posts Written by you
						</h1>
						{error ? (
							<div
								style={{
									padding: '1rem',
									textAlign: 'center',
								}}
							>
								<h4>{error}</h4>
							</div>
						) : (
							<div className={styles.postsContainer}>
								{posts && posts.length > 0 ? (
									posts.map((post) => (
										<div
											key={post._id}
											className={styles.bloggerPosts}
										>
											<div style={{ width: '90%' }}>
												<h4>{post.heading}</h4>
												<p>
													{post.postDescription.slice(
														0,
														50
													)}
												</p>
											</div>
											<button
												onClick={() => {
													setSelectedPost({
														...post,
													});
													setPostAction(
														() => 'update'
													);
													setEditMode(true);
												}}
											>
												Update
											</button>
											<button
												onClick={(e) => {
													setSelectedPost({
														...post,
													});
													deletePostHandler(post);
												}}
											>
												Delete
											</button>
										</div>
									))
								) : (
									<h2
										style={{
											color: 'red',
											textAlign: 'center',
										}}
									>
										No pots yet
									</h2>
								)}
								{editMode && (
									<Modal
										post={selectedPost}
										isOpen={editMode}
										onCloseHandler={() => {
											setEditMode(false);
											setSelectedPost(false);
										}}
									>
										<BlogForm
											post={selectedPost}
											action={postAction}
											reload={() => {
												setReload((prev) => !prev);
											}}
										/>
									</Modal>
								)}
							</div>
						)}
					</div>
				) : (
					<div className={styles.actionCard}>Select an action</div>
				)}
			</main>
			<div className={styles.profile} id='profile'>
				<div className={styles.profileHeader}>
					<img
						src={`https://thumbs.dreamstime.com/b/woman-profile-silhouette-portrait-moon-her-head-beautiful-woman-profile-silhouette-portrait-moon-her-head-198533883.jpg`}
						alt='profile'
					/>
					<h4>{loggedUser ? loggedUser.name : null}</h4>
					{/* <h6>Joined On</h6> */}
				</div>
				<div className={styles.profileOverview}>
					<h3>Overview</h3>
					<div className={styles.overviewCard}>
						<h1>{posts && posts.length}</h1>
						<h4>Posts</h4>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Blogger;

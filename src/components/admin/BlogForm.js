import { useState } from 'react';
import styles from '../../styles/BlogForm.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialValues = {
	heading: '',
	image: null,
	author: 'khan',
	para1: '',
	para2: '',
	para3: '',
};

const BlogForm = ({ post, action, reload }) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [inputValues, setInputValues] = useState(
		post
			? {
					heading: post.heading,
					image: null,
					author: post.author,
					para1: post.postDescription[0],
					para2: post.postDescription[1],
					para3: post.postDescription[2],
			  }
			: initialValues
	);
	const onChangeHandler = (e) => {
		e.persist();
		setInputValues({
			...inputValues,
			[e.target.name]: e.target.value,
		});
	};
	console.log('IMPUT VALUES', inputValues || 'nooo');
	const onSubmitHandler = (e) => {
		e.preventDefault();
		let response;
		console.log('inputFields', inputValues);
		let fd = new FormData();
		console.log('Form Data 1', fd);

		fd.append('image', setSelectedImage);
		fd.append('heading', inputValues.heading);
		fd.append('author', 'Khan');
		fd.append('postDescription', [
			inputValues.para1,
			inputValues.para2,
			inputValues.para3,
		]);
		for (let item of fd) {
			console.log(item);
		}
		const url =
			action == 'update'
				? `https://shuttlelane.herokuapp.com/api/posts/${post._id}`
				: `https://shuttlelane.herokuapp.com/api/posts`;
		try {
			fetch(url, {
				method: action == 'update' ? 'PUT' : 'POST',
				headers: {
					Accept: 'application/json',
					// 'Content-Type': 'multipart/form-data',
				},
				// body: JSON.stringify({
				// 	heading: inputValues.heading,
				// 	image: inputValues.image,
				// 	author: 'khan',
				// 	postDescription: [
				// 		inputValues.para1,
				// 		inputValues.para2,
				// 		inputValues.para3,
				// 	],
				// }),
				body: fd,
			})
				.then((res) => res.json())
				.then((res) => {
					console.log('Inside form res', res);
					response = res;
					reload();
				});
			console.log('returned res', response);
		} catch (error) {
			console.log(error);
		}
	};
	const fileHandler = (e) => {
		console.log(e.target.files[0]);
		setSelectedImage(e.target.files[0]);
	};

	return (
		<section>
			<h2 style={{ color: '#000080', textAlign: 'center' }}>
				Enter Blog Details
			</h2>
			<form
				onSubmit={onSubmitHandler}
				enctype='multipart/form-data'
				className={styles.form}
			>
				<div className={styles.formGroup}>
					<div className=''>
						<label htmlFor='heading'>Heading</label>
						<input
							className={styles.inputControl}
							type='text'
							name='heading'
							id='heading'
							required
							onChange={onChangeHandler}
							value={inputValues.heading}
						/>
					</div>
					<div>
						<label htmlFor='image'>Blog Image</label>
						<input
							className={styles.inputControl}
							type='file'
							name='image'
							id='image'
							onChange={fileHandler}
							// required
						/>
					</div>
				</div>
				<div className={styles.formGroup}></div>
				<div className={styles.blog}>
					<fieldset>
						<legend>Blog Description (*Required)</legend>
						<textarea
							name='para1'
							id='postBody'
							cols='90'
							rows='10'
							required
							onChange={onChangeHandler}
							value={inputValues.para1}
							style={{ border: 'none', resize: 'none' }}
						></textarea>
					</fieldset>
				</div>
				<div className={styles.blog}>
					<fieldset>
						<legend>Blog Description (*Optional)</legend>
						<textarea
							name='para2'
							id='postBody'
							cols='90'
							rows='3'
							onChange={onChangeHandler}
							value={inputValues.para2}
							style={{ border: 'none', resize: 'none' }}
						></textarea>
					</fieldset>
				</div>
				<div className={styles.blog}>
					<fieldset>
						<legend>Blog Description (*Optional)</legend>
						<textarea
							name='para3'
							id='postBody'
							cols='90'
							rows='3'
							onChange={onChangeHandler}
							value={inputValues.para3}
							style={{ border: 'none', resize: 'none' }}
						></textarea>
					</fieldset>
				</div>

				<button style={{ margin: '1rem auto' }} type='submit'>
					post
				</button>
			</form>
		</section>
	);
};

export default BlogForm;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
	{
		heading: {
			type: String,
			required: true,
			maxLength: 60,
			trim: true,
		},
		published: {
			type: String,
			enum: ['draft', 'published'],
			default: 'draft',
		},
		imageUrl: String,
		author: String,
		postDescription: [],
	},
	{ timestamps: true }
);
const Post = mongoose.model('post', postSchema);
module.exports = Post;

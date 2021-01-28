const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: false,
	},
	cover: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (doc, ret) => {
		delete ret._id;
		delete ret.hash;
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

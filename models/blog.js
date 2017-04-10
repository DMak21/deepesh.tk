var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title: {
		type: String
	},
	content: {
		type: String,
		required: [true, "Content not specified"]
	},
	date: {
		type: String
	}
});

var Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: [true, "Please specify email"]
	},
	subject: {
		type: String
	},
	content: {
		type: String
	}
});

var Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;
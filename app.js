var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io = require('socket.io');
var mongoose = require('mongoose');

// var passport = require('passport');
// var session = require('express-session');

var home = require('./routes/home');
var about = require('./routes/about');
var blog = require('./routes/blog');
var contact = require('./routes/contact');
// var auth = require('./routes/auth');
var chat = require('./routes/chat');

var app = express();

// Socket.io
var io = socket_io();
app.io = io;

// Connect to MongoDB
// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/sampledb';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect('mongodb://'+ connection_string);
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', home);
app.use('/about', about);
app.use('/blog', blog);
app.use('/contact', contact);
// app.use('/auth', auth);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Socket.io Events
var connections = [];

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: ' + connections.length);

	socket.on('diconnect', function () {
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected');
	});

	socket.on('send message', function (data) {
		io.sockets.emit('new message', {msg: data});
	});
});

module.exports = app;

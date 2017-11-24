require('babel-register');

var app = require('express')();
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var session = require('express-session');

var logger = require('morgan');

var users = require('./routes/user');
var projects = require('./routes/projects');

var http = require('http').Server(app);

app.use(logger('dev'));

app.use(session({
	secret: 'chen',
	cookie: {maxAge: 60*60*1000},
	resave: false,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));

app.use(function(req, res, next){
	
	res.header("Access-Control-Allow-Origin", "*");
	
	if(req.session.user){
		res.locals.user = {
			uid : req.session.user.uid,
			username : req.session.user.username
		}
	}else{
		res.locals.user = {};
	}
	next();
})

app.use('/user', users);
app.use('/projects',projects);

http.listen(9999, function(){
	console.log('listening on *:9999');
});
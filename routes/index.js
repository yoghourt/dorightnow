var app = require('express')();
var express = require('express');
var router = express.Router();

var request = require('request');
var path = require('path');

router.get('/',function(req,res,next){
	res.render('index',{title : "首页"});
});

router.get('/login',function(req,res,next){
	res.render('login',{errmsg : ""});
});

router.get('/reg',function(req,res,next){
	res.render('reg',{errmsg : ""});
})

router.get('/chat',function(req,res){
	res.render('chat',{title : "聊天室"});
});

router.get('/saveimgs',function(req,res){
	res.render('saveImgs');
})

var projects = [
	{
		name: 'chen',
		projectName: '100 mile run',
		planTime: 'one week'
	},
	{
		name: 'hao',
		projectName: '5 book read',
		planTime: 'one month'
	}
]

router.get('/projects',function(req, res){
	res.json(projects);
});

module.exports = router;
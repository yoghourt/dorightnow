var express = require('express');
var router = express.Router();
var user_m = require('../models/user');

router.post('/reg',function(req, res, next){
	console.log(req.body);
	var username = req.body.username || '',
	password = req.body.password || '';
	
	var password_hash = user_m.hash(password),
		regtime = parseInt(Date.now()/1000);
	
	user_m.reg(username,password_hash,regtime, function(result){
		if(result.isExisted){
			res.render('reg',{errmsg: '用户名已存在'});
		}else if(result.affectedRows){
			res.redirect('/');
		}else{
			res.render('reg',{errmsg:'注册失败，请重新尝试'});
		}
	});
})

router.post('/login',function(req, res, next){
	var username =  req.body.username ||'',
		password = req.body.password || '';
		
	var password_hash = user_m.hash(password);
	
	res.header("Access-Control-Allow-Origin", "*");
	
	user_m.login(username,password_hash, function(result){
		if(result.length){
			let uid = result[0].id;
			
			req.session.user = {
				uid : uid,
				username: username
			}
			res.json({status : 0,data : {uid : uid}});
		}else{
			res.json({status : -1});
		}
	})
})

module.exports = router;
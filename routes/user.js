var express = require('express');
var router = express.Router();
var user_m = require('../models/user');

router.post('/reg',function(req, res, next){
	var username = req.body.username || '',
	password = req.body.password || '';
	
	var password_hash = user_m.hash(password),
		regtime = parseInt(Date.now()/1000);
	
	user_m.reg(username,password_hash,regtime, function(result){
		if(result.isExisted){
			res.json({status: -1 , errmsg: '用户名已存在'});
		}else if(result.affectedRows){
			console.log(result.affectedRows);
			res.json({status: 0});
		}else{
			res.json({status: -1 , errmsg:'注册失败，请重新尝试'});
		}
	});
})

router.post('/login',function(req, res, next){
	var username =  req.body.username ||'',
		password = req.body.password || '';
		
	var password_hash = user_m.hash(password);
	
	user_m.login(username,password_hash, function(result){
		if(result.length){
			let uid = result[0].id;
			
			req.session.user = {
				uid : uid,
				username: username
			}
			res.json({status : 0,data : {uid : uid}});
			console.log(req.session.user);
		}else{
			res.json({status : -1});
		}
	})
})

router.post('/delete',function(req, res, next){
	var userid = req.body.id || '';
	
	user_m.delete(id,function(result){
		
	})
})

module.exports = router;
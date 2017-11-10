var pool = require('./db'),
	crypto = require('crypto');

module.exports = {
	hash : function(str){
		return crypto.createHmac('sha1',str).update('love').digest('hex');
	},
	reg : function(username, password, regtime, cb){
		pool.getConnection(function(err, connection){
			if(err) throw err;
			
			connection.query('SELECT `id` FROM `user` WHERE `username`=?',[username], function(err,sele_res){
				if(err) throw err;
			
				if(sele_res.length){
					cb({isExisted: true});
					connection.release();
				}else{
					var params = {username:username, password:password, regtime:regtime};
					connection.query('INSERT INTO `user` SET ?', params, function(err, insert_res){
						if(err) throw err;
						
						cb(insert_res);
						connection.release();
					})
				}
			})
		})
	},
	login : function(username, password, cb){
		
		pool.getConnection(function(err,connection){
			if(err) throw err;
			console.log(username,password);
			var x = connection.query('SELECT `id` FROM `user` WHERE `username` = ?',[username], function(err, result){
				if(err) throw err;
				console.log(result);
				cb(result);
				connection.release();
			})
			console.log(x.sql)
		})
	}
}

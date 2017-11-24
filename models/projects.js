var pool = require('./db'),
	crypto = require('crypto');
	
module.exports = {
	
	list : function(cb){
		
		pool.getConnection(function(err,connection){
			
			var query = connection.query('SELECT * FROM projects',function(err,result){
				if(err) throw err;
			
				cb(result);
				connection.release();
			})
			console.log(query.sql);
		})
		
	},
	
	create : function(params,cb){
				
		pool.getConnection(function(err, connection){
			var query = connection.query('INSERT INTO `projects` SET ?',params, function(err,insert_res){
				
				if(err) throw err;
				cb(insert_res);
				connection.release();
			})
			
			console.log(query.sql);
		})
	},
	
	detail : function(id,cb){
		
		pool.getConnection(function(err, connection){
			
			var query = connection.query('SELECT * FROM `projects` WHERE `idprojects`=?',[id], function(err,result){
				
				if(err) throw err;
				cb(result);
				connection.release();
			})
		
			console.log(query.sql);
		})
		
	}
}

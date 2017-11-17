var express = require('express');
var router = express.Router();
var projects_m = require('../models/projects');
var multer  = require('multer')
var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'./public/upload');
	},
	filename: function(req, file, cb){
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + new Date().getTime() + "." + fileFormat[fileFormat.length - 1]);;
	}
})
var upload = multer({ storage: storage});

router.get('/list',function(req, res, next){
	
	projects_m.list(function(result){
		res.json(JSON.stringify(result));
		
	})
})

router.post('/create',function(req, res, next){
	
	var projectname = req.body.projectname || '',
		posterImg = req.body.posterImg,
		projectdes = req.body.projectdes,
		isPublic = req.body.isPublic || true;
	var params = {
			projectname :projectname,
			posterImg : posterImg,
			projectdes : projectdes,
			isPublic : isPublic
		}
	projects_m.create(params,function(result){
		res.json(JSON.stringify({status : 0,id : result.insertId}));
	})
})

router.post('/uploadPoster',upload.fields([{ name: 'project-poster', maxCount: 1 }]),function(req, res, next){
	
	res.json(JSON.stringify({status : 0,posterImg : req.files['project-poster'][0]}));
	
})

module.exports = router;
var express = require('express');
var multer = require('multer');
var app = express();
var upload = multer({dest:'./upload'});
var singleMulter = upload.single('singleFile');
var fileArr = upload.array('arrayFuile',5);
var fileFields = upload.fields([
	{name:'fileOne',maxCount:1},
	{name:'fileOther',maxCount:4}
	]);

app.post('/singleupload',singleMulter,function(req,res){
res.send(req.file);
});


app.post('/arrayload',fileArr,function(req,res){
res.send(req.files);
});

app.post('/fieldsload',fileFields,function(req,res){
res.send(req.files);
});

app.listen(8050,function(){

	console.log('服务启动成功');
});
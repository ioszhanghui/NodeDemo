
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var path = require('path');
var underscore = require('underscore');
var fs = require('fs');

var app = express();

//使用cookie-parser
app.use(cookieParser());
//post 请求参数解析
app.use(bodyParser.json({type:'text/plain'}));//JSON格式的解析
app.use(bodyParser.raw());// buffer处理
app.use(bodyParser.text());// 字符串处理
app.use(bodyParser.urlencoded(
{
	extended: true,
	limit:    2*1024*1024,           //限制-2M
	type:'application/x-www-form-urlencoded'
}
));//urlencoded


//app.use(multer({dest:'./www/Imgs'}).any());//支持任何类型的传输 可以是单图 也可以是多图 
//单图传输 在单图传输时，可以使用req.file获取单个的附件文件 1)multer处理之后的数据格式为Json字典格式  2）传输的附件个数不能超过一个 3)input元素的name属性必须要和single('标记')中的标记一样
/**
*  
{
    "fieldname": "logo", ->标示的键值 即input标签元素 和multer.single('标示')约定的标示
    "originalname": "11.jpg",->传输之前的图片名字
    "encoding": "7bit", ->文件的编码类型
    "mimetype": "image/jpeg",->文件的格式
    "destination": "./www/Imgs", ->存储的资源路径
    "filename": "c8bf8e4cee125d37f26212105816c39f",->存储的资源名字
    "path": "www/Imgs/c8bf8e4cee125d37f26212105816c39f",->存储之后的附件路径
    "size": 157606 ->附件的大小
}
* 
**/

//app.use(multer({dest:'./www/Imgs'}).single('logo'));
//多图传输 最大的传输附件个数 传输的附件个数 前端只能传输小于等于 设置的附件个数 multer处理之后的数据样式为数组
/**
*[
    {
        "fieldname": "logo",
        "originalname": "1307076-d6b4f8a17017dd28.png",
        "encoding": "7bit",
        "mimetype": "image/png",
        "destination": "./www/Imgs",
        "filename": "d3433e2e6eb4d0b196fcc74a3c7ad81c",
        "path": "www/Imgs/d3433e2e6eb4d0b196fcc74a3c7ad81c",
        "size": 152549
    },
    {
        "fieldname": "logo",
        "originalname": "1684607-34b296a3458bedc7.png",
        "encoding": "7bit",
        "mimetype": "image/png",
        "destination": "./www/Imgs",
        "filename": "49e099645355f26681a85fe5cbac0409",
        "path": "www/Imgs/49e099645355f26681a85fe5cbac0409",
        "size": 8637
    }
]
*
*/
//app.use(multer({dest:'./www/Imgs'}).array('logo',2));

//多组类型的传输 maxCount 代表最大的传输附件的个数 
/*
*
*[
    [
        {
            "fieldname": "logo",
            "originalname": "1684607-34b296a3458bedc7.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "./www/Imgs",
            "filename": "5f42e9c390e91b106d5f16f809f62885",
            "path": "www/Imgs/5f42e9c390e91b106d5f16f809f62885",
            "size": 8637
        },
        {
            "fieldname": "logo",
            "originalname": "1684607-fd11ea7d9b0fc3c5.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "./www/Imgs",
            "filename": "246fb195d84d056ce8f38d07ec806253",
            "path": "www/Imgs/246fb195d84d056ce8f38d07ec806253",
            "size": 72879
        }
    ],
    [
        {
            "fieldname": "text",
            "originalname": "2019年绩效考核-4月-客户端.xlsx",
            "encoding": "7bit",
            "mimetype": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "destination": "./www/Imgs",
            "filename": "7918d6272d166309a23c2240a4e9562f",
            "path": "www/Imgs/7918d6272d166309a23c2240a4e9562f",
            "size": 23502
        },
        {
            "fieldname": "text",
            "originalname": "testApp.html",
            "encoding": "7bit",
            "mimetype": "text/html",
            "destination": "./www/Imgs",
            "filename": "fe3d6edc83fea5f0fcbef349a7d1ce5f",
            "path": "www/Imgs/fe3d6edc83fea5f0fcbef349a7d1ce5f",
            "size": 4487
        }
    ]
]
*
*/
//app.use(multer({dest:'./www/Imgs'}).fields([{name:'logo', maxCount:2},{name:'text', maxCount:2}]));

// 不接受文件上传 只是一个普通的post请求 只不过传输的数据样式是  multipart/form-data
app.use(multer().none());

//存储磁盘
/*
var storage = multer.diskStorage({
	//文件保存的路径 这个必须要是 自己手动提前创建好的 不能动态的创建
  destination: function (req, file, cb) {
  	//req 网络请求的对象  file 传输过来的文件 
  	var userid = req.body.userid;
  	userid ='张辉';
  	var filepath = path.join(__dirname,'./www/Imgs');
  	if (!fs.existsSync(filepath)) {
  		 fs.mkdirSync(filepath);
  		};
  		console.log('文件路径'+filepath);
    cb(null,filepath)
  },
  filename: function (req, file, cb) {
  	//filename 是指定保存的文件的名字  req 网络请求的对象  file 传输过来的文件 
  	console.log(file.originalname+'文件的原始的名字');
    cb(null, file.fieldname + '-' + Date.now())
  }
});
app.use(multer({storage:storage}).any());
*/

app.get('/testGetRequest',function(req,res){

//var expires = getDateAfter();
var expires = new Date('2019-05-20 14:45:00');
var SCNcookie = req.cookies.SCN;
console.log('SCN'+SCNcookie);
console.log(expires+'过期时间');
res.cookie('SCN','app',{maxAge:1000*3600*24*7,secure:false,path:'/'});
res.send('hello world');
console.log(req.cookie+'cookie内容');
console.log(req.body+'body请求内容');
res.end('clear cookie');
});

var server = app.listen(8081,function(){
var host = server.address().address;
var port = server.address().port;
console.log('IP地址'+host+'端口'+port);
console.log('启动成功');
});
//删除Cookie
app.get('/deleteCookie',function(req,res){
res.clearCookie('SCN');
res.end('clearCookie');
});

//post请求
app.post('/getPostRequest',function(req,res){

console.log(req.body+"请求体的内容");
console.log(JSON.stringify(req.body)+"解析成字符串");
console.log(req.body.scn+"请求体的内容SCN");

res.send({"code":'200','msg':"成功"});
res.end();
});

//单张的图片上传
app.post('/singlePicture/Upload',function(req,res){

	var uploadFile = req.file;
	console.log(JSON.stringify(uploadFile));

	var fileName = uploadFile.path+path.parse(uploadFile.originalname);
	fs.rename(uploadFile.path,fileName,function(err){
		if (err) {
			res.send({'code':'300'});
		}else{
			res.send(req.file);
		};
		res.end();
	});
});

//多张图片上传
app.post('/uploadFile/double',function(req,res){

	for(var i in req.files){

		var originfile = req.files[i];
		var newName = originfile.path+path.parse(originfile.originalname).ext;
		fs.rename(originfile.path,newName,function(err){
			if(err) {
				res.send({"code":"300"});
				res.end();
			}else{
				if (i==req.files.length-1) {
					//res.send({"code":"200"});
					res.send(req.files);
					res.end();
				};
			};
	});

	}
});


//多张图片上传 多个filed支持
app.post('/uploadFile/FieldsImg',function(req,res){

var fileValues = underscore.values(req.files);

console.log(JSON.stringify(fileValues));
res.send(fileValues);
res.end();

});

//any
app.post('/upLoad/Any',function(req,res){

	res.send(req.files);

	res.end();
});

//post的post请求 format data
app.post('/normalFormData/Request',function(req,res){
	console.log(req.is()+"请求的类型");
	res.send(req.body);
	res.end();
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./formsingle.html', {encoding: 'utf8'});
    res.send(form);
    res.end();
});

//获取日期
function getDateAfter(){
	return new Date(new Date().getTime()+1000*24*3600*7).Format('yyyy-MM-dd HH:mm');
}
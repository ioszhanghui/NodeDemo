
var url = require('url');
var express = require('express');
var app = express();

app.get('/getUrlQuery',function(req,res){
	var path = req.path;
	var originUrl = req.originalUrl;
	var urlJson = parseUrl(originUrl,true);
	console.log(urlJson.key+'解析的字典模型');
	console.log(JSON.stringify(urlJson)+"字符串形式的数据");

console.log('baseUrl'+req.baseUrl);
	console.log('originUrl原始请求地址'+originUrl);
	console.log('原始请求地址'+path);
	res.send({'code':'200','msg':'success'});
});
app.listen(8088,function(){
console.log("启动成功");
});

//使用parse进行解析
function parseUrl(urlPath,boolean){

return url.parse(urlPath,boolean);
}


var originURL = 'http://user:pass@host.com:8080/p/a/t/h?query=string&user=test#hash';
var parseURL = parseUrl(originURL,false);
console.log(JSON.stringify(parseURL)+'解析parseURL');

var URLJson ={"protocol":"http:",
	"slashes":true,
	"auth":"user:pass",
	"host":"host.com:8080",
	"port":"8080",
	"hostname":"host.com",
	"hash":"#hash",
	"search":"?query=string",
	"query":{"query":"string"},
	"pathname":"/p/a/t/h",
	"path":"/p/a/t/h?query=string",
	"href":"http://user:pass@host.com:8080/p/a/t/h?query=string#hash"
};
console.log(url.format(URLJson)+"连接字典拼接字符串");

//url.resolve(from,to)

var  resolveURL= url.resolve('http://www.baidu.com','tieba/xiaofeiniao/test');
console.log(resolveURL+"路径拼接");


var fs = require('fs');
var path = require('path');
var  filePath = path.join(__dirname,'./test.json');



// 异步删除文件 删除文件 不能删除不存在的文件
// fs.unlink('./upload/fsTest.js',function (err) {
// 	if (err) {
// 		console.log(err+'错误信息');
// 		// throw err;
// 	};
// 	console.log('删除成功');
// });
// //同步删除文件 不能删除 不存在的文件
// fs.unlinkSync('./upload');

//创建文件夹
fs.mkdir('./testMkdir',function(err){
	if (err) {
		console.log(err+'错误信息');
		//throw err;
	};
	console.log('文件夹创建成功');
});

//同步创建文件夹
fs.mkdirSync('./install');


//1.只能删除文件夹  而且必须是空的文件夹 2.不能删除文件
fs.rmdir('./testMkdir',function(err){
if (err) {
	console.log(err+'错误');
}else{
	console.log('删除成功');
};
});

//同步删除 不能删除不存在的 只能删除文件夹
fs.rmdirSync('./install');

//读取文件
fs.readFile(filePath,function(err,data){
if (err) {
console.log(err+'操作错误');	
};
console.log(data +'异步读取的数据');
console.log(data.toString()+'文件数据');
var obj = JSON.parse(data);
console.log(obj.key);
});

var fileData = fs.readFileSync(filePath);

console.log((typeof fileData =='string')+"是否为字符串");
console.log(fileData+'同步读取的数据');
console.log(Buffer.isBuffer(fileData)+'***是否为buffer对象');
var obj = JSON.parse(fileData);
console.log(obj.key+'同步读取');

var writeFilePath =path.join(__dirname,'./02.json');
console.log(writeFilePath+"写入路径");

var obj = {'key':'data数据'};

//写入文件   fs.writeFile(file, data[, options], callback) 请确保data是string类型
fs.writeFile(writeFilePath,JSON.stringify(obj),function(err){

if (err) {
	console.log('写入失败');
}else{
	console.log('写入成功');
};
});


//同步写入
fs.writeFileSync(writeFilePath,fileData.toString());

//以追加的方式写入

var appendFilePath = path.join(__dirname,'./01.txt');

fs.appendFile(appendFilePath,'追加写入数据',function(err){
	if (err) {
	console.log('写入失败');
}else{
	console.log('写入成功');
};
});

fs.appendFileSync(appendFilePath,'aaa');

//更改名字
fs.rename('./01.txt','01.docx',function(err){

if (err) {
	console.log('修改失败');
}else{
	console.log('修改成功');
};
});

//判断文件师父存在

fs.exists('./01.txt',function(exists){
if (exists) {
	console.log('文件存在');
}else{
	console.log('文件不存在');
};
});

var exist =  fs.existsSync('./01.docx');
if (exist) {
	console.log('01.docx文件存在');
};

//读取一个目录
fs.readdir(path.join(__dirname,'./www/'),function(err,files){

if (err) {
	console.log('读取失败');
}else{
	console.log(files+'读取文件路径');
};
});

var filesArr = fs.readdirSync(path.join(__dirname,'./www/Imgs'));
console.log('同步获取'+filesArr);





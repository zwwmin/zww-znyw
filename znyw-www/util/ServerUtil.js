
var log4js = require("log4js");
var log4js_config = require("../log4js.json");

log4js.configure(log4js_config);
var Logger= log4js.getLogger('log_file');



var ServerUtil={};

/**
 * 上传文件 -- 用于express框架，还有就是解释web端的框架是，multiparty
 * @param files     经过multiparty处理过的文件
 * @param req        httpRequest对象
 * @param postData    额外提交的数据
 */
ServerUtil.uploadFile=function(files, req, postData,callback) {
    var boundaryKey = Math.random().toString(16);
    var endData = '\r\n----' + boundaryKey + '--';
    var filesLength = 0, content;

    // 初始数据，把post过来的数据都携带上去
    content = (function (obj) {
        var rslt = [];
        Object.keys(obj).forEach(function (key) {
            var arr = ['\r\n----' + boundaryKey + '\r\n'];
            arr.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n');
            arr.push(obj[key]);
            rslt.push(arr.join(''));
        });
        return rslt.join('');
    })(postData);

    // 组装数据
    Object.keys(files).forEach(function (key) {
        if (!files.hasOwnProperty(key)) {
            delete files.key;
            return;
        }
        content += '\r\n----' + boundaryKey + '\r\n' +
            'Content-Type: application/octet-stream\r\n' +
            'Content-Disposition: form-data; name="' + key + '"; ' +
            'filename="' + files[key].name + '"; \r\n' +
            'Content-Transfer-Encoding: binary\r\n\r\n';
        files[key].contentBinary = new Buffer(content, 'utf-8');
        filesLength += files[key].contentBinary.length + fs.statSync(files[key].path).size;
    });

    req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
    req.setHeader('Content-Length', filesLength + Buffer.byteLength(endData));

    // 执行上传
    var allFiles = Object.keys(files);
    var fileNum = allFiles.length;
    var uploadedCount = 0;
    allFiles.forEach(function (key) {
        req.write(files[key].contentBinary);
        var fileStream = fs.createReadStream(files[key].path, {bufferSize: 4 * 1024});
        fileStream.on('end', function () {
            // 上传成功一个文件之后，把临时文件删了
            fs.unlink(files[key].path);
            uploadedCount++;
            if (uploadedCount == fileNum) {
                // 如果已经是最后一个文件，那就正常结束
                req.end(endData);
            }
        });
        fileStream.pipe(req, {end: false});
    });
}



module.exports=ServerUtil;

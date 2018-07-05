/**
 * 该文件是针对request获取及存储数据的封装，当然，包含了promise的帮助。
 * 请注意，这个 requesthelper是通用类型的，没有对某一个域名的某些cookie进行处理，譬如，假如这个cookie要失效，那么还是没有处理，譬如，这个cookie要添加进来，譬如，这个cookie是sessionid要添加进来。。。等等。。假如希望这些
 * 请求可以自动处理cookie，那么请使用WebRequestHelper，这个辅助类已经添加了对cookie等等的处理及模拟。
 *
 * ---就是这个辅助类，当然，后续还会加上对文件添加时候的处理等等。
 */

var fs=require("fs");
var Q = require('q');
var util=require("../util/util.js");
const request = require('request');
var logger = require('../util/logHelper.js').Logger;
var Extend=require("util")._extend;

var cookie = require('cookie');

//--cookie管理系统。
var CookieMgrSYSTEM=require("../util/CookieMgrSystem");

var multiparty = require('multiparty');

var cryptos=require('cryptos');

/**
 * 需要req的原因是需要request的session这些作为参数来传递相关数据
 * **/

const utils = require('utility');//utils的类库。




const privatePem = fs.readFileSync('./data/rsa_private_key.pem');
const publicPem = fs.readFileSync('./data/rsa_public_key.pem');
const privatekey = privatePem.toString();
const publickey = publicPem.toString();

var WebRequestHelper=function(req){
    this.taskList=[];
    this.reqObject=req;

};
WebRequestHelper.prototype.addTask=function(_opt){

    this.taskList.push(_opt);
}
/**
 * 当服务端返回了response的时候，必定有headers，可能会有set cookie的，那么我们就要在这里保存set cookie的相关信息，以便下次构造request请求时候根据不同的host发送不同的cookie上去。
 * 当然，也要根据不同的session id发送不同的session id。
 * ***/
WebRequestHelper.prototype.onResponseHandle=function(response){
    var me=this;
    var _header_set_cookie_arr=response.headers["set-cookie"];
    var _set_cookie_arr=_header_set_cookie_arr;
    var _cookies_array=[];
    var _cookie_session=null;
    var _cookie_token=null;
    if(_set_cookie_arr){
        for(var i=0;i< _set_cookie_arr.length;i++){
            var _cookie_item=CookieMgrSYSTEM.parseStr2Cookie(_set_cookie_arr[i]);
            if(_cookie_item==undefined){
                continue;
            }
            if(_cookie_item._sys_cookie_name=="token"){
                _cookie_session=_cookie_item;
            }
            else{
                _cookies_array.push(_cookie_item);
            }
        }
    }

    if(_cookie_session){
        me.reqObject.session["token"]=_cookie_session["_sys_cookie_value"];
    }
    return;
    var me=this;
    logger.info("current set-cookie is: ");
    if(response==undefined){
        console.log("error !!!! response is undefined. from webRequestHelper.");
        return;
    }
    if(response.headers==undefined){
        console.log("response header is undefined do not handle.");
        return;
    }
    var _header_set_cookie_arr=response.headers["set-cookie"];


    logger.info("======================================");
    logger.info("the header cookies:");
    logger.info(JSON.stringify(_header_set_cookie_arr));

    logger.info('浏览器访问请求：');
    logger.info('======================');
    logger.info(new Date());
    logger.info('======================');
    logger.info("访问的浏览器的特征是：");
    logger.info(me.reqObject.headers['user-agent']);




    //--response里面的内容如下：
    if(me.reqObject!=undefined&&me.reqObject.session.serverSessions==undefined){
        me.reqObject.session.serverSessions={};
    }
    logger.info('======================');
    logger.info("检查node服务端是否有后台服务器对应session值的映射：");
    logger.info(JSON.stringify(me.reqObject.session.serverSessions));
    logger.info('======================');
    logger.info("检查结束");


    var t6 = {
        "statusCode": 200,
        "body": "\r\n\r\ntest-cookie",
        "headers": {
            "server": "Apache-Coyote/1.1",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, OPTIONS",
            "access-control-allow-headers": "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With",
            "set-cookie": ["JSESSIONID=68BC92739C2BECD7AA7E8A51D318580E; Path=/","username=wunmlkj"],
            "content-type": "text/html;charset=UTF-8",
            "content-length": "15",
            "date": "Fri, 08 Jul 2016 06:24:31 GMT",
            "connection": "close"
        },
        "request": {
            "uri": {
                "protocol": "http:",
                "slashes": true,
                "auth": null,
                "host": "localhost:8080",
                "port": "8080",
                "hostname": "localhost",
                "hash": null,
                "search": null,
                "query": null,
                "pathname": "/demos/test_cookies.jsp",
                "path": "/demos/test_cookies.jsp",
                "href": "http://localhost:8080/demos/test_cookies.jsp"
            }, "method": "GET", "headers": {}
        }
    };


    var _host=response.request.uri.host;
    var md5_host=utils.md5(_host);
    console.log("md5 host:"+md5_host);

    logger.info("============");
    logger.info("检查需要访问后台的url地址：");
    logger.info(_host);
    logger.info("对应md5是："+md5_host);



    //--判断是不是有这个host的相关信息，有的话就处理，否则就不处理。
    var _site_session_keys=CookieMgrSYSTEM.getSiteSessionKeys();
    var _session_key_name="";
    for(var j=0;j< _site_session_keys.length;j++){
        //utils.md5('苏千').should.equal('5f733c47c58a077d61257102b2d44481');
        if(utils.md5(_site_session_keys[j].host)==(md5_host)){
            _session_key_name=_site_session_keys[j].sessionKey;
            break;
        }

    }
    if(util.checkEmpty(_session_key_name)){
        //--这个host不在处理范围，故此不处理。
        return;
    }

    logger.info("============");
    logger.info("当前的session key是："+_session_key_name+" 在处理范围内。 ");

    if(_header_set_cookie_arr==undefined||_header_set_cookie_arr.length<=0){
        //--后台没有返回headers的set cookie，所以现在也不用处理
        logger.info("========后台没有header set cookie值，不作处理。=======");
        return;
    }
    logger.info('===============');
    logger.info("后台set cookie 值是：");
    logger.info(JSON.stringify(_header_set_cookie_arr));
    logger.info('===============');
    var _set_cookie_arr=_header_set_cookie_arr;
    var _cookies_array=[];
    var _cookie_session=null;

    for(var i=0;i< _set_cookie_arr.length;i++){
        var _cookie_item=CookieMgrSYSTEM.parseStr2Cookie(_set_cookie_arr[i]);
        //console.log("cookie is :"+JSON.stringify(_cookie_item));
        if(_cookie_item==undefined){
            continue;
        }
        if(_cookie_item._sys_cookie_name==_session_key_name){
            _cookie_session=_cookie_item;
        }
        else{
            _cookies_array.push(_cookie_item);
        }
    }
    if(_cookie_session!=null){
        me.reqObject.session.serverSessions[md5_host]=_cookie_session._sys_cookie_value;
    }

    var _session_id=me.reqObject.session.serverSessions[md5_host];
    if(_session_id==undefined){
        //--假如没有session id，那么就不处理了，因为没办法模拟任意一个客户端浏览器。

        return;

    }

    //--查看数据库是否有对应session。。。



    //for(var i=0;i< _cookies_array.length;i++){
    //    var _cookie_item=_cookies_array[i];
    //
    //}
    CookieMgrSYSTEM.setCookie(md5_host,_session_id,_cookies_array,function(){
        CookieMgrSYSTEM.setSessionCookie(md5_host,_session_id,_session_key_name);
    });


}

WebRequestHelper.prototype.request=function(_opts){
    var me=this;
    var _deferred= Q.defer();
    var _i_settings={
        url:""
        ,method:"get" //三种方式，get，post,其中，在post形式下面可以有encrypt 参数，假如encrypt是multipart，那么就用提交文件上传表单的方式来处理
        ,data:{}
        ,dataType:"json"
        ,encrypt:"" //在method为post及encrypt为multipart的时候就可以上传文件了。
        //--
        ,formFields:{} //注意，这两个参数只有在上传文件的时候才用到，这是表单附带的参数。
        ,formFiles:{} //注意，这两个参数只有在上传文件的时候才用到，这是文件
        ,beforeFileStreamAdded:function(fileItem){
            return true;
        }//在文件流读取前执行，假如返回true就构造，否则忽略这个文件，不上传。
        ,onFileStreamAdded:function(fileItem){} //注意，这是在构造文件流后顺便执行的。
        ,error:function(error){
        }
        ,success:function(sdata){
        }

        //--下面两个就是服务端nodejs独有的，譬如，拿到response之后的处理，譬如，设定默认的cookie。
        ,onResponseHandle:function(theResponse){
        }
        ,defaults:{

        }

        //--好了，加一个useRSA选项，这个代表是不是按照一定规则来处理参数加密问题。。。关闭了就不按照要求来加解密。

        ,useRSA:true
    };

    _i_settings=Extend(_i_settings,_opts);
    //console.log('==================================');
    //console.log('well , check if has cookie for this session:');
    //console.log('==================================');

    //--检查host name。
    //console.log("request url is:"+_i_settings.url);
    var _hostName="";
    var _url_protocal="https";
    if(util.checkEmpty(_i_settings.url)==true){

    }
    else{
        _i_settings.url=util.trim(_i_settings.url);
        if(_i_settings.url.indexOf("https://")!=-1){
            _url_protocal="https";
        }
        else if(_i_settings.url.indexOf("http://")!=-1){
            _url_protocal="http";
        }
        _hostName=_i_settings.url.replace('http://',"").replace("https://","");
        _hostName= _hostName.split('/')[0];
        _hostName=util.trim(_hostName);
    }
    ////--检查session 的 key
    //
    //
    //var _cookieObjects=[];
    //var md5_host="";
    //logger.info('=============================');
    //logger.info("现在要发起相关请求，需要检查是否有对应cookie。");
    //logger.info('=============================');
    //
    //if(me.reqObject!=undefined&&me.reqObject.session.serverSessions!=undefined&&util.checkEmpty(_hostName)==false){
    //    md5_host=utils.md5(_hostName);
    //    var _sessionId=me.reqObject.session.serverSessions[md5_host];
    //    logger.info("host是："+_hostName+" 对应md5是："+md5_host);
    //    logger.info('=============================');
    //    logger.info('=============================');
    //    logger.info('=============================');
    //    logger.info('=============================');
    //    logger.info('获取的session id是：');
    //    logger.info(_sessionId);
    //    logger.info('=============================');
    //    logger.info('=============================');
    //    logger.info('=============================');
    //    logger.info('=============================');
    //    logger.info('=============================');
    //
    //    if(_sessionId!=undefined&&util.checkEmpty(_sessionId)==false){
    //        _cookieObjects=CookieMgrSYSTEM.getCookieArray(md5_host,_sessionId);
    //        logger.info('=============================');
    //        logger.info("从cookie数据库里获取的cookie是：");
    //        logger.info(JSON.stringify(_cookieObjects));
    //    }
    //}

    //--判断是不是有这个host的相关信息，有的话就处理，否则就不处理。
    //var _site_session_keys=CookieMgrSYSTEM.getSiteSessionKeys();
    //var _session_key_name="";
    //for(var j=0;j< _site_session_keys.length;j++){
    //    //utils.md5('苏千').should.equal('5f733c47c58a077d61257102b2d44481');
    //    if(utils.md5(_site_session_keys[j].host)==(md5_host)){
    //        _session_key_name=_site_session_keys[j].sessionKey;
    //        break;
    //    }
    //
    //}
    ////console.log('==================================');
    ////console.log(JSON.stringify(_cookieObjects));
    ////
    ////console.log('==================================');

    var _requestOptions={
        url:_i_settings.url
    };


    //--检查是否需要添加相关的cookie进去。
    var __inner_request=function(){};


    var __client_cookies=me.reqObject.cookies;
    logger.info("====客户端的cookie");
    logger.info(JSON.stringify(__client_cookies));
    var _session_cookie=undefined;

    if(__client_cookies&&__client_cookies["connect.sid"]){
        _session_cookie=__client_cookies["connect.sid"];
        _session_cookie=utils.md5(_session_cookie);
    }
    if(_session_cookie){
        __inner_request=request.defaults({jar:true});
        var j = request.jar();


        //--构造普通的sessionid


        //var cookie_session = request.cookie(_session_key_name+'='+_sessionId);
        //j.setCookie(cookie_session, _url_protocal+"://"+_hostName);

        //--传输普通的cookie
        logger.info("=========================================");
        logger.info("=========================================");
        logger.info("=========================================");
        logger.info("****************附加到request的cookie是：*********************");
        logger.info("=========================================");
        logger.info("=========================================");

        //req.cookies
        logger.info("=========================================");
        logger.info("=========================================");

        logger.info("生成的session id：");
        logger.info(_session_cookie);
        // var cookie1 = request.cookie('token='+_session_cookie );
        // j.setCookie(cookie1, _url_protocal+"://"+_hostName);

        if(me.reqObject.session.token){
            var cookie2 = request.cookie('token='+me.reqObject.session.token );
            j.setCookie(cookie2, _url_protocal+"://"+_hostName);
        }
        _requestOptions.jar=j;
        //for(var i=0;i< _cookieObjects.length;i++){
        //    console.log("now should attach cookies:");
        //    console.log(JSON.stringify(_cookieObjects));
        //    var _cookie_in_db=_cookieObjects[i];
        //    var cookie1 = request.cookie(_cookie_in_db._sys_cookie_name+'='+_cookie_in_db._sys_cookie_value);
        //    j.setCookie(cookie1, _url_protocal+"://"+_hostName);
        //    //j.setCookie(cookie1, "/");
        //}


    }
    else{
        __inner_request=request.defaults({jar:false});
    }
    if(_i_settings.method.toLocaleLowerCase()=="get"){
        var _realUrl=util.Json2URL(_i_settings.url,_i_settings.data);
        logger.info(_realUrl);
        _requestOptions.url=_realUrl;

        var req2=__inner_request(_requestOptions, function (error, response, body) {


            //me.onResponseHandle(response);
            if (!error && response.statusCode == 200) {
                var _res=body;
                try{
                    if(_i_settings.dataType=="json"){
                        _res=JSON.parse(_res);
                    }
                }
                catch (ex){
                    var _error_msg="nodejs can not trans this data to JSON format: "+body;
                    //加密
                    logger.error("json translate error:"+_i_settings.url);
                    logger.error(_error_msg);
                    logger.error(body);
                    throw new Error(_error_msg);
                    _deferred.reject(_error_msg);

                    return;

                }
                _deferred.resolve(_res);}

            else{
                var _error_msg="request helper error: can not request url:"+_realUrl+"";
                logger.error(_error_msg);
                logger.error(body);
                throw new Error(_error_msg);
                _deferred.reject(error);

            }
        });
    }
    else if(_i_settings.method.toLowerCase="post"){

        if(_i_settings.encrypt=="multipart"){

            function tryPost2Server(fields,files,callback){

                var mutiData = {

                };

                console.log(JSON.stringify(files));

                for(var key in fields){
                    var _item=fields[key];
                    if(util.isArray(_item)){
                        mutiData[key]=_item;
                    }
                    else{
                        mutiData[key]=_item;
                    }
                    //if(_item.length>0){
                    //    //FromParas[key]=_item[0];
                    //}
                }

                //--构造文件流。
                for(var key in files){

                    var _fileList=files[key];
                    var _thePath="";
                    console.log(JSON.stringify(_fileList));
                    if(util.isArray(_fileList)){
                        mutiData[key]=[];
                        for(var i=0;i< _fileList.length;i++){
                            var fileItem=_fileList[i];
                            console.log("path :"+fileItem.path);
                            if(_i_settings.beforeFileStreamAdded(fileItem)){

                            }
                            else{
                                continue;
                            }
                            mutiData[key].push(fs.createReadStream(fileItem.path));
                            _i_settings.onFileStreamAdded(fileItem);

                            //mutiData.headIco.push(fs.createReadStream(fileItem.path));
                            //fs.exists(fileItem.path, function(exists) {
                            //    if (exists) {
                            //        // serve file
                            //        fs.unlink(fileItem.path);
                            //    } else {
                            //        // mongodb
                            //    }
                            //});

                            break;
                        }
                    }
                    else{
                        mutiData[key]={};
                        var fileItem=_fileList;
                        //mutiData.headIco.push(fs.createReadStream(fileItem.path));
                        if(_i_settings.beforeFileStreamAdded(fileItem)){

                        }
                        else{
                            continue;
                        }
                        mutiData[key]= fs.createReadStream(fileItem.path);
                        _i_settings.onFileStreamAdded(fileItem);
                        //fs.exists(fileItem.path,function(exists){
                        //    if(exists){
                        //        fs.unlink(fileItem.path);
                        //    }
                        //});

                        break;
                    }

                    //--



                }

                _requestOptions.formData=mutiData;

                //__url="http://localhost:3002/test/imgUploadHandler";
                __inner_request.post(_requestOptions,
                    function optionalCallback(err, response, body) {

                        me.onResponseHandle(response);
                        if (!err && response.statusCode == 200) {
                            var _res=body;
                            try{
                                if(_i_settings.dataType.toLocaleLowerCase()=="json"){
                                    _res=JSON.parse(_res);
                                }
                            }
                            catch (ex){
                                var _error_msg="nodejs can not trans this data to JSON format: "+body;
                                logger.error("json translate error:"+_i_settings.url);
                                logger.error(_error_msg);
                                logger.error(body);
                                throw new Error(_error_msg);
                                _deferred.reject(_error_msg);

                                return;

                            }
                            _deferred.resolve(_res);}

                        else{
                            var _error_msg="request helper error: can not request url:"+_i_settings.url+"";
                            logger.error(_error_msg);

                            logger.error(err);
                            logger.error(body);


                            throw new Error(_error_msg);
                            _deferred.reject(err);

                        }
                    });


            }

            tryPost2Server(_i_settings.formFields,_i_settings.formFiles,function(){});
        }
        //--post方式。--不上传文件。
        else{
            _requestOptions.form=_i_settings.data;
            //加密
            console.log("post :"+_requestOptions.url);

            __inner_request.post(_requestOptions,function(err,response,body){

                me.onResponseHandle(response);

                if (!err && response.statusCode == 200) {
                    var _res=body;
                    try{
                        if(_i_settings.dataType.toLocaleLowerCase()=="json"){
                            _res=JSON.parse(_res);
                        }
                    }
                    catch (ex){
                        var _error_msg="nodejs can not trans this data to JSON format: "+body;
                        logger.error("json translate error:"+_i_settings.url);
                        logger.error(_error_msg);
                        logger.error(body);
                        throw new Error(_error_msg);
                        _deferred.reject(_error_msg);

                        return;

                    }
                    _deferred.resolve(_res);}

                else{
                    var _error_msg="request helper error: can not request url:"+_i_settings.url+"";
                    logger.error(_error_msg);

                    logger.error(err);
                    logger.error(body);


                    throw new Error(_error_msg);
                    _deferred.reject(err);

                }
            });
        }


    }


    var _promise= _deferred.promise;
    _promise.then(_i_settings.success,_i_settings.error);
    return _promise;
};


WebRequestHelper.prototype.run=function(onDone){
    var me=this;
    var taskList=this.taskList;
    if(taskList.length<=0){

        if(onDone){
            onDone();
        }
        return;
    }
    var _now_taskReq=[];
    for(var i=0;i< this.taskList.length;i++){
        var _taskItem={
            url:""
            ,success:function(parameter){

            }
            ,error:function(parameter){

            }
            ,method:"get"
            ,data:{}
            ,dataType:"json"
        };
        Extend(_taskItem,this.taskList[i]);
        var _promise=me.request(_taskItem);
        _now_taskReq.push(_promise);
    }
    //--检查是不是有多于或等于一个任务。
    if(_now_taskReq.length<=0){
        var _warning_msg="request helper warning:task list has less than 1 task,do not send any request now.";
        logger.warn(_warning_msg);
        if(onDone){
            onDone();
        }
        return;
    }
    Q.all(_now_taskReq)
        .spread(function(){}).done(function(){
            if(onDone){
                onDone();
            }
        });

};

/****额外添加一个post form的东西，这个可以将带有文件数据的表单提取出来变成数据格式。**/
WebRequestHelper.prototype.parseForm=function(_originRequest,_opts_){
    var _parse_setting={
        uploadDir:"./uploads/"
        ,onSuccess:function(fields,files){}
        ,onError:function(err){
            console.log("WebRequestHelper can not parse the form , the error is:");
            console.log(err);
            logger.error("WebRequestHelper解释表单时候出错，无法完成解释。");
            logger.error(err);
        }
    };
    Extend(_parse_setting,_opts_);


    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir:_parse_setting.uploadDir});
    //上传完成后处理

    var _upload_image_path="";

    form.parse(_originRequest, function(err, fields, files) {
        if (err) {
            _parse_setting.onError(err);
            return;
        }
        _parse_setting.onSuccess(fields,files);

    });
    return;
}


/***根据php的加解密在nodejs做的加密措施。***/
WebRequestHelper.prototype._rsaHandler=function(parasData){

    var _realData={};
    var _paras_length=0;
    for(var key in parasData){
        _paras_length++;
    }
    if(_paras_length<=0){

        return {};
    }

    function _parse2ParaStr(paras){

        var _paras=[];
        var para_num=0;

        for(var _key in paras){
            para_num++;
            if(util.isObject(paras[_key])||util.isArray(paras[_key])){
                _paras.push(_key+"="+encodeURIComponent(JSON.stringify(paras[_key])));
            }
            else{
                _paras.push(_key+"="+encodeURIComponent(paras[_key]));
            }

        }
        var _str_url= "";

        //_str_url=encodeURIComponent(_paras.join("&"));
        _str_url=_paras.join("&");

        return _str_url;
        //
        //
        ////_str_url=_paras.join("&");
        //
        //var b = new Buffer(_str_url);
        //var s = b.toString('base64');
        //return s;
    }

    var _paras_str=_parse2ParaStr(parasData);



    var _client_encrypt_str=cryptos.RSAEncrypt(_paras_str,publickey);


    _realData={
        _encrypt:_client_encrypt_str
    };

    //logger.info("===经过加密以后的字段是：");
    //logger.info(JSON.stringify(_realData));
    //logger.info("===好了，自行解密，结果是：");
    var _originstr=cryptos.RSADecrypt(_client_encrypt_str,privatekey);
    //logger.info(_originstr);
    return _realData;


}

module.exports=WebRequestHelper;


/**
 * 该文件是针对request获取及存储数据的封装，当然，包含了promise的帮助。
 * 请注意，这个 requesthelper是通用类型的，没有对某一个域名的某些cookie进行处理，譬如，假如这个cookie要失效，那么还是没有处理，譬如，这个cookie要添加进来，譬如，这个cookie是sessionid要添加进来。。。等等。。假如希望这些
 * 请求可以自动处理cookie，那么请使用WebRequestHelper，这个辅助类已经添加了对cookie等等的处理及模拟。
 */

var fs=require("fs");
var Q = require('q');
var util=require("../util/util.js");
var request = require('request');

var Extend=require("util")._extend;
var RequestHelper=function(){
    this.taskList=[];
};
RequestHelper.prototype.addTask=function(_opt){

        this.taskList.push(_opt);
}

RequestHelper.prototype.request=function(_opts){
    var _deferred= Q.defer();
    var _i_settings={
        url:""
        ,method:"get"
        ,data:{}
        ,dataType:"json"
        ,error:function(error){
        }
        ,success:function(sdata){
        }

        //--下面两个就是服务端nodejs独有的，譬如，拿到response之后的处理，譬如，设定默认的cookie。
        ,onResponseHandle:function(theResponse){}
        ,defaults:{

        }
    };
    _i_settings=Extend(_i_settings,_opts);
    if(_i_settings.method.toLocaleLowerCase()=="get"){
        var _realUrl=util.Json2URL(_i_settings.url,_i_settings.data);
        logger.info(_realUrl);
        var req2=request(_realUrl, function (error, response, body) {
            console.log("SESSIONID is:"+JSON.stringify(response.headers));
            logger.log(JSON.stringify(response.headers));
            _i_settings.onResponseHandle(response);
            if (!error && response.statusCode == 200) {
                var _res=body;
                try{
                if(_i_settings.dataType=="json"){
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
                var _error_msg="request helper error: can not request url:"+_realUrl+"";
                logger.error(_error_msg);
                logger.error(body);
                throw new Error(_error_msg);
                _deferred.reject(error);

            }
        });
    }
    else{

        //--post方式。
        request.post({
            url:_i_settings.url
            ,form:_i_settings.data
        },function(err,response,body){
            console.log("SESSIONID is:"+JSON.stringify(response.headers));
            logger.log(JSON.stringify(response.headers));
            _i_settings.onResponseHandle(response);
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


    var _promise= _deferred.promise;
    _promise.then(_i_settings.success,_i_settings.error);
    return _promise;
};


RequestHelper.prototype.run=function(onDone){
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
module.exports=RequestHelper;


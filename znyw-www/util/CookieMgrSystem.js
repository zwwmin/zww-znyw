/**
 * 这是cookie的管理系统
 */
var fs=require("fs");
var Q = require('q');
var util=require("../util/util.js");
var request = require('request');

var Extend=require("util")._extend;


//--定时任务类库
var schedule = require("node-schedule");
//--导入lowDB类库。
var lowDB = require("lowdb");
const fileSync = require('lowdb/lib/file-sync');

var Q = require('q');


//--建立或者读写cookie的数据库文件。
var db_cookies = lowDB('cookies-db.json',{
    writeOnChange: true,
    autosave: true, // automatically save database on change (default: true)
    async: false     // asynchronous write (default: true)
    ,storage: {
        write: fileSync.write
        ,read: fileSync.read
    }
});

var CookieMgrSystem={
    /******
     * 初始化 初始化某个域名对应的某个session key 名称
     * ，譬如，假设现在要模拟www.baidu.com和ifeng.com两个网站的cookie
     * ，那么需要知道的是baidu和ifeng两个网站的session 在cookie里面的key值，
     * 假定是：baidu的为 bdsession ifeng的是，ifengsessionid，那么opts的相关参数可以使：
     * siteSessionKeys:[
     * {host:"http://www.baidu.com",sessionKey:"bdsession"}
     * ,{host:"http://www.ifeng.com",sessionKey:"ifengsessionid"}
     * ]
     * ******/
    init:function(opts){
        var me=this;
        this.settings={
            siteSessionKeys:[]
        };
        Extend(this.settings,opts);

    }
    ,getSiteSessionKeys:function(){
        return this.settings.siteSessionKeys;
    }
    //--这是执行相关日程任务的方法。。。
    //--nodejs定时任务设定

//--每一分钟检查一下数据库里面的cookie，看看哪一个已经过期了，过期了就删除掉。
    /***
     * 该方法是核心方法之一，是背景任务，用于删除过期的cookie。
     * ***/
    ,runScheduleTask:function(){

        var me=this;
        console.log("set the cookie mgr system background system.");


        var Rule_CookieCheck = new schedule.RecurrenceRule();
        var Rule_CookieCheck_Minutes=[];
        for(var i=1; i<60; i++){
            Rule_CookieCheck_Minutes.push(i);
        }




        Rule_CookieCheck.minute=Rule_CookieCheck_Minutes;

        function _task_handle(callback_2){
            //var _collections=db_cookies.filter({'_sys_is_session':true});
            var _collections=db_cookies.cloneDeep().value();
            //--检查哪一个过期。
            var _abandon_cookie=[];
            for(var key_lv1 in _collections){

                var _site_collection=_collections[key_lv1];
                //logger.info("lv1 key collection:");
                //logger.info(JSON.stringify(_site_collection));
                if(_site_collection==undefined){
                    continue;
                }
                for(var key_lv2 in _site_collection){
                    var _person_cookies=_site_collection[key_lv2];
                    if(_person_cookies==undefined){
                        continue;
                    }
                    //--这是包含了session cookie在内的所有个人cookie集合。
                    //--接下来将host的 md5，session id 及session key name 提取出来。
                    var _host_md5=key_lv1;
                    var _session_id=key_lv2;
                    var _session_key_name="";
                    //--顺便判断代表session的cookie是否已经失效，已经失效的话就删除。
                    var _session_has_end_up=false;
                    for(var key_lv3_tmp1 in _person_cookies){


                        if(util.checkEmpty(_session_key_name)==false){
                            continue;
                        }
                        if(_person_cookies[key_lv3_tmp1]==undefined){
                            continue;
                        }
                        if(_person_cookies[key_lv3_tmp1]._sys_is_session==true){
                            console.log("session id :"+key_lv3_tmp1);
                            _session_key_name=_person_cookies[key_lv3_tmp1]._sys_session_key;
                            var _session_end_time=new Date(_person_cookies[key_lv3_tmp1].Expires);
                            _session_end_time=_session_end_time.getTime();
                            var _now_time=new Date().getTime();
                            if(_now_time>=_session_end_time){
                                _session_has_end_up=true;
                                console.log("session id : "+_session_id+"  is game over.");
                            }
                        }
                    }
                    //--假设这个data里面没有session key--就是说找不到代表session的cookie，那么默认这个资料无效，需要删除。
                    if(util.checkEmpty(_session_key_name)){
                        _abandon_cookie.push({
                            type:"delete-all"
                            ,host_md5:_host_md5
                            ,session_id:_session_id
                        });
                        continue;
                    }
                    else if(_session_has_end_up){
                        _abandon_cookie.push({
                            type:"delete-all"
                            ,host_md5:_host_md5
                            ,session_id:_session_id
                        });
                        continue;
                    }

                    //--好了，假如session存在并且还没有game over，那么就继续检查下面的Expires的字段，没有或者过期都要删除。

                    for(var key_lv3_min in _person_cookies){


                        if(util.checkEmpty(key_lv3_min)==true){
                            continue;
                        }
                        if(_person_cookies[key_lv3_min]==undefined){
                            continue;
                        }
                        if(_person_cookies[key_lv3_min]._sys_is_session==true){
                            continue;
                        }
                        //--检查普通的cookie
                        var _normal_cookie=_person_cookies[key_lv3_min];
                        console.log('begin check : '+ key_lv3_min);
                        if(_normal_cookie.Expires==undefined){
                            _abandon_cookie.push({
                                type:"delete-partial"
                                ,host_md5:_host_md5
                                ,session_id:_session_id
                                ,cookie_name:key_lv3_min
                            });
                            continue;
                        }
                        var _end_time=new Date(_normal_cookie.Expires).getTime();
                        var _now_time=new Date().getTime();
                        if(_now_time>=_end_time){
                            console.log("cookie is "+key_lv3_min+" is over.");
                            _abandon_cookie.push({
                                type:"delete-partial"
                                ,host_md5:_host_md5
                                ,session_id:_session_id
                                ,cookie_name:key_lv3_min
                            });
                            continue;
                        }

                    }




                }
            }

            //--好了，现在来删除相关数据。
            if(callback_2){
                callback_2(_abandon_cookie);
            }
        }


        //--这是定时删除无效cookie及删除session的任务。
        var Schedule_CookieClean = schedule.scheduleJob(Rule_CookieCheck, function(){
            _task_handle(function(abandon_cookies){
                var _object_tree=db_cookies.value();
                for(var i=0;i< abandon_cookies.length;i++){
                    var abandon_cookie_item=abandon_cookies[i];
                    if(abandon_cookie_item.type=="delete-all"){
                        //db_cookies.get(abandon_cookie_item.host_md5).get(abandon_cookie_item.session_id).remove().value();
                        delete _object_tree[abandon_cookie_item.host_md5][abandon_cookie_item.session_id];
                    }
                    else if(abandon_cookie_item.type=="delete-partial"){
                        //db_cookies.get(abandon_cookie_item.host_md5).get(abandon_cookie_item.session_id).get(abandon_cookie_item.cookie_name).remove().value();
                        delete _object_tree[abandon_cookie_item.host_md5][abandon_cookie_item.session_id][abandon_cookie_item.cookie_name];
                    }
                }
                db_cookies.write();
            });
        });
    }
    /***
     * 该方法是核心方法之一,用于通过接收response来的headers中的set cookie来保存来自服务端的cookie，
     * 当然，由于每一个服务端都有根据session id设定的多个浏览器端，因此，我们这个系统也基于不同的session
     * id来模拟多个浏览器端。
     *--------------------
     * 万恶的异步操作，lowdb 这个是异步操作的，暂时用promise或者Q这些来操作了。
     *
     * **/
    ,setCookie:function(hostMD5,sessionID,CookieObjArray,callback){





        //var _now_taskReq=[];
        //
        //function task_create_HostObject(){
        //    var _deferred= Q.defer();
        //
        //}





        //--就判断是否有当前的host的相关session

        if(db_cookies.has(hostMD5).value()){

        }
        else{

            console.log("do not have host md5:"+hostMD5);
            var _session_data={};
            _session_data[sessionID]={};
            var HostData={};
            HostData[hostMD5]=_session_data;
            db_cookies.set(hostMD5,_session_data).value();
        }
        if(db_cookies.get(hostMD5).has(sessionID).value()){


        }
        else{

            //lowDB.
            console.log('do not have session id:'+sessionID);
            db_cookies.get(hostMD5).set(sessionID,{}).value();
//            db_cookies.get(hostMD5).push(sessionID,{}).value();
        }





        //--检查是不是有这个cookie的资料存在。。

        //console.log('begin check cookie '+CookieObj._sys_cookie_name);
        for(var i=0;i< CookieObjArray.length;i++){

            var CookieObj=CookieObjArray[i];
            //db_cookies.get(hostMD5).get(sessionID).set(CookieObj._sys_cookie_name,CookieObj).value();
            if(db_cookies.get(hostMD5).get(sessionID).has(CookieObj._sys_cookie_name).value()){
                //--有啊。。
                console.log("has cookie and need  to changed:"+CookieObj._sys_cookie_name);
                db_cookies.get(hostMD5).get(sessionID).get(CookieObj._sys_cookie_name).assign(CookieObj).value();
            }
            else{
                console.log("now need new a cookie db data."+JSON.stringify(CookieObj));
                //--没有的话就新建立一个。
                db_cookies.get(hostMD5).get(sessionID).set(CookieObj._sys_cookie_name,CookieObj).value();

            }

        }
        if(callback){
            callback();
        }

    }
    ,setSessionCookie:function(hostMD5,sessionID,sessionKeyName){
        var _now=new Date().getTime()+30*60*1000*10;
        var _nowDate=new Date(_now);
        var _sessionObject={
            "_sys_cookie_name": sessionKeyName,
            "_sys_cookie_value": sessionID,
            "_sys_is_session":true,
            "_sys_host_md5":hostMD5
            ,"_sys_session_key":sessionKeyName
            ,"_sys_session_id":sessionID,
            "Expires": _nowDate.toGMTString(),
            "Path": "/",
            "Secure": true
        };
        _sessionObject[sessionKeyName]=sessionID;

        db_cookies.get(hostMD5).get(sessionID).set(sessionKeyName,_sessionObject).value();
    }

    ,getCookieArray:function(hostMD5,sessionID){
        if(db_cookies.has(hostMD5).value()){
            if(db_cookies.get(hostMD5).has(sessionID)){

                var _cookies_objs=db_cookies.get(hostMD5).get(sessionID).value();
                var _objects=[];
                for(var key2 in _cookies_objs){
                    if(_cookies_objs[key2]!=null&&_cookies_objs[key2]!=undefined){
                        _objects.push(_cookies_objs[key2]);
                    }

                }
                return _objects;
                //return _cookies_objs;
            }
            else{
                return [];
            }

        }
        else{

            return [];
        }
    }

    /***
     *
     * 将字符串parse成为cookie形式的字符串。。注意，此cookie跟第三方类库的不一样。
     * 字符串格式如下：
     * name2=dfdf; Expires=Fri, 08-Jul-2016 09:08:05 GMT; Path=/; Secure
     *
     * ***/
    ,parseStr2Cookie:function(cookie_str){
        if(cookie_str==undefined||cookie_str==null||util.checkEmpty(cookie_str)){
            return undefined;
        }

        //"JSESSIONID=66191933928904FCF1F8E05E16BEB471; Path=/","username=waynezheng","name2=dfdf; Expires=Fri, 08-Jul-2016 09:08:05 GMT; Path=/; Secure"
        var _str_arr=cookie_str.split(';');
        var _cookie_obj={
            cookieName:""
            ,cookieValue:""
            ,options:{

            }
        };

        var _real_cookie={
            _sys_cookie_name:""
            ,_sys_cookie_value:""
        };

        if(_str_arr.length<=0){
            return _real_cookie;
        }
        for(var i=0;i< _str_arr.length;i++){
            if(util.checkEmpty(_str_arr[i])){
                continue;
            }
            var _key_val_pair_str=_str_arr[i];
            if(i==0){
                //--第一个字段啊，第一个字段是key value。
                if(_key_val_pair_str.indexOf("=")!=-1){
                    _cookie_obj.cookieName=_key_val_pair_str.substr(0,_key_val_pair_str.indexOf("="));
                    _cookie_obj.cookieValue=_key_val_pair_str.substr(_key_val_pair_str.indexOf("=")+1);
                }
                else{
                    _cookie_obj.cookieName=_key_val_pair_str;
                }
            }
            else{
                //--第一个字段啊，第一个字段是key value。
                var _obj_key="";
                var _obj_value="";
                if(_key_val_pair_str.indexOf("=")!=-1){
                    _obj_key=_key_val_pair_str.substr(0,_key_val_pair_str.indexOf("="));
                    _obj_value=_key_val_pair_str.substr(_key_val_pair_str.indexOf("=")+1);
                }
                else{
                    _obj_key=_key_val_pair_str;
                }
                _cookie_obj.options[_obj_key]=_obj_value;
            }



        }
        //console.log("tmp result :"+JSON.stringify(_cookie_obj));
        _real_cookie._sys_cookie_name=_cookie_obj.cookieName;
        _real_cookie._sys_cookie_value=_cookie_obj.cookieValue;
        _real_cookie[_cookie_obj.cookieName]=_cookie_obj.cookieValue;

        for(var key in _cookie_obj.options){
            var _lowercase_key=util.trim(key.toLocaleLowerCase());
            var _val=_cookie_obj.options[key];
            //_real_cookie[key]=_val;
            //console.log("key is:"+_lowercase_key);
            if(_lowercase_key=="domain"){
                _real_cookie.Domain=_val;
            }
            else if(_lowercase_key=="path"){
                _real_cookie.Path=_val;

            }
            else if(_lowercase_key=="expires"){
                _real_cookie.Expires=_val;
            }
            else if(_lowercase_key=="secure"){
                _real_cookie.Secure=true;
            }
            else if(_lowercase_key=="httponly"){
                _real_cookie.HttpOnly=true;
            }


        }

        return _real_cookie;






    }
    ,delSessionData:function(sessionId,callback){

        function _task_handle(callback_2){
            //var _collections=db_cookies.filter({'_sys_is_session':true});
            var _collections=db_cookies.cloneDeep().value();
            //--检查哪一个过期。
            var _abandon_cookie=[];
            for(var key_lv1 in _collections){

                var _site_collection=_collections[key_lv1];
                //logger.info("lv1 key collection:");
                //logger.info(JSON.stringify(_site_collection));
                if(_site_collection==undefined){
                    continue;
                }
                for(var key_lv2 in _site_collection){
                    var _person_cookies=_site_collection[key_lv2];
                    if(_person_cookies==undefined){
                        continue;
                    }
                    //--这是包含了session cookie在内的所有个人cookie集合。
                    //--接下来将host的 md5，session id 及session key name 提取出来。
                    var _host_md5=key_lv1;
                    var _session_id=key_lv2;

                    if(_session_id==sessionId){
                        _abandon_cookie.push({
                            type:"delete-all"
                            ,host_md5:_host_md5
                            ,session_id:_session_id
                        });
                    }
                    else{
                        continue;
                    }

                    var _session_key_name="";
                    //--顺便判断代表session的cookie是否已经失效，已经失效的话就删除。
                    var _session_has_end_up=false;
                    for(var key_lv3_tmp1 in _person_cookies){


                        if(util.checkEmpty(_session_key_name)==false){
                            continue;
                        }
                        if(_person_cookies[key_lv3_tmp1]==undefined){
                            continue;
                        }

                        if(_person_cookies[key_lv3_tmp1]._sys_is_session==true){
                            console.log("session id :"+key_lv3_tmp1);
                            _session_key_name=_person_cookies[key_lv3_tmp1]._sys_session_key;


                            var _session_end_time=new Date(_person_cookies[key_lv3_tmp1].Expires);
                            _session_end_time=_session_end_time.getTime();
                            var _now_time=new Date().getTime();
                            if(_now_time>=_session_end_time){
                                _session_has_end_up=true;
                                console.log("session id : "+_session_id+"  is game over.");
                            }
                        }
                    }
                    //--假设这个data里面没有session key--就是说找不到代表session的cookie，那么默认这个资料无效，需要删除。
                    if(util.checkEmpty(_session_key_name)){
                        _abandon_cookie.push({
                            type:"delete-all"
                            ,host_md5:_host_md5
                            ,session_id:_session_id
                        });
                        continue;
                    }
                    else if(_session_has_end_up){
                        _abandon_cookie.push({
                            type:"delete-all"
                            ,host_md5:_host_md5
                            ,session_id:_session_id
                        });
                        continue;
                    }




                }
            }

            //--好了，现在来删除相关数据。
            if(callback_2){
                callback_2(_abandon_cookie);
            }
        }

        _task_handle(function(abandon_cookies){
            var _object_tree=db_cookies.value();
            for(var i=0;i< abandon_cookies.length;i++){
                var abandon_cookie_item=abandon_cookies[i];
                if(abandon_cookie_item.type=="delete-all"){
                    //db_cookies.get(abandon_cookie_item.host_md5).get(abandon_cookie_item.session_id).remove().value();
                    delete _object_tree[abandon_cookie_item.host_md5][abandon_cookie_item.session_id];
                }
                else if(abandon_cookie_item.type=="delete-partial"){
                    //db_cookies.get(abandon_cookie_item.host_md5).get(abandon_cookie_item.session_id).get(abandon_cookie_item.cookie_name).remove().value();
                    delete _object_tree[abandon_cookie_item.host_md5][abandon_cookie_item.session_id][abandon_cookie_item.cookie_name];
                }
            }
            db_cookies.write();
            if(callback){
                callback();
            }
        });

    }




};




module.exports=CookieMgrSystem;

/**
 * Created by DGDL-08 on 2017/10/9.
 */
/**
 *weixin全局需要用到的数据。封装一下。
 */
var request = require('request');
var Settings=require('../settings.js');
var ServerConf=require("../ServerConf");

var   Q   = require('q');
var Extend=require("util")._extend;
/*******注意，为了自动模拟php服务器的request并且发送带有session id的cookie，
 * 现在用WebRequestHelper代替RequestHelper，两者的区别在于，前者可以模拟cookie环境，并且自动发送带有session的cookie，后者没有。
 * 并且，后者会出现多个接口报请先登陆的错误。
 * ********/
var RequestHepler=require("../util/RequestHelper.js");
var WebRequestHelper=require("../util/WebRequestHelper");

var app={
    //--将原始的菜单数据转换一下。。
    menuDataTranslate:function(originArrayData){


        //--注意，前台页面需要显示的数据是两个两个，但是现在api是逐个逐个一级菜单。现在来合并一下。
        var _tmpOriginJson=originArrayData
        var _currentJson=[];
        for(var i=0;i< _tmpOriginJson.length;i++){
            //--计算index。
            var _now_index=parseInt(Math.floor(i/2));
            if(_currentJson.length<=_now_index){
                _currentJson.push([]);
            }
            _currentJson[_now_index].push(_tmpOriginJson[i]);
        }

        return _currentJson;
    }
    ,getCommonPageData:function(req,callback){
        //--用户信息。

        var me=this;
        var _common_page_data={
            topMenuList:[]
            ,memberInfo:{}  //格式：{"grade":1,"id":27,"namecheck":0,"regtime":"2016-03-17 15:28:24.0","shopname":"世界五百强小卖部","storagecode":"W28245905141a","tel":"13717447375"}
            ,hasLogin:false
            ,unreadMsg:{
                "msg":"获取成功！",
                "rows":0,//数量
                "state":"success"
            }
            ,access:{}
        };


        if(req.session.user){
            _common_page_data.memberInfo=req.session.user;
            _common_page_data.hasLogin=true;
        }
        else{
            _common_page_data.hasLogin=false;
        }
        var rHelper=new WebRequestHelper(req);
        // 获取微信access_token以及当前用户的openid
        // 正式公众号
        var appid = "wx7e73c777316266f5";
        var secret ="a7bd382517f81fbd6a76348d34dad526";
        if( !req.session.hasLogin){
            rHelper.addTask({
                url:Settings.WebApi.WeiXinAccess_token
                ,method:"get"
                ,data:{
                    appid:appid
                    ,secret:secret
                    ,code:req.query.code
                    ,grant_type:"authorization_code"
                }
                ,success:function(data){
                    console.log(data);
                    if(data.expires_in){
                        var acctime= Date.parse(new Date());
                        req.session["access_token_time"]=acctime;
                        req.session["access_token"]=data.access_token;
                        req.session["access_openid"]=data.openid;
                        req.session["access_refresh_token"]=data.refresh_token;
                        _common_page_data.access=data;
                    }else {

                    }
                }
                ,error:function(error){
                    logger.error("数据获取失败 "+JSON.stringify(error));
                }
            });
        }
        var _wechat = {"no": 1,"yes":2};
        var ua = req.headers["user-agent"].toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            // 微信打開
            _common_page_data["wechat"]=_wechat.yes;
        } else {
            // 請在微信打開
            _common_page_data["wechat"]=_wechat.no;
        }
        rHelper.run(function(){
            var footerHelper=new WebRequestHelper(req);
            var openid = req.session.access_openid;
            if(req.session["access_openid"]){
                // 微信用户openid是否绑定
                footerHelper.addTask({
                    url:ServerConf.ApiHost+Settings.WebApi.WeiXinBinding_Openid
                    ,data:{
                        openid:openid
                    }
                    ,success:function(serverdata){
                        if(serverdata.code==0){
                            _common_page_data.hasLogin=true;
                            _common_page_data.memberInfo=serverdata.data;
                            req.session.hasLogin=true;
                            req.session["user"]=server_data.data;
                        }
                        else{
                            _common_page_data.hasLogin=false;
                        }
                    }
                    ,error:function(error){
                        logger.error("楼层数据获取失败 "+JSON.stringify(error));
                    }
                });
            }
            footerHelper.run(function(){
                if(callback){
                    callback(_common_page_data);
                }
            });
        });

    }
};
module.exports=app;

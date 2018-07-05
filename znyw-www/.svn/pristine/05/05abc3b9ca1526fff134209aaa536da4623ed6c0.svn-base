/**
 *全局需要用到的数据。封装一下。
 */
var request = require('request');
var Settings=require('../settings.js');
var ServerConf=require("../ServerConf");
var fs = require('fs');
var   Q   = require('q');
var Extend=require("util")._extend;
/*******注意，为了自动模拟php服务器的request并且发送带有session id的cookie，
 * 现在用WebRequestHelper代替RequestHelper，两者的区别在于，前者可以模拟cookie环境，并且自动发送带有session的cookie，后者没有。
 * 并且，后者会出现多个接口报请先登陆的错误。
 * ********/
var RequestHepler=require("../util/RequestHelper.js");
var WebRequestHelper=require("../util/WebRequestHelper");
var logger = require('../util/logHelper.js').Logger;
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

            ,hasLogin:true

            ,unreadMsg:{
                "msg":"获取成功！",
                "rows":0,//数量
                "state":"success"
            }

            ,wx_auth_info:{}
            ,qq_auth_info:{}
            ,noticeData:{}
            ,s_regionlist:{}
            ,sessionMap:{}
            ,indexmsg:{}
            ,footerList:{
                footerCat:{}
                ,footerArticle:[]
                ,code:[]
            }
        };



        if(req.session.user){
           _common_page_data.memberInfo=req.session.user;
            _common_page_data.hasLogin=true;
        }
        else{
            _common_page_data.hasLogin=false;
        }

        var PageData={
            wx_auth_info:{}
            ,qq_auth_info:{}
        };

        var rHelper=new WebRequestHelper(req);


        if(req.session.user){
            rHelper.addTask({
                url:ServerConf.ApiHost+Settings.WebApi.MemberInfoApi
                ,data:{}
                ,success:function(serverdata){
                    if(serverdata.code==0){
                        _common_page_data.hasLogin=true;
                        _common_page_data.memberInfo=serverdata.data;
                        req.session.user=serverdata.data;
                    }
                    else{
                        _common_page_data.hasLogin=false;
                    }

                }
                ,error:function(error){
                    logger.error("用户信息获取失败 "+JSON.stringify(error));
                }
            });

        }




        var code={};

        rHelper.run(function(){
            var footerHelper=new WebRequestHelper(req);

            footerHelper.run(function(){
                if(callback){
                    callback(_common_page_data);
                }
            });

        });



    }
};
module.exports=app;

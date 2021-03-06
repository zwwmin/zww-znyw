/**
 * Created by DGDL-08 on 2018/4/9.
 */
/**
 *全局需要用到的数据。封装一下。
 */
var request = require('request');
var Settings=require('../settings.js');
var ServerConf=require("../ServerConf");
var fs = require('fs');
var logger = require('../util/logHelper.js').Logger;
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
        var _tmpOriginJson=originArrayData;
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
            BaseInfo:{}
            ,memberInfo:{}
            ,current:{}
            ,ChoiceLoads:{}
            ,hasLogin:true
        };

        var rHelper=new WebRequestHelper(req);
        if(!req.session.user){
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
        }else {
            _common_page_data.hasLogin=true;
            _common_page_data.memberInfo=req.session.user;
        }
        if(!req.session.BaseInfo){
            rHelper.addTask({
                url: ServerConf.ApiHost + Settings.WebApi.v5_SmartStationList //用户的所有变压器
                , data: {}
                , success: function (serverdata) {
                    if (serverdata.code == 0) {
                        _common_page_data.BaseInfo = serverdata.data;
                        req.session.BaseInfo=serverdata.data;
                        req.session.current=serverdata.data[0];
                        req.session['site'] = serverdata.data[0].sid;
                    }
                }
                , error: function (error) {
                    logger.error("用户信息获取失败 " + JSON.stringify(error));
                }
            });
        }else {
            _common_page_data.BaseInfo = req.session.BaseInfo;
        }

        if(req.session.loads){
            _common_page_data.ChoiceLoads = req.session.loads;
        }

        rHelper.run(function(){
            if(!req.session.current){
                req.session.current= req.session.BaseInfo[0];
                _common_page_data.current = req.session.BaseInfo[0];
            }else {
                _common_page_data.current = req.session.current;
            }
            if(callback){callback(_common_page_data);}
        });
    }
};
module.exports=app;
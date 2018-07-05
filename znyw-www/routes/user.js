/**
 * Created by DGDL-08 on 2018/3/30.
 */
var express = require('express');
var router = express.Router();
var Settings=require("../settings");
var ServerConf=require("../ServerConf");
var logger = require('../util/logHelper.js').Logger;
var fs=require("fs");
var Q = require('q');
/*******注意，为了自动模拟php服务器的request并且发送带有session id的cookie，
 * 现在用WebRequestHelper代替RequestHelper，两者的区别在于，前者可以模拟cookie环境，并且自动发送带有session的cookie，后者没有。
 * 并且，后者会出现多个接口报请先登陆的错误。
 * ********/

var WebRequestHelper=require("../util/WebRequestHelper");
var Intelligent=require("../service/IntelligentJS.js");
var util=require("../util/util.js");
var request = require('request');
var plugins=require("../service/plugins.js");

var crypto = require('crypto');


//--路由拦截，该路径下面所有地方都需要检查sid的合法性，是否登录。
router.get('*',function(req,res,next){


    var isAjaxRequest=false;
    //--检查是否ajax。
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        // send your xhr response here
        isAjaxRequest=true;
    } else {
        isAjaxRequest=false;
    }

    function checkLogin(callback_success,callback_error){
        //--判断当前sid是否有效的。
        var _check_login_error=false;
        var _lv1Ajax=new WebRequestHelper(req);
        var _check_result={};
        // callback_success(_check_result);
        // return
        _lv1Ajax.addTask({
            url:ServerConf.ApiHost+Settings.WebApi.MemberInfoApi
            ,data:{}
            ,success:function(theData){
                _check_login_error=false;
                _check_result=theData;
            }
            ,error:function(error){
                _check_login_error=true;
                logger.error(error);
            }
        });

        _lv1Ajax.run(function(){
            if(_check_login_error){
                if(isAjaxRequest){
                    res.send({
                        state:"failure"
                        ,msg:"系统无法访问后端服务，后端服务错误"
                    })
                }else{
                    res.send("系统无法访问后端服务，后端服务错误");
                    return;
                }
                return;
            }
            else{
                if(callback_success){
                    callback_success(_check_result);
                }
            }
        });
    }

    function loginAndRedirect(){
        //清空多余的sid和user。
        if(req.session.sid){
            delete req.session.sid;
        }
        if(req.session.user){
            delete req.session.user;
        }
        var _redirect_url="/login";
        var _from=req.url;//   空
        var _org_url=req.originalUrl;// /user
        var _now_url=util.Json2URL(_redirect_url,{from:_org_url});
        console.log("from:"+_from+"  "+_org_url);
        res.redirect(_now_url);
    }


    if(req.session.user){
        checkLogin(function(theData){
            if(theData.code=="4003"){
                if(isAjaxRequest){
                    res.send(theData);
                }else{
                    console.log(isAjaxRequest);
                    loginAndRedirect();
                }
                return;
            }
            else{
                next();
            }
        },function(errorstr){

        });
        return;
    }

    if(!req.session.user){
        if(isAjaxRequest){
            res.send({code:'-1',msg:"请先登录"});
        }
        else{
            loginAndRedirect();
        }
    }else{
        next();
    }

});
//
router.get('/', function(req, res, next) {
    // Intelligent.getCommonPageData(req,function(commonData){
    // var _ajaxHelper=new WebRequestHelper(req);
    //获取数据字典



    // _ajaxHelper.run(function(){

    res.render('Intelligent',{});

    // });

    // });

});


module.exports = router;

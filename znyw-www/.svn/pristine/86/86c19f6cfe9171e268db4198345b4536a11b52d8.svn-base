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
var RequestHepler=require("../util/RequestHelper.js");
var WebRequestHelper=require("../util/WebRequestHelper");
var GlobalService=require("../service/GlobalService.js");
var https = require('https');
var util=require("../util/util.js");
var request = require('request');
var plugins=require("../service/plugins.js");

var AccountService=require('../service/AccountService.js');


//首页
router.get('/', function(req, res, next) {
    GlobalService.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        //获取数据字典
        _ajaxHelper.run(function(){
            res.render('index', commonData);

        });

    });

});

router.get('/login', function(req, res, next) {
    GlobalService.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        //获取数据字典


        _ajaxHelper.run(function(){
            res.render('login', commonData);

        });

    });

});


router.post('/login_bld',function(req,res,next){
    var _ajaxHelper = new WebRequestHelper(req);
    var _post_data = {
        account: req.body.account
        , password: req.body.password
    };
    var _result={};
    _ajaxHelper.addTask({
        url: ServerConf.ApiHost + Settings.WebApi.loginApi
        , data: _post_data
        , success: function (server_data) {
            _result = server_data;
            if (server_data.code == 0) {
                req.session.hasLogin = true;
                req.session.user = server_data.data;
                req.session["token"] = server_data.data.token;
                req.session["BaseInfo"] = false;
            }
        }
        , error: function () {
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
        res.end();
    });
});
router.get("/logout",function(req,res,next){

    var _account_service=new AccountService(req,res);

    _account_service.logout(function(data){
        res.send(data);
    });


});
router.post('/login',function(req,res,next){
    var account=req.body.account;
    var password=req.body.password;
    if(password==undefined){
        password=""
    }

    var _accountService = new AccountService(req, res);
    _accountService.login(account, password, function (stateres) {
        res.send(stateres);
    });

});

router.get('/text', function(req, res, next) {
    res.render('text',{});
});
router.get('/text_ditu', function(req, res, next) {
    res.render('text_ditu',{});
});
router.get('/text_gaode', function(req, res, next) {
    res.render('text_gaode',{});
});
module.exports = router;

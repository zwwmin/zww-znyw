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
        var _redirect_url="/";
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

router.get('/', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        //获取告警
        var _result={};
        var eti=(new Date()).getTime();//结束时间
        var start=new Date();
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);
        var sti=Date.parse(start);//开始时间
        var _paras={
            sid:req.session.site,
            pageIndex:req.body.site,
            pageSize:3,
            stime:sti,//开始
            etime:eti//结束
        };

        _ajaxHelper.addTask({
            url:ServerConf.ApiHost+Settings.WebApi.v5_SmartGetStationAlarmInfoForPc
            ,method:"get"
            ,data:_paras
            ,dataType:"json"
            ,success:function(data){
                _result=data;
            }
            ,error:function(error){
                logger.error("数据获取失败 "+JSON.stringify(error));
            }
        });

        _ajaxHelper.run(function(){
            commonData['list']=_result;
            res.render('Intelligent_index',commonData);
        });
    });
});
// 大屏幕页面
router.get('/mappage', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        var _result=[];
        var _paras={
            location:"东莞",
            output:"json",
            ak:"AKVZHbd090K288gmMjN4IztFBeleu4kQ"
        };
        _ajaxHelper.addTask({
            url:Settings.WebApi.v5_SmartWeatherForecast
            ,method:"get"
            ,data:_paras
            ,dataType:"json"
            ,success:function(data){
                _result=data;
            }
            ,error:function(error){
                logger.error("数据获取失败 "+JSON.stringify(error));
            }
        });
        _ajaxHelper.run(function(){
            commonData['Weather']=_result;
            res.render('mappage',commonData);

        });

    });
});
// 最大需量
router.get('/Intelligent_demand', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        var eti=(new Date()).getTime();
        var _result={};
        var _paras={
            sid:req.session.site,
            timestamp:eti
        };
        _ajaxHelper.addTask({
            url:ServerConf.ApiHost+Settings.WebApi.v5_SmartMaxDemand
            ,method:"get"
            ,data:_paras
            ,dataType:"json"
            ,success:function(data){
                _result=data;
            }
            ,error:function(error){
                logger.error("数据获取失败 "+JSON.stringify(error));
            }
        });
        _ajaxHelper.run(function(){
            commonData['data']=_result;
            res.render('Intelligent_demand',commonData);
        });
    });
});
router.get('/text', function(req, res, next) {

    res.render('Intelligent_text',{});

});

// 报警信息
router.get('/Intelligent_warning', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        var _result={};
        //获取数据字典
        _ajaxHelper.addTask({
            url:ServerConf.ApiHost+Settings.WebApi.v5_SmartAlarmCount
            ,method:"get"
            ,data:{
                sid: req.session.site
            }
            ,dataType:"json"
            ,success:function(data){
                _result=data;
            }
            ,error:function(error){
                logger.error("数据获取失败 "+JSON.stringify(error));
            }
        });


        _ajaxHelper.run(function(){
            commonData["data"]=_result;
            res.render('Intelligent_warning',commonData);

        });

    });

});

// 负荷分析
router.get('/Intelligent_load', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);

        //获取数据字典

        _ajaxHelper.run(function(){
            res.render('Intelligent_load',commonData);

        });

    });

});



// 实时分析
router.get('/Intelligent_analysis', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        var _result;
        //获取数据字典

        _ajaxHelper.run(function(){

            res.render('Intelligent_analysis',commonData);

        });

    });

});
// 运维专家
router.get('/Intelligent_experts', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        var _result={};
        //获取数据字典v5_SmartGetOperationalExperts
        _ajaxHelper.addTask({
            url:ServerConf.ApiHost+Settings.WebApi.v5_SmartGetOperationalExperts
            ,method:"post"
            ,data:{}
            ,dataType:"json"
            ,success:function(data){
                _result=data;
            }
            ,error:function(error){
                logger.error("数据获取失败 "+JSON.stringify(error));
            }
        });


        _ajaxHelper.run(function(){
            commonData['data']=_result;
            res.render('Intelligent_experts',commonData);

        });

    });

});
// 环境
router.get('/Intelligent_environment', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        var _result={};
        //获取数据字典
        _ajaxHelper.addTask({
            url:ServerConf.ApiHost+Settings.WebApi.v5_SmartGetEnvironmentInfo
            ,method:"post"
            ,data:{
                sid:req.session.site
            }
            ,dataType:"json"
            ,success:function(data){
                _result=data;
            }
            ,error:function(error){
                logger.error("数据获取失败 "+JSON.stringify(error));
            }
        });


        _ajaxHelper.run(function(){
            commonData['data']=_result;
            res.render('Intelligent_environment',commonData);

        });

    });

});
// 系统
router.get('/Intelligent_system', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        var _result={};
        //获取数据字典
        _ajaxHelper.addTask({
            url:ServerConf.ApiHost+Settings.WebApi.v5_SmartStruct
            ,method:"get"
            ,data:{
                sid:req.session.site
            }
            ,dataType:"json"
            ,success:function(data){
                _result=data;
            }
            ,error:function(error){
                logger.error("数据获取失败 "+JSON.stringify(error));
            }
        });


        _ajaxHelper.run(function(){
            commonData['data']=_result;
            res.render('Intelligent_system',commonData);

        });

    });

});
// 账号设置
router.get('/Intelligent_Account', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        var _result={};
        //获取数据字典


        _ajaxHelper.run(function(){

            res.render('Intelligent_Account',commonData);

        });

    });

});
// 能耗分析
router.get('/Intelligent_energy', function(req, res, next) {
    Intelligent.getCommonPageData(req,function(commonData){
        var _ajaxHelper=new WebRequestHelper(req);
        var _result={};
        //获取数据字典



        _ajaxHelper.run(function(){

            res.render('Intelligent_energy',commonData);

        });

    });

});
//切换站点
router.post('/changePassWord', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);
    var _result={
        "code": 0,
        "msg": ""};
    var _sid=req.body.sid;
    var data = req.session.BaseInfo;
    req.session.site = _sid;
    delete req.session.loads;
    for(var a=0;a<data.length;a++){
        var arr=data[a];
        if(_sid==arr.sid ){
            _result.code=0;
            req.session.current=arr;
            break;
        }else {
            _result.code=-1;
        }
    }

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartLoads
        ,method:"get"
        ,data:{
            sid:_sid
        }
        ,dataType:"json"
        ,success:function(data){
            req.session['loads']=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });
    _ajaxHelper.run(function(){
        res.send(_result);
    });
});
//获取站点的变压器数量
router.post('/v5_SmartLoads', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);
    var _result={};
    var _sid=req.session.site;
    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartLoads
        ,method:"get"
        ,data:{
            sid:_sid
        }
        ,dataType:"json"
        ,success:function(data){
            req.session['loads']=data;
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });
    _ajaxHelper.run(function(){

        res.send(_result);
    });
});
// 智能代维系统站点信息(总)
router.post('/v5_SmartGetStationAlarmInfoForPc', function(req, res, next) {

    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartGetStationAlarmInfoForPc
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
// 智能代维系统站点信息(前10)
router.post('/v5_SmartAlarmRanking', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartAlarmRanking
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
// 能耗分析
router.post('/v5_SmartTotalEnergy', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartTotalEnergy
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
router.post('/v5_SmartGetLoadDiagram', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartGetLoadDiagram
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
router.post('/v5_SmartPowerQualityCondition', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartPowerQualityCondition
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
router.post('/v5_SmartPowerQuality', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartPowerQuality
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
router.post('/v5_SmartBaseInfo', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartBaseInfo
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
// 用电概况-电费结构
router.post('/v5_SmartElectricityStructure', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartElectricityStructure
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
// 用电概况-功率因数
router.post('/v5_SmartPowerFactorList', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartPowerFactorList
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
// 用电概况-总概况
router.post('/v5_SmartElectricitySituation', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartElectricitySituation
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});

router.post('/changePassWord', function(req, res, next) {
    var _ajaxHelper=new WebRequestHelper(req);

    var _result={};
    var _paras=req.body;

    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.changePassWord
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
router.post('/whole', function(req, res, next) {
    var _ajaxHelper = new WebRequestHelper(req);
    var _result = {};
    var eti = (new Date()).getTime();//结束时间
    var start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    var sti = Date.parse(start);//开始时间
    var _paras = {};
    if (req.body.level == 0) {
         _paras = {
            sid: req.session.site,
            pageIndex: req.body.site,
            pageSize: 3,
            stime: sti,//开始
            etime: eti//结束
        };
    } else {
        _paras = {
            sid: req.session.site,
            pageIndex: req.body.site,
            pageSize: 3,
            level: req.body.level,
            stime: sti,//开始
            etime: eti//结束
        };
    }
    console.log(_paras);
    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartGetStationAlarmInfoForPc
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        var num=(_paras.pageIndex - 1)* _paras.pageSize;
        if(_result.total!=0){
            for (var i=0;i<_result.data.length;i++){
                var arr = _result.data[i];
                arr["mun"] = num;
                num ++
            }
        }

        res.send(_result);
    });

});
// 天气预报接口
router.post('/WeatherForecast', function(req, res, next) {
    var _ajaxHelper = new WebRequestHelper(req);
    var _result={};
    var _paras={
        location:"东莞",
        output:"json",
        ak:"AKVZHbd090K288gmMjN4IztFBeleu4kQ"
    };
    _ajaxHelper.addTask({
        url:Settings.WebApi.v5_SmartWeatherForecast
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){

        res.send(_result);
    });

});
// 大地图数据
router.post('/v5_SmartElectricityCloudIndex', function(req, res, next) {
    var _ajaxHelper = new WebRequestHelper(req);
    var _result={};
    var _paras=req.body;
    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartElectricityCloudIndex
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){

        res.send(_result);
    });

});
// 告警查询
router.post('/v5_SmartFindCurrentAlarm', function(req, res, next) {
    var _ajaxHelper = new WebRequestHelper(req);
    var _result={};
    var _paras=req.body;
    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartFindCurrentAlarm
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});

// 最大需量-变压器
router.post('/v5_SmartMaxDemand', function(req, res, next) {
    var _ajaxHelper = new WebRequestHelper(req);
    var _result={};
    var _paras=req.body;
    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartMaxDemand
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
// 最大需量-整点
router.post('/v5_SmartGetMomentLoad', function(req, res, next) {
    var _ajaxHelper = new WebRequestHelper(req);
    var _result={};
    var _paras=req.body;
    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartGetMomentLoad
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
// 用电负荷
router.post('/v5_SmartGetLoadStatisticsPC', function(req, res, next) {
    var _ajaxHelper = new WebRequestHelper(req);
    var _result={};
    var _paras=req.body;
    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartGetLoadStatisticsPC
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
// 获取用户站点信息
router.post('/v5_SmartStationList', function(req, res, next) {
    var _ajaxHelper = new WebRequestHelper(req);
    var _result={};
    var _paras=req.body;
    _ajaxHelper.addTask({
        url:ServerConf.ApiHost+Settings.WebApi.v5_SmartStationList
        ,method:"get"
        ,data:_paras
        ,dataType:"json"
        ,success:function(data){
            _result=data;
        }
        ,error:function(error){
            logger.error("数据获取失败 "+JSON.stringify(error));
        }
    });

    _ajaxHelper.run(function(){
        res.send(_result);
    });

});
module.exports = router;

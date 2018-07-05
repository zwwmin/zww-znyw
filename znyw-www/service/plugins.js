/**
 * Created by DGDL-08 on 2017/9/19.
 */
/**
 *全局需要用到的数据。封装一下。
 */
'use strict' //设置为严格模式
var request = require('request');
var Settings=require('../settings.js');
var ServerConf=require("../ServerConf");
var fs = require('fs');
var express = require('express');
var router = express.Router();
var logger = require('../util/logHelper.js').Logger;
var   Q   = require('q');
var Extend=require("util")._extend;
/*******注意，为了自动模拟php服务器的request并且发送带有session id的cookie，
 * 现在用WebRequestHelper代替RequestHelper，两者的区别在于，前者可以模拟cookie环境，并且自动发送带有session的cookie，后者没有。
 * 并且，后者会出现多个接口报请先登陆的错误。
 * ********/
var http = require('http');

var RequestHepler=require("../util/RequestHelper.js");
var WebRequestHelper=require("../util/WebRequestHelper");

var app={
    //--将原始的菜单数据转换一下。。
    txtMsg:function(toUser,fromUser,content){
        var xmlContent =  "<xml><ToUserName><![CDATA["+ toUser +"]]></ToUserName>";
        xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
        xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
        xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
        xmlContent += "<Content><![CDATA["+ content +"]]></Content></xml>";
        return xmlContent;
    },
    graphicMsg:function(toUser,fromUser,contentArr) {
        var xmlContent =  "<xml><ToUserName><![CDATA["+ toUser +"]]></ToUserName>";
        xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
        xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
        xmlContent += "<MsgType><![CDATA[news]]></MsgType>";
        xmlContent += "<ArticleCount>"+contentArr.length+"</ArticleCount>";
        xmlContent += "<Articles>";
        contentArr.map(function(item,index){
            xmlContent+="<item>";
            xmlContent+="<Title><![CDATA["+ item.Title +"]]></Title>";
            xmlContent+="<Description><![CDATA["+ item.Description +"]]></Description>";
            xmlContent+="<PicUrl><![CDATA["+ item.PicUrl +"]]></PicUrl>";
            xmlContent+="<Url><![CDATA["+ item.Url +"]]></Url>";
            xmlContent+="</item>";
        });
        xmlContent += "</Articles></xml>";
        return xmlContent;
    }
};
module.exports=app;

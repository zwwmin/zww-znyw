/**
 *全局需要用到的数据。封装一下。
 */
var request = require('request');
var Settings = require('../settings.js');
var ServerConf = require("../ServerConf");
var fs = require('fs');
var Q = require('q');
var Extend = require("util")._extend;
var RequestHepler = require("../util/RequestHelper.js");
var WebRequestHelper = require("../util/WebRequestHelper");
var util = require("../util/util.js");
//--cookie管理系统。
var CookieMgrSYSTEM = require("../util/CookieMgrSystem");
var AccountService = function (req, res) {
    var me = this;

    me.req = req;
    me.res = res;
}

AccountService.prototype.login = function (account, password, callback) {
    var me = this;
    var _post_data = {
        account: account
        , password: password
    };
    var _ajaxHelper = new WebRequestHelper(me.req);


    var _server_res = {};
    _ajaxHelper.addTask({
        url: ServerConf.ApiHost + Settings.WebApi.loginApi
        , data: _post_data
        , success: function (server_data) {
            _server_res = server_data;

            if (server_data.code == 0) {
                me.req.session.hasLogin = true;
                me.req.session.user = server_data.data;
                me.req.session["token"] = server_data.data.token;
                me.req.session["BaseInfo"] = false;
            }
        }
        , error: function () {
            _server_res = {code: -1, msg: "无法请求服务端"};
        }
    });
    _ajaxHelper.run(function () {
        callback(_server_res);
    });
};
AccountService.prototype.logout = function (callback) {
    var me = this;

    var _ajaxHelper = new WebRequestHelper(me.req);

    var result = {};
    var _server_res = {};
    _ajaxHelper.addTask({
        url: ServerConf.ApiHost + Settings.WebApi.loginOutApi
        , data: {}
        , method: "post"
        , success: function (data) {
            delete me.req.session;
            var _seid = "";
            if (me.req.session.user) {
                delete me.req.session.user;
            }
            if (me.req.session.sid) {
                _seid = me.req.session.sid;
                delete me.req.session.sid;
            }

            result = data;

            if (callback) {
                callback(result);
            }
            return;
            if (util.checkEmpty(_seid) == false) {
                CookieMgrSYSTEM.delSessionData(_seid, function () {
                    if (callback) {
                        callback();
                    }
                });

            }
            else {
                if (callback) {
                    callback();
                }
            }
            result = data;
        }
        , error: function (error) {
            logger.error(error);
        }
    });
    _ajaxHelper.run(function () {
        //me.res.setHeader('Content-Type',"text/html; charset=utf-8");
        // me.res.send(result);
        callback(result);
    });
};
module.exports = AccountService;

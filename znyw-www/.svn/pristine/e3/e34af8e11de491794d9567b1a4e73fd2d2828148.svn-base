/**
 * seajs模块各种配置。
 * */
;(function(){

    if(window.__seajs_modules==undefined){
        window.__seajs_modules=[];
    }
    var __real_alias={};
    for(var i=0;i<window.__seajs_modules.length;i++){
        var _i_item=window.__seajs_modules[i];
        for(var key in _i_item){
            var __val=_i_item[key];
            __real_alias[key]=__val;
        }
    }
    var config={

        /*
         * 定义通常变量路径之类的。
         * */

        vars : {

        },
        //--这是seajs的所有可引入模块。由grunt自动构建系统自动生成。
        alias: __real_alias
    };
    var alias = config.alias;

    seajs.config(config);
})();
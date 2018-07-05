/**
 * 这是自行定制的表单验证控件。网上的控件bug多，而且样式控制不灵活。没办法了。
 * 为什么不写成seajs？因为这个是全局的表单验证，而不是仅仅在seajs里面用的
 * 局部变量。
 * @edward
 * */

var formValidate={
    //--这个是default默认设置，你随时可以通过setDefault来改变这个变量的。
    defaultConfig:{
        showFocus:function(rulename,element,message,iptElement){

        }//显示提示信息时候执行这个方法。
        ,showError:function(rulename,element,message,iptElement){

        }//显示错误信息时候的显示方式。
        ,showSuccess:function(rulename,element,message,iptElement){

        }//显示成功信息时候的显示方式。
        //--清空所有提示信息的方法，这里定义，当然，系统会给你一个默认的实现方式的。rulenames表示当前所有规则的集合数组
        //elements表示这个所有提示元素的集合数组。
        ,clearTips:function(rulenames,elements,iptElements){

        }

    }
    ,setDefaultConfig:function(opts){
        var _this=this;
        _this.defaultConfig= $.extend({},_this.defaultConfig,opts);//这里是设置当前的默认规则。
    }
    ,init:function(opts){

        var _this=this;

        //--内部用的ajax任务列表。
        var ajaxQueue=function(theOpts){

            var aq_settings={
                queues:[] //任务列表
            };
            aq_settings= $.extend({},aq_settings,theOpts);

            var _aq_interval=null;

            var aq_return={
                run:function(callBack){
                    if(_aq_interval!=null){
                        //--已经执行了。。请等待。。
                        //console.log("ajaxQueue正在执行中。。请等待。");
                        return;
                    }


                    var aqInnerData={
                        index:0
                        ,isBusy:false
                        ,isComplete:false
                    };

                    if(aq_settings.queues==undefined||aq_settings.queues.length<=0){
                        //console.log("ajaxQueue error:queues没有任何任务。");
                        return;
                    }
                    var queueCtr={
                        _break:function(){
                            aqInnerData.isComplete=true;
                        }
                    };
                    _aq_interval=setInterval(function(){
                        if(aqInnerData.isBusy==true){
                            return;
                        }
                        if(aqInnerData.isComplete){
                            clearInterval(_aq_interval);
                            _aq_interval=null;
                            if(callBack){
                                callBack();
                            }
                            return;
                        }

                        aqInnerData.isBusy=true;
                        var _task=aq_settings.queues[aqInnerData.index];
                        var _i_paras={};
                        if(_task.inner_paras){
                            _i_paras=_task.inner_paras;
                        }

                        var _ajax_opts={
                            url:_task.url
                            ,data:_task.data==undefined?{}:_task.data
                            ,dataType:_task.dataType
                            ,method:_task.method==undefined?"get":_task.method

                            ,success:function(_resutl){

                                if(_task.success){
                                    _task.success(_resutl,queueCtr,_i_paras);
                                }
                                aqInnerData.isBusy=false;
                                if(aqInnerData.index>=aq_settings.queues.length){
                                    aqInnerData.isComplete=true;
                                }
                            }
                            ,error:function(){

                                if(_task.error){
                                    _task.error(queueCtr,_i_paras);
                                }
                                aqInnerData.isBusy=false;
                                if(aqInnerData.index>=aq_settings.queues.length){
                                    aqInnerData.isComplete=true;
                                }
                            }
                        };
                        $.ajax(_ajax_opts);
                        aqInnerData.index++;

                    },10);
                }
            };


            return aq_return;
        };

        //--这个是当前初始化的表单验证器的默认设置---优先级比默认设置要高。
        var _defaults={
            showFocus:function(rulename,element,message,iptElement){

            }//显示提示信息时候执行这个方法。
            ,showError:function(rulename,element,message,iptElement){

            }//显示错误信息时候的显示方式。
            ,showSuccess:function(rulename,element,message,iptElement){

            }//显示成功信息时候的显示方式。
            //--清空所有提示信息的方法，这里定义，当然，系统会给你一个默认的实现方式的。rulenames表示当前所有规则的集合数组
            //elements表示这个所有提示元素的集合数组。
            ,clearTips:function(rulenames,elements,iptElements){

            }
            //---
            ,validate:{} //这个是验证对象。。格式如下：
            /**
             * "username":{
            tipsElement:$("#userTips")
                ,getValue:function(){
                    return $("#username").val();
                }//这是获取当前值的方式，是因为每次输入框等的值都会变，那么就只能用这种方式来了---而且你永远不知道具体要验证对象的取值方式。像现在网上那种组件徒增麻烦。按照网上的做法，假如是一个var innerData={t1:'nihao'};这种值，那么应该如何验证呢。
               ,errorMsg:"" //错误信息，请注意，假如functionvalidate和ajaxvalidate返回的是false，那么直接用这个errorMsg，否则，将采用返回的字符串作为错误信息。
               ,successMsg:""
                ,functionValidate:function(theValue){
                    if(util.checkEmpty(theValue)){
                        return "请输入用户名称";
                    }
                    if(util.isAccountString_includeChinese(theValue)){
                        return "用户名称只允许普通英文字母及中文！";
                    }
                    return true;
                }//一个functionValidate--我就不提供那些什么的compareValidator，funcValidator了，直接写代码吧。
                ,ajaxValidate:[]
                 ajaxValidator:[{
url:""
data:""
dataType:""
success:function(){}
error:function(){}
}]
                 异步验证方式，
                 请注意，
                 这里虽然用的是异步，
                 但是这个方法参数是经过封装的，
                 就是为了准确知道获取到url信息的时机，
                 所以它并非直接传到ajaxjquery的。。
                 为了完成这个，在error后面返回的必定是false---假如你真要返回true让验证通过我也无话可说。
                 在success里面返回的是true或者false或者错误信息。为了让他们可以按照队形一步一步执行下去而又不会锁住浏览器，
                 我用了一个队列来执行这个方法，依次执行完各个方法，只要有一个验证不通过，那么后面的都不会执行，不通过了。
                 functionValidate会比ajaxValidate先执行，假如functionValidate通过，那么会继续验证ajaxValidate

            showFocus:function(rulename,element,message,iptElement){

            }//显示提示信息时候执行这个方法。
            ,showError:function(rulename,element,message,iptElement){

            }//显示错误信息时候的显示方式。
            ,showSuccess:function(rulename,element,message,iptElement){

            }//显示成功信息时候的显示方式。
            //--清空所有提示信息的方法，这里定义，当然，系统会给你一个默认的实现方式的。rulenames表示当前所有规则的集合数组
            //elements表示这个所有提示元素的集合数组。
            //--iptElements表示所有输入元素的合集。
            ,clearTips:function(rulenames,elements,iptElements){

            }
            //--注意，在validate上面再添加一个showFocus，showSuccess这些方式来自定义当前验证规则的错误提示方式。这样更加灵活可用。，
      */
        };
        //--显示方式优先级最高的是目前方法的opts，其次到全局的默认显示方式。
        _defaults= $.extend({},_defaults,_this.defaultConfig);
        _defaults= $.extend({},_defaults,opts);



        var returnObj={
            clearAllTips:function(){
                for(var key in _defaults.validate){
                    var item=_defaults.validate[key];
                    if(item!=undefined){
                        _defaults.clearTips(key,item.tipsElement,item.iptElement);
                    }
                }
            }//--清除所有验证样式和提示。


            ,showFocus:function(ruleName,msg){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                //--假如validate里面含有验证规则，那么优先级最先。
                if(item.showFocus!=undefined){
                    item.showFocus(ruleName,item.tipsElement,msg,item.iptElement);
                }
                else{
                    _defaults.showFocus(ruleName,item.tipsElement,msg,item.iptElement);
                }

            }
            ,showInfo:function(ruleName,msg){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                if(item.showFocus!=undefined){
                    item.showFocus(ruleName,item.tipsElement,msg,item.iptElement);
                }
                else{
                    _defaults.showFocus(ruleName,item.tipsElement,msg,item.iptElement);
                }
            }
            ,showSuccess:function(ruleName,msg){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                if(item.showSuccess!=undefined){
                    item.showSuccess(ruleName,item.tipsElement,msg,item.iptElement);
                }
                else{
                    _defaults.showSuccess(ruleName,item.tipsElement,msg,item.iptElement);
                }


            }
            ,showError:function(ruleName,msg){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                if(item.showError!=undefined){
                    item.showError(ruleName,item.tipsElement,msg,item.iptElement);
                }
                else{
                    _defaults.showError(ruleName,item.tipsElement,msg,item.iptElement);
                }

            }
            ,clearTips:function(ruleName){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                if(item.clearTips!=undefined){
                    item.clearTips(ruleName,item.tipsElement,item.iptElement);
                }
                else{
                    _defaults.clearTips(ruleName,item.tipsElement,item.iptElement);
                }

            }
            //--验证所有参数，验证成功或验证失败后会回调函数。
            ,validateAll:function(_innerOpts){
                var _child=this;
                var __innerSetting={
                    callback:function(validateRes){
                        //--validateRes是true或者false。
                    }
                };
                var ruleNames=[];
                for(var key in _defaults.validate){
                    ruleNames.push(key);
                }
                _child.validateMutiRules(ruleNames,_innerOpts);
            }
            //--验证多个规则。
            ,validateMutiRules:function(rules,_inneropts){


                var _child=this;
                var items=[];
                var innerSettings={
                    callback:function(){}
                };
                if(typeof(_inneropts)=="function"){
                    innerSettings.callback=function(){
                        _inneropts();
                    }
                }
                else{
                    innerSettings= $.extend({},innerSettings,_inneropts);
                }
                for(var ii=0;ii<rules.length;ii++){
                    var singleItem=_defaults.validate[rules[ii]];
                    if(singleItem==undefined){

                    }
                    else{
                        singleItem.taskName=rules[ii];
                        items.push(singleItem);
                    }
                }
                if(items.length<=0){
                    console.warn("任何需要验证的规则！！！！");
                    return;
                }
                //--内部用的任务列表执行器
                var taskQueue=function(theOpts){

                    var aq_settings={
                        queues:[] //任务列表
                    };
                    aq_settings= $.extend({},aq_settings,theOpts);

                    var m_aq_interval=null;

                    var aq_return={
                        run:function(callBack){
                            if(m_aq_interval!=null){
                                //--已经执行了。。请等待。。
                                console.warn("taskQueue正在执行中。。请等待。");
                                return;
                            }


                            var aqInnerData={
                                index:0
                                ,isBusy:false
                                ,isComplete:false
                            };

                            if(aq_settings.queues==undefined||aq_settings.queues.length<=0){
                                console.warn("ajaxQueue error:queues没有任何任务。");
                                return;
                            }
                            var _queueCtr={
                                _break:function(){
                                    aqInnerData.isComplete=true;
                                }
                                ,setBusy:function(trueOrFalse){
                                    aqInnerData.isBusy=trueOrFalse;
                                }
                                ,increase:function(){
                                    aqInnerData.index++;
                                    if(aqInnerData.index>=aq_settings.queues.length){
                                        aqInnerData.isComplete=true;
                                    }
                                }
                            };
                            m_aq_interval=setInterval(function(){
                                if(aqInnerData.isBusy==true){
                                    //console.log("muti interval控制器在忙。");
                                    return;
                                }
                                if(aqInnerData.isComplete){
                                    clearInterval(m_aq_interval);
                                    m_aq_interval=null;
                                    if(callBack){
                                        callBack();
                                    }
                                    return;
                                }

                                aqInnerData.isBusy=true;
                                var _task=aq_settings.queues[aqInnerData.index];
                                if(_task){
                                    var __data=_task.data;
                                    _task.run(_queueCtr,__data);
                                }
                            },20);
                        }
                    };


                    return aq_return;
                };
                var _queues=[];
                //--构造需要的队列参数。
                var __current_bool=true;
                for(var i2=0;i2<items.length;i2++ ){
                    _queues.push(
                        {
                            data:items[i2]
                            ,run:function(ctr,__data){
                            _child.validateRule(__data.taskName,function(result_res){
                                ctr.setBusy(false);
                                ctr.increase();
                                if(result_res){

                                }
                                else{
                                    __current_bool=false;
                                }
                            });
                        }
                        }
                    );
                }

                var _tqueue=taskQueue({
                    queues:_queues
                });
                _tqueue.run(function(){
                    if(innerSettings.callback){
                        innerSettings.callback(__current_bool);
                    }
                });


            }
            //--验证某个规则。
            ,validateRule:function(ruleName,__innerOpts){
                var me=this;
                var __innerSetting={
                    callback:function(validateRes){

                    }
                };
                if(typeof(__innerOpts)=="function"){
                    __innerSetting.callback=__innerOpts;
                }
                else{
                    __innerSetting= $.extend({},__innerSetting,__innerOpts);
                }
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }

                var __theValue=item.getValue();
                var __validate_result=true;

                //--假如没有functionValidate及ajaxValidate的话，那么就为默认成功。
                if(item.functionValidate==undefined&&(item.ajaxValdiate==undefined||item.ajaxValidate.length<=0)){
                    //_defaults.showSuccess(ruleName,item.tipsElement,item.successMsg,item.iptElement);
                    me.showSuccess(ruleName,item.successMsg);
                    if(__innerSetting.callback){
                        __innerSetting.callback(true);
                    }
                    return;
                }
                if(item.functionValidate!=undefined){
                    var res_bool=item.functionValidate(__theValue);
                    if(res_bool==false||typeof res_bool =="string"){
                        //--验证不通过。
                        var emsg=typeof(res_bool)=="string"?res_bool:item.errorMsg;
                        //_defaults.showError(ruleName,item.tipsElement,emsg,item.iptElement);
                        me.showError(ruleName,emsg);
                        if(__innerSetting.callback){
                            __innerSetting.callback(false);
                        }
                        return;
                    }
                    if(item.ajaxValidate==undefined||item.ajaxValidate.length<=0){
                        //_defaults.showSuccess(ruleName,item.tipsElement,item.successMsg,item.iptElement);
                        me.showSuccess(ruleName,item.successMsg);
                        if(__innerSetting.callback){
                            __innerSetting.callback(true);
                        }
                        return;
                    }
                }
                //--没有ajax的话，不验证。
                if(item.ajaxValidate==undefined||item.ajaxValidate.length<=0){
                    if(__innerSetting.callback){
                        __innerSetting.callback(true);
                    }

                    return;
                }
                //--构造 ajax 的queue的参数。
                var _queuelist=[];

                for(var ii=0;ii< item.ajaxValidate.length;ii++){
                    var _ajax_item=item.ajaxValidate[ii];

                    var _a_opt={
                        url:_ajax_item.url
                        ,inner_paras:$.extend({},_ajax_item) //这是传进去的参数啊。
                        ,data:_ajax_item.data==undefined?{}:(typeof(_ajax_item.data)=="function"?_ajax_item.data():_ajax_item.data)
                        ,dataType:_ajax_item.dataType
                        ,method:_ajax_item.method==undefined?"get":_ajax_item.method
                        ,success:function(_resutl,ctr,_inner_option){


                            if(_inner_option.success){
                                var bool_res2= _inner_option.success(_resutl);
                                if(bool_res2==false||typeof (bool_res2)=="string"){
                                    ctr._break();
                                    var emsg=item.errorMsg;
                                    if(typeof(bool_res2)=="string"){
                                        emsg=bool_res2;
                                    }
                                    __validate_result=false;
                                    //_defaults.showError(ruleName,item.tipsElement,emsg,item.iptElement);
                                    me.showError(ruleName,emsg);
                                    return;
                                }
                                else{

                                }
                            }
                            else{
                                ctr._break();
                                __validate_result=false;
                                //_defaults.showError(ruleName,item.tipsElement,item.errorMsg,item.iptElement);
                                me.showError(ruleName,item.errorMsg);
                                return;
                            }
                        }
                        ,error:function(ctr,__inner_option){
                            if(__inner_option.error){
                                var bool_res2= __inner_option.error();
                                if(bool_res2==false||typeof (bool_res2)=="string"){
                                    ctr._break();
                                    var emsg=item.errorMsg;
                                    if(typeof(bool_res2)=="string"){
                                        emsg=bool_res2;
                                    }
                                    __validate_result=false;
                                    //_defaults.showError(ruleName,item.tipsElement,emsg,item.iptElement);
                                    me.showError(ruleName,emsg);
                                    return;
                                }
                                else{

                                }
                            }
                            else{
                                ctr._break();
                                __validate_result=false;
                                //
                                //_defaults.showError(ruleName,item.tipsElement,__inner_option.url+"无法响应.");
                                me.showError(ruleName,__inner_option.url+"无法响应.");
                                return;
                            }
                        }
                    };
                    _queuelist.push(_a_opt);
                }
                var _aqQueue=ajaxQueue({
                    queues:_queuelist
                });

                _aqQueue.run(function(){
                    if(__validate_result==true){
                        _defaults.showSuccess(ruleName,item.tipsElement,item.successMsg,item.iptElement);
                    }
                    if(__innerSetting.callback){
                        __innerSetting.callback(__validate_result);
                    }
                });

            }
        };


        return returnObj;

    }
};
//--同步版本，该版本摈弃了ajax里面的异步请求，都改成同步了。
var formValidateSync={
    //--这个是default默认设置，你随时可以通过setDefault来改变这个变量的。
    defaultConfig:{
        showFocus:function(rulename,element,message,iptElement){

        }//显示提示信息时候执行这个方法。
        ,showError:function(rulename,element,message,iptElement){

        }//显示错误信息时候的显示方式。
        ,showSuccess:function(rulename,element,message,iptElement){

        }//显示成功信息时候的显示方式。
        //--清空所有提示信息的方法，这里定义，当然，系统会给你一个默认的实现方式的。rulenames表示当前所有规则的集合数组
        //elements表示这个所有提示元素的集合数组。
        ,clearTips:function(rulenames,elements,iptElements){

        }

    }
    ,setDefaultConfig:function(opts){
        var _this=this;
        _this.defaultConfig= $.extend({},_this.defaultConfig,opts);//这里是设置当前的默认规则。
    }
    ,init:function(opts){

        var _this=this;



        //--这个是当前初始化的表单验证器的默认设置---优先级比默认设置要高。
        var _defaults={
            showFocus:function(rulename,element,message,iptElement){

            }//显示提示信息时候执行这个方法。
            ,showError:function(rulename,element,message,iptElement){

            }//显示错误信息时候的显示方式。
            ,showSuccess:function(rulename,element,message,iptElement){

            }//显示成功信息时候的显示方式。
            //--清空所有提示信息的方法，这里定义，当然，系统会给你一个默认的实现方式的。rulenames表示当前所有规则的集合数组
            //elements表示这个所有提示元素的集合数组。
            //--iptElements表示所有输入元素的合集。
            ,clearTips:function(rulenames,elements,iptElements){

            }
            //---
            ,validate:{

            } //这个是验证对象。。格式如下：
            /**
             * "username":{
            tipsElement:$("#userTips")
            ,iptElement:$("#txt_username")
                ,getValue:function(){
                    return $("#username").val();
                }//这是获取当前值的方式，是因为每次输入框等的值都会变，那么就只能用这种方式来了---而且你永远不知道具体要验证对象的取值方式。像现在网上那种组件徒增麻烦。按照网上的做法，假如是一个var innerData={t1:'nihao'};这种值，那么应该如何验证呢。
               ,errorMsg:"" //错误信息，请注意，假如functionvalidate和ajaxvalidate返回的是false，那么直接用这个errorMsg，否则，将采用返回的字符串作为错误信息。
               ,successMsg:""
                ,functionValidate:function(theValue){
                    if(util.checkEmpty(theValue)){
                        return "请输入用户名称";
                    }
                    if(util.isAccountString_includeChinese(theValue)){
                        return "用户名称只允许普通英文字母及中文！";
                    }
                    return true;
                }//一个functionValidate--我就不提供那些什么的compareValidator，funcValidator了，直接写代码吧。
                ,ajaxValidate:[]
                 ajaxValidator:[{
url:""
data:""
dataType:""
success:function(){}
error:function(){}
}]
                 异步验证方式，
                 请注意，
                 这里虽然用的是异步，
                 但是这个方法参数是经过封装的，
                 就是为了准确知道获取到url信息的时机，
                 所以它并非直接传到ajaxjquery的。。
                 为了完成这个，在error后面返回的必定是false---假如你真要返回true让验证通过我也无话可说。
                 在success里面返回的是true或者false或者错误信息。为了让他们可以按照队形一步一步执行下去而又不会锁住浏览器，
                 我用了一个队列来执行这个方法，依次执行完各个方法，只要有一个验证不通过，那么后面的都不会执行，不通过了。
                 functionValidate会比ajaxValidate先执行，假如functionValidate通过，那么会继续验证ajaxValidate
            showFocus:function(rulename,element,message,iptElement){

            }//显示提示信息时候执行这个方法。
            ,showError:function(rulename,element,message,iptElement){

            }//显示错误信息时候的显示方式。
            ,showSuccess:function(rulename,element,message,iptElement){

            }//显示成功信息时候的显示方式。
            //--清空所有提示信息的方法，这里定义，当然，系统会给你一个默认的实现方式的。rulenames表示当前所有规则的集合数组
            //elements表示这个所有提示元素的集合数组。
            //--iptElements表示所有输入元素的合集。
            ,clearTips:function(rulenames,elements,iptElements){

            }
            //--注意，在validate上面再添加一个showFocus，showSuccess这些方式来自定义当前验证规则的错误提示方式。这样更加灵活可用。，
      */
        };
        //--显示方式优先级最高的是目前方法的opts，其次到全局的默认显示方式。
        _defaults= $.extend({},_defaults,_this.defaultConfig);
        _defaults= $.extend({},_defaults,opts);



        var returnObj={
            clearAllTips:function(){
                for(var key in _defaults.validate){
                    var item=_defaults.validate[key];
                    if(item!=undefined){
                        _defaults.clearTips(key,item.tipsElement,item.iptElement);
                    }
                }
            }//--清除所有验证样式和提示。


            ,showFocus:function(ruleName,msg){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                //--假如validate里面含有验证规则，那么优先级最先。
                if(item.showFocus!=undefined){
                    item.showFocus(ruleName,item.tipsElement,msg,item.iptElement);
                }
                else{
                    _defaults.showFocus(ruleName,item.tipsElement,msg,item.iptElement);
                }

            }
            ,showInfo:function(ruleName,msg){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                if(item.showFocus!=undefined){
                    item.showFocus(ruleName,item.tipsElement,msg,item.iptElement);
                }
                else{
                    _defaults.showFocus(ruleName,item.tipsElement,msg,item.iptElement);
                }
            }
            ,showSuccess:function(ruleName,msg){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                if(item.showSuccess!=undefined){
                    item.showSuccess(ruleName,item.tipsElement,msg,item.iptElement);
                }
                else{
                    _defaults.showSuccess(ruleName,item.tipsElement,msg,item.iptElement);
                }


            }
            ,showError:function(ruleName,msg){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                if(item.showError!=undefined){
                    item.showError(ruleName,item.tipsElement,msg,item.iptElement);
                }
                else{
                    _defaults.showError(ruleName,item.tipsElement,msg,item.iptElement);
                }

            }
            ,clearTips:function(ruleName){
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return;
                }
                if(item.clearTips!=undefined){
                    item.clearTips(ruleName,item.tipsElement,item.iptElement);
                }
                else{
                    _defaults.clearTips(ruleName,item.tipsElement,item.iptElement);
                }

            }
            //--验证所有参数，验证成功或验证失败后会回调函数。
            ,validateAll:function(){
                var _child=this;
                var ruleNames=[];
                for(var key in _defaults.validate){
                    ruleNames.push(key);
                }
                return _child.validateMutiRules(ruleNames);
            }
            //--验证多个规则。
            ,validateMutiRules:function(rules){
                var _child=this;
                var items=[];

                for(var ii=0;ii<rules.length;ii++){
                    var singleItem=_defaults.validate[rules[ii]];
                    if(singleItem==undefined){

                    }
                    else{
                        singleItem.taskName=rules[ii];
                        items.push(singleItem);
                    }
                }
                if(items.length<=0){
                    console.warn("任何需要验证的规则！！！！");
                    return;
                }
                //--内部用的任务列表执行器

                var _queues=[];
                //--构造需要的队列参数。
                var __current_bool=true;
                for(var i2=0;i2<items.length;i2++ ){
                    if(_child.validateRule(items[i2].taskName)==false){
                        __current_bool=false;
                    }
                }
                return __current_bool;
            }
            //--验证某个规则。
            ,validateRule:function(ruleName){

                var me=this;
                var item=_defaults.validate[ruleName];
                if(item==undefined){
                    return false;
                }

                var __theValue=item.getValue();
                var __validate_result=true;

                //--假如没有functionValidate及ajaxValidate的话，那么就为默认成功。
                if(item.functionValidate==undefined&&(item.ajaxValdiate==undefined||item.ajaxValidate.length<=0)){
                    _defaults.showSuccess(ruleName,item.tipsElement,item.successMsg,item.iptElement);
                    return true;
                }
                if(item.functionValidate!=undefined){
                    var res_bool=item.functionValidate(__theValue);
                    if(res_bool==false||typeof res_bool =="string"){
                        //--验证不通过。
                        var emsg=typeof(res_bool)=="string"?res_bool:item.errorMsg;
                        //_defaults.showError(ruleName,item.tipsElement,emsg,item.iptElement);
                        me.showError(ruleName,emsg);
                        return false;
                    }
                    if(item.ajaxValidate==undefined||item.ajaxValidate.length<=0){
                        //_defaults.showSuccess(ruleName,item.tipsElement,item.successMsg,item.iptElement);
                        me.showSuccess(ruleName,item.successMsg);
                        return true;
                    }
                }
                //--没有ajax的话，不验证。
                if(item.ajaxValidate==undefined||item.ajaxValidate.length<=0){
                    return true;
                }
                //--构造 ajax 的queue的参数。
                var _queuelist=[];
                var _f_result=true;

                for(var ii=0;ii< item.ajaxValidate.length;ii++){
                    if(__validate_result==false){
                        break;
                    }
                    var _ajax_item=item.ajaxValidate[ii];

                    var _a_opt={
                        url:_ajax_item.url
                        ,inner_paras:$.extend({},_ajax_item) //这是传进去的参数啊。
                        ,data:_ajax_item.data==undefined?{}:(typeof(_ajax_item.data)=="function"?_ajax_item.data():_ajax_item.data)
                        ,dataType:_ajax_item.dataType
                        ,method:_ajax_item.method==undefined?"get":_ajax_item.method
                        ,async:false
                        ,success:function(_resutl,ctr,_inner_option){
                            if(_inner_option.success){
                                var bool_res2= _inner_option.success(_resutl);
                                if(bool_res2==false||typeof (bool_res2)=="string"){
                                    // ctr.break();
                                    var emsg=item.errorMsg;
                                    if(typeof(bool_res2)=="string"){
                                        emsg=bool_res2;
                                    }
                                    __validate_result=false;
                                    //_defaults.showError(ruleName,item.tipsElement,emsg,item.iptElement);
                                    me.showError(ruleName,emsg);

                                    _f_result=false;
                                }
                                else{

                                }
                            }
                            else{
                                // ctr.break();
                                __validate_result=false;
                               // _defaults.showError(ruleName,item.tipsElement,item.errorMsg,item.iptElement);
                                me.showError(ruleName,item.errorMsg);
                                _f_result=false;
                            }
                        }
                        ,error:function(ctr,__inner_option){
                            if(__inner_option.error){
                                var bool_res2= __inner_option.error();
                                if(bool_res2==false||typeof (bool_res2)=="string"){
                                    //ctr.break();
                                    var emsg=item.errorMsg;
                                    if(typeof(bool_res2)=="string"){
                                        emsg=bool_res2;
                                    }
                                    __validate_result=false;

                                    //_defaults.showError(ruleName,item.tipsElement,emsg,item.iptElement);
                                    me.showError(ruleName,emsg);
                                }
                                else{

                                }
                            }
                            else{
                                // ctr.break();
                                __validate_result=false;
                                //
                                //_defaults.showError(ruleName,item.tipsElement,__inner_option.url+"无法响应.");
                                me.showError(ruleName,__inner_option.url+"无法响应.");
                            }
                        }
                    };
                    _queuelist.push(_a_opt);
                    $.ajax(_a_opt);
                }
                return __validate_result;
            }
        };


        return returnObj;

    }
};



/**
 * 注册页面逻辑。
 */
define("p.login",function(require,exports,module){

    var settings={};
    var reg_area=$("#reg-area");
    var ipt_account=reg_area.find('[name="account"]');
    var ipt_password=reg_area.find('[name="password"]');
    var btn_submit=$("#btn-submit");
    var lcbox_remember=$("#lcbox-remember");
    var drag=$("#drag");
    var btn_send=$("#btn-verify-code");

    var _all=require("p.all");


    var app={
        init:function(opts){
            $.extend(settings,opts);
            var me=this;
            // me.initFormUI();
            me.initEvents();
        }
        ,initFormUI:function(){
            // --添加对记住账号功能。
            if(localStorage.getItem("my_account_name")!=null){
                //ltxt_mobile.css('visibility',"hidden");
                setTimeout(function(){
                    ipt_account.removeClass('placeholder');
                    ipt_account.val(localStorage.getItem("my_account_name"));
                    //ltxt_mobile.css('visibility',"visible");
                },1000);
                lcbox_remember.prop("checked",true);
            }

        }
        ,initEvents:function(){
            var me=this;
            var sending=false;
            $(window).keydown(function(e){
                if(e.keyCode==13){
                    btn_submit.trigger('click');
                }
            });
            btn_submit.on('click',function(){
                var index = layer.load(1);

                $.ajax({
                    url:"/login"
                    ,data:$("#form").serialize()
                    ,method:"post"
                    ,success:function(sdata){

                        if(sdata.code!=0){
                           alert(sdata.message);
                            layer.close(layer.index);
                            return;
                        }
                        me.StationList();
                        return
                        var _url = "/user/";
                        // if (queryObject["from"]) {
                        //     _url = queryObject["from"];
                        // }
                        // if (history.replaceState) {
                        //     history.replaceState("", "", _url);
                        //     location.reload();
                        // }
                        // else {
                            location.href = _url;
                        // }
                    }
                    ,error:function(){

                    }
                });
            });
        }
        ,StationList:function () {
            $.ajax({
                url:"/user/v5_SmartStationList"
                ,data:{}
                ,method:"post"
                ,success:function(sdata){
                    if(sdata.data.length>1){
                        var _url = "/user/mappage";
                        location.href = _url;
                    }else {
                        var _url = "/user/";
                        location.href = _url;
                    }
                    return
                    if(sdata.code!=0){
                        alert(sdata.message);
                        return;
                    }
                    // var _url = "/user/";
                    // if (queryObject["from"]) {
                    //     _url = queryObject["from"];
                    // }
                    // if (history.replaceState) {
                    //     history.replaceState("", "", _url);
                    //     location.reload();
                    // }
                    // else {
                    // location.href = _url;
                    // }
                }
                ,error:function(){

                }
            });
        }
    };
    module.exports=app;
});

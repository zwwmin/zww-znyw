function WebUI(){

}
//--遮罩层。
WebUI.prototype.createMask=function(){
    var _mask=$('<div class="dark_bg"  style="display: none;"></div>');
    $(document.body).append(_mask);
    return _mask;
}
WebUI.prototype.showConfirm=function(opts){
    var iSettings={
        title:"提示"
        ,message:""
        ,smallMessage:""
        ,confirmText:"确定"
        ,cancelText:"取消"
        ,showConfirm:true
        ,showCancel:true
        ,onConfirm:function(){
            returnObject.close();
        }
        ,onCancel:function(){
            returnObject.close();
        }
        ,onClose:function(){

        }
        ,showClose:true
    };
    $.extend(iSettings,opts);
    var _mask=this.createMask();
    _mask.show();
    var _tpl=new EJS({url:'/res/template/confirm_box.ejs'});
    var _root_=$(_tpl.render({data:iSettings}));
    var btn_cancel=_root_.find('[ui="btn-cancel"]');
    var btn_confirm=_root_.find('[ui="btn-confirm"]');
    var btn_close=_root_.find('[ui="btn-close"]');

    btn_cancel.click(function(){
       iSettings.onCancel();
    });
    btn_confirm.click(function(){
        iSettings.onConfirm();
    });
    btn_close.click(function(){
        returnObject.close();
    });
    $(document.body).append(_root_);
    _root_.show();
    var returnObject={
        close:function(){
            _root_.remove();
            _mask.remove();
        }
        ,getRoot:function(){
            return _root_;
        }
    };

    return returnObject;
}


WebUI.prototype.showError=function(opts){
    var iSettings={
        title:"提示"
        ,message:""
        ,smallMessage:""
        ,confirmText:"确定"
        ,cancelText:"取消"
        ,showConfirm:true
        ,showCancel:true
        ,onConfirm:function(){
            returnObject.close();
        }
        ,onCancel:function(){
            returnObject.close();
        }
        ,onClose:function(){

        }
        ,showClose:true
    };
    $.extend(iSettings,opts);
    var _mask=this.createMask();
    _mask.show();
    var _tpl=new EJS({url:'/res/template/error_box.ejs'});
    var _root_=$(_tpl.render({data:iSettings}));
    var btn_cancel=_root_.find('[ui="btn-cancel"]');
    var btn_confirm=_root_.find('[ui="btn-confirm"]');
    var btn_close=_root_.find('[ui="btn-close"]');

    btn_cancel.click(function(){
        iSettings.onCancel();
    });
    btn_confirm.click(function(){
        iSettings.onConfirm();
    });
    btn_close.click(function(){
        returnObject.close();
    });
    $(document.body).append(_root_);
    _root_.show();
    var returnObject={
        close:function(){
            _root_.remove();
            _mask.remove();
        }
        ,getRoot:function(){
            return _root_;
        }
    };

    return returnObject;
}


WebUI.prototype.showSuccess=function(opts){
    var iSettings={
        title:"提示"
        ,message:""
        ,smallMessage:""
        ,confirmText:"确定"
        ,cancelText:"取消"
        ,showConfirm:true
        ,showCancel:true
        ,onConfirm:function(){
            returnObject.close();
        }
        ,onCancel:function(){
            returnObject.close();
        }
        ,onClose:function(){

        }
        ,showClose:true
    };
    $.extend(iSettings,opts);
    var _mask=this.createMask();
    _mask.show();
    var _tpl=new EJS({url:'/res/template/success_box.ejs'});
    var _root_=$(_tpl.render({data:iSettings}));
    var btn_cancel=_root_.find('[ui="btn-cancel"]');
    var btn_confirm=_root_.find('[ui="btn-confirm"]');
    var btn_close=_root_.find('[ui="btn-close"]');

    btn_cancel.click(function(){
        iSettings.onCancel();
    });
    btn_confirm.click(function(){
        iSettings.onConfirm();
    });
    btn_close.click(function(){
        returnObject.close();
    });
    $(document.body).append(_root_);
    _root_.show();
    var returnObject={
        close:function(){
            _root_.remove();
            _mask.remove();
        }
        ,getRoot:function(){
            return _root_;
        }
    };

    return returnObject;
}

WebUI.prototype.showDialog=function(opts){
    var iSettings={
        title:"提示"
        ,message:""
        ,smallMessage:""
        ,confirmText:"确定"
        ,cancelText:"取消"
        ,showConfirm:true
        ,showCancel:true
        ,onConfirm:function(){
            returnObject.close();
        }
        ,onCancel:function(){
            returnObject.close();
        }
        ,onClose:function(){

        }
        ,showClose:true
    };
    $.extend(iSettings,opts);
    var _mask=this.createMask();
    _mask.show();
    var _tpl=new EJS({url:'/res/template/dialog_box.ejs'});
    var _root_=$(_tpl.render({data:iSettings}));
    var btn_cancel=_root_.find('[ui="btn-cancel"]');
    var btn_confirm=_root_.find('[ui="btn-confirm"]');
    var btn_close=_root_.find('[ui="btn-close"]');

    btn_cancel.click(function(){
        iSettings.onCancel();
    });
    btn_confirm.click(function(){
        iSettings.onConfirm();
    });
    btn_close.click(function(){
        returnObject.close();
    });
    $(document.body).append(_root_);
    _root_.show();
    var returnObject={
        close:function(){
            _root_.remove();
            _mask.remove();
        }
        ,getRoot:function(){
            return _root_;
        }
    };

    return returnObject;
}


//--生成empty的html。
WebUI.prototype.createEmptyPanel=function(opts){
    var _i_settings={

        message:""
    };
    $.extend(_i_settings,opts);

    var tpl=new EJS({url:"/res/template/no_data.ejs"});
    var _data={
        data:{
            message:_i_settings.message
        }
    };
    var _html=tpl.render(_data);
    return _html;
}

WebUI.prototype.createLoading=function(opts){
    var _i_settings={

        message:""
    };
    $.extend(_i_settings,opts);

    var tpl=new EJS({url:"/res/template/loading.ejs"});
    var _data={
        data:{
            message:_i_settings.message
        }
    };
    var _html=tpl.render(_data);
    return _html;
}

WebUI.prototype.showTips=function(opts){
    var iSettings={
        message:"提示"
        ,showTime:2000
        ,callback:function(){

        }
    };
    $.extend(iSettings,opts);
    var _mask=this.createMask();
    _mask.show();
    var _tpl=new EJS({url:'/res/template/bld_tips.ejs'});
    var _root_=$(_tpl.render({data:iSettings}));

    $(document.body).append(_root_);
    _root_.fadeIn();

    setTimeout(function(){
        _root_.fadeOut();
        iSettings.callback();
    }, iSettings.showTime);

    return _root_;
}
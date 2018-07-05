var OrderCollection={
    getCollectionList:function(callback){
        $.ajax({
            url:"/user/collectionList"
            ,data:{}
            ,method:"get"
            ,success:function(sdata){
                if(callback){
                    callback(sdata);
                }
            }

        });
    }
    ,del:function(codes,callback){
        var webUI=new WebUI();
        $.ajax({
            url:"/user/collectionDelete"
            ,data:{
                codes:codes
            }
            ,method:"get"
            ,error:function(){
                webUI.showError({
                    title:"服务端错误"
                    ,message:"服务端无法访问"
                    ,smallMessage:""
                    ,confirmText:"确定"
                    ,cancelText:"取消"
                    ,showConfirm:true
                    ,showCancel:true
                });
            }
            ,success:function(sdata){
                if(callback){
                    callback(sdata);
                }
            }
        });
    }
    ,delByCode:function(code,callback){
        var webUI=new WebUI();
        $.ajax({
            url:"/user/collectionDelByCode"
            ,data:{
                productcode:code
            }
            ,method:"get"
            ,error:function(){
                webUI.showError({
                    title:"服务端错误"
                    ,message:"服务端无法访问"
                    ,smallMessage:""
                    ,confirmText:"确定"
                    ,cancelText:"取消"
                    ,showConfirm:true
                    ,showCancel:true
                });
            }
            ,success:function(sdata){
                if(callback){
                    callback(sdata);
                }
            }
        });
    }
    ,add:function(productcode,callback){
        var webUI=new WebUI();
        $.ajax({
            url:"/user/collectionAdd"
            ,data:{
                productcode:productcode
            }
            ,method:"get"
            ,success:function(sdata){

                if(callback){
                    callback(sdata);
                }

            }
            ,error:function(){
                var _dialog=webUI.showError({
                    title:"服务端异常"
                    ,message:"服务端返回数据异常"
                    ,onOk:function(){
                        _dialog.close();
                    }
                });
            }
        });
    }
    ,addAndSetCollection:function(productcode,val,callback,callback_error){
        var me=this;
        var webUI=new WebUI();
        me.add(productcode,val,function(sdata){
            if(sdata.state==false){
                var _dialog=webUI.showError({
                    title:"加入失败"
                    ,message:sdata.message
                    ,onOk:function(){
                        _dialog.close();
                    }
                });
                if(callback_error){
                    callback_error();
                }

                return;
            }
        });
    }

};

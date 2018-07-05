var OrderCart={
    getCartList:function(callback){
        var me=this;
        var _r=new Date().getTime();
        $.ajax({
            url:"/api/cartList"
            ,data:{
                r:_r
            }
            ,method:"get"
            ,success:function(sdata){
                //--没办法，后台加了价格区间，为了方便起见，现在每次加载都自行处理一下价格数据吧。
                //--好了，处理一下价格区间，因为要显示具体价格，搞不好还要计算的。
                if(sdata.list&&sdata.list.length>0){
                    for(var i=0;i< sdata.list.length;i++){
                        var _pitem=sdata.list[i];
                        if(_pitem.prices&&_pitem.prices.length>0){
                            _pitem.prices.sort(function(a,b){ return a.batchnum-b.batchnum;});

                            //--好了，现在来计算真正的
                            _pitem.now_product_price=me.getPriceByNumber(_pitem.productNumber,_pitem.prices);
                            _pitem.min_sell_number=me.getMinSellNumber(_pitem.prices);

                        }
                    }
                }
                if(callback){
                    callback(sdata);
                }
            }
        });
    }
    //--根据数量获得价格
    ,getPriceByNumber:function(num,prices){
        var _now_index=-1;
        if(prices==undefined){

            return 0;
        }
        for(var i=0;i< prices.length;i++){
            var _price_item=prices[i];
            if(num>=_price_item.batchnum){
                _now_index=i;
            }
        }

        if(_now_index==-1){
            return 0;
        }
        return prices[_now_index].price;
    }
    //--获得最小批发数量。
    ,getMinSellNumber:function(prices){
        var _now_index=0;
        if(prices==undefined||prices.length<=0){

            return 0;
        }

        return prices[_now_index].batchnum;
    }
    ,del:function(codes,callback){
        var webUI=new WebUI();
        var _r=new Date().getTime();
        $.ajax({
            url:"/api/cartDel"
            ,data:{
                codes:codes
                ,r:_r
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
    ,add:function(productcode,val,callback){
        var webUI=new WebUI();
        var _r=new Date().getTime();
        $.ajax({
            url:"/api/addCart"
            ,data:{
                productcode:productcode
                ,productnum:val
                ,r:_r
            }
            ,method:"post"
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
    ,addBatch:function(arrs,callback){
        var webUI=new WebUI();
        var _r=new Date().getTime();
        $.ajax({
            url:"/api/addCartBatch"
            ,data:{
                items:JSON.stringify(arrs)
                ,r:_r
            }
            ,method:"post"
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
    ,addAndSetCart:function(productcode,val,callback,callback_error){
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
            me.change(productcode,val,function(sdata2){

                if(sdata2.state==false){
                    if(callback_error){
                        callback_error();
                    }
                    var _dialog=webUI.showError({
                        title:"无法修改数量。"
                        ,message:sdata.message
                        ,onOk:function(){
                            _dialog.close();
                        }
                    });
                    return;
                }
                if(callback){
                    callback();
                }
            });
        });
    }
    ,buyRightNow:function(productcode){
        var me=this;
        var __dialog=dialog({

        });
        __dialog.showModal();
        me.addAndSetCart(productcode,1,
            function(sdata){
                setTimeout(function(){
                    __dialog.close();
                    location.href="/orderConfirm?codes="+productcode
                },500);
            },function(){
                setTimeout(function(){
                    __dialog.close();
                },500);
            }
        );
    }
    ,change:function(productcode,val,callback){
        var webUI=new WebUI();
        var _r=new Date().getTime();
        $.ajax({
            url:"/api/cartChangeNum"
            ,data:{
                productcode:productcode
                ,productnum:val
                ,r:_r
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
    ,calPrice:function(items,selectedCoupon,selectedCash,callback){
        var webUI=new WebUI();
        var _r=new Date().getTime();
        $.ajax({
            url:"/api/orderCalPrice"
            ,data:{
                items:JSON.stringify(items)
                ,selectedcoupon:selectedCoupon?selectedCoupon:""
                ,selectedcash:selectedCash?selectedCash:""
                ,r:_r
            }
            ,method:"post"
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
};

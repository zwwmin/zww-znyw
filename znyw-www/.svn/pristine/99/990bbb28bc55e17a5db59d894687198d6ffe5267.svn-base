function iPager(_opts){
    var me=this;
    me.settings={
        totalPages:20
        ,currentPage:5
        ,maxShowNum:10
        ,tpl:"/res/template/pager.ejs"//模板路径。

        ,container:""

        ,onRender:function(eles){

        }
    };

    $.extend(me.settings,_opts);

    me._root_=$(me.settings.container);
    me._tpl=new EJS({url:me.settings.tpl});


    var renderData={
        totalPages:me.settings.totalPages
        ,currentPage:me.settings.currentPage
        ,maxShowNum:me.settings.maxShowNum
    };
    //--计算分页相关数据。
    function _calculate_pager_data_tmp(){
        var _begin_num=1;
        var _end_num=me.settings.totalPages;
        if(me.settings.totalPages<=me.settings.maxShowNum){
        }
        else{
            var _middle_num=parseInt(me.settings.maxShowNum/2);
            if(me.settings.currentPage< _middle_num){
                _begin_num=1;
            }
            else{
                _begin_num=me.settings.currentPage-_middle_num;
            }

            if(me.settings.currentPage+_middle_num>me.settings.totalPages){
                _end_num=me.settings.totalPages;

            }
            else{
                _end_num=me.settings.currentPage+_middle_num;
            }
            if(_end_num-_begin_num<me.settings.maxShowNum){
                var _delta=me.settings.maxShowNum-(_end_num-_begin_num);
                if(_begin_num<=1){
                    if(_end_num+_delta>me.settings.totalPages){
                        _end_num=me.settings.totalPages;
                    }
                    else{
                        _end_num=_end_num+_delta;
                    }
                }
                else if(_begin_num-_delta>=1){
                    _begin_num=_begin_num-_delta;
                }
                else{
                    var _other_delta=Math.abs(_begin_num-_delta);
                    _begin_num=1;
                    if(_other_delta+_end_num>me.settings.totalPages){
                        _end_num=me.settings.totalPages;
                    }
                    else{
                        _end_num=_end_num+_other_delta;
                    }

                }

            }

        }

        return {
            begin:_begin_num
            ,end:_end_num
        };
    }
    function _calculate_pager_data(){

        var _totalPages=me.settings.totalPages;
        var _page=me.settings.currentPage;
        _totalPages=parseInt(_totalPages);
        _page=parseInt(_page);
        var _maxShowNum=me.settings.maxShowNum;
        _maxShowNum=parseInt(_maxShowNum);


//--是否需要显示省略号。
        var _showDots=false;
        if(_page>=_totalPages){
            _page=_totalPages;
        }
        var _begin_num=_page;
        var _end_num=_totalPages;
        var _middle_num=-1;


        var _current_show_num=_end_num-_begin_num+1;
        var _delt_show_num=_maxShowNum-_current_show_num;
        if(_delt_show_num<0){
            _middle_num=_maxShowNum-1+_begin_num;
            _showDots=true;
        }
        else{
            _showDots=false;
            _middle_num=_end_num;
            if(_end_num>_maxShowNum){
                _begin_num=_end_num-_maxShowNum;
            }
            else{
                _begin_num=1;
            }
        }

        return {
            showDots:_showDots
            ,totalPages:_totalPages
            ,currentPage:_page
            ,middleNum:_middle_num
            ,beginNum:_begin_num
            ,endNum:_end_num
            ,maxShowNum:_maxShowNum
        };
    }
    var _pager_cal_data=_calculate_pager_data();
    //console.log(_pager_cal_data);
    //$.extend(renderData,_pager_cal_data);
    //console.log(renderData);
    var _html= me._tpl.render({data:_pager_cal_data});
    var _els=$(_html);

    me._root_.empty().append(_els);

    var _returnObj={
        setPageNumInput:function(jqElement,onEnterPress){
            //num_select_val.unbind("blur").blur();
            var _child=this;
            var _do_enter=false;
            $(jqElement)[0].onkeypress=function(event){
                var keyCode = event.keyCode;
                if(event.keyCode==13){

                    if(_do_enter){
                        return;
                    }
                    _do_enter=false;
                    setTimeout(function(){
                        _do_enter=false;
                    },500);
                    setTimeout(function(){
                        if(onEnterPress){
                            onEnterPress();
                        }
                    },200);
                    return;
                }
                if ((keyCode >= 48 && keyCode <= 57))
                {
                    event.returnValue = true;
                } else {
                    event.returnValue = false;
                }
            };//--数字输入。
            $(jqElement).unbind("blur").blur(function(){
                var _val=$(jqElement).val();
                _val=parseInt(_val);
                if(isNaN(_val)){
                    $(jqElement).val(1);
                    return;
                }
                if(_val<1){
                    $(jqElement).val(1);
                    return;
                }
                if(_val>me.settings.totalPages){
                    $(jqElement).val(me.settings.totalPages);
                    return;
                }

            });

        }
    };
    setTimeout(function(){
        me.settings.onRender(_els);
    },100);
    return _returnObj;


}
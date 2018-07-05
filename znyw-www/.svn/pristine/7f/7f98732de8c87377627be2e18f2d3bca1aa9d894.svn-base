/**
 * 产品列表页面逻辑。
 */
define("p.informationlist",function(require,exports,module){

    var settings={};
    var queryObject=util.getQueryObject();

    var _all=require("p.all");

    var panel_loading=$('#panel-loading');
    var panel_container=$('#information_container');

    var panel_list=$('#inner_news_list');

    var pager_container=$('#pager');

    var tpl_item=new EJS({url:"/res/template/tpl_informationlist_item.ejs"});

    var webui=new WebUI();

    var __PAGE_INDEX=1;

    var app={
        init:function(opts){

            $.extend(settings,opts);
            var me=this;
            _all.timer();
            me.initEvents();
            me.initSearchBar();
            me.initInnerSearcher();

            __PAGE_INDEX=settings.page;
            me.gotoPage(__PAGE_INDEX,function(){

            });

        }
        ,initSearchBar:function(){
            var _param_options=$('[ui="param-option"]');
            _param_options.click(function(){
                var _param_name=$(this).attr('param');
                var _param_val=$(this).attr("value");
                queryObject[_param_name]=_param_val;
                var url=util.Json2URL("/information",queryObject);
                if(history.replaceState){
                    history.replaceState("","",url);
                    location.reload();
                }
                else{
                    location.href=url;
                }

            });
        }
        ,initEvents:function(){
            var sending=false;
        }

        ,initInnerSearcher:function(){
            var me=this;
            var _url_paras={};
            $.extend(_url_paras,queryObject);
            $('[ui="class-type"]').click(function(){
                $(this).addClass("cur").siblings().removeClass("cur");
                me.gotoPage(1,function(){});

            })
            
        }
        ,getSearchParas:function(pageIndex){
            var _url_paras={};
            var me=this;
            $.extend(_url_paras,queryObject);
            _url_paras["dataType"]="json";
            console.log(pageIndex)
            _url_paras["page"]=pageIndex;
            $('[ui="class-type"]').each(function(){
                if($(this).hasClass("cur")){
                    _url_paras['cate_id']=$(this).attr("cate_id");
                }
            });

            return _url_paras;


        }
        ,_renderList:function(sdata){
            if(sdata==undefined||sdata.data==undefined||sdata.data.list==undefined){
                var _html=webui.createEmptyPanel({
                   message:"暂无相关资讯"
                });
                panel_list.empty().append(_html);
                return;
            }else {
                var _html=tpl_item.render({
                    pageData:sdata
                });
                // console.log(_html)
                panel_list.empty().append(_html);
            }
        }
        ,_renderPager:function(totalPages,curPageIndex){
            var me=this;
            pager_container.empty();
            var panel_small_pager=$('#small-pager');
            var _ui_totalPages=$('[ui="total-pages"]');
            var _ui_currentPage=$('[ui="current-page"]');
            _ui_currentPage.text(curPageIndex);
            _ui_totalPages.text(totalPages);
            var ui_pre_page=panel_small_pager.find('[ui="pre-page"]');
            var ui_next_page=panel_small_pager.find('[ui="next-page"]');
            if(curPageIndex>=totalPages){
                ui_next_page.unbind("click").removeClass("disable").addClass("disable");
            }
            else{
                ui_next_page.unbind("click").removeClass("disable");
                ui_next_page.unbind("click").click(function(){
                    var page_index=curPageIndex+1;
                    me.gotoPage(page_index,function(){});
                });
            }
            if(curPageIndex<=1){
                ui_pre_page.unbind("click").removeClass("disable").addClass("disable");
            }
            else{
                ui_pre_page.unbind("click").removeClass("disable");
                ui_pre_page.unbind("click").click(function(){
                    var page_index=curPageIndex-1;
                    me.gotoPage(page_index,function(){});
                });
            }
            if(totalPages<=1){
                pager_container.empty();
                return;
            }
            var _pager=new iPager({
                totalPages:totalPages
                ,currentPage:curPageIndex
                ,container:pager_container
                ,onRender:function(eles){
                $(eles).find('[ui="pager-item"]').click(function(){
                    var _pageIndex=$(this).attr("pageIndex");
                    me.gotoPage(_pageIndex,function(){});
                });
            }
        });
        }
        ,gotoPage:function(pageIndex,callback){
            var me=this;
            panel_container.hide();
            panel_loading.show();
            var _now_paras=me.getSearchParas(pageIndex);
            console.log(_now_paras);
            __PAGE_INDEX=pageIndex;
            $.ajax({
                url:"/information"
                ,data:_now_paras
                ,method:"get"
                ,dataType:"json"
                ,success:function(sdata){
                    var _total=parseInt(sdata.data.count);
                    var _pageSize=7;

                    var _curPageIndex=1;
                    var _totalPages=0;
                    if(_total<=0){
                        me._renderList(undefined);
                    }
                    else{
                        _curPageIndex=parseInt(sdata.searchParams.page);
                        _pageSize=parseInt(_pageSize);
                        _totalPages=util.getTotalPages(_pageSize,_total);
                        me._renderList(sdata);
                        me._renderPager(_totalPages,_curPageIndex);
                    }

                    //--初始化最新的分页控件。
                    $('[ui="total-count"]').text(_total);
                    setTimeout(function(){
                        panel_loading.hide();
                        panel_container.fadeIn();
                    },500);

                }
                ,error:function(){

                }
            });

        }
    };

    module.exports=app;

});

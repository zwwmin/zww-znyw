/**
 * Created by DGDL-08 on 2018/4/10.
 */
define("p.Intelligent_warning",function(require,exports,module){

    var tpl_warning=new EJS({url:"/res/Intel_ejs/intel_warning.ejs"});
    var tpl_empty=new EJS({url:"/res/Intel_ejs/intel_empty.ejs"});
    var tpl_total=new EJS({url:"/res/Intel_ejs/inel_warning_total.ejs"});

    var warning_footer=$("#warning-footer");
    var warning_total=$("#warning_total");
    var submit_btn=$("#submit_btn");
    var Selected_sid = $("#Selected_sid").data('value');
    var list={
        sid:Selected_sid,
        pageIndex:1,
        pageSize:20,
        level:"",
        stime:"",
        etime:""
    };
    var paging_judge = true;

    var app={
        init:function(opts){
            var me=this;
            me.rendering();
            me.gotoPage();
            me.pierChartPart();
            me._WarningClick();
        }
        ,rendering:function () {
            layui.use(['laypage','laydate'], function(){
                var laydate = layui.laydate;

                //执行一个laydate实例 开始时间
                laydate.render({
                    elem: '#reservation',//指定元素
                    theme: '#1fbcec',
                    format: 'yyyy-MM-dd',
                    done: function (value) {
                        var s =Date.parse(value);
                        if(value != ''){
                            $("#stimes").val(s);
                        }else {
                            $("#stimes").val('');
                        }

                    }
                });
                //    结束时间
                laydate.render({
                    elem: '#reser',//指定元素
                    theme: '#1fbcec'
                    , format: 'yyyy-MM-dd'
                    , done: function (value) {
                        var s =Date.parse(value);
                        if(value != ''){
                            $("#etimes").val(s);
                        }else {
                            $("#etimes").val('');
                        }
                    }
                })
            });
        }
        ,paging:function (data) {
            var me = this;
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                ,count: data //数据总数，从服务端得到
                ,limit: 20
                ,jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    //首次不执行
                    if(!first){
                        //do something
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        console.log(obj.limit); //得到每页显示的条数
                        list.pageIndex = obj.curr;
                        me.gotoPage();
                    }
                }
            });
        }
        // 全数据
        ,gotoPage:function () {
            var me=this;
            $.ajax({
                url:"/user/v5_SmartGetStationAlarmInfoForPc"
                ,data:list
                ,method:"post"
                ,success:function(res){
                    me._renderTotal(res);

                    if(res.total > 20 && paging_judge){
                        me.paging(res.total);
                        paging_judge = false;
                    }
                }
                ,error:function(){}
            });
        }
        // 部分(10)
        ,pierChartPart:function () {
            var me=this;
            $.ajax({
                url: "/user/v5_SmartAlarmRanking"
                , data: {
                    sid:Selected_sid
                }
                , method: "post"
                , success: function (sdata) {
                    console.log(sdata)
                    me._renderList(sdata);
                }
                , error: function () {

                }
            });
        }
        // 部分
        ,_renderList:function(sdata){

            if(sdata.code!=0||sdata.data==undefined ||sdata==undefined ){
                var _html=tpl_empty.render({
                    data:sdata.data
                });
                warning_footer.empty().append(_html);
                return;
            }else {
                var _html=tpl_warning.render({
                    data:sdata.data
                });
                warning_footer.empty().append(_html);
            }
        }
        ,_renderTotal:function(sdata){
            var me = this;
            if(sdata.code!=0||sdata==undefined || sdata.total == 0){
                var _html=tpl_empty.render({
                    data:sdata.data
                });
                warning_total.empty().append(_html);
                return;
            }else {
                var _html=tpl_total.render({
                    data:sdata.data
                });
                warning_total.empty().append(_html);
            }
        }
        // 点击时间
        ,_WarningClick:function () {
            var me=this;
            $("#warning_choose li div").click(function () {
                    list.level =$(this).data("value");
                    $(this).parent().addClass("acs");
                    $(this).parent().siblings().removeClass("acs");
                    me.gotoPage();
                    paging_judge = false;
                $("#test1").empty();
            })
            submit_btn.click(function () {
                if($('#stimes').val()==""|| $('#etimes').val()==""){
                    alert("请选择时间");
                    return;
                }
                list.stime =$('#stimes').val();
                list.etime =$('#etimes').val();

                console.log(list);
               me.gotoPage();
            });
            $(".pagination li a").on("click",function () {
               alert($(this).data('value'))
            })

        }
        // 消息提醒
        ,showTip:function(text,cb){

            var newTips = $("<div>");
            $("body").append(newTips);
            newTips.addClass('showtips');
            newTips.text(text);
            window.setTimeout(function() {
                newTips.addClass('active');
            }, 10);
            g_tips = window.setTimeout(function() {
                $(".showtips").remove();
                if(cb){
                    cb();
                }
            }, 3000);

        }
    };

    module.exports=app;

});
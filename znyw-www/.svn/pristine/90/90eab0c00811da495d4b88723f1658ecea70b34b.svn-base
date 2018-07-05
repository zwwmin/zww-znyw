/**
 * Created by DGDL-08 on 2018/6/25.
 */
define("p.Intelligent_demand",function(require,exports,module){
    var tpl_empty = new EJS({url: "/res/Intel_ejs/intel_empty.ejs"});
    var tpl_transformer=new EJS({url:"/res/Intel_ejs/inel_demand_transformer.ejs"});
    var Demand=$("#Demand");
    var eti=(new Date()).getTime();
    var _paras={
        sid:$('#Selected_sid').data('value'),
        timestamp:eti
    };
    var List={
        sid:$('#Selected_sid').data('value'),
        timestamp:eti,
        jxId:$("#site").val()
    };
    var app= {
        init:function(){
            var me=this;
            me.TranSformer();
            me.WholePoint();
            me.TimeSelect();
        },
        // 变压器最大需量
        TranSformer:function () {
            var me=this;
            $.ajax({
                url:"/user/v5_SmartMaxDemand"
                ,data:_paras
                ,method:"post"
                ,success:function(res){
                    me.TransFormerInsert(res);
                }
                ,error:function(){}
            });
        }
        ,TransFormerInsert:function (sdata) {
            if(sdata.code!=0||sdata.data.items==undefined || sdata.data.items.length==0){
                var _html=tpl_empty.render({});
                Demand.empty().append(_html);
                return;
            }else {
                var total=0;
                for (var i in sdata.data.items){
                    total += sdata.data.items[i].maxLoad;
                }
                var _html=tpl_transformer.render({
                    data:sdata.data
                    ,totalData:total
                });
                Demand.empty().append(_html);
            }
        }
        // 最大需量--整点
        ,WholePoint:function () {
            var me=this;
            $.ajax({
                url:"/user/v5_SmartGetMomentLoad"
                ,data:List
                ,method:"post"
                ,success:function(res){

                    me.PointData(res);
                    if(res.data.length == 0){
                        layer.msg('突然没有数据了呢！');
                    }
                }
                ,error:function(){}
            });
        }
        ,PointData:function (date) {
            var myhour=[];
            var vAvg=[];
            var vMax=[];
            var vMin=[];
            for (var i in date.data){
                myhour.push(date.data[i].myhour);
                vAvg.push(date.data[i].vAvg);
                vMax.push(date.data[i].vMax);
                vMin.push(date.data[i].vMin);
            }
            console.log(vAvg);

            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            var option = null;
            option = {
                backgroundColor: '#ffffff',
                name: 'a',
                tooltip: {
                    trigger: 'axis', //按x轴显示
                    show: true,
                    axisPointer: {
                        lineStyle: {
                            color: 'none' //不显示线条
                        }
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    textStyle: {
                        align: 'left',
                        fontSize: 12,
                        color: '#333333',
                    },
                    extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
                },
                color: ['#F5A623', '#1FBCEC', '#66CC99'],
                grid: {
                    left: '5%',
                    right: '6%',
                    top: '14%',
                    bottom: '6%',
                    containLabel: true
                },
                legend: {
                    show: true,
                    icon: 'circle',
                    right: 20,
                    textStyle: {
                        fontSize: 12,
                        color: '#333333'
                    },
                    data: ["时段平均负荷","时段最大负荷","时段最小负荷"]
                },
                xAxis: {
                    show: true,
                    type: 'category',
                    boundaryGap: false,
                    data: myhour
                },
                yAxis: {
                    name: "kW",
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} '
                    },
                    axisPointer: {
                        snap: true
                    }
                },
                series: [{"name": "时段平均负荷",
                    "type": "line",
                    "symbol": "circle",
                    "symbolSize": [10, 10],
                    "data": vAvg
                },{"name": "时段最大负荷",
                        "type": "line",
                        "symbol": "circle",
                        "symbolSize": [8, 8],
                        "data": vMax
                    },{"name": "时段最小负荷",
                        "type": "line",
                        "symbol": "circle",
                        "symbolSize": [8, 8],
                        "data": vMin
                    }]
            };

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
                window.addEventListener('resize', function () {
                    myChart.resize();
                });
            }
        }
        ,TimeSelect:function () {
            var me=this;
            layui.use(['laydate','form','layer'], function () {
                var laydate = layui.laydate; //日期
                var form = layui.form; //
                // 站点切换
                form.on('select(test)', function(data){
                    console.log(data.value);
                    List.jxId = data.value;
                    me.WholePoint();
                });
                //执行一个laydate实例 开始时间
                laydate.render({
                    elem: '#time1'
                    ,type: 'month'
                    , theme: '#1fbcec'
                    , format: 'yyyy-MM'
                    , done: function (value) {
                        console.log(Date.parse(value));
                        _paras.timestamp=Date.parse(value);
                        me.TranSformer();
                    }
                });
//    结束时间
                laydate.render({
                    elem: '#time2'//指定元素
                    ,type: 'month'
                    , theme: '#1fbcec'
                    , format: 'yyyy-MM'
                    , done: function (value) {
                        console.log(Date.parse(value));
                        List.timestamp=Date.parse(value)
                        me.WholePoint();
                    }
                })
            })
        }
    };

    module.exports=app;

});

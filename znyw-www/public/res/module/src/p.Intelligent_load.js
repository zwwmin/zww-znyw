/**
 * Created by DGDL-08 on 2018/4/12.
 */
define("p.Intelligent_load",function(require,exports,module){

    var _all = require("p.all");
    var Selected_sid = $("#Selected_sid").data('value');
    var currentDate = new Date(),
       stamp = currentDate.setDate(currentDate.getDate() - 7);  //获取前7天的时间戳
    var   ListTime=new Date().getTime();
    var list={
        sid:Selected_sid,
        jxId:0,
        stimestamp:stamp, //开始时间
        etimestamp: ListTime
    };
    var BaseInfo={};
    var time=[];
    var value=[];
    var site=$('#site');
    var submit_btn=$('#submit_btn');

    var app={
        init:function(opts){
            var me=this;
            list.jxId=site.val();
            me.pierChartTotal();
            me.lineChartTotal();
            me.determine();
            me.rendering();
        }
        ,rendering:function () {
            var me = this;
            layui.use(['laydate','form'], function () {
                var laydate = layui.laydate; //日期
                var form = layui.form; //
                // 站点切换
                form.on('select(test)', function(data){
                    list.jxId=data.value;
                    me.pierChartTotal();
                    for(var i=0;i<BaseInfo.length;i++){
                        var arr = BaseInfo[i];
                        if(list.jxId == arr.load_factor_item){
                            me.SmartBaseInfoChart(arr);
                            break;
                        }
                    }
                });
                //执行一个laydate实例 开始时间
                laydate.render({
                    elem: '#reservation',//指定元素
                    theme: '#1fbcec',
                    showBottom: false,
                    format: 'yyyy-MM-dd',
                    done: function( value){
                        list.stimestamp = Date.parse(value);
                    }
                });
//    结束时间
                laydate.render({
                    elem: '#reser',//指定元素
                    theme: '#1fbcec'
                    ,format: 'yyyy-MM-dd'
                    ,done: function(value){
                        list.etimestamp= Date.parse(value);
                    }
                })
            })
        }
        // 数据概况
        ,pierChartTotal:function () {
            var me=this;

            $.ajax({
                url:"/user/v5_SmartGetLoadStatisticsPC"
                ,data:list
                ,method:"post"
                ,success:function(res){
                    if(res.code == 0){
                        if(res.data.length!=0){
                            me.PointData(res.data);
                        }else {
                            alert("您选择的时间段没有信息,请重新选择。")
                        }
                    }else {
                        alert(res.msg)
                    }
                }
                ,error:function(){
                }
            });
        }
        // 数据概况BaseInfo
        ,lineChartTotal:function () {
            var me=this;
            $.ajax({
                url:"/user/v5_SmartBaseInfo"
                ,data:{
                    sid:Selected_sid
                }
                ,method:"post"
                ,success:function(res){
                    BaseInfo=res.data.loads;

                    for(var i=0;i<res.data.loads.length;i++){
                        var arr = res.data.loads[i];
                        if(list.jxId == arr.id){
                            me.SmartBaseInfoChart(arr);
                            break;
                        }
                    }
                }
                ,error:function(){

                }
            });
        }
        ,SmartBaseInfoChart:function (data) {
            var real_times=data.currentval;
            var real_day=data.daymax;
            var real_month=data.monthmax;
            var myChart = echarts.init(document.getElementById('main'));
            var myChart2 = echarts.init(document.getElementById('main2'));
            var myChart3 = echarts.init(document.getElementById('main3'));
            var value =  real_times.toFixed(2);
            var value_day = real_day.toFixed(2);
            var value_month = real_month.toFixed(2);
            var unit = "%";
            var min = 0;
            var max = 100;
            var  option = {
                title: {
                    text: value + unit+" \n 负荷率",
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: "#000000",
                        fontSize: 20
                    }
                },
                tooltip: {
                    show: false,
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show: false,
                    itemGap: 12,
                    data: ['01', '02']
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                series: [{
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: false,
                    radius: ['55%', '68%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            shadowBlur: 40,
                            shadowColor: '#eaefff'
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        value: value - min,
                        name: '01',
                        itemStyle: {
                            normal: {
                                color: '#7191fe'
                            }
                        },
                    }, {
                        value: max - value,
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: '#eaefff', //未完成的圆环的颜色
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        }
                    }

                    ]
                }, ]
            };
            var  option_day = {
                title: {
                    text: value_day + unit+" \n 负荷率",
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: "#000000",
                        fontSize: 20
                    }
                },
                tooltip: {
                    show: false,
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show: false,
                    itemGap: 12,
                    data: ['01', '02']
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                series: [{
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: false,
                    radius: ['55%', '68%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            shadowBlur: 40,
                            shadowColor: '#cafae0'
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        value: value_day - min,
                        name: '01',
                        itemStyle: {
                            normal: {
                                color: '#66cc99'
                            }
                        },
                    }, {
                        value: max - value_day,
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: '#cafae0' //未完成的圆环的颜色
                            }
                        }
                    }

                    ]
                }, ]
            };
            var  option_month = {
                title: {
                    text: value_month + unit+" \n 负荷率",
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: "#000000",
                        fontSize: 20
                    }
                },
                tooltip: {
                    show: false,
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show: false,
                    itemGap: 12,
                    data: ['01', '02']
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                series: [{
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: false,
                    radius: ['55%', '68%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            shadowBlur: 40,
                            shadowColor: '#feeed5'
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        value: value_month - min,
                        name: '01',
                        itemStyle: {
                            normal: {
                                color: '#f5a623'
                            }
                        },
                    }, {
                        value: max - value_month,
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: '#feeed5', //未完成的圆环的颜色

                            }
                        }
                    }

                    ]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart2.setOption(option_day);
            myChart3.setOption(option_month);
            window.addEventListener('resize',function(){
                myChart.resize();
                myChart2.resize();
                myChart3.resize();
            });
            $("#real_time").html(((data.currentval /100)*data.loading_capacity).toFixed(2));
            $("#day").html(((data.daymax /100)*data.loading_capacity).toFixed(2));
            $("#month").html(((data.monthmax /100)*data.loading_capacity).toFixed(2));
        }
        ,determine:function () {
            var me=this;
            submit_btn.click(function () {
                me.pierChartTotal();
            })
        }
        ,PointData:function (sdata) {
            var myhour=[];
            var vAvg=[];
            var vMax=[];
            var vMin=[];
            for (var i in sdata.items){
                myhour.push(sdata.items[i].date);
                vAvg.push(sdata.items[i].avgLoad);
                vMax.push(sdata.items[i].maxLoad);
                vMin.push(sdata.items[i].minLoad);
            }
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
                    data: ["平均负荷","日最大负荷","日最小负荷"]
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
                series: [{"name": "平均负荷",
                    "type": "line",
                    "symbol": "circle",
                    "symbolSize": [10, 10],
                    "data": vAvg
                },{"name": "日最大负荷",
                    "type": "line",
                    "symbol": "circle",
                    "symbolSize": [8, 8],
                    "data": vMax
                },{"name": "日最小负荷",
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
            $("#max").html(sdata.maxLoad);
            $("#min").html(sdata.minLoad);
            $("#avgLoad").html(sdata.avgLoad);
        }

    };

    module.exports=app;

});
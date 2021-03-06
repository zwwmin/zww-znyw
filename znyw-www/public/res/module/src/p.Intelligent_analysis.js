/**
 * Created by DGDL-08 on 2018/4/13.
 */
define("p.Intelligent_analysis",function(require,exports,module){

    var settings={};
    var data={};
    var _all=require("p.all");
    var intel_analysis_one=new EJS({url:"/res/Intel_ejs/intel_analysis_one.ejs"});
    var intel_analysis_two=new EJS({url:"/res/Intel_ejs/intel_analysis_two.ejs"});
    var choose_one=$("#choose_one");
    var choose_two=$("#choose_two");
    var charList={
        sid:$('#Selected_sid').data('value')
        ,items:[]
        ,timeType:0
        ,stime:"" //开始时间
        ,etime:""  //结束时间
        ,timeUnit:1 //时间单位 0 1
        ,transformerId:0 //监测点id
    };
    var chartVlue=[];

    var app={
        init:function(opts){
            var me =this;
            _all.timer();
            $.extend(settings,opts);
            charList.transformerId=$('#site').val();
            me.chooseAjax();
            me._radio();
            me.analyTime();
        }
        ,chooseAjax:function () {
            var me=this;
            $.ajax({
                url:"/user/v5_SmartPowerQualityCondition"
                ,data:{
                    transformerId:charList.transformerId
                }
                ,method:"post"
                ,success:function(res){
                    console.log(res);
                    me._renderList(res);
                }
                ,error:function(){

                }
            });
        }
        // 主
        ,_renderList:function (sdata) {
            var me= this;
            data =sdata.data;
            var _html = intel_analysis_one.render({
                data: sdata.data
            });
            choose_one.empty().append(_html);
            me.pointsQuery(sdata.data.allItems[0].key);
        }
        // 分查询
        ,pointsQuery:function (list) {
            var me=this;
            var ListData={};
            for (var s=0;s<data.allItems.length;s++){
                var arr= data.allItems[s];
                if(arr.key == list){
                    ListData= arr.PowerComparisonItemVos;
                    break;
                }
            }

            me._renderData(ListData);

        }
        ,_renderData:function(sdata){
            var me=this;
            if(sdata==undefined){

                return;
            }else {
                var _htmls = intel_analysis_two.render({
                    data: sdata
                });
                choose_two.empty().append(_htmls);
            }
            me.chartdata();
        }
        ,chartdata:function () {
            var me=this;
            charList.items = [];
            var arr=[];
            $('#choose_two >div').each(function () {
                if($(this).children('div').hasClass('layui-icon-radio')) {
                    arr.push($(this).data("value"));
                }
            });
            chartVlue = arr;
            charList.items = arr.join();
            $.ajax({
                url:"/user/v5_SmartPowerQuality"
                ,data:charList
                ,method:"post"
                ,success:function(res){
                    if(res.code ==0){
                        me._chartList(res);
                        $("#max").html(res.data.max);
                        $("#min").html(res.data.min);
                    }else {
                        alert(res.msg);
                    }
                }
                ,error:function(){

                }
            });

        }
        ,_chartList:function (sdata) {

            if(sdata.data.max == undefined){
                alert("没有数据喔");
                return;
            }
            var seriesData=[];
            for ( var s=0;s<chartVlue.length;s++){
                var txt=chartVlue[s];
                var arr=sdata.data.itemsDetail[txt];
                var dataList=[];
                for (var r=0;r<arr.length;r++){
                    var arr1= arr[r];
                    dataList.push(arr1.value);
                }
                var List={
                    name: arr[0].itemName,
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: [8, 8],
                    data: dataList
                };
                seriesData.push(List)
            }

            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
           var  option = null;
            option = {
                backgroundColor: '#ffffff',
                name: 'a',
                tooltip: {
                    trigger: 'axis', //按x轴显示
                    show: true,
                    axisPointer: {
                        lineStyle: {
                            color: 'none', //不显示线条
                        },
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    textStyle: {
                        align: 'left',
                        fontSize: 12,
                        color: '#333333',
                    },
                    extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
                },
                dataZoom: [{
                    show: true,
                    height: 20,
                    xAxisIndex: [0],
                    bottom: 0,
                    start: 0,
                    end: 100,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '100%',
                    handleStyle:{color:"#d3dee5"},
                    textStyle:{color:"#fff"},
                    borderColor:"#90979c"}, {
                    type: "inside",
                    show: true,
                    height: 15,
                    start: 1,
                    end: 35
                }],
                color: ['#7191fe', '#66cc99', '#f5a623',"#1fbcec","#484756"," #F15959"],
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
                    data: sdata.data.names
                },
                xAxis: {
                    show: true,
                    type: 'category',

                    boundaryGap: false,

                    data: sdata.data.date
                },
                yAxis: {
                    name:"V/A",
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} '
                    },
                    axisPointer: {
                        snap: true
                    }
                },
                series: seriesData
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
                window.addEventListener('resize',function(){
                    myChart.resize();
                });
            }
        }
        ,_radio:function () {
            var me=this;
            $(document).on('click', '.analysis_radio_btn', function(evt) {
                var property = $(this).data("property");
                switch (property){
                    case 'Total_one':
                        me.pointsQuery($(this).data("value"));
                        if(!$(this).children('div').hasClass('layui-icon-radio')){
                            $(this).siblings().children('div').removeClass('layui-icon-radio').addClass('layui-icon-circle');
                            $(this).children('div').removeClass('layui-icon-circle').addClass('layui-icon-radio');
                        }
                        break;
                    case 'Total_two':
                        if($(this).children('div').hasClass('layui-icon-radio')){
                            $(this).children('div').removeClass('layui-icon-radio').addClass('layui-icon-circle');
                        }else {
                            $(this).children('div').removeClass('layui-icon-circle').addClass('layui-icon-radio');
                        }
                        break;
                    case 'real_time':
                        charList.timeType = $(this).data('value');
                        if($(this).data('value') == 1){

                            var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
                            var time = timeStamp - (86400 * 1);
                            if(charList.stime == '' && charList.etime == ''){
                                charList.stime = time *1000;charList.etime =timeStamp *1000;
                            }
                        }
                        if(!$(this).children('div').hasClass('layui-icon-radio')){
                            $(this).siblings().children('div').removeClass('layui-icon-radio').addClass('layui-icon-circle');
                            $(this).children('div').removeClass('layui-icon-circle').addClass('layui-icon-radio');
                        }
                        break;
                    default:
                        charList.timeUnit = $(this).data('value');
                        if(!$(this).children('div').hasClass('layui-icon-radio')){
                            $(this).siblings().children('div').removeClass('layui-icon-radio').addClass('layui-icon-circle');
                            $(this).children('div').removeClass('layui-icon-circle').addClass('layui-icon-radio');
                        }
                        break;
                }
                me.chartdata();
            });
        }
        // 时间插件
        ,analyTime:function () {
            var me = this;
            layui.use(['laydate','form','layer'], function () {
                var laydate = layui.laydate; //日期
                var form = layui.form; //
                // 站点切换
                form.on('select(test)', function(data){
                    charList.transformerId = data.value;
                    me.chooseAjax();
                });
                laydate.render({
                    elem: '#reservationtime'
                    ,range: true
                    ,theme: '#1fbcec'
                    ,format:'yyyy-MM-dd'
                    ,done: function (value) {
                        var Time = value.split(' - ');
                        console.log(value[0]);
                        charList.stime=Date.parse(Time[0]);
                        charList.etime=Date.parse(Time[1]);
                        me.chartdata();
                    }
                });
            });
        }

    };

    module.exports=app;
});
/**
 * Created by DGDL-08 on 2018/6/7.
 */
define("p.mappage",function(require,exports,module){

    var settings={};

    var _all=require("p.all");
    var tpl_mappage= new EJS({url: "/res/Intel_ejs/inel_mappage.ejs"});
    var tpl_mappage_warn= new EJS({url: "/res/Intel_ejs/inel_mappage_warn.ejs"});
    var tpl_empty=new EJS({url:"/res/Intel_ejs/intel_empty.ejs"});
    var tpl_total=new EJS({url:"/res/Intel_ejs/inel_warning_map_total.ejs"});
    var paging_judge = true;
    var ClickData={};
    var load;
    var list={
        pageIndex:1,
        pageSize:9,
        level:"",
        stime:"",
        etime:""
    };
    var app={
        init:function(opts){
            $.extend(settings,opts);
            var me=this;
            me.Start();
            me.Bullet();
            me.ListClick();

            // _all.timer();
        }
        // 三个圆环图
        ,charts:function (sdat) {
            var myChart = echarts.init(document.getElementById('chart_one')); //严重
            var myChart2 = echarts.init(document.getElementById('chart_two')); //普通
            var myChart3 = echarts.init(document.getElementById('chart_three')); //预警
            /*---------------------数据----------------------------*/
            document.getElementById('general').innerHTML=sdat.general;
            document.getElementById('severity').innerHTML=sdat.severity;
            document.getElementById('warning').innerHTML=sdat.warning;
            document.getElementById('total').innerHTML=sdat.total;
            // 普通报警
            var generalData = [{
                value: sdat.general//时间
            }, {value: sdat.total}];
            // 严重
            var severityData = [{
                value: sdat.severity//时间
            }, {value: sdat.total}];
            // 预警
            var warningData = [{
                value: sdat.warning//时间
            }, {value: sdat.total}];
            var  option = {
                title: [{
                    x: '50%',
                    y: '55%',
                    textAlign: 'center',
                    textStyle: {
                        color: 'yellow',
                        textAlign: 'center',
                        fontSize: 15 ,
                        fontWeight: 'bold'
                    }
                }],
                legend: {
                    show: false,
                    itemGap: 12,
                    data: ['已使用', '未使用']
                },
                series: [
                    //内圈圆环
                    {
                        name: 'Line',
                        type: 'pie',
                        clockWise: true, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['50%', '55%'],
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    // 0% 处的颜色
                                    {offset: 0, color: '#FEAE87'  },
                                    {offset: 0.5, color: '#FBF895'  },
                                    // 100% 处的颜色
                                    {offset: 1, color: '#FEAE87'}], false)
                            }
                        },
                        data: [{
                            value: 10
                        }],
                        label: {
                            normal: {
                                formatter: function(params) {
                                    var time = ((generalData[0].value / generalData[1].value)*100).toFixed(0);
                                    return time + '%';
                                },
                                position: 'center',
                                textStyle: {
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: "#1FBCEC"
                                }
                            }
                        }
                    },
                    {
                        name: 'Line',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['100%', '80%'],
                        color:[ new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            // 0% 处的颜色
                            {offset: 0, color: '#FEAE87'  },
                            {offset: 0.5, color: '#FBF895'  },
                            // 100% 处的颜色
                            {offset: 1, color: '#FEAE87'}], false), '#3B3138'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data:generalData,
                    },

                ]
            };
            var  option1 = {
                title: [{
                    x: '50%',
                    y: '55%',
                    textAlign: 'center',
                    textStyle: {
                        color: 'yellow',
                        textAlign: 'center',
                        fontSize: 15 ,
                        fontWeight: 'bold'
                    }
                }],
                legend: {
                    show: false,
                    itemGap: 12,
                    data: ['已使用', '未使用']
                },
                series: [
                    //内圈圆环
                    {
                        name: 'Line1',
                        type: 'pie',
                        clockWise: true, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['50%', '55%'],
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    // 0% 处的颜色
                                    {offset: 0, color: '#62B1F4'  },
                                    {offset: 0.5, color: '#4CE3B8'  },
                                    // 100% 处的颜色
                                    {offset: 1, color: '#62B1F4'}], false)
                            }
                        },
                        data: [{
                            value: 10
                        }],
                        label: {
                            normal: {
                                formatter: function(params) {
                                    var time = ((severityData[0].value / severityData[1].value)*100).toFixed(0);
                                    return time + '%';
                                },
                                position: 'center',
                                textStyle: {
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: "#1FBCEC"
                                }
                            }
                        }
                    },
                    {
                        name: 'Line1',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['100%', '80%'],
                        color:[ new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            // 0% 处的颜色
                            {offset: 0, color: '#62B1F4'  },
                            {offset: 0.5, color: '#4CE3B8'  },
                            // 100% 处的颜色
                            {offset: 1, color: '#62B1F4'}], false), '#3B3138'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data:severityData,
                    }
                ]
            };
            var  option2 = {
                title: [{
                    x: '50%',
                    y: '55%',
                    textAlign: 'center',
                    textStyle: {
                        color: 'yellow',
                        textAlign: 'center',
                        fontSize: 15 ,
                        fontWeight: 'bold'
                    }
                }],
                legend: {
                    show: false,
                    itemGap: 12,
                    data: ['已使用', '未使用']
                },
                series: [
                    //内圈圆环
                    {
                        name: 'Line2',
                        type: 'pie',
                        clockWise: true, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['50%', '55%'],
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    // 0% 处的颜色
                                    {offset: 0, color: '#42CFEE'  },
                                    {offset: 0.5, color: '#42CFEE'  },
                                    // 100% 处的颜色
                                    {offset: 1, color: '#42CFEE'}], false)
                            }
                        },
                        data: [{
                            value: 10
                        }],
                        label: {
                            normal: {
                                formatter: function(params) {
                                    var time = ((warningData[0].value / warningData[1].value)*100).toFixed(0);
                                    return time + '%';
                                },
                                position: 'center',
                                textStyle: {
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: "#1FBCEC"
                                }
                            }
                        }
                    },
                    {
                        name: 'Line2',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['100%', '80%'],
                        color:[ new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            // 0% 处的颜色
                            {offset: 0, color: '#42CFEE'  },
                            {offset: 0.5, color: '#42CFEE'  },
                            // 100% 处的颜色
                            {offset: 1, color: '#42CFEE'}], false), '#3B3138'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data:warningData,
                    }
                ],
            };
            myChart.setOption(option1);
            myChart2.setOption(option);
            myChart3.setOption(option2);
        }
        // 大地图
        ,centMap:function (data) {
            var me =this;
            //地图容器
            echarts.extendsMap = function (id, opt) {
                // 实例
                var chart = this.init(document.getElementById(id));
                var levelColorMap = {
                    '1': 'rgba(241, 136, 38, .7)',
                    '2': 'rgba(0, 177, 102, .8)'
                };

                var defaultOpt = {
                    mapName: 'china',     // 地图展示
                    goDown: false,        // 是否下钻
                    bgColor: '#041B36',   // 画布背景色
                    activeArea: [],       // 区域高亮,同echarts配置项
                    data: []
                };
                if (opt) opt = this.util.extend(defaultOpt, opt);

                var option = {
                    backgroundColor: opt.bgColor,
                    geo: {
                        map: opt.mapName,
                        // roam: true,
                        zoom: 1,
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#3894D8',
                                borderWidth: 1,
                                areaColor: '#277DBC',//地图区域颜色
                                shadowColor: 'rgba(128, 217, 248, 1)',
                                borderType: 'solid',
                                opacity: 0.6,

                                shadowOffsetX: -.5,
                                shadowOffsetY: .5,
                                shadowBlur: 1
                            },
                            emphasis: {
                                areaColor: '#b72746',
                                borderWidth: 0
                            }
                            ,aspectScale: 2
                        },
                        animationDuration:1000,
                        animationEasing:'cubicOut',
                        animationDurationUpdate:1000,
                        legend: {
                            orient: 'vertical',
                            y: 'bottom',
                            x: 'right',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        // aspectScale:0.96, //长宽比
                        aspectScale:1, //长宽比
                        layoutCenter: ['50%', '50%'],
                        layoutSize:950,
                        roam: false//允许缩放和平移
                    },
                    series: [{
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        // symbol: 'diamond',
                        showEffectOn: 'render',
                        rippleEffect: {
                            period: 15,
                            scale: 6,
                            brushType: 'fill'
                        },
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return levelColorMap[params.value[3]];
                                },
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: opt.data
                    }]

                };
                chart.setOption(option);
                return chart;
            };
            $.getJSON('../dist/dong.json', function (geoJson) {
                echarts.registerMap('东莞', geoJson);
                var myChart = echarts.extendsMap('main', {
                    bgColor: '#041B36', // 画布背景色
                    mapName: '东莞',    // 地图名
                    goDown: false,       // 是否下钻
                    // 数据展示
                    data: data
                });
                window.addEventListener('resize',function(){
                    myChart.resize();
                });
                // 地图点击事件
                myChart.on('click', function (params) {
                    if(params.componentType == "geo"){
                        for (var i = 0;i<ClickData.data.maplocation.length;i++) {
                            var arr = ClickData.data.maplocation[i];
                            if(params.name == arr.regionName){
                                me.InsertIt(arr,0);
                            }
                        }
                    }if(params.componentType == "series") {
                        me.InsertIt(params.data.allData,1);
                    }

                })
            });
        }
        // 地图标点
        ,mapeDate:function (data,amount) {
            var map = new BMap.Map("allmap");    // 创建Map实例
            var enlarge= 10 ;
            var lat= 22.917652 ;
            var lng= 113.902236 ;
            if(amount != 0 ){
                enlarge = 14
                lng = data.lng;
                lat = data.lat;
            }
            map.centerAndZoom(new BMap.Point(lng,lat), enlarge);  // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]}));
            map.setCurrentCity("东莞");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            //新建三个地图上点

            //创建标注点并添加到地图中
            function addMarker(points) {
                //循环建立标注点
                for(var i=0, pointsLen = points.stationInfo.length; i<pointsLen; i++) {
                    var point = new BMap.Point(points.stationInfo[i].lng, points.stationInfo[i].lat); //将标注点转化成地图上的点
                    var marker = new BMap.Marker(point); //将点转化成标注点
                    map.addOverlay(marker);  //将标注点添加到地图上
                    //添加监听事件
                    (function() {
                        marker.addEventListener("click",
                            function() {
                                alert(points.stationInfo[i].name);
                            });

                    })();
                }
            }
            function addMarkerTwo(points) {
                    var point = new BMap.Point(points.lng, points.lat); //将标注点转化成地图上的点
                    var marker = new BMap.Marker(point); //将点转化成标注点
                    map.addOverlay(marker);  //将标注点添加到地图上
                    //添加监听事件
                    (function() {
                        marker.addEventListener("click",
                            function() {
                                alert(points.name);
                            });
                    })();
            }
            if(amount == 0){
                addMarker(data);
            }else {
                addMarkerTwo(data);
            }

        }
        ,InsertIt:function (data,amount) {
            var me =this;
            var _html = tpl_mappage.render({
                data:data,
                amount:amount
            });
            $("body").append(_html);
            console.log('ditu')
            me.mapeDate(data,amount);
            $("#close_but").on("click",function () {
                $("#mask").remove();
            });
            $('#Switching').on("click",function () {
                var index = layer.load(3);
                $.ajax({
                    url: "/user/changePassWord"
                    , data: {
                        sid:$(this).data('value')
                    }
                    , method: "post"
                    , success: function (sdata) {
                        location.reload();
                        location.href = "/user";
                    }
                    , error: function () {

                    }
                });
            });

        }
        ,Start:function () {
            var me = this;
            $.ajax({
                url: "/user/v5_SmartElectricityCloudIndex"
                , data: {}
                , method: "post"
                , success: function (res) {
                    console.log(res);
                    if(res.code == 0){
                        ClickData = res;
                        document.getElementById('deviceNum').innerHTML=res.data.deviceNum;
                        document.getElementById('hasTowns').innerHTML=res.data.hasTowns;
                        // 地图
                        me.StartData(res);
                        // 圆圈
                        me.charts(res.data.alarmcount);
                    }
                }
                , error: function () {

                }
            });
        }
        ,StartData:function (sdata) {
            var me =this;
            var List=[];
            for (var i = 0;i<sdata.data.maplocation.length;i++){
                var aar= sdata.data.maplocation[i];
                for (var s=0;s<aar.stationInfo.length;s++){
                    var geoCoord=aar.stationInfo[s];
                    var d=[];
                    var alarm;
                    if(geoCoord.isAlarm){
                         alarm = 1;//报警
                    }else {
                         alarm = 2;//未报警
                    }
                    List.push({
                        allData:geoCoord,
                        sid:geoCoord.sid,
                        name: geoCoord.name,
                        value: d.concat(geoCoord.lng,geoCoord.lat,10, alarm)
                    });
                }
            }
            me.centMap(List);
            me.caveat(List);
        }
        // 告警弹框
        ,Bullet:function () {
            var me =this;
            $('.chart_text_span2').on("click",function () {
                paging_judge = true;
                list.level = $(this).data("value");
                list.pageIndex = 1;
                var _html = tpl_mappage_warn.render({
                    data:$(this).data("value")
                });
                $("body").append(_html);
                 //换了种风格
                $("#close_but").on("click",function () {
                    $("#mask").remove();
                });
                // 时间
                me.rendering();
                // 获取数据
                me.gotoPage();
            })
        }
        // 全数据
        ,gotoPage:function () {
            load = layer.load(2);
            var me=this;
            $.ajax({
                url:"/user/v5_SmartGetStationAlarmInfoForPc"
                ,data:list
                ,method:"post"
                ,success:function(res){
                    console.log(res)
                    me._renderTotal(res);
                    if(res.total > 9 && paging_judge){
                        me.paging(res.total);
                        paging_judge = false;
                    }
                    layer.close(load);
                }
                ,error:function(){}
            });
        }
        ,_renderTotal:function(sdata){
            var me = this;
            var warning_total=$("#warning_total");
            if(sdata.code!=0||sdata==undefined || sdata.total == 0){
                var _html=tpl_empty.render({
                    data:sdata
                });
                warning_total.empty().append(_html);
                return;
            }else {
                var _html=tpl_total.render({
                    data:sdata
                });
                warning_total.empty().append(_html);
            }
            me._WarningClick();
            layer.close(load);
        }
        ,rendering:function () {
            layui.use(['laypage','laydate'], function(){
                var laydate = layui.laydate;

                //执行一个laydate实例 开始时间
                laydate.render({
                    elem: '#reservation',//指定元素
                    theme: '#1fbcec',
                    showBottom: false,
                    format: 'yyyy/MM/dd',
                    done: function (value) {
                        $("#stimes").val(Date.parse(value))
                    }
                });
                //    结束时间
                laydate.render({
                    elem: '#reser',//指定元素
                    theme: '#1fbcec'
                    , format: 'yyyy/MM/dd'
                    , done: function (value) {
                        $("#etimes").val(Date.parse(value))
                    }
                })
            });
        }
        // 点击时间
        ,_WarningClick:function () {
            var me=this;
            $(".warning_choose").on("click",function () {
                list.level =$(this).data("value");
                list.pageIndex =1 ;
                $(this).parent().addClass("acs");
                $(this).parent().siblings().removeClass("acs");
                me.gotoPage();
                paging_judge = true;
                $("#test1").empty();
            });
            $("#submit_btn").on("click",function () {
                if($('#stimes').val()==""|| $('#etimes').val()==""){
                    alert("请选择时间");
                    return;
                }
                $("#test1").empty();
                list.stime =$('#stimes').val();
                list.etime =$('#etimes').val();
                me.gotoPage();
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
                        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        // console.log(obj.limit); //得到每页显示的条数
                        list.pageIndex = obj.curr;
                        me.gotoPage();
                    }
                }
            });
        }
        ,ListClick:function () {
            var me = this;
            $('.ListClick').on('click',function () {
                var sid= $(this).data('value');
                var flag = 0;
                for(var i=0;i<ClickData.data.maplocation.length;i++){
                    var arr = ClickData.data.maplocation[i];
                    for(var s=0;s<arr.stationInfo.length;s++){
                        if(sid == arr.stationInfo[s].sid){
                            flag=1;
                            me.InsertIt(arr.stationInfo[s],1);
                            break;
                        }
                    }
                    if(flag==1)
                        break;
                }
            })
        }
        ,caveat:function (sdata) {
            var me=this;
            function ajx() {
                $.ajax({
                    url: "/user/v5_SmartFindCurrentAlarm"
                    , data: {}
                    , method: "post"
                    , success: function (res) {
                        console.log('======res=')
                        console.log(res)
                        if(res.data.length != 0){
                            for (var i=0;i<res.data.length;i++){
                                var arr = res.data[i];
                                for (c in sdata){
                                    if(sdata[c].sid == arr.sid){
                                        sdata[c].value[3]= 1;//1 为告警
                                    }
                                }
                            }
                        }
                        me.centMap(sdata);
                    }
                    , error: function () {

                    }
                });
            }
            setInterval(ajx,50000);
        }
    };

    module.exports=app;

});
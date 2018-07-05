var UiUtil={};

//parentObj 是父级，获取相对父级的位置，非必填
UiUtil.getLocation=function(element,parentObj){
    if(arguments.length!=1||element==null)
    {
        return null;
    }
    var elmt=element;
    var offsetTop=elmt.offsetTop;


    var offsetLeft=elmt.offsetLeft;
    var offsetWidth=elmt.offsetWidth;
    var offsetHeight=elmt.offsetHeight;
    while(elmt=elmt.offsetParent)
    {
        // add this judge
        if(elmt.style.position=='absolute'
            //||elmt.style.position=='relative'
            ||(elmt.style.overflow!='visible'&&elmt.style.overflow!=''))
        {
            break;
        }
        offsetTop+=elmt.offsetTop;
        offsetLeft+=elmt.offsetLeft;
    }
    var _info={
        absoluteTop:offsetTop,
        absoluteLeft:offsetLeft,
        offsetWidth:offsetWidth,
        offsetHeight:offsetHeight,
        x:offsetLeft,
        y:offsetTop,
        w:offsetWidth,
        h:offsetHeight
    };

    if(parentObj){
        _info={
            absoluteTop:offsetTop-parentObj.offsetTop,
            absoluteLeft:offsetLeft-parentObj.offsetLeft,
            offsetWidth:offsetWidth,
            offsetHeight:offsetHeight,
            x:offsetLeft-parentObj.offsetLeft,
            y:offsetTop-parentObj.offsetTop,
            w:offsetWidth,
            h:offsetHeight
        };
    }

    return _info;

};
//--线性bezier 曲线求值，根据t值来求值，t取值为[0,1]，可以认为是0就在起点，1就在终点，是过程的百分比位置。
UiUtil.LinearBezier=function(point_start,point_end){
    var p_start={x:0,y:0};
    var p_end={x:0,y:0};
    p_start=point_start;
    p_end=point_end;
    //--计算t为某个值得时候的点。
    //--计算公式。
    /**
     *
     * [1 t]| 1   0| |P0|
     *      |-1   1| |P1|
     *
     * */
    this.getPoint=function(t){
        var _m_1_1=1-t;
        var _m_1_2= t;  //1*0+1*1+_t*0+_t*1;
        var _t_1_1= (1-t)*p_start.x+t*p_end.x; //0+(_t+1)*p_start.x+(_t+1)*p_end.x;
        var _t_1_2=(1-t)*p_start.y+t*p_end.y;   //0+(_t+1)*p_start.y+(_t+1)*p_end.y;
        var _res_point={
            x:_t_1_1
            ,y:_t_1_2
        };
        return _res_point;
    };
};



//--二次方bezier
UiUtil.SquareBezier=function(start_point,crt_point,end_point){
    var p_start={x:0,y:0};
    var p_end={x:0,y:0};
    p_start=start_point;
    p_end=end_point;
    var p_crt1=crt_point;
    /**
     * 计算公式：
     *            | 1  0  0|  |P0|
     * [1 t t*t ] |-2  2  0|  |P1|
     *            |1  -2  1|  |P2|
     * **/
    this.getPoint=function(t){
        var _matrix1=[1,t,t*t];
        var _matrix2=[
            [1,0,0]
            ,[-2,2,0]
            ,[1,-2,1]
        ];
        var _matrix3=[
            [p_start.x,p_start.y]
            ,[p_crt1.x,p_crt1.y]
            ,[p_end.x,p_end.y]
        ];
        var _matrix_tmp=[
            _matrix1[0]*_matrix2[0][0]+_matrix1[1]*_matrix2[1][0]+_matrix1[2]*_matrix2[2][0]
            ,_matrix1[0]*_matrix2[0][1]+_matrix1[1]*_matrix2[1][1]+_matrix1[2]*_matrix2[2][1]
            ,_matrix1[0]*_matrix2[0][2]+_matrix1[1]*_matrix2[1][2]+_matrix1[2]*_matrix2[2][2]
        ];
        var _matrix_final=[
            _matrix_tmp[0]*_matrix3[0][0]+_matrix_tmp[1]*_matrix3[1][0]+_matrix_tmp[2]*_matrix3[2][0]
            ,_matrix_tmp[0]*_matrix3[0][1]+_matrix_tmp[1]*_matrix3[1][1]+_matrix_tmp[2]*_matrix3[2][1]
        ];

        var _res_point={
            x:_matrix_final[0]
            ,y:_matrix_final[1]
        };
        return _res_point;
    };

};//

UiUtil.CubeBezier=function(point_start,point1,point2,point_end){
    var p_start={x:0,y:0};
    var p_end={x:0,y:0};
    p_start=point_start;
    p_end=point_end;
    var p_crt1=point1;
    var p_crt2=point2;
    /**
     * 计算公式：
     *                  | 1  0  0   0|  |P0|
     * [1 t t*t  t*t*t] |-3  3  0   0|  |P1|
     *                  |3  -6  3   0|  |P2|
     *                  |-1  3  -3  1|  |p3|
     *
     * **/
    this.getPoint=function(t){
        var _matrix1=[1,t,t*t,t*t*t];
        var _matrix2=[
            [1,0,0,0]
            ,[-3,3,0,0]
            ,[3,-6,3,0]
            ,[-1,3,-3,1]
        ];

        var _matrix3=[
            [p_start.x,p_start.y]
            ,[p_crt1.x,p_crt1.y]
            ,[p_crt2.x,p_crt2.y]
            ,[p_end.x,p_end.y]
        ];
        var _matrix_tmp=[
            _matrix1[0]*_matrix2[0][0]+_matrix1[1]*_matrix2[1][0]+_matrix1[2]*_matrix2[2][0]+_matrix1[3]*_matrix2[3][0]
            ,_matrix1[0]*_matrix2[0][1]+_matrix1[1]*_matrix2[1][1]+_matrix1[2]*_matrix2[2][1]+_matrix1[3]*_matrix2[3][1]
            ,_matrix1[0]*_matrix2[0][2]+_matrix1[1]*_matrix2[1][2]+_matrix1[2]*_matrix2[2][2]+_matrix1[3]*_matrix2[3][2]
            ,_matrix1[0]*_matrix2[0][3]+_matrix1[1]*_matrix2[1][3]+_matrix1[2]*_matrix2[2][3]+_matrix1[3]*_matrix2[3][3]
        ];

        var _matrix_final=[
            _matrix_tmp[0]*_matrix3[0][0]+_matrix_tmp[1]*_matrix3[1][0]+_matrix_tmp[2]*_matrix3[2][0]+_matrix_tmp[3]*_matrix3[3][0]
            ,_matrix_tmp[0]*_matrix3[0][1]+_matrix_tmp[1]*_matrix3[1][1]+_matrix_tmp[2]*_matrix3[2][1]+_matrix_tmp[3]*_matrix3[3][1]
        ];

        var _res_point={
            x:_matrix_final[0]
            ,y:_matrix_final[1]
        };
        return _res_point;
    };


};
//会摇头的按钮。
UiUtil.ShakeButton=function(_opts){
    var settings={
        element:"" //提交按钮元素
        ,shakeStyle:"i_cannt_do_that"
        ,onStyle:"on"
        ,shakeTime:1500
        ,afterShake:function(){}

    };
    $.extend(settings,_opts);
    var robj={
        shake:function(callback){
            if(util.checkEmpty(settings.onStyle)==false){
                $(settings.element).removeClass(settings.onStyle);
            }
            $(settings.element).addClass(settings.shakeStyle);
            setTimeout(function(){
                $(settings.element).removeClass(settings.shakeStyle)
                if(util.checkEmpty(settings.onStyle)==false){
                    $(settings.element).addClass(settings.onStyle);
                }
                settings.afterShake();
                if(callback){
                    callback();
                }
            },settings.shakeTime);
        }
        ,deny:function(callback){
            this.shake(callback);
        }
        ,on:function(){
            if(util.checkEmpty(settings.onStyle)==false){
                $(settings.element).addClass(settings.onStyle);
            }
        }
        ,off:function(){
            if(util.checkEmpty(settings.onStyle)==false){
                $(settings.element).removeClass(settings.onStyle);
            }
        }
    };
    return robj;
}
//--自定义CheckBox，就是网站上常用的那种点击变换样式的组件。
UiUtil.CheckBox=function(opts){
    var settings={
        element:"" //本身元素。
        ,selectedClass:"on" //选中时候需要添加的样式。

        ,onChange:function(pre,now){

        }
        ,value:""
        ,isSelected:true //是否选中
    };
    $.extend(settings,opts);
    var _root=$(settings.element);
    var _has_init=false;
    var app={
        init:function(){
            var me=this;
            if(_has_init==true){
                return;
            }
            me.initEvents();
            me.setSelected(settings.isSelected);
            _has_init=true;

        }
        ,initEvents:function(){
            var me=this;
            _root.click(function(){
                var _res=me.isSelected();
                var _pre=_res;
                var _now=_res;
                if(_res==true){
                    me.setSelected(false);
                    _now=false;
                }
                else{
                    me.setSelected(true);
                    _now=true;
                }
                if(settings.onChange){
                    settings.onChange(_pre,_now);
                }
            });
        }
        ,isSelected:function(){
            if(_root.hasClass(settings.selectedClass)){
                return true;
            }
            return false;
        }
        ,setSelected:function(trueOrFalse){
            if(trueOrFalse==true){
                if(_root.hasClass(settings.selectedClass)){
                    return;
                }
                _root.addClass(settings.selectedClass);
            }
            else if(trueOrFalse==false){
                if(_root.hasClass(settings.selectedClass)==false){
                    return;
                }
                _root.removeClass(settings.selectedClass);
            }
        }
        ,getValue:function()
        {
            return settings.value;
        }
    };

    app.init();

    return app;
}


//--数量选择器相关。
UiUtil.NumberSelector=function(_opts){
    var i_settings={
        max:99

        ,onSelect:function(val,theType,relativeAmount){

        }
        ,min:1
        ,increaseDisableClass:"disable"
        ,decreaseDisableClass:"disable"
        ,increaseBtnSelector:'[ui="increase"]'
        ,decreaseBtnSelector:'[ui="decrease"]'
        ,txtSelector:'[ui="number-text"]'
        ,unit:1 //以多少为一个单位，通常是1，但是也可以按照10个10个，五个五个来加。
        ,defaultVal:1 //默认值。

        ,element:""
    };

    var sc_data={
        buyAmount:0
    };
    $.extend(i_settings,_opts);
    var _root=$(i_settings.element);
    var btn_ns_decrease=_root.find(i_settings.decreaseBtnSelector);
    var btn_ns_increase=_root.find(i_settings.increaseBtnSelector);
    var num_select_val=_root.find(i_settings.txtSelector);

    var _TYPE_INCREASE="+";
    var _TYPE_DECREASE="-";
    var _TYPE_CHANGE="change";
    var _selector={
        init:function(){
            this.initUI();
            this.initEvents();
        }
        ,initUI:function(){
            //num_select_val.val(i_settings.current);
            //sc_data.buyAmount=parseInt(num_select_val.val());
            sc_data.buyAmount=i_settings.defaultVal;
            num_select_val.val(i_settings.defaultVal);
            //num_select_val.removeAttr("readonly");
            this._updateClickState();

        }

        ,initEvents:function(){
            var _ii_child=this;
            btn_ns_increase.unbind("click");
            btn_ns_increase.click(function(){
                setTimeout(function(){
                    _ii_child._updateClickState();
                },100);

                if(sc_data.buyAmount+i_settings.unit>i_settings.max){
                    return;
                }
                sc_data.buyAmount=sc_data.buyAmount+i_settings.unit;
                num_select_val.val(sc_data.buyAmount);
                i_settings.onSelect(sc_data.buyAmount,_TYPE_INCREASE,i_settings.unit);
            });
            btn_ns_decrease.unbind("click");
            btn_ns_decrease.click(function(){
                setTimeout(function(){
                    _ii_child._updateClickState();
                },100);

                if(sc_data.buyAmount-i_settings.unit<i_settings.min){
                    return;
                }

                sc_data.buyAmount=sc_data.buyAmount-i_settings.unit;
                num_select_val.val(sc_data.buyAmount);
                i_settings.onSelect(sc_data.buyAmount,_TYPE_DECREASE,i_settings.unit);

            });
            //num_select_val.unbind("blur").blur();
            num_select_val[0].onkeypress=function(event){
                var keyCode = event.keyCode;
                if ((keyCode >= 48 && keyCode <= 57))
                {
                    event.returnValue = true;
                } else {
                    event.returnValue = false;
                }
            }
            num_select_val.unbind("blur").blur(function(){
                var _val=num_select_val.val();
                _val=parseInt(_val);
                if(isNaN(_val)){
                    num_select_val.val(i_settings.min);
                    sc_data.buyAmount=i_settings.min;
                    i_settings.onSelect(sc_data.buyAmount,_TYPE_CHANGE,i_settings.unit);
                    return;
                }
                if(_val>i_settings.max){
                    _val=i_settings.max;
                }
                else if(_val<i_settings.min){
                    _val=i_settings.min;
                }
                num_select_val.val(_val);
                sc_data.buyAmount=_val;
                setTimeout(function(){
                    _ii_child._updateClickState();
                },100);
                i_settings.onSelect(sc_data.buyAmount,_TYPE_CHANGE,i_settings.unit);
            });

        }
        ,_updateClickState:function(){
            if(sc_data.buyAmount-i_settings.unit<i_settings.min){
                if(btn_ns_decrease.hasClass(i_settings.decreaseDisableClass)==false){
                    btn_ns_decrease.addClass(i_settings.decreaseDisableClass);
                }
            }
            else{
                btn_ns_decrease.removeClass(i_settings.decreaseDisableClass);
            }
            if(sc_data.buyAmount+i_settings.unit>i_settings.max){
                if(btn_ns_increase.hasClass(i_settings.increaseDisableClass)==false){
                    btn_ns_increase.addClass(i_settings.increaseDisableClass);
                }
            }
            else{
                btn_ns_increase.removeClass(i_settings.increaseDisableClass);
            }
        }
        ,getVal:function(){
            return sc_data.buyAmount;
        }


    };
    _selector.init();

    return _selector;
}


//--这是图片上传的控件的逻辑处理。
UiUtil.ImageFileUpload=function(opts){
    var settings={
        fileInput:"" //这是文本框对象，请传进来。
        ,uploadURL:"/service/uploadImg.do" //这是后台接收图片的url地址。
        ,uploadKey:"image" //上传时候该文件的表单里面的name。默认为image。
        ,change:function(oFile){}//这是文件改变以后的回调函数，一旦选择了文件并且通过了基本的文件检测--譬如有没有文件，文件格式是否正确，那么就会调用该方法了。
        ,beforeUpload:function(file,_paras){

        }//--上传之前可以改变一些参数的。譬如添加其他额外参数。

        ,uploadProgress:function(currentPercent){
            console.log("目前图片上传进度："+currentPercent);
        } //这是上传过程中计算上传进度的回调函数。
        ,uploadComplete:function(httpStateCode,responseText){
            console.log(httpStateCode,responseText);
        }//上传结束时候，接受到服务端返回来的statecode和输出字符串。
        ,uploadFailed:function(evt){
            console.log("上传失败");
        }
        ,onWarning:function(errorCode,errorMsg){
            if(errorCode=="detect error"){
                alert(errorMsg);
                return;
            }
            if(errorCode=="no file"){
                alert("请需要上传的图片");
                return;
            }

        } //这是提示各种错误的接口，用来以后扩展错误提示方式，暂时就用原始的alert来代替。
        ,fileDetect:function(oFile){
            if(!new RegExp("(jpg|jpeg|gif|png)+","gi").test(oFile.type)){
                return {
                    state:false
                    ,message:"图片类型必须是JPG、JPEG、PNG或GIF!"
                };
            }
            return {
                state:true
                ,message:""
            };
        } //这是检查选择的图片格式是否正确的逻辑，用来扩展。默认就检查后缀名。

    };
    $.extend(settings,opts);

    var fileInput=$(settings.fileInput);
    var app={
        init:function(){
            var me=this;
            me.initEvents();
        }
        ,initEvents:function(){
            var _fileDom=fileInput[0];
            console.log("=============length");
            console.log(_fileDom.files);
            $(fileInput).change(function(){

                if (_fileDom.files.length === 0) {
                    settings.onWarning("no file");
                    return;
                }
                var oFile=_fileDom.files[0];
                var _detectInfo=settings.fileDetect(oFile);
                if(_detectInfo.state==false){
                    settings.onWarning("detect error",_detectInfo.message);
                    return;
                }
                settings.change(oFile);


            });
        }
        //--图片上传。
        ,upload:function(){
            var _fileDom=fileInput[0];
            if (_fileDom.files.length === 0) {
                settings.onWarning("no file");
                return;
            }
            var oFile=_fileDom.files[0];
            var _detectInfo=settings.fileDetect(oFile);
            if(_detectInfo.state==false){
                settings.onWarning("detect error",_detectInfo.message);
                return;
            }
            var file=fileInput[0].files[0];
            var xhr = new XMLHttpRequest();
            function uploadFile() {
                var fd = new FormData();
                fd.append("image", file);
                var _paras={};
                settings.beforeUpload(file,_paras);
                for(var key in _paras){
                    fd.append(key,_paras[key]);
                }

                xhr.upload.addEventListener("progress", uploadProgress, false);
                xhr.addEventListener("load", uploadComplete, false);
                xhr.addEventListener("error", uploadFailed, false);
                xhr.addEventListener("abort", uploadCanceled, false);
                xhr.open("POST", settings.uploadURL);
                xhr.send(fd);
            }

            function uploadProgress(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    console.log(percentComplete);
                    settings.uploadProgress(percentComplete);
                    //document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
                }
                else {
                    //document.getElementById('progressNumber').innerHTML = 'unable to compute';
                    //uploadItemObject.setStateTips("未知上传进度");
                    console.log("未知上传进度。");
                }
            }

            function uploadComplete(evt) {
                /* This event is raised when the server send back a response */
                //alert(evt.target.responseText);
                /*1.xhr.readyState:XMLHttpRequest狀態，等於4表示數據已經接收完畢

                 2.xhr.status:狀態碼，200表示正常

                 3.xhr.responseText:server回應的文字數據*/
                //console.log(evt.target.status);
                //console.log(evt.target.readyState);
                //console.log(xhr.status);
                var httpStateCode=evt.target.status;
                var responseText=evt.target.responseText;
                settings.uploadComplete(httpStateCode,responseText);
                return;

            }

            function uploadFailed(evt) {
                //alert("There was an error attempting to upload the file.");
                settings.uploadFailed(evt);

                console.log("上传失败");
                return;
            }

            function uploadCanceled(evt) {
                //alert("The upload has been canceled by the user or the browser dropped the connection.");
                //uploadItemObject.showError();
                console.log("上传取消");
            }
            uploadFile();
        }
    };

    app.init();

    var returnObj={
        upload:function(){
            app.upload();
        }
    };

    return returnObj;
}
/***
 *
 * 下面是基于imageFileUpload这个基础方法添加相应逻辑及显示方式而制作的
 * SingleImageUploader
 * 用来上传预览，上传图片及显示上传进度和状态。
 * 注意，对应的html结构为：
 *
 * 对应的样式在后台的ui。css里面，有注释。
 * 这个控件推荐使用，因为是基于上面那个改进而来。
 *
 * ***/

UiUtil.SingleImageUploader=function(opts){

    var _upload_tpl=' <span class="single-image-uploader" ui="single-image-uploader">'+
        '<img ui="image-preview" class="uploader-preview-img" src="">'+
        '<span class="upload-percentage" ui="percentage">0%</span>'+
        '<span class="uploader-progress-layer" ui="percent-layer"></span>'+
        '<span class="upload-state" ui="percent-state"></span>'+
        '<input type="file" class="uploader-file-input" ui="file-input">'+
        '</span>';
    var settings={
        defaultImage:"/statics/images/no_picture.gif"//默认图片。假如没有就用这个值。
        ,container:{} //默认容器。。。必须指定渲染这个部件的容器。
        ,uploadURL:"/service/uploadImg.do" //这是后台接收图片的url地址。
        ,uploadKey:"image" //上传时候该文件的表单里面的name。默认为image。
        ,onErrorImage:"/statics/images/no_picture.gif"
        ,beforeUpload:function(file,_paras){

        }//--上传之前可以改变一些参数的。譬如添加其他额外参数。
        ,uploadProgress:function(currentPercent){

        }
        ,uploadComplete:function(httpStateCode,responseText){

        }//上传结束时候，接受到服务端返回来的statecode和输出字符串。
        ,onWarning:function(errorCode,errorMsg){
            if(errorCode=="detect error"){
                alert(errorMsg);
                return;
            }
            if(errorCode=="no file"){
                alert("请需要上传的图片");
                return;
            }

        }
        ,fileDetect:function(oFile){
            if(!new RegExp("(jpg|jpeg|gif|png)+","gi").test(oFile.type)){
                return {
                    state:false
                    ,message:"图片类型必须是JPG、JPEG、PNG或GIF!"
                };
            }
            return {
                state:true
                ,message:""
            };
        } //这是检查选择的图片格式是否正确的逻辑，用来扩展。默认就检查后缀名。

    };
    $.extend(settings,opts);

    var _container={};
    var _root={};
    var _file_input={};
    var _preview={};
    var _percentage={};
    var _percent_layer={};
    var _img_uploader_plugin={};
    var _percent_state={};
    var innerTools={
        getBase4FromImgFile:function(file,callBack){

            var reader = new FileReader();
            reader.onload = function(e) {
                var base64Img= e.target.result;
                //var $img = $('<img>').attr("src", e.target.result)
                //$('#preview').empty().append($img)
                if(callBack){
                    callBack(base64Img);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    var appData={
        sending:false //是否正在上传。
    };
    var app={
        init:function(){
            var me=this;
            _container=$(settings.container);
            me.renderUI();
        }
        ,renderUI:function(){
            var me=this;
            _root=$(_upload_tpl);
            _preview=_root.find('[ui="image-preview"]');

            _file_input=_root.find('[ui="file-input"]');
            _percentage=_root.find('[ui="percentage"]');
            _percent_layer=_root.find('[ui="percent-layer"]');
            _percent_state=_root.find('[ui="percent-state"]');


            if(util.checkEmpty(settings.defaultImage)==false){
                _preview.attr("src",settings.defaultImage);
                me.setNormal();
            }

            _preview[0].onerror=function(){
                var event = arguments[0]||window.event;
                if(event!=undefined&&event.srcElement!=undefined){
                    var img=event.srcElement;
                    img.src=settings.onErrorImage;

                }
                img.onerror=null;
            }
            _container.empty().append(_root);
            _img_uploader_plugin=UiUtil.ImageFileUpload({
                fileInput:_file_input //这是文本框对象，请传进来。
                ,uploadURL:settings.uploadURL
                ,uploadKey:settings.uploadKey
                ,change:function(oFile){
                    setTimeout(function(){_file_input.hide();},10);
                    me.setNormal();
                    me.setProgress(0);
                    innerTools.getBase4FromImgFile(oFile,function(base64img){
                        _preview.attr("src",base64img);
                        _img_uploader_plugin.upload();
                    });
                }//这是文件改变以后的回调函数，一旦选择了文件并且通过了基本的文件检测--譬如有没有文件，文件格式是否正确，那么就会调用该方法了。
                ,beforeUpload:function(file,_paras){
                    settings.beforeUpload(file,_paras);
                }//--上传之前可以改变一些参数的。譬如添加其他额外参数。

                ,uploadProgress:function(currentPercent){
                    me.setProgress(currentPercent);
                    settings.uploadProgress(currentPercent);
                    //console.log("目前图片上传进度："+currentPercent);
                } //这是上传过程中计算上传进度的回调函数。
                ,uploadComplete:function(httpStateCode,responseText){
                    //console.log(httpStateCode,responseText);
                    _file_input.show();
                    settings.uploadComplete(httpStateCode,responseText);

                }//上传结束时候，接受到服务端返回来的statecode和输出字符串。
                ,uploadFailed:function(evt){
                    me.setNoDone();
                    _file_input.show();

                }
                ,onWarning:function(errorCode,errorMsg){
                    settings.onWarning(errorCode,errorMsg);
                } //这是提示各种错误的接口，用来以后扩展错误提示方式，暂时就用原始的alert来代替。
                ,fileDetect:function(oFile){

                    return settings.fileDetect(oFile);
                } //这是检查选择的图片格式是否正确的逻辑，用来扩展。默认就检查后缀名。
            });
        }
        ,setNormal:function(){

            _root.removeClass("no-done").removeClass("done");
            _percent_layer.hide();
            _percent_layer.css("height",0);
            _percentage.hide();

        }
        ,setProgress:function(percent){

            _percent_layer.show().css("height",percent+"%");
            _percentage.show().text(percent+"%");

        }
        ,setDone:function(){
            _root.removeClass("no-done").removeClass("done").addClass("done");
            _percent_layer.hide();
            _percentage.hide();

        }
        ,setNoDone:function(){
            _root.removeClass("no-done").removeClass("done").addClass("no-done");
            _percent_layer.hide();
            _percentage.hide();

        }

    };

    app.init();

    var returnObj={
        setSuccess:function(){
            app.setDone();
        }
        ,setFailed:function(){
            app.setNoDone();
        }
        ,setDone:function(){
            app.setDone();
        }
        ,setNoDone:function(){
            app.setNoDone();
        }
        ,setNormal:function(){
            app.setNormal();
        }


    };

    return returnObj;

}
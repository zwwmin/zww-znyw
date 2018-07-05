/**
 * 该插件用于兼容ie6-7-8-9及现代浏览器的异步上传文件。
 * 请注意，在ie6-7-8-9上面的原理是：
 * 新添加一个表单和一个iframe，然后每次选择都将file输入框复制到该表单上面，然后submit整个表单，这样就可以实现类似ajax提交文件的效果，
 * 但是有一点是没办法处理的，就是在客户端预览图片及判断文件大小。现代浏览器则可以。
 * 改自main.js，用于实现直接上传某个文件
 */
var AjaxFileInput=function(opts){
    var settings={
        container:"" //放置input框的容器
        ,inputFileElement:"" //input file的文件输入框的elemnt，可以是jquery元素，也可以是dom元素。 请注意，由于每次上传重新生成一个input输入框到container里面，所以建议container里面除了file输入框什么都别放了。
        ,onValidate:function(fileName,fileDom){
            return true;
        } //这是选择文件之后的验证逻辑。假如返回true的话，那么就可以继续上传图片到服务端的某个url，否则不执行。
        ,max_size:5*1024*1024 //限制上传大小--注意，在ie6-9上面是没办法在客户端获取尺寸的，所以这种时候这个属性相当于没用。
        ,url:"" //上传时候的url。
        ,beforeUpload:function(paras){

        }//上传文件之前会调用这个方法。你可以返回一个Object来，譬如：{birthday:"2016-2-05"}这样，假如有这种形式的参数，那么无论在兼容模式下面还是google等现代浏览器的正常模式下面，该参数都会添加到表单然后上传上去。
        ,onError:function(errorMsg){

        }
        ,onComplete:function(serverResult){

        }
        ,paras:{}
        ,inpName:'image'
    };

    $.extend(settings,opts);

    var _inpName = settings.inpName;

    var _container=$(settings.container);
    var _currentFileButton={};
    _currentFileButton=$(settings.inputFileElement);
    var _tpl_file_html=_container.html(); //获取文本框的html，为以后替换新的文本框而做准备。


    var userIEMode=false;
    if(window.FileReader==undefined){
        userIEMode=true;
    }

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


    var _rid="rid_"+util.getRandomWords(5)+"_"+new Date().getTime();
    var _form_id="form_"+_rid;
    var _ifr_id="ifr_"+_rid;

    var el_iframe={};
    var el_form={};
    var isBusy=false;


    var _i_app={
        init:function(){
            var me=this;
            if(userIEMode){
                me.initIEForm();
            }

            me.resetFileInput(settings.inputFileElement,1);

        }
        //--生成ie6-9必须的form表单和iframe来进行ajax异步提交。
        ,initIEForm:function(){

            var me=this;
            var _ifr_html='<iframe id="__ifr_id__" name="__ifr_id__" style="position: absolute; opacity: 0.0; visibility: visible; left:0;top:0; width:0; height: 0;"></iframe>';
            _ifr_html=_ifr_html.replace(/__ifr_id__/g,_ifr_id);
            var _form_html='<form id="__form_id__" action="__url__" target="__ifr_id__" method="post" enctype="multipart/form-data" style="border: 1px solid;" ></form>';

            _form_html=_form_html.replace(/__ifr_id__/g,_ifr_id);
            _form_html=_form_html.replace(/__form_id__/g,_form_id);
            _form_html=_form_html.replace(/__url__/g,settings.url);

            el_form=$(_form_html);
            el_iframe=$(_ifr_html);
            $(document.body).append(el_form);
            $(document.body).append(el_iframe);


            //--初始化iframe为ajax的相关操作。
            me.initIFrameLoaded();

        }
        //--初始化iframe onload的相关事件。
        ,initIFrameLoaded:function(){
            var me=this;
            var ifr_json=document.getElementById(_ifr_id);


            function handle_return(){

                var doc = ifr_json.contentDocument || ifr_json.document;
                var _json_str=doc.body.innerText;
                var res={};
                try{
                    res=JSON.parse(_json_str);
                    isBusy=false;
                }
                catch(ex){
                    res=_json_str;
                    isBusy=false;
                    settings.onError(_json_str);
                }
            }
            if (ifr_json.attachEvent){
                ifr_json.attachEvent("onload", function(){
                    handle_return();
                });
            } else {
                ifr_json.onload = function(){
                    handle_return();
                };
            }
        }

        //--上传，用iframe及form方式。
        ,uploadByForm:function(paras){
            var me=this;

            el_form.empty();
            el_form.append('<input type="submit" value="提交">');
            for(var key in paras){
                var _hide_val=$('<input type="hidden" value="" name="'+key+'">');
                _hide_val.val(paras[key]);
                el_form.append(_hide_val);
            }
            // if(util.checkEmpty(_currentFileButton.attr("name"))){
            //     _currentFileButton.attr("name","file");
            // }

            //设置inpName
            _currentFileButton.attr("name",_inpName);

            el_form.append(_currentFileButton);

            setTimeout(function(){
                el_form[0].submit();
            },20);

        }
        ,uploadByHttpRequest:function(paras){
            var me=this;

            var file=$(_currentFileButton)[0].files[0];

            var xhr = new XMLHttpRequest();
            function uploadFile() {
                var fd = new FormData();
                var _uploadKey="file";
                // if(util.checkEmpty(_currentFileButton.attr("name"))==false){
                //     _uploadKey=_currentFileButton.attr("name");
                // }

                //设置inpName
                _uploadKey = _inpName;

                fd.append(_uploadKey, file);


                for(var key in paras){
                    fd.append(key,paras[key]);
                }

                xhr.upload.addEventListener("progress", uploadProgress, false);
                xhr.addEventListener("load", uploadComplete, false);
                xhr.addEventListener("error", uploadFailed, false);
                xhr.addEventListener("abort", uploadCanceled, false);
                xhr.open("POST", settings.url);
                xhr.send(fd);
            }

            function uploadProgress(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    //uploadItemObject.setProgress(percentComplete);
                    //document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
                }
                else {
                    //document.getElementById('progressNumber').innerHTML = 'unable to compute';
                    //uploadItemObject.setStateTips("未知上传进度");
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
                if(evt.target.status!=200){
                    isBusy=false;
                    settings.onError(evt.target.status+"错误");
                    //uploadItemObject.showError(evt.target.status+"错误");
                }
                else{
                    var res_json="";
                    try{
                        res_json=JSON.parse(evt.target.responseText);
                        isBusy=false;
                        settings.onComplete(res_json);
                    }
                    catch(ex){
                        res_json=evt.target.responseText;
                        isBusy=false;
                        settings.onError(res_json);
                    }

                }

            }

            function uploadFailed(evt) {
                //alert("There was an error attempting to upload the file.");
                //uploadItemObject.showError();
                settings.onError("上传失败");
            }

            function uploadCanceled(evt) {
                //alert("The upload has been canceled by the user or the browser dropped the connection.");
                //uploadItemObject.showError();
            }
            uploadFile();

            isBusy=false;
        }
        //--重新设定上传按钮事件，请注意，假如要hack onchange事件的话，那么这个方法调用是必不可少的。
        ,resetFileInput:function(__file_input,__first){
            var me=this;
            var _fileInput=$(__file_input);
            var _fileDom=_fileInput[0];
            _currentFileButton=_fileInput;

            if(__first==1){
                //if(isBusy){
                //    return;
                //}
                //isBusy=true;

                var _fake_path=_fileDom.value;

                var __theFileName="";
                if(util.checkEmpty(_fake_path)){

                }
                else{
                    if(_fake_path.indexOf("\\")!=-1){
                        var arr2=_fake_path.split("\\");
                        __theFileName=arr2[arr2.length-1];
                    }
                    else if(_fake_path.indexOf("/")!=-1){
                        var arr2=_fake_path.split("/");
                        __theFileName=arr2[arr2.length-1];
                    }
                    else {
                        //--火狐只有 4.png这个格式的。
                        __theFileName=_fake_path;
                    }
                }

                if(settings.onValidate(__theFileName,_fileDom)==false){
                    isBusy=false;
                    var _new_file_input=$(_tpl_file_html);
                    me.resetFileInput(_new_file_input);
                    _container.empty().append(_new_file_input);

                    return;
                }

                if(util.checkEmpty(_fake_path)==true){
                    var _new_file_input=$(_tpl_file_html);
                    me.resetFileInput(_new_file_input);
                    _container.empty().append(_new_file_input);
                    return;
                }

                _paras = settings.paras;

                if(userIEMode){
                    me.uploadByForm(_paras);
                }
                else{
                    me.uploadByHttpRequest(_paras);
                }
            }     


        }
    };
    _i_app.init();
}


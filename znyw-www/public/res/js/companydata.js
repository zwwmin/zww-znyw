/**
 * Created by DGDL-08 on 2017/2/20.
 */
window.onload=function() {
    function initUploader(){
        var _Uploader=new CompanyHtmlImageUploader({
            container:$("#industry-list")
            ,fileInput:$("#industry-chooser")
            ,uploadURL:"/api/uploadImageNew"
            ,uploadKey:"image"
            ,onInit:function(){}
            ,onWarning:function(ErrorCode,data){
                var _errorStr="";
                if(ErrorCode==image_upload_warning_code.NoPhoto){
                    _errorStr="请选择图片";
                }
                else if(ErrorCode==image_upload_warning_code.NotAllowFormat){
                    _errorStr="文件类型必须是JPG、JPEG、PNG或GIF!";
                }
                else if(ErrorCode==image_upload_warning_code.OverAmount){
                    _errorStr="最多只能上传8张图片。";
                }
                else if(ErrorCode==image_upload_warning_code.OverSize){
                    _errorStr="照片不能超过10M!请使用容量更小的照片。";
                }
                alert(_errorStr);
            }
            ,beforeUpload:function(imgFile,paras){
                //paras["test_para_1"]="test";
//                paras["orderno"]=queryObject["orderno"];
            } //上传前的处理。
            ,onUploadComplete:function(itemElement,server_data,itemObject){
                if(typeof (server_data)=="string"){
                    server_data=JSON.parse(server_data);
                }
                if(server_data.state=="success"){
                    //itemElement.find('.hmlu-bottom-bar').hide();
                    itemElement.attr('url',server_data.msg);

                    return true;
                }
                else{

                    return false;
                }

                return true;
            } //上传结束后的处理。
            ,onDelete:function(itemRoot){
                var _pic_url=$(itemRoot).attr("url");
                if(_pic_url==undefined){
                    _pic_url=$(itemRoot).find('[ui="preview-image"]').attr("src");
                }
                return;
                itemRoot.remove();
            }
//            ,defaultImages:_image_arr

        });
    }
    initUploader();

};
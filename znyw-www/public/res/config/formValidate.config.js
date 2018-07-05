$(function(){
    var error_class="publish-tips-error";
    var info_class="publish-tips-default";
    var success_class="publish-tips-success";
    var __settings={
        showFocus:function(rulename,element,message,iptElement){
            /*$(element).removeClass(success_class);
            $(element).removeClass(info_class);
            $(element).removeClass(error_class);
            $(element).addClass(info_class);
            $(element).text(message);*/

        }//显示提示信息时候执行这个方法。
        ,showError:function(rulename,element,message,iptElement){
           /* $(element).removeClass(success_class);
            $(element).removeClass(error_class);
            $(element).removeClass(info_class);
            $(element).addClass(error_class);
            $(element).text(message);*/
            var notification5 = new ValidateNotice({
                message : message,
                location:"inner-right",
                element:iptElement,
                considerScroll:false,
                ttl:3000
            });
            notification5.show();

        }//显示错误信息时候的显示方式。
        ,showSuccess:function(rulename,element,message,iptElement){
            /*$(element).removeClass(success_class);
            $(element).removeClass(error_class);
            $(element).removeClass(info_class);

            if(util.checkEmpty(message)==false){
                $(element).addClass(success_class);
                $(element).text(message);
            }
            else{
                $(element).text("");
            }
            */
        }//显示成功信息时候的显示方式。
        //--清空所有提示信息的方法，这里定义，当然，系统会给你一个默认的实现方式的。rulenames表示当前所有规则的集合数组
        //elements表示这个所有提示元素的集合数组。
        ,clearTips:function(rulenames,elements,iptElements){
            /*$(elements).removeClass(success_class);
            $(elements).removeClass(error_class);
            $(elements).removeClass(info_class);
            $(elements).text("");
            */
        }

    };
    formValidate.setDefaultConfig(__settings);
    formValidateSync.setDefaultConfig(__settings);
});

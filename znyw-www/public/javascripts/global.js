window._default_image1="/images/nopic1.jpg"; //大正方形
window._default_image2="/images/nopic2.jpg";//大长方形
window._default_image3="/images/nopic3.jpg";//小长方形
window._default_avatar="/images/noavatar_big.gif";
window._default_image4="/images/fbxq_zwt_icon@2x.png";
window._default_image5="/images/grzx_mrtx_icon.png";
//电工认证无图片
window._default_image6="/images/grzx_dgrztg_png.png";

window._isFirefox=navigator.userAgent.toUpperCase().indexOf("FIREFOX")?true:false;
// if( window._isFirefox ){
//     var $E = function(){var c=$E.caller; while(c.caller)c=c.caller; return c.arguments[0]};
//     __defineGetter__("event", $E);
// }

function NoPic(obj,spec){

    if(spec==1){
        obj.src=window._default_image1
    }else if(spec==2){
        obj.src=window._default_image2
    } else if(spec==3){
        obj.src=window._default_image3
    }else if(spec==4){
        obj.src=window._default_image4
    }else if(spec==5){
        console.log("5")
        obj.src=window._default_image5
    }else if(spec==6){
        console.log("66")
        obj.src=window._default_image6
    }

    obj.onerror=null;

    /*
    var event = arguments[0]||window.event;
    if(event!=undefined&&event.srcElement!=undefined){
        var img=event.srcElement;
        img.src=window._default_image
        img.onerror=null;
    }
    */

}

// function NoAvatar(){
//     var event = arguments[0]||window.event;
//     if(event!=undefined&&event.srcElement!=undefined){
//         var img=event.srcElement;
//         img.src=window._default_avatar;
//         img.onerror=null;
//     }
// }

function NoAvatar(){

    if( window._isFirefox ){
        var event = arguments.callee.caller.arguments[0];
        if(event!=undefined&&event.target!=undefined){
            var img=event.target;
            img.src=window._default_avatar;
            img.onerror=null;
        }
    }else{
        var event = arguments[0]||window.event;
        if(event!=undefined&&event.srcElement!=undefined){
            var img=event.srcElement;
            img.src=window._default_avatar;
            img.onerror=null;
        }
    }

}

//判断是否有中文
util.hasZh = function (OriginStr) {
    var currentStr = $.trim(OriginStr);
    var re=/[\u4e00-\u9fa5]/g;
    if (re.test(currentStr)){
        return true;
    }else{
        return false;
    }
}

//小写转大写
util.numBig=function(num){
    switch (parseInt(num))
    {
        case 1:
            return "一";
            break;
        case 2:
            return "二";
            break;
        case 3:
            return "三";
            break;
        case 4:
            return "四";
            break;
        case 5:
            return "五";
            break;
        case 6:
            return "六";
            break;
        case 7:
            return "七";
            break;
        case 8:
            return "八";
            break;
        case 9:
            return "九";
            break;
        case 10:
            return "十";
            break;
        default:
            return num;
            break;
    }
}

//价格空和0转0.00 或 面议/￥+价格
util.setPrice=function(price,mianyi){
    if(price==''||price=='0'||price=='0.00'){
        if(mianyi==1){
            return '面议';
        }else{
            return parseFloat('0.00').toFixed(2);
        }
    }else{
        if(mianyi==1){
            return '￥'+parseFloat(price).toFixed(2);
        }else{
            return parseFloat(price).toFixed(2);
        }
    }
}
//是否有价格
util.hasPrice=function(price){
    if(price==''||price=='0'||price=='0.00'||price=='面议'){
        return false;
    }else{
        return true;
    }
}

//支付宝回调网站地址（已取消）
//var __WebUrl='http://localhost:3002';
var __WebUrl='http://webbld.easyder.com';
//var __WebUrl='http://www.dianlibian.com';
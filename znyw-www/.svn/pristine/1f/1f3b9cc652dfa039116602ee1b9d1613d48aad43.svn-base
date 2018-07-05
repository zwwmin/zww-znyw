/*为了避免忘记写文档，所以直接写在这里。
 *
 * 一、浏览器相关信息，是否ie6可以利用这个来判断。
 * 浏览器的相关信息可以通过navigator来获取，例如一个ie6的信息：
 * navigator.appName 浏览器名称：Microsoft Internet Explorer
 * navigator.appVersion 浏览器版本：4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) --问：如何判断是否ie6？
 * navigator.appCodeName 代码：Mozilla
 * navigator.platform 平台：Win32
 * navigator.cookieEnabled 是否启用cookies :true
 * navigator.userAgent 浏览器的用户代理报头：Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)
 * 另一个报头例子：Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36
 * */

var util={};
util._vars={
    server_time:0 //服务端时间

    ,client_time:0 //客户端时间。

    ,time_diff:0 //服务端和客户端相差时间。
};
util.checkEmpty = function (OriginStr) {
    var currentStr = $.trim(OriginStr);
    if (currentStr == "") { return true; }
    else { return false; }
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

//是否为空字符串
util.isEmpty = function (OriginString) {
    var currentStr = $.trim(OriginString);
    if (currentStr == "") { return true; }
    else { return false; }
};
util.isRequired = function (OriginString) {

    var currentStr = $.trim(OriginString);
    if (currentStr == "") { return false; }
    else { return true; }
}
util.CustomRegex=function(OriginString,RegexStr){

    var re = new RegExp();//RegExp是一个对象,和Aarray一样
    //但这样没有任何效果,需要将正则表达式的内容作为字符串传递进去
    try{
        re =new RegExp(RegexStr,"i");//最简单的正则表达式,将匹配字母a
        return re.test(OriginString);
    }
    catch (ee){
        alert("自定义正则表达式错误！："+ee);
        return false;
    }

}

//是否邮箱地址
util.isEmailAddr = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /\w+([-+.']?\w*)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};
//是否为电话号码
util.isPhoneNumber = function (OriginString) {

    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /^(\(\d{3,4}-|\d{3,4}-)?\d{7,11}$/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};

//是否interneturl
util.isURL =  function(str_url){
    function IsURL(urlString)
    {
        var  regExp = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/i;

        if (urlString.match(regExp))

            return true;
        else

            return false;
    }
    return IsURL(str_url);
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re=new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)){
        return (true);
    }else{
        //--然后判断短地址。
        var str=str_url;
//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
//下面的代码中应用了转义字符"\"输出一个字符"/"
        var reg_=/^(http:\/\/)?(?:[\w-\.]{0,255})(?:(?:\/?[^\s]{0,255}){0,255})/g;
        var bb = reg_.test(str);
        if(bb==true){
            return true;
        }else{
            return false;
        }
        return (false);
    }
};

//是否qq号码
util.isQQNumber = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /[1-9][0-9]{4,}/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};
//是否一般账号
util.isAccountString = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断

    var pattern_email = /^[a-zA-Z0-9_]?[a-zA-Z0-9_\s]+$/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};

//是否IP地址
util.isIPAddr = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /\d+\.\d+\.\d+\.\d+/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};
//是否邮政编号
util.isPostCode = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /[1-9]\d{5}(?!\d)/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};
//是否浮点数
util.isFloat = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};
util.isNumberic=function(OriginStr){
    var currentStr = OriginStr;
    //用正则表达式进行判断
    var pattern_email = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
}
util.isNumeric=function(OriginStr){
    var currentStr = OriginStr;
    //用正则表达式进行判断
    var pattern_email = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
    if (!pattern_email.test(currentStr)&&util.isInteger(OriginStr)==false) {

        return false;
    }
    else { return true; }
}
//是否整数
util.isInt = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /^-?[1-9]?\d*$/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};
util.isInteger=function(OriginString){
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /^-?[1-9]?\d*$/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
}
//是否日期
util.isDateTime = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/;
    if (!pattern_email.test(currentStr)) {
        //测试第二种日期格式
        var patter_2 = /^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}[\s]+[0-9]{2}:[0-9]{2}:[0-9]{2}$/;
        if (!patter_2.tet(OriginString)) { return false; }
        else { return true; }
    }
    else { return true; }
};
//是否布尔值
util.isBool = function (OriginString) {
    var currentStr = OriginString.toString().toLowerCase();
    //用正则表达式进行判断
    var pattern_email = /(false|true)/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};
util.isBoolean=function(OriginString){
    var currentStr = OriginString.toString().toLowerCase();
    //用正则表达式进行判断
    var pattern_email = /(false|true|1|0)/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
}

util.isColor=function(OriginString){
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /^(#)?[0-9|a-z|A-Z]+$/;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
}
util.StringRange=function(OriginString,minLen,maxLen){
    var themin=parseInt(minLen);
    if(isNaN(themin)==false){
        if(OriginString.length<themin){
            return false;

        }
    }
    var themax=parseInt(maxLen);
    if(isNaN(themax)==false){
        if(OriginString.length>maxLen){
            return false;
        }
    }
    return true;

}
util.NumberRange=function(OriginString,minLen,maxLen){
    var theFloat=parseFloat(OriginString);
    if(isNaN(theFloat)){
        return false;
    }
    var themin=parseFloat(minLen);
    if(isNaN(themin)==false){
        if(theFloat<themin){
            return false;

        }
    }
    var themax=parseFloat(maxLen);
    if(isNaN(themax)==false){
        if(theFloat>maxLen){
            return false;
        }
    }
    return true;

}


//是否普通字符串---即中文，下划线，英文字母，数字组成的字符串
util.isAccountString_includeChinese = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /^[\u4E00-\u9FA5_A-Za-z0-9_\s]*$/ig;

    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};
//是否普通文件名称---即中文，下划线，英文字母，数字组成及一点的字符串
util.isNormalFileName = function (OriginString) {
    var currentStr = OriginString;
    //用正则表达式进行判断
    var pattern_email = /^[\u4E00-\u9FA5]*[_A-Za-z\.]*$/ig;
    if (!pattern_email.test(currentStr)) {
        return false;
    }
    else { return true; }
};
//是否移动手机号码
util.isMobile = function (OriginString) {
    var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    patrn = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (!patrn.test(OriginString)) return false
    return true
};
//是否移动手机号码
util.isSimpleMobile = function (OriginString) {
    var patrn = /^1[0-9]{10,10}$/;
    if (!patrn.test(OriginString)) return false
    return true
};
//是否家用电话及传真号码
util.isTel = function (OriginString) {
    //var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/;
    var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    if (!patrn.test(OriginString)) return false
    return true
};
util.isIDCard = function (id) {

    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(id) === false)
    {
        return  false;
    }  else{
        return true;
    }
    /*  if (util.checkEmpty(sId) == true) {
     return true;
     }
     var iSum = 0;
     var info = "";
     if (!/^\d{17}(\d|x)$/i.test(sId)) return false;
     sId = sId.replace(/x$/i, "a");
     if (aCity[parseInt(sId.substr(0, 2))] == null) return false;
     var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
     var d = new Date(sBirthday.replace(/-/g, "/"));
     if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false;
     for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
     if (iSum % 11 != 1) return false;
     return true; //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")
     */

    var arrVerifyCode = [1,0,"x",9,8,7,6,5,4,3,2];
    var wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    var Checker = [1,9,8,7,6,5,4,3,2,1,1];
    var msg = "";
    if(id.length != 15 && id.length != 18) {
        //  Ext.MessageBox.alert("信息提示","身份证号共有15位或18位。");
        return false;
    }

    var ai = id.length == 18 ?  id.substring(0,17) : id.slice(0,6) + "19" + id.slice(6,16);


    if (!/^\d+$/.test(ai)) {
        //   Ext.MessageBox.alert("信息提示","身份证除最后一位外，必须为数字。");
        return false;
    }


    var yyyy = ai.slice(6,10);
    var mm = ai.slice(10,12)-1;
    var dd = ai.slice(12,14);
    var d = new Date(yyyy,mm,dd);
    var now = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth();
    var day = d.getDate();


    if (year != yyyy || mon != mm || day != dd) {
        //Ext.MessageBox.alert("信息提示","身份证无效。");
        return false;
    }


    for(var i = 0,ret = 0; i < 17; i++){
        ret += ai.charAt(i) * wi[i];
    }

    ai += arrVerifyCode[ret %= 11];
    ai = ai.toUpperCase();


    if(id.length == 18 && id != ai){
        //  Ext.MessageBox.alert("信息提示","身份证无效。");
        return false;
    }
    return true;

};
//浏览器判断
util.isIE6=function(){
    return /MSIE 6/g.test(navigator.appVersion);
}
util.getRandomWords=function(n) {
    var baseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0, r = ""; i < n; i++) r += baseStr.charAt(Math.floor(Math.random() * 62));
    return r;
}

util.flashChecker=function()
{
    var hasFlash=0;//是否安装了flash
    var flashVersion=0;//flash版本

    if(document.all)
    {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if(swf) {
            hasFlash=1;
            VSwf=swf.GetVariable("$version");
            flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    }else{
        if (navigator.plugins && navigator.plugins.length > 0)
        {
            var swf=navigator.plugins["Shockwave Flash"];
            if (swf)
            {
                hasFlash=1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i)
                {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return {f:hasFlash,v:flashVersion};
} ;
// 更新：
// 05.27: 1、保证回调执行顺序：error > ready > load；2、回调函数this指向img本身
// 04-02: 1、增加图片完全加载后的回调 2、提高性能

/**
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @version	2011.05.27
 * @see		http://blog.phpdr.net/js-get-image-size.html
 * @param	{String}	图片路径
 * @param	{Function}	尺寸就绪
 * @param	{Function}	加载完毕 (可选)
 * @param	{Function}	加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
		alert('size ready: width=' + this.width + '; height=' + this.height);
	});
 */
// 更新：
// 05.27: 1、保证回调执行顺序：error > ready > load；2、回调函数this指向img本身
// 04-02: 1、增加图片完全加载后的回调 2、提高性能

/**
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @version	2011.05.27
 * @see		http://blog.phpdr.net/js-get-image-size.html
 * @param	{String}	图片路径
 * @param	{Function}	尺寸就绪
 * @param	{Function}	加载完毕 (可选)
 * @param	{Function}	加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
		alert('size ready: width=' + this.width + '; height=' + this.height);
	});
 */
util.imgReady = (function () {
    var list = [], intervalId = null,

    // 用来执行队列
        tick = function () {
            var i = 0;
            for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]();
            };
            !list.length && stop();
        },

    // 停止所有定时器队列
        stop = function () {
            clearInterval(intervalId);
            intervalId = null;
        };

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();

        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        };

        width = img.width;
        height = img.height;

        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();

        // 完全加载完毕的事件
        img.onload = function () {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();

            load && load.call(img);

            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();

util.Regex={};
/**
 * domain
 * @method DOMAIN
 * @for util.Regex
 * @author kael
 * @example
 *	// match jobcn.com	google.com.hk	google.cn ...
 *	// no match	jobcn..com	job_cn.com	jobcn.fck ...
 */
util.Regex.DOMAIN = /^[a-z0-9]+[-a-z0-9]*\.(?:(?:(?:com|net|org|gov|edu|mil|biz|tel|xxx|int|info|name|aero|asia|mobi|coop|museum)(?:\.[a-z]{2})?)|[a-z]{2})$/i;
/**
 * url
 * @method URL
 * @for util.Regex
 * @author kael
 * @example
 *	// match www.jobcn.com	http://www.google.com.hk	https://google.cn //www.google.com/google ...
 *	// no match	http://jobcn..com	http://www.-jobcn.com	http://www.jobcn.fck ...
 */
util.Regex.URL =/^(?:(?:https?:)?\/\/)?(?:[a-z0-9]+[-a-z0-9]*\.)+(?:(?:(?:com|net|org|gov|edu|mil|biz|tel|xxx|int|info|name|aero|asia|mobi|coop|museum)(?:\.[a-z]{2})?)|[a-z]{2})(?:\/[\w]*[-]?[\w]*)?$/i;;
/**
 * email
 * @method email
 * @for util.Regex
 * @author kael
 * @example
 *	// match abc@jobcn.com	abc@google.com.hk	abc@google.cn ...
 *	// no match	abc@jobcn..com		abc@jobcn.fck ...
 *	// for jobcn by vic: match cissy_wen@dg.luenthai.com
 */
util.Regex.EMAIL = /^[a-z0-9]+[-\w]*(?:\.[a-z0-9]+[-\w]*)*@[a-z0-9]+[-a-z0-9]*\.(?:(?:(?:[-a-z0-9\w]*\.)?(?:com|net|org|gov|edu|mil|biz|tel|xxx|int|info|name|aero|asia|mobi|coop|museum)(?:\.[a-z]{2})?)|[a-z]{2})$/i;
/**
 * mobile
 * @method MOBILE
 * @for util.Regex
 * @author kael
 * @example
 *	// match 13612345678 15012345678 18612345678 ...
 *	// no match	12012345678 136123456789 ...
 */
util.Regex.MOBILE = /^1\d{10}$/;
/**
 * number
 * @method NUMBER
 * @for util.Regex
 * @author kael
 * @example
 *	// match 12.3, 12., 12, 0.5, .5 ...
 *	// no match	12.3.4, 空白 ...
 */
util.Regex.NUMBER = /^\d+\.?|\d*\.\d+$/;
/**
 * ipv4
 * @method IPV4
 * @for util.Regex
 * @author kael
 * @example
 *	// match 1.0.0.0, 1.1.1.1, 255.255.255.255 ...
 *	// no match	0.0.0.0, 0.1.2.3 256.256.256.256 ...
 */
util.Regex.IPV4 = /^(?:25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]\d?)\.(?:(?:25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)\.){2}(?:25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)$/;
/**
 * rgba
 * @method RGBA
 * @for util.Regex
 * @author kael
 * @example
 *	// match rgba(255,255,255,.5) rgba(0,0,0,0) ...
 *	// no match	rgba(256,256,256,.5) ...
 */
util.Regex.RGBA = /^\s*rgba\s*\(\s*(25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)\s*,\s*(\d+\.?|\d*\.\d+)\s*\)\s*$/i;
/**
 * rgb
 * @method RGB
 * @for util.Regex
 * @author kael
 * @example
 *	// match rgb(255,255,255) rgba(0,0,0) ...
 *	// no match	rgb(256,256,256) ...
 */
util.Regex.RGB = /^\s*rgb\s*\(\s*(25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4][0-9]|1\d{2}|[1-9]?\d)\s*\)\s*$/i;
/**
 * 座机号码，大型城市多位8位，小型城市多为7位。
 * @method TEL
 * @for util.Regex
 * @author 5928
 * @example
 * 1、22882222
 * 2、0769-22882222
 * 3、+076922882222
 * 4、+0769 - 22882222
 * */
util.Regex.TEL= /^[+]?(\d){1,4}[ ]?([-]?[ ]?(\d){7,8}){1}$/;
/**
 * QQ号码，4到11位数字，
 * @method QQ
 * @for util.Regex
 * @author 5928
 * @example
 * */
util.Regex.QQ= /^\d{4,11}$/;
/**
 * 邮编，开头不能为0，共6位，
 * @method ZIPCODE
 * @for util.Regex
 * @author 5928
 * @example
 * */
util.Regex.ZIPCODE=/^[1-9][0-9]{5}$/;
/**
 * 作者网址：http://my.oschina.net/femdom/blog/26176?ok=t1&bt2=989988
 *@param {string} url 完整的URL地址
 *@returns {object} 自定义的对象
 *@description 用法示例：var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');

 myURL.file='index.html'

 myURL.hash= 'top'

 myURL.host= 'abc.com'

 myURL.query= '?id=255&m=hello'

 myURL.params= Object = { id: 255, m: hello }

 myURL.path= '/dir/index.html'

 myURL.segments= Array = ['dir', 'index.html']

 myURL.port= '8080'

 yURL.protocol= 'http'

 myURL.source= 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'

 */
util.parseURL=function(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}
//--该方法用于获取当前的后缀参数地址。
util.getQueryObject=function(){
    var _search=location.search;
    var ret = {},
        seg = _search.replace(/^\?/,'').split('&'),
        len = seg.length, i = 0, s;
    for (;i<len;i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        ret[s[0]] = decodeURIComponent(s[1]);
    }
    return ret;
};
util.Array={};
/**
 * 去除数组的空值及undefined值。
 * 例如：
 * arr = [1, 23, , 1],
 * 去掉后变成
 * [1, 23, 1]
 * */
util.Array.Trim=function(arr){
    var i, len;
    len=arr.length-1;
    for (i = len;  i >=0; i--) {
        if (arr[i] === undefined||(typeof(arr[i])=="string"&& $.trim(arr[i]+"").length<=0)) {
            arr.splice(i, 1);
        }
    }
    return arr;
};

/**
 * 判断值是否包含在数组中
 * jQuery 1.9.1 亦支持
 * 使用了严格匹配===,"1"和1是不同的元素
 * @method inArray
 * @for util.Array
 * @author z3f
 * @param {Object} el 任意值
 * @return {Number} 找到则返回序号，否则返回-1
 */
util.Array.inArray = function (el,arr) {
    return util.Array.indexOf(arr,el);
};
/**
 * 数组最小值序号
 * @method minn
 * @for util.Array
 * @param {Array} src 源数组
 * @return {Number} -1 or n
 * @author z3f
 * @Date 2013-06-10
 */
util.Array.minn = function(src) {
    var length = src.length, n = 0,i=-1,v = src[0];
    for(n = 1; n<length; n++){
        if(src[n] < v){
            i = n; v = src[n]
        }
    }
    return i
};
/**
 * 数组最大值序号
 * @method maxn
 * @for util.Array
 * @param {Array} src 源数组
 * @return {Number} -1 or n
 * @author z3f
 * @Date 2013-06-10
 */
util.Array.maxn = function(src) {
    var length = src.length, n = 0,i=-1;
    for(n = 1; n<length; n++){
        if(src[n] > v){
            i = n;v = src[n]
        }
    }
    return i
};
/**
 * 数组查找, 失败返回 -1
 * @method indexOf
 * @for util.Array
 * @param {Array} src 源数组
 * @param {Anything} item 要查找的对象
 * @return {Number}
 * @author kael
 * @Date 2013-04-10
 */
util.Array.indexOf = function(src, item) {
    if(!util.isArray(src)){
        return -1;
    }

    var length = src.length, i = 0;
    for(i = 0; i<length; i++){
        if(src[i] === item){
            return i;
        }
    }

    return -1;
};

util.isArray=function(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}
/**
 * 数组查找, 失败返回 -1
 * @method lastIndexOf
 * @for util.Array
 * @param {Array} src 源数组
 * @param {Anything} item 要查找的对象
 * @return {Number}
 * @author kael
 * @Date 2013-04-10
 */
util.Array.lastIndexOf = function(src, item) {

    var index = this.indexOf(src, item);

    return index === -1 ? -1 : src.length - index - 1;

};

/**
 * cookie读取功能。
 * */

util.Cookie = {
    /**
     * 设置cookie
     * @method set
     * @for util.Cookie
     * @author vic
     * @param {String} key cookie名称
     * @param {String} value cookie值
     * @param {Object} options  {String} domain 所在域名 ; {String} path 所在路径 ; {date} expires 过期事件
     * @return {Boolean} 是否成功
     * @example
     * 		util.Cookie.set('hello','world')
     * 		//hello=world
     */
    set : function(key,value,options){
        var options = options||{};
        if(options.hour){
            var today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + options.hour * 3600000);
        }
        window.document.cookie =
            key + "=" + value
            + (options.path ? "; path=" + options.path : "")
            + (options.expires ? "; expires=" + options.expires.toGMTString() : "")
            + (options.domain ? "; domain=" + options.domain : "");
        return this;
    },

    /**
     * 获取指定cookie
     * @method get
     * @for util.Cookie
     * @author vic
     * @param {String} key cookie名称
     * @return {String} result 返回cookie
     * @example
     * 		util.Cookie.get('hello')
     * 		//返回world
     */
    get : function(key){
        var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
            result = reg.exec(document.cookie);
        if(result){
            return result[2]||null;
        }
    },

    /**
     * 删除指定cookie
     * @method remove
     * @for util.Cookie
     * @author vic
     * @param {String} key cookie名称
     * @return {Boolean} 是否成功
     * @example
     * 		util.Cookie.remove('hello')
     * 		//util.Cookie.remove('hello') == '';
     */
    remove : function(key,options){
        if(!key)return false;
        options = options||{};
        options.expires = new Date(0);
        options.path = '/';
        out.Cookie.set(key,'',options);
        return this;
    },
    /**
     * 检测是否启用了cookie功能
     * @method enabled
     * @for util.Cookie
     * @author vic
     * @return {Boolean} 是否启用
     * @example
     * 		util.Cookie.enabled()
     * 		//返回 true
     */
    enabled : function(){
        return navigator.cookieEnabled || this.set('_',1).get('_') === 1 ;
    }
};
/**
 * 动态加载样式。
 * */
util.Loader={
    css: function(path){
        if(!path || path.length === 0){
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        if($(head).find("link[_path='"+path+"']").length>0){
            //--已经有这个样式了。
            return;
        }
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        //--将path信息添加进去，为了避免重复添加。
        $(link).attr("_path",path);
        head.appendChild(link);
    },
    js: function(path){
        if(!path || path.length === 0){
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        if($(head).find("script[_path='"+path+"']").length>0){
            //--已经有这个脚本了。
            return;
        }
        var script = document.createElement('script');

        script.src = path;
        script.type = 'text/javascript';
        //--将path信息添加进去，为了避免重复添加。
        $(script).attr("_path",path);
        head.appendChild(script);
    }
};
util.isType=function(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === "[object " + type + "]";
    }
}
util.isObject = util.isType("Object");


/**
 * 类型判断，是不是字符串
 * @method isString
 * @for util
 * @author kael
 * @param {Anything} string 可以传入任何值
 * @return {Boolean}
 */
util.isString = util.isType("String");


/**
 * 类型判断，是不是函数
 * @method isFunction
 * @for util
 * @author kael
 * @param {Anything} function 可以传入任何值
 * @return {Boolean}
 */
util.isFunction = util.isType("Function");

/**
 * 类型判断，是不是节点
 * @method isNode
 * @for util
 * @author kael
 * @param {Anything} node 可以传入任何值
 * @return {Boolean}
 */
util.isNode = function (o){
    return (typeof Node === "object" ? o instanceof Node :
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
    );
}

/**
 * 类型判断，是不是HTML元素
 * @method isElement
 * @for util
 * @author kael
 * @param {Anything} element 可以传入任何值
 * @return {Boolean}
 */
util.isElement = function(o){
    return (typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string"
    );
};

;(function(global){
    var k,
        _handlers = {},
        _mods = { 16: false, 18: false, 17: false, 91: false },
        _scope = 'all',
    // modifier keys
        _MODIFIERS = {
            '⇧': 16, shift: 16,
            '⌥': 18, alt: 18, option: 18,
            '⌃': 17, ctrl: 17, control: 17,
            '⌘': 91, command: 91
        },
    // special keys
        _MAP = {
            backspace: 8, tab: 9, clear: 12,
            enter: 13, 'return': 13,
            esc: 27, escape: 27, space: 32,
            left: 37, up: 38,
            right: 39, down: 40,
            del: 46, 'delete': 46,
            home: 36, end: 35,
            pageup: 33, pagedown: 34,
            ',': 188, '.': 190, '/': 191,
            '`': 192, '-': 189, '=': 187,
            ';': 186, '\'': 222,
            '[': 219, ']': 221, '\\': 220
        },
        code = function(x){
            return _MAP[x] || x.toUpperCase().charCodeAt(0);
        },
        _downKeys = [];

    for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

    // IE doesn't support Array#indexOf, so have a simple replacement
    function index(array, item){
        var i = array.length;
        while(i--) if(array[i]===item) return i;
        return -1;
    }

    // for comparing mods before unassignment
    function compareArray(a1, a2) {
        if (a1.length != a2.length) return false;
        for (var i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) return false;
        }
        return true;
    }

    var modifierMap = {
        16:'shiftKey',
        18:'altKey',
        17:'ctrlKey',
        91:'metaKey'
    };
    function updateModifierKey(event) {
        for(k in _mods) _mods[k] = event[modifierMap[k]];
    };

    // handle keydown event
    function dispatch(event, scope){
        var key, handler, k, i, modifiersMatch;
        key = event.keyCode;

        if (index(_downKeys, key) == -1) {
            _downKeys.push(key);
        }

        // if a modifier key, set the key.<modifierkeyname> property to true and return
        if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
        if(key in _mods) {
            _mods[key] = true;
            // 'assignKey' from inside this closure is exported to window.key
            for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
            return;
        }
        updateModifierKey(event);

        // see if we need to ignore the keypress (filter() can can be overridden)
        // by default ignore key presses if a select, textarea, or input is focused
        if(!assignKey.filter.call(this, event)) return;

        // abort if no potentially matching shortcuts found
        if (!(key in _handlers)) return;

        // for each potential shortcut
        for (i = 0; i < _handlers[key].length; i++) {
            handler = _handlers[key][i];

            // see if it's in the current scope
            if(handler.scope == scope || handler.scope == 'all'){
                // check if modifiers match if any
                modifiersMatch = handler.mods.length > 0;
                for(k in _mods)
                    if((!_mods[k] && index(handler.mods, +k) > -1) ||
                        (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
                // call the handler and stop the event if neccessary
                if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
                    if(handler.method(event, handler)===false){
                        if(event.preventDefault) event.preventDefault();
                        else event.returnValue = false;
                        if(event.stopPropagation) event.stopPropagation();
                        if(event.cancelBubble) event.cancelBubble = true;
                    }
                }
            }
        }
    };

    // unset modifier keys on keyup
    function clearModifier(event){
        var key = event.keyCode, k,
            i = index(_downKeys, key);

        // remove key from _downKeys
        if (i >= 0) {
            _downKeys.splice(i, 1);
        }

        if(key == 93 || key == 224) key = 91;
        if(key in _mods) {
            _mods[key] = false;
            for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
        }
    };

    function resetModifiers() {
        for(k in _mods) _mods[k] = false;
        for(k in _MODIFIERS) assignKey[k] = false;
    };

    // parse and assign shortcut
    function assignKey(key, scope, method){
        var keys, mods;
        keys = getKeys(key);
        if (method === undefined) {
            method = scope;
            scope = 'all';
        }

        // for each shortcut
        for (var i = 0; i < keys.length; i++) {
            // set modifier keys if any
            mods = [];
            key = keys[i].split('+');
            if (key.length > 1){
                mods = getMods(key);
                key = [key[key.length-1]];
            }
            // convert to keycode and...
            key = key[0]
            key = code(key);
            // ...store handler
            if (!(key in _handlers)) _handlers[key] = [];
            _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
        }
    };

    // unbind all handlers for given key in current scope
    function unbindKey(key, scope) {
        var keys = key.split('+'),
            mods = [],
            i, obj;

        if (keys.length > 1) {
            mods = getMods(keys);
            key = keys[keys.length - 1];
        }

        key = code(key);

        if (scope === undefined) {
            scope = getScope();
        }
        if (!_handlers[key]) {
            return;
        }
        for (i in _handlers[key]) {
            obj = _handlers[key][i];
            // only clear handlers if correct scope and mods match
            if (obj.scope === scope && compareArray(obj.mods, mods)) {
                _handlers[key][i] = {};
            }
        }
    };

    // Returns true if the key with code 'keyCode' is currently down
    // Converts strings into key codes.
    function isPressed(keyCode) {
        if (typeof(keyCode)=='string') {
            keyCode = code(keyCode);
        }
        return index(_downKeys, keyCode) != -1;
    }

    function getPressedKeyCodes() {
        return _downKeys.slice(0);
    }

    function filter(event){
        var tagName = (event.target || event.srcElement).tagName;
        // ignore keypressed in any elements that support keyboard data input
        return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
    }

    // initialize key.<modifier> to false
    for(k in _MODIFIERS) assignKey[k] = false;

    // set current scope (default 'all')
    function setScope(scope){ _scope = scope || 'all' };
    function getScope(){ return _scope || 'all' };

    // delete all handlers for a given scope
    function deleteScope(scope){
        var key, handlers, i;

        for (key in _handlers) {
            handlers = _handlers[key];
            for (i = 0; i < handlers.length; ) {
                if (handlers[i].scope === scope) handlers.splice(i, 1);
                else i++;
            }
        }
    };

    // abstract key logic for assign and unassign
    function getKeys(key) {
        var keys;
        key = key.replace(/\s/g, '');
        keys = key.split(',');
        if ((keys[keys.length - 1]) == '') {
            keys[keys.length - 2] += ',';
        }
        return keys;
    }

    // abstract mods logic for assign and unassign
    function getMods(key) {
        var mods = key.slice(0, key.length - 1);
        for (var mi = 0; mi < mods.length; mi++)
            mods[mi] = _MODIFIERS[mods[mi]];
        return mods;
    }

    // cross-browser events
    function addEvent(object, event, method) {
        if (object.addEventListener)
            object.addEventListener(event, method, false);
        else if(object.attachEvent)
            object.attachEvent('on'+event, function(){ method(window.event) });
    };


    // set the handlers globally on document
    addEvent(document, 'keydown', function(event) { dispatch(event, _scope) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
    addEvent(document, 'keyup', clearModifier);

    // reset modifiers to false whenever the window is (re)focused.
    addEvent(window, 'focus', resetModifiers);

    // store previously defined key
    var previousKey = global.key;

    // restore previously defined key and return reference to our key object
    function noConflict() {
        var k = global.key;
        global.key = previousKey;
        return k;
    }

    // set window.key and window.key.set/get/deleteScope, and the default filter
    global.key = assignKey;
    global.key.setScope = setScope;
    global.key.getScope = getScope;
    global.key.deleteScope = deleteScope;
    global.key.filter = filter;
    global.key.isPressed = isPressed;
    global.key.getPressedKeyCodes = getPressedKeyCodes;
    global.key.noConflict = noConflict;
    global.key.unbind = unbindKey;

    //if(typeof module !== 'undefined') module.exports = key;

})(util);
//--将json直接转换成为url。
util.Json2URL=function(url,json){

    if(json==undefined||json==null){
        return url;
    }
    if(util.isObject(json)==false){
        return url;
    }
    var _paras=[];
    var para_num=0;
    for(var _key in json){
        para_num++;
        if(util.isObject(json[_key])||util.isArray(json[_key])){
            _paras.push(_key+"="+encodeURIComponent(JSON.stringify(json[_key])));
        }
        else{
            _paras.push(_key+"="+encodeURIComponent(json[_key]));
        }

    }
    var _str_url= util.trim(url);
    if(para_num>0){
        if(_str_url.indexOf("?")!=-1){
            return _str_url+"&"+_paras.join("&");
        }
        else{
            return _str_url+"?"+_paras.join("&");
        }
    }
    else{
        return _str_url;
    }
}
util.trim=function(str)
{
    if(str==undefined||str==null){
        return "";
    }
    if(str.length<=0){
        return "";
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

/////////////////////////////////////////////////////////////////////
//   判断长度是否合格
//
// 引数 s   传入的字符串
//           汉字为两个长度，英文为一个。
//
// 返回值 false   NG
//           true    OK
/////////////////////////////////////////////////////////////////////

util.checkStrLength=function(s){
    var w = 0;
    for (var i=0; i<s.length; i++) {
        var c = s.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
            w++;
        }
        else {
            w+=2;
        }
        /*
         if(c>255){
         w=w+2;
         }
         else{
         w=w+1;
         }*/
    }
    return w;
};
/**
 * shuflle 仿照php制造随机数组。
 * */

util.shuffle=function(originArr){
    var arr=[];
    function randArr(arr) {
        var ret = [],
            i = arr.length,
            n;
        arr = arr.slice(0);

        while (--i >= 0) {
            n = Math.floor( Math.random() * i);
            ret[ret.length] = arr[n];
            arr[n] = arr[i];
        }
        return ret;
    }



    if(originArr==undefined||originArr==null||originArr.length<=0){
        return arr;
    }
    for(var i=0;i<originArr.length;i++){
        arr.push(originArr[i]);
    }
    if(1==1){
        return randArr(arr);
    }
    var _floor = Math.floor, _random = Math.random,
        len = arr.length, i, j, arri,
        n = _floor(len/2)+1;
    while( n-- ){
        i = _floor(_random()*len);
        j = _floor(_random()*len);
        if( i!==j ){
            arri = arr[i];
            arr[i] = arr[j];
            arr[j] = arri;
        }
    }
    //增加切牌操作
    i = _floor(_random()*len);
    arr.push.apply(arr, arr.splice(0,i));
    return arr; //要不要返回打乱后的数组呢？
}
util.isInWeixin=function(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }

};
/**
 * 检查浏览器版本。
 * */
util.browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
//--【base64】base64的转换

//将Ansi编码的字符串进行Base64编码
util.encode64=function(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
            + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
}
//将Base64编码字符串转换成Ansi编码的字符串
util.decode64=function(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;


    if (input.length % 4 != 0) {
        return "";
    }
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        return "";
    }
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;


        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output += String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output += String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
}


util.utf16to8=function(str) {
    var out, i, len, c;


    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}


util.utf8to16=function(str) {
    var out, i, len, c;
    var char2, char3;


    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
        c = str.charCodeAt(i++);
        switch(c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += str.charAt(i-1);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}
util.cutStr=function(str,len,Rprefix){
    if(str==undefined||str==null){
        return "";
    }
    if(str.length>len){
        var str2=str.substring(0,len);
        if(Rprefix!=undefined){
            str2+=Rprefix;
        }
        return str2;
    }
    return str;
};
//--小插件，倒计时。
util.CountDown=function(total,onCountDown,afterCountDown){
    var _total=parseInt(total);
    if(isNaN(_total)){
        return;
    }
    var _interval=null;
    if(_total<=0){
        if(afterCountDown){
            afterCountDown();
        }
        return;
    }
    _interval=setInterval(function(){

        if(_total<=0){
            clearInterval(_interval);
            if(afterCountDown){
                afterCountDown();
            }
            return;
        }
        _total--;
        if(onCountDown){
            onCountDown(_total);
        }

    },1000);

};
//--小插件。在某段时间间隔里面只运行一次这种方法。
util.runOnce=function(callback,timeSep){
    var timmer=null;
    var app={
        run:function(){
            if(timmer==null){

            }
            else{
                clearTimeout(timmer);
            }
            timmer=setTimeout(function(){
                if(callback){
                    callback();
                }
                timmer=null;
            },timeSep);
        }
    };
    return app;

};
//--小插件，根据条件延迟执行某个方法，通常用于执行某些不确定的方法。
//-- condition是一个方法，用于判断是否到了可以执行的地步。
//--callback满足条件后执行的方法。
//--timeSep，每多少毫秒检查一下条件。
//--maxTime 超过了这个时间就是延时了。不再执行。
util.runUntil=function(condition,callback,timeSep,maxTime,callBackFail){
    var _currentTime=0;
    if(condition()==true){
        callback();
        return;
    }
    var _interval=setInterval(function(){
        if(_currentTime>maxTime){
            clearInterval(_interval);
            console.log("该操作已经超时，最大超时时间：【"+maxTime+"】，目前已经执行时间：【"+_currentTime+"】");
            if(callBackFail){
                callBackFail(_currentTime);
            }
            return;
        }
        if(condition()==true){
            clearInterval(_interval);
            callback();
            return;
        }

        _currentTime=_currentTime+timeSep;
    },timeSep);
};


util.getTotalPages=function(pageSize,totalRecored){
    var _totalPages=1;
    if(totalRecored%pageSize==0){
        _totalPages=parseInt(totalRecored/pageSize);
    }
    else{
        _totalPages= parseInt((totalRecored-(totalRecored%pageSize))/pageSize)+1;
    }
    return _totalPages;
};


//--下面这个是用异步方式来遍历队列。防止在异步执行操作的时候出现了问题。
util.asyncForeach=function(arrays,foreachFunction,onFinish){
    //--下面用队列来完成了。
    //--没办法，里面是异步的，for循环会先循环一次然后执行异步内容，也就是说，所有的变量最后都会变成最后一个。现在采用队列执行的方式来处理。

    var _queueBusy=false;
    var _queueFinish=false;
    var _currentQueueIndex=0;
    var _vars={};
    var _differ={
        pause:function(){
            _queueBusy=true;
        }
        ,next:function(){
            _queueBusy=false;
        }
    };
    var _queueInterval=setInterval(function(){
        if(_queueBusy==true){
            return;
        }
        if(_queueFinish==true){
            clearInterval(_queueInterval);
            if(onFinish){
                onFinish();
            }
            return;
        }
        if(_currentQueueIndex>=arrays.length){
            _queueFinish=true;
            return;
        }
        _queueBusy=true;

        var _currentItem=arrays[_currentQueueIndex];
        _currentQueueIndex++;
        if(foreachFunction){
            foreachFunction(_currentItem,_differ);
        }
    },50);
};

util.ServerTime={
    init:function(server_time){
        var _now=new Date().getTime();

        //--修正服务端时间，一定要是毫秒。
        var _real_server_time=parseInt(server_time);
        var _servertime_str=server_time+"";

        if(_servertime_str.length<13){
            var _tens=1;
            for(var i=0;i< (13-_servertime_str.length);i++){
                _tens=_tens*10;
            }
            _real_server_time=_real_server_time*_tens;
        }
        util._vars.server_time=_real_server_time;
        util._vars.client_time=_now;
        util._vars.time_diff=_real_server_time-_now;
    }
    //--根据已经设定好的时间和实际上的时间差距，推算服务端现在的时间。
    ,now:function(){
        var __now=new Date().getTime();
        return __now+util._vars.time_diff;
    }
};
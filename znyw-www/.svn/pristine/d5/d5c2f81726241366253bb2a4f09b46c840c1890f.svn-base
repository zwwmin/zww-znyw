/**
 *
 */
var util={};
util.isArray=function(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}
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
};

util.isType=function(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === "[object " + type + "]";
    }
};
util.isObject = util.isType("Object");


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
    var currentStr = OriginString+"";
    //用正则表达式进行判断
    if(util.checkEmpty(currentStr)){
        return false;
    }
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
util.checkEmpty = function (OriginStr) {
    var currentStr = util.trim(OriginStr);
    if (currentStr == "") { return true; }
    else { return false; }
}
util.getRandomWords=function(n) {
    var baseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0, r = ""; i < n; i++) r += baseStr.charAt(Math.floor(Math.random() * 62));
    return r;
}

//判断是否有中文
util.hasZh=function(str){
    var re=/[\u4e00-\u9fa5]/g;
    if (re.test(str)){
        return true;
    }else{
        return false;
    }
}

//判断后缀是否图片
util.isImage=function(fileName){
    if(fileName==undefined){
        return false;
    }
    var fileNameArr = fileName.split(".");
    var file_ext = fileNameArr[fileNameArr.length-1];//后缀
    file_ext = file_ext.toLowerCase();//转小写
    switch(file_ext){
        case 'jpg':
            return true;
            break;
        case 'jpeg':
            return true;
            break;
        case 'gif':
            return true;
            break;
        case 'png':
            return true;
            break;
        default:
            return false;
            break;
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

//便力电时间格式
util.bldTime=function(timeStr){
    if(timeStr==undefined||timeStr==''){
        return '';
    }else{
        //保留到分
        return timeStr.substr(0,16);
    }
}

//隐藏电话号码
util.hideTel=function(telStr,queryObject){
    if(queryObject.telRule=='1'){
        return telStr;
    }else{
        if(telStr==undefined||telStr==''){
            return '';
        }else{
            return telStr.substr(0,3)+'****'+telStr.substr(telStr.length-1,telStr.length);
        }
    }
}

module.exports=util;

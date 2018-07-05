/*!
 * [关于函数的信息]

 * @author 	[yunfei]
 * @email	[yunfei6558@qq.com]
 * @bolg cgarnett.com
 * @date 2015/11/17
 * @version [1.0]
 * @date 2016/01/14
 * @version [2.0]
 */
var fixTime = function(t) {
    if (t < 10) {
        return '0' + t;
    } else {
        return t;
    }
};
var diffno = function(date1, data2, format) {
    var format = format || 'DD:hh:mm:ss',
        diffDate = data2 - date1, //时间差的毫秒数
        _D = '',
        _H = '',
        _M = '',
        _S = '';
    if (/DD:hh:mm:ss/i.test(format)) {
        _D = fixTime(Math.floor(diffDate / (1000 * 24 * 3600))) ; // 天数相差
        var _Dodd = diffDate % (1000 * 24 * 3600);    //计算天数后剩余的毫秒数
        _H = fixTime(Math.floor(_Dodd / (3600 * 1000))) ; // 小时相差
        var _Hodd = _Dodd % (3600 * 1000);        //计算小时数后剩余的毫秒数
        _M = fixTime(Math.floor(_Hodd / (60 * 1000))) ;  // 分钟相差
        var _Modd = _Hodd % (60 * 1000);      //计算分钟数后剩余的毫秒数
        _S = fixTime(Math.round(_Modd / 1000)) ; // 秒相差
    } else if (/D/i.test(format)) {
        _D = parseInt(fixTime(Math.floor(diffDate / (1000 * 24 * 3600))));
    } else if (/H/i.test(format)) {
        _H = parseInt(fixTime(Math.floor(diffDate / (3600 * 1000))));
    } else if (/M/i.test(format)) {
        _M = parseInt(fixTime(Math.floor(diffDate / (1000 * 60))));
        _S = '';
    } else if (/S/i.test(format)) {
        _S = parseInt(fixTime(Math.floor(diffDate / 1000)));
    }
    return {_D,_H,_M,_S};
};

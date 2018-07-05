/**
 *
 */
var log4js = require("log4js");
var log4js_config = require("../log4js.json");
//
log4js.configure(log4js_config);
// var Logger= log4js.getLogger();
// log4js.configure({
//     appenders: {
//         out: { type: 'stdout' },//设置是否在控制台打印日志
//         info: { type: 'file', filename: './logs/info.log' }
//     },
//     categories: {
//         default: { appenders: [ 'out', 'info' ], level: 'info' }//去掉'out'。控制台不打印日志
//     }
// });
var Logger= log4js.getLogger();
// var logger = log4js.getLogger('info');
// logger.info("~~~info~~~~");
exports.Logger=Logger;//日志记录器。

/**
 * ���ļ������promise�ķ�װ�����ٿ��Կ��������ع��̰ɡ�
 */

var fs=require("fs");
var Q = require('q');
var util=require("util.js");

var PromiseHelper=function(onDone){
    this.taskList=[];
}
PromiseHelper.prototype.addTask=function(_opt){
    var is_array=false;
    is_array=util.isArray(_opt);
    if(is_array){
        for(var i=0;i< _opt.length;i++){
            this.taskList.push(_opt[i]);
        }
    }
    else{
        this.taskList.push(_opt);
    }
}



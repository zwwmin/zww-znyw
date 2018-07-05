/**
 * 不同服务器通信设置。
 */
var ServerConf= {
    // ApiHost: "http://bld.d.easyder.com"
    //  ApiHost: "http://192.168.1.109:8089"
    ApiHost: "http://bld.dianlibian.com"
    // ApiHost: "http://admin.dianlibian.com"
    ,ServicePort:3011

    //--定义相关host及session key name的关系
    ,siteSessionKeys:[
        {host:"localhost:8080",sessionKey:"JSESSIONID"} //本机测试 cookie模拟系统的接口
        ,{host:"bld.easyder.com",sessionKey:"SESSIONID"} //bld.easyder.com对应的sessionid的字段名字。
        ,{host:"bld.d.easyder.com",sessionKey:"SESSIONID"} //bld.easyder.com对应的sessionid的字段名字。
        ,{host:"www.bld.my:9102",sessionKey:"SESSIONID"} //本机测试换
    ]
};
module.exports=ServerConf;

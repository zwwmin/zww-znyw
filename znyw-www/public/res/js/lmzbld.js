/**
 * Created by DGDL-08 on 2017/3/13.
 */
var clock = '';
var nums = 60;
var btn;
//    获取验证码
function lmzverification(arr) {
    var ipt_mobile = $("#tell").val()
    if(!(/^1[34578]\d{9}$/.test(ipt_mobile))) {
        alert("手机号码有误")
    } else {
        $.ajax({
            cache: true,
            type: "post",
            url: "/lmzVerificationCode",
            data: {
                mobile: ipt_mobile
            },
            error: function() {
                alert("服务器异常请刷新页面");
            },
            success: function(data){
                btn = arr;
                btn.disabled = true; //将按钮置为不可点击
                btn.value = nums + 's';
                clock = setInterval(doLoop, 1000); //一秒执行一次
                function doLoop() {
                    nums--;
                    if(nums > 0) {
                        btn.value = nums + 's';
                    } else {
                        clearInterval(clock); //清除js定时器
                        btn.disabled = false;
                        btn.value = '获取验证码';
                        nums = 60; //重置时间
                    }
                }
            }
        });
    }
}
window.onload = function(){
    var btn_submit=$("#btn-submit");
    function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID) {
        //指到手机、 pad的网页
        if(is_weixin()){
            $("#type").val("weixin")
        }else {
            $("#type").val("app")
        }
        btn_submit.click(function () {
            var ipt_contactMobile=$('[name="contact_mobile"]').val();
            var verifyCode=$('[name="verifyCode"]').val();
            var ipt_companyName=$('[name="company_name"]').val();
            var ipt_contactName=$("[name='contact_name']").val();
            if(ipt_contactMobile== ""|| verifyCode ==" "||ipt_companyName==" "|| ipt_contactName==" " ){
                alert("请填写所有信息");
            }else {
                $(".app_email").removeClass("dis").addClass("lmz");
                $(".lmz_btn").click(function () {
                    var ipt_email=$("[name='email']").val();
                    var ipt_platform=$("[name='platform']").val();
                    if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(ipt_email))){
                        alert("邮箱格式错误")
                    }else {
                        $.ajax({
                            url:"/lmzBluehat"
                            ,data:{
                                company_name:ipt_companyName
                                ,contact_name:ipt_contactName
                                ,contact_mobile:ipt_contactMobile
                                ,verifyCode:verifyCode
                                ,email:ipt_email
                                ,platform:ipt_platform
                            }
                            ,method:"post"
                            ,dataType:"json"
                            ,success:function(sdata){
                                if(sdata.code==0){
                                    alert("提交成功");
                                    $(".app_email").addClass("dis");
                                    $(".tishi").removeClass("dis").addClass("lmz");
                                }else{
                                    alert(sdata.message);
                                }
                            }
                            ,error:function(){
                                console.log("信息错误")
                            }
                        });
                    }
                })

            }
        })
    }else {
        $("#type").val("pc");
        btn_submit.click(function () {
            var ipt_contactMobile=$('[name="contact_mobile"]').val();
            var verifyCode=$('[name="verifyCode"]').val();
            var ipt_companyName=$('[name="company_name"]').val();
            var ipt_contactName=$("[name='contact_name']").val();
            var ipt_email=$("[name='email']").val();
            if(ipt_contactMobile== ""|| verifyCode ==" "||ipt_companyName==" "|| ipt_contactName==" "){
                alert("请填写所有信息")
            }else {
                $(".app_email").removeClass("dis").addClass("lmz");
                $(".lmz_btn").click(function () {
                    var ipt_email=$("[name='email']").val();
                    var ipt_platform=$("[name='platform']").val();
                    if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(ipt_email))){
                        alert("邮箱格式错误")
                    }else {
                        $.ajax({
                            url:"/lmzBluehat"
                            // ,data:$("#RepairAddForm").serialize()
                            ,data:{
                                company_name:ipt_companyName
                                ,contact_name:ipt_contactName
                                ,contact_mobile:ipt_contactMobile
                                ,verifyCode:verifyCode
                                ,email:ipt_email
                                ,platform:ipt_platform
                            }
                            ,method:"post"
                            ,dataType:"json"
                            ,success:function(sdata){
                                if(sdata.code==0){
                                    $(".app_email").addClass("dis");
                                    $(".download").removeClass("dis").addClass("lmz");
                                }else{
                                    alert(sdata.message);
                                }
                            }
                            ,error:function(){
                                alert("信息错误")
                            }
                        });
                    }
                })

            }

        })
    }
    $("input").focus(function(){
        $("input").css("color","#000");
    });
    $('.lmz_center_top_buttom').click(function() {
        $('html,body').animate({
            scrollTop: $('.lmz_center_from').offset().top
        }, 800);
    });
};
/**
 * Created by DGDL-08 on 2017/3/21.
 */
$("#personal").click(function(){$(this).removeClass("buttonreg").addClass("buttonpress");$("#enterprise").addClass("buttonreg");$("#extend").val(21)});$("#enterprise").click(function(){$(this).removeClass("buttonreg").addClass("buttonpress");$("#personal").addClass("buttonreg");$("#extend").val(22)});var clock='';var nums=60;var btn;function verification(arr){var ipt_mobile=$("#identity_mod").val();var ipt_img_codes=$("#img_codes").val();if(ipt_mobile==""||ipt_img_codes==""){alert("信息不能为空")}else{if(!(/^1[34578]\d{9}$/.test(ipt_mobile))){alert("手机号码有误")}else{$(".btn_verification").css("background","#1fbcec");$.ajax({url:"/sendVerifyCodeBySID2",data:{mobile:ipt_mobile,img_code:ipt_img_codes},method:"post",success:function(sdata){if(sdata.code==0){btn=arr;btn.disabled=true;btn.value=nums+'s';clock=setInterval(doLoop,1000);function doLoop(){nums--;if(nums>0){btn.value=nums+'s'}else{clearInterval(clock);btn.disabled=false;btn.value='获取验证码';nums=60;}}}},error:function(){}})}}}
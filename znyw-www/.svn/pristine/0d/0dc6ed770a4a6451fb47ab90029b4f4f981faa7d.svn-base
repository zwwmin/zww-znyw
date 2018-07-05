/**
 * Created by DGDL-08 on 2017/2/8.
 */
window.onload=function(){
    var aa = $("#btn-submit-company");
    var ss = $("#btn-submits");
    ss.click(function(){
        var name = $('[name="name"]').val();
        var email = $('[name="email"]').val();
        var region_id = $('[name="region_id"]').val();
        var address = $('[name="address"]').val();
        // console.log(address);
        // console.log(region_id);
        $.ajax({
            cache:true
            ,type:"post"
            ,url:"/api/changeInfo"
            ,dataType:"json"
            ,data:{
                name:name
                ,email:email
                ,region_id:region_id
                ,address:address
            }
            ,error:function (data) {
                alert("error");
            }
            ,success:function(data){
                console.log("success");
                if (data.code == 0){
                    alert("数据保存成功")
                }

            }
        });
    });
    aa.click(function () {

        var region_id = $('[name="region_id"]').val();
        var aar = $('#enterprise').val();
        var aar2 = $('#industry').val();
        var name = $('[name="companyname"]').val();
        var address = $('[name="address"]').val();
        var contact_name = $('[name="contact_name"]').val();
        var contact_mobile = $('[name="contact_mobile"]').val();
        var voltage_transformer_amount = $('[name="voltage_transformer_amount"]').val();
        var electrician_amount = $('[name="electrician_amount"]').val();
        // console.log(region_id);
        $.ajax({
            cache:true
            ,type:"post"
            ,url:"/api/changeCompanyInfo"
            ,dataType:"json"
            ,data:{
                name:name
                ,region_id:region_id
                ,address:address
                ,industry:aar
                ,contact_name:contact_name
                ,contact_mobile:contact_mobile
                ,enterprise_size:aar2
                ,electrician_amount:electrician_amount
                ,voltage_transformer_amount:voltage_transformer_amount
            }
            ,error:function (data) {
                alert("请刷新您的页面");
            }
            ,success:function(data){
                 ss = data.msg;
                var prompt =ss.split('<br/>');
                if(prompt[0] == "更新成功"){

                }else {
                    alert(prompt[0]);
                }
                if (data.code == 0){
                    alert("资料保存成功")
                }

            }
        });
    })


};


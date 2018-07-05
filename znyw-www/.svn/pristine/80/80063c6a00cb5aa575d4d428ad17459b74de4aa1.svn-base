/**
 * Created by DGDL-08 on 2017/11/8.
 */
$(document).ready(function (e) {

    function each() {
        $('.elec_guanbi').each(function () {
            $(this).click(function () {
                $(this).parent().remove();
                $(this).parent().next().val("")
            })
        });
    }

    function getBlob(buffer, format) {
        try {
            return new Blob(buffer, {type: format});
        } catch (e) {
            var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
            buffer.forEach(function (buf) {
                bb.append(buf);
            });
            return bb.getBlob(format);
        }
    }

    // $(".industry-chooser").change(function () {
    //     console.log(this.files[0])
    // });

//     $(".industry-chooser2").localResizeIMG({
//         width: 1500,
//         quality: 10,
//         success: function (result) {
//             var aa = result.base64;
//             var _html ='<div class="elec_img"><span class="elec_guanbi"></span><div class="ele_load " id="load2">上传中</div><img src="'+result.base64+'"></div>';
//             $("#industry-list2").append(_html);
//             each();
//             //截取base64后边的主要内容
//             var arr = aa.split(',');
//             var type = arr[0].match(/:(.*?);/)[1];//获得图片的类型
//             //---把base64转化为二进制----//
//             var text = window.atob(aa.split(",")[1]);
//             var buffer = new Uint8Array(text.length);
//
//             var pecent = 0, loop = null;
//             for (var i = 0; i < text.length; i++) {
//                 buffer[i] = text.charCodeAt(i);
//             }
//             var blob = getBlob([buffer], type);
//             //---把base64转化为二进制----//
//
//             //这个方法同样可以把base64转为二进制
//             var fd = new FormData();//上边是FormData的介绍
//             fd.append('photoupload', blob);
//                $.ajax({
//                    type: "post",
//                    url: "/api/uploadImageNew",
//                    data: fd,
//                    contentType: false,//这个一定要写
//                    processData: false,//这个也一定要写，不然会报错
//                    dataType: "json",//返回类型，有json，text，HTML。这里并没有jsonp格式，如果返回的是jsonp格式,就无法用jsonp实现跨域
//                    jsonp: "callback",
//                    success: function (datas) {
//                        $("#img3").val("");
//                        $("#img3").val(datas.data[0].url);
//                        $("#load2").remove();
//                    },
//                    error: function () { //上传失败
//                        console.log("error");
//                        alert("上传失败请重新上传;");
//                        $("#load2").parent().remove();
//                    }
//                });
//         }
//     });
//     $(".industry-chooser3").localResizeIMG({
//         width: 1500,
//         quality: 10,
//         success: function (result) {
//             var aa = result.base64;
//             var _html ='<div class="elec_img"><span class="elec_guanbi"></span><div class="ele_load " id="load3">上传中</div><img src="'+result.base64+'"></div>';
//             $("#industry-list3").append(_html);
//             each();
//             //截取base64后边的主要内容
//             var arr = aa.split(',');
//             var type = arr[0].match(/:(.*?);/)[1];//获得图片的类型
//             //---把base64转化为二进制----//
//             var text = window.atob(aa.split(",")[1]);
//             var buffer = new Uint8Array(text.length);
//
//             var pecent = 0, loop = null;
//             for (var i = 0; i < text.length; i++) {
//                 buffer[i] = text.charCodeAt(i);
//             }
//             var blob = getBlob([buffer], type);
//             //---把base64转化为二进制----//
//
//             //这个方法同样可以把base64转为二进制
//             var fd = new FormData();//上边是FormData的介绍
//             fd.append('photoupload', blob);
//             $.ajax({
//                 type: "post",
//                 url: "/api/uploadImageNew",
// //                        url: "http://bld.dianlibian.com/api/web_common/uploadMultiImage",
//                 data: fd,
//                 contentType: false,//这个一定要写
//                 processData: false,//这个也一定要写，不然会报错
//                 dataType: "json",//返回类型，有json，text，HTML。这里并没有jsonp格式，如果返回的是jsonp格式,就无法用jsonp实现跨域
//                 jsonp: "callback",
//                 success: function (datas) {
//                     $("#img4").val();
//                     $("#img4").val(datas.data[0].url);
//                     $("#load3").remove();
//
//                 },
//                 error: function () { //上传失败
//                     console.log("error");
//                     alert("上传失败请重新上传;");
//                     $("#load3").parent().remove();
//                 }
//             });
//         }
//     });

    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: '便力电电工入驻',
            desc: '便力电电工入驻',
            link: 'http://webbld.dianlibian.com/weixin/user/electrician',
            imgUrl: 'http://ojca9kvtu.bkt.clouddn.com/5862a400de97f22bb7d1341b3414f289',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回

            },
            success: function (res) {

            },
            cancel: function (res) {

            },
            fail: function (res) {
                console.log(JSON.stringify(res));
            }
        });

        wx.onMenuShareTimeline({
            title: '便力电电工入驻', // 分享标题
            link: 'http://webbld.dianlibian.com/weixin/user/electrician', // 分享链接
            imgUrl: 'http://ojca9kvtu.bkt.clouddn.com/5862a400de97f22bb7d1341b3414f289', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        $("div[name='upload-list']").each(function () {
            $(this).on("click", function(){
                console.log('1111')
                var node=$(this);
                wx.chooseImage({
                    count: 1,
                    success: function (res) {
                        wx.uploadImage({
                            localId: res.localIds.toString(),
                            isShowProgressTips: 1,
                            success: function (res) {
                                $.ajax({
                                    url: "/weixin/uploadImageFromWx"
                                    , data: {
                                        media_id: res.serverId
                                        , upload_folder: 0
                                    }
                                    , method: "post"
                                    , success: function (sdata) {
                                        if(node.children('.weixin_img')){
                                            node.siblings('.weixin_img').remove();
                                        }

                                        node.next().find('img').attr('src',sdata.data[0].url);
                                        node.next().show();
                                        node.siblings('input').val("");
                                        node.siblings('input').val(sdata.data[0].url);
                                        // node.next().val(url);
                                        return;
                                    }
                                    , error: function () {
                                        alert("error")
                                    }
                                });
                            },
                            fail: function (res) {
                                alert(JSON.stringify(res))
                            }
                        });
                    }
                });
            });
        });





    })

})
$(function(){

	// 顶部
	$(".top_nav .tna.dlist,.top_menu2 .tna.dlist").mouseover(function(e){
		$(this).find('ul').show();
	}).mouseout(function(e) {
		$(this).find('ul').hide();
	});

    // 光标定位方法
    $.fn.setCursorPosition = function(option) {
        var settings = $.extend({
            index: 0
        }, option)
        return this.each(function() {
            var elem  = this
            var val   = elem.value
            var len   = val.length
            var index = settings.index
     
            // 非input和textarea直接返回
            var $elem = $(elem)
            if (!$elem.is('input,textarea')) return
            // 超过文本长度直接返回
            if (len < index) return
     
            setTimeout(function() {
                elem.focus()
                if (elem.setSelectionRange) { // 标准浏览器
                    elem.setSelectionRange(index, index)   
                } else { // IE9-
                    var range = elem.createTextRange()
                    range.moveStart("character", -len)
                    range.moveEnd("character", -len)
                    range.moveStart("character", index)
                    range.moveEnd("character", 0)
                    range.select()
                }
            }, 10)
        })
    }

	// IE 支持 placeholder
    // if(!placeholderSupport()){
    //     $('[placeholder]').focus(function() {
    //         var input = $(this);
    //         if (input.val() == input.attr('placeholder')) {
    //             $(this).setCursorPosition();
    //         }
    //     }).blur(function() {
    //         var input = $(this);
    //         var iptType = input.attr('type');
    //         if(iptType=='password'){
    //             input.attr('data-isPwd','1');
    //         }
    //         if (input.val() == '' || input.val() == input.attr('placeholder')) {
    //             input.addClass('placeholder');
    //             input.val(input.attr('placeholder'));
    //             if( iptType=='password' ){
    //                 input.attr('type','text');
    //             }
    //         }
    //     }).keydown(function(){
    //         var input = $(this);
    //         if (input.val() == input.attr('placeholder')) {
    //             input.val('');
    //             input.removeClass('placeholder');
    //             if( input.attr('data-isPwd')=='1' ){
    //                 input.attr('type','password');
    //             }
    //         }
    //     }).keyup(function(){
    //         var input = $(this);
    //         if (input.val() == '') {
    //             var iptType = input.attr('type');
    //             input.addClass('placeholder');
    //             input.val(input.attr('placeholder'));
    //             if( iptType=='password' ){
    //                 input.attr('type','text');
    //             }
    //             $(this).setCursorPosition();
    //         }
    //     }).blur();
    // };

    // backToTop
    $(".backToTop").click(function () {
        $("html,body").animate({ scrollTop: 0 }, 600);
    });

    // 右侧浮动
    bld_util.right_nav();

    // 创建 chosen select
    if( $('.bld_select').length>0 ){
        $('.bld_select').chosen();
    }

    // 默认头像
    if( $('.js_avatar_error').length>0 ){

        // $(".js_avatar_error").attr("onerror", function(){
        //     $(this).attr('src',"/images/noavatar_big.gif");
        // });
        
    }

    fixPPC();

});

window.onresize = function(){
    fixPPC();
}

function fixPPC(){
    var p_p_content = $('.p_p_content');
    if( p_p_content.length>0 ){
        var winH = $(window).height();
        if(winH<=820){
            p_p_content.addClass('p_p_sc');
        }else{
            p_p_content.removeClass('p_p_sc');
        }
    }
}

function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}

//解决IE ajax缓存问题
$.ajaxSetup({ cache: false });
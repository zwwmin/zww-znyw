$(function(){
 //商品价格划过出现
(function(){
    var oBox=$(".good_list");
    oBox.on("mouseenter",".good_list_item",function(){
        var oDl=$(this).find("dl");
        if(oDl.stop(true,true)){            
            oDl.animate({"margin-top":-23},400);
          }

    }).on("mouseleave",".good_list_item",function(){
        var oDl=$(this).find("dl");
        if(oDl.stop(true,true)){            
          oDl.animate({"margin-top":0},400);
        }
    })
})();

///*右侧便利边栏效果*/
//var fslide={};
//;(function(f){
//      f.oFbox="#rgtool_list";
//      f.oGwc="#gwc";
//      f.oGwcbox="#gwc_tipsbox";
//      f.oRetop=".retop-btn";
//      f.oGwcboxTips="#gwc_tipsbox_succ";
//
//      f._show=function(){
//        if($(f.oGwcbox).hasClass('on')){
//          return;
//        }
//        $(f.oGwcbox).addClass('on');
//        $(f.oGwcbox).stop(true,true).animate({right:"65px",opacity:1});
//        f._tipHide();
//      };
//      f._hide=function(){
//        if(!$(f.oGwcbox).hasClass('on')){
//          return;
//        }
//        $(f.oGwcbox).removeClass('on');
//        $(f.oGwcbox).stop(true,true).animate({right:"-470px",opacity:0});
//      }
//      f._tipShow=function(){
//        if($(f.oGwcboxTips).hasClass('on')){
//          f._tipHide();
//        }
//        $(f.oGwcboxTips).addClass('on');
//        $(f.oGwcboxTips).stop(true,true).animate({right:"65px",opacity:1});
//        f._hide();
//      };
//      f._tipHide=function(){
//        $(f.oGwcboxTips).removeClass('on');
//        $(f.oGwcboxTips).stop(true,true).animate({right:"-470px",opacity:0});
//      }
//
//      f.bindClickFun=function(){
//        $(f.oGwc).click(function(event){
//          event.stopPropagation();
//            if($(f.oGwcbox).hasClass('on')){
//              f._hide();
//            }else{
//              f._show();
//            }
//         });
//        $(f.oGwcbox).on('click','.close',function(event){
//          event.stopPropagation();
//            f._hide();
//         });
//       $(f.oGwcboxTips).on('click',".tip_close",function(event){
//         event.stopPropagation();
//            f._tipHide();
//         });
//        $(f.oRetop).click(function(event){
//            $('body,html').animate({scrollTop:0},500);
//         });
//        $(document).click(function (event) {
//          f._hide();
//          f._tipHide();
//        });
//      };
//
//
//     f.bindHoverFun=function(){
//       $(f.oFbox).find("li").hover(function(){
//              $(this).find("dl").stop(true,true).animate({opacity:"1"},800)
//            },function(){
//              $(this).find("dl").stop(true,true).animate({opacity:"0.6"},800)
//         });
//     };
//
//
//      f.init=function(){
//        f.bindClickFun();
//        f.bindHoverFun();
//      };
//}(fslide));
//
//jQuery(function(jq){
//  fslide.init();
//});

//飞入购物车特效
     // console.log('a');
 //(function(){
 //  $(".add_car").bind("click",function(){
 //    var img=$(this).parents(".goods_details").find(".bigpicture img");
 //    var flyElm=img.clone().css("opacity",0.75);
 //    $("body").append(flyElm);
 //    flyElm.css({
 //      //设置原本的那个图片；
 //      "z-index":9000,
 //      "display":"block",
 //      "position":"absolute",
 //      "top":img.offset().top+"px",
 //      "left":img.offset().left+"px",
 //      "width":img.width()+"px",
 //      "height":img.height()+"px"
 //    });
 //    flyElm.animate({
 //      top:$(".gwc").offset().top+"px",
 //      left:$(".gwc").offset().left+"px",
 //      width:20,
 //      height:30
 //    },"slow",function(){
 //      flyElm.remove();
 //    });
 //  });
 //})();


 //无缝滚动

 // function scrollPic(box,wrap,list,item,prev,next) {
 //  var scrollTarget = $(box);
 //  var scrollWrap = scrollTarget.find(wrap);
 //  var scrollPic = scrollTarget.find(list);
 //  var scrollWidth = 0;
 //  var speed =1;
 //  var time =30;
 //  var L = true;//向左还是向右，默认向左
 //  var inter = null;
 //  for (var i = 0; i < scrollPic.find(item).length; i++) {
 //    scrollWidth += scrollPic.find(item).eq(i).outerWidth(true);
 //  }
 //  scrollPic.append(scrollPic.html());
 //  scrollPic.css({ "width": scrollWidth * 2 + "px" });
 //
 //  if(prev){
 //    scrollTarget.find(".prev").bind("click", function () {
 //      L = true;
 //    });
 //    scrollTarget.find(".next").bind("click", function () {
 //      L = false;
 //    });
 //  }
 //  scrollPic.bind("mouseover", function () {
 //    clearInterval(inter);
 //  });
 //  scrollPic.bind("mouseout", function () {
 //    inter = setInterval(scroll, time);
 //  });
 //  function scroll() {
 //    var sL = scrollWrap.scrollLeft();
 //    if (L) {
 //      if (sL >= (scrollPic.width() - scrollWrap.width())) sL = 0;
 //      scrollWrap.scrollLeft(sL + speed);
 //    }
 //    else {
 //      if (sL == 0) { sL = scrollWidth }
 //      scrollWrap.scrollLeft(sL - speed);
 //    }
 //  }
 //  inter = setInterval(scroll, time);
 //
 //};
 //
 //scrollPic(".good_list_paly",".inner",".list",".good_list_item",false,false);
  //输入框聚焦失焦效果
 (function(){
    if($(".js_ipt").length){
      $(".js_ipt").on("focusin focusout",function(e){
        var def=$(this)[0].defaultValue;;
        var v=$(this).val();
        var me=$(this);
        if(e.type=="focusin"){
          if($.trim(v)==def){
            $(this).val("");
            me.addClass('on');
          }
        }else if(e.type=="focusout"){
          if($.trim(v)==""){
            $(this).val(def);
            me.removeClass('on');
          }
        }
      });
    }
  })();

}); 


jQuery(function(jq) {

//遍历切换通用函数
function pictab(box,list,btn,bq,lrbtn,ind,speed,auto,btnhide,inum,slidespeed){
  var oWbox=jq(box);
  oWbox.each(function(){  //开始遍历
    var oWlist=jq(this).find(list);
    var oWli=oWlist.find(bq);
    

    oWlist.append(oWli.eq(0).clone())  //克隆使头尾相同实现无返回运动
    var nLi_w=oWli.outerWidth(true);
    var nLi_l=oWlist.find(bq).length;

    oWlist.width(nLi_w*nLi_l);

    var oLrbtn=jq(this).find(lrbtn);
    if (inum) {
      var _inum=jq(this).find(".in_num");
      var _total=_inum.find(".total");
      _total.text(nLi_l-1);
    };
    
    var i=0,n=0; //计数逻辑值
    var timer;
    var b=false;

    function Lani(){  //左运动
      if(i>=nLi_l-1){ //实现无返回运动的判断
         i=0;
         oWlist.css({left:-i*nLi_w}); 
      };

      i++;
      oWlist.stop(true,true).animate({left:-i*nLi_w},slidespeed,function(){
        if(ind&&!b){
          jq(this).animate({"opacity":0.7},800).animate({"opacity":1},800)
          
        }
        b=false;
      });

      if(btn){
        n=i;
        if(n==nLi_l-1){
          n=0;
        }
        oWbtn_s.eq(n).addClass("active").siblings().removeClass("active");
      }

      if(inum){

        _inum.find("em").html(function(){
          if(i>=nLi_l-1){
            return 1
          }
          else{
            return i+1;
          }
        });
      }

    }

    function Rani(){ //右运动
      if(i==0){ //实现无返回运动的判断
         i=nLi_l-1;
         oWlist.css({left:-i*nLi_w}); 
      }
      i--;
      oWlist.stop(true,true).animate({left:-i*nLi_w},slidespeed,function(){
        if(ind&&!b){
          jq(this).animate({"opacity":0.7},800).animate({"opacity":1},800);

        }
        b=false;
        
      });
      if(btn){
        n=i;
        if(n==nLi_l-1){
          n=0;
        }
        oWbtn_s.eq(n).addClass("active").siblings().removeClass("active");
      }

      if(inum){
        _inum.find("em").html(i+1);
      }

    }

    if(auto){
      timer=setInterval(Lani,speed);
      jq(this).hover(function(){ //滑过整体图片范围清除计时器
        clearInterval(timer);
      },function(){
        if(!ind){
        timer=setInterval(Lani,speed);
        }
      })
    }


    if(btn){  //如果存在小按钮
      var oWbtn=jq(this).find(btn);
      var oWbtn_s=oWbtn.find("span");
      oWbtn_s.mouseover(function(){
        var ind=jq(this).index();
        i=ind-1;
        Lani();
      })
    }
    
    if(lrbtn){  //如果存在左右按钮
     
      if(btnhide){


      jq(this).hover(function(){
        oLrbtn.stop(true,true).fadeIn();
        },function(){
          oLrbtn.stop(true,true).fadeOut();
        });
       }

      var oPre=oLrbtn.find(".prev");
      var oNex=oLrbtn.find(".next");
      
      oPre.click(function(){
        b=true;
      if(oWlist.is(":animated")){
          return false;
        }
        Rani();
      })

      oNex.click(function(){
        b=true;
    if(oWlist.is(":animated")){
          return false;
        }
        Lani();
      })



    }

    if(ind){
      var oPre2=jq(this).find(".in_btn2 .prev");
      var oNex2=jq(this).find(".in_btn2 .next");
      var oSet=jq(this).find(".in_btn2 .set");
      oPre2.click(function(){
        b=true;
        if(oWlist.is(":animated")){
            return false;
          }
          Rani();

      })
      oNex2.click(function(){

        b=true;
        if(oWlist.is(":animated")){
            return false;
          }
          Lani();
      })
      oSet.click(function(){

        if(jq(this).hasClass('stop')){
          clearInterval(timer);
          jq(this).removeClass("stop").addClass('ing');
        }
        else{
          if(!ss){
            timer=setInterval(Lani,speed);
          }
          
          jq(this).removeClass("ing").addClass('stop');
        }
      })
      var ss=false;
      jq(this).hover(function(){ //滑过整体图片范围清除计时器
        ss=true;
        clearInterval(timer);
      },function(){
        ss=false;
        if(oSet.hasClass('ing')){
          timer=setInterval(Lani,speed);
        }
      })


    }

  })
  
}

pictab(".banner_fcous_im",".list",".circle","li",".btn",false,6000,true,true,5000,300)//首页banner1


/*首页通知公告 8.11*/
  function scroll_txt(box,txt){
        var oBox=$(box);
        var oBox_a=oBox.find(txt)
        var nBh=oBox_a.height();
        var nlen=oBox_a.length;
        var i=0;
        function scroll(){
        
        if(i>=nlen){
            i=0
        }
        oBox_a.eq(i).animate({marginTop:-nBh+"px"},function(){
            $(this).css({marginTop:0}).appendTo(oBox)
        });
        i++;
        }
        var temp=setInterval(scroll,5000);
        oBox.hover(function(){
          clearInterval(temp)
        },function(){
          temp=setInterval(scroll,5000);
        })
 }
 scroll_txt("#scroll_txt2","a")




  //放大镜效果
    function BigJin(box,handle,big){
      var oPiceara=$(box).find(".bigpicture");
      if(!oPiceara.length) return false;
      var oBiglist=$(box).find(".biglist")
      var oBig=$(big);
      var oBig_img=$(big).find("img");
      var idHandle=$(handle);
      var nl=oPiceara.offset().left;
      var nt=oPiceara.offset().top;
      var nw1=oPiceara.outerWidth(true);
      var nh1=oPiceara.outerHeight(true);
      var nw=idHandle.outerWidth(true);
      var nh=idHandle.outerHeight(true);
      var nw2=oBig.width();
      var nw3=oBig_img.width();
      var nh2=oBig.height();
      //alert(nh2)
      var Olist=$(box).find(".biglist");
      idHandle.css({opacity:0.7});
      oPiceara.hover(function(){
          var nInd=Olist.find(".on").index();
          var tSrc=oBiglist.find("li").eq(nInd).find("img").attr("src");
          //大图显示的图片，取左侧的图的路径，按实际情况而定(可左侧大图和右侧大图的图片都是600*600,左侧大图缩小成400，右侧还是600，便用此方法)
          oBig_img.attr({src:tSrc})
          idHandle.show();
          oBig.show();
      },function(){
           idHandle.hide();
           oBig.hide();
      })
      idHandle.hover(function(){
          idHandle.show();
      },function(){
          idHandle.hide();
      });
      oPiceara.mousemove(function(event){
          var event=event||window.event;
          var nleft=event.pageX-nl-nw/2;  
          var ntop=event.pageY-nt-nh/2;    
          //不让左侧小框的滑动区域超出范围
          if(nleft<0) nleft=0;                               
          if(ntop<0) ntop=0;              
          if(nleft>nw1-nw) nleft=nw1-nw;
          if(ntop>nh1-nh) ntop=nh1-nh;
          var rg_l=(nw3-nw2)/(nw1-nw)*nleft;
          var rg_t=(nw3-nw2)/(nw1-nw)*ntop;
          idHandle.css({left:nleft+"px",top:ntop+"px",display:"block"});
          oBig_img.css({left:-rg_l+"px",top:-rg_t+"px"});
      })
      }
      BigJin("#xx_bigpic","#idHandle3","#bigjin");
      $(window).resize(function(){ //9.18修改，浏览器变化窗口重新计算鼠标位置
        BigJin("#xx_bigpic","#idHandle3","#bigjin");
      }); 

      //首页右侧3个图片轮播
    function multiPic(oBox,num){
        var oBox=$(oBox);
        oBox.each(function(){
          var oLis=$(this).find(".list");
          var oLis_l=oLis.find("li");
          var i;
          var len=oLis_l.length;
          oPrev=$(this).find(".prev")
          oNext=$(this).find(".next")
          oLis.width(oLis_l.outerWidth()*len);

          function lisMove(i){ 
            if(!oLis.is(":animated")){
                oLis.animate({"left":-i*oLis_l.outerWidth()});
              }      
            }

            oNext.click(function(){
                if(i<len-num){
                  i+=num;
                  lisMove(i);
                  $(this).parent(".btn").find(".prev").removeClass("no");
                  if(i>=len-num){
                    $(this).addClass("no");
                  }
                }      
            }); 
           oPrev.click(function(){
            if(i>0){
              i-=num;
              lisMove(i);
              $(this).parent(".btn").find(".next").removeClass("no");
              if(i<=0){
                $(this).addClass("no");
              }
            }
           

          });

        i=0;
        });
      };
      multiPic(".banner_fcous_three",1)
   });

 //产品详情页图片展示
  (function tabBanner(){
  var obj = $(".imgplayer");
  var im = obj.find(".bim li");
  var tablis = obj.find(".tab ul");
  var tabbtn = obj.find(".tab li");
  var prevbtn = obj.find(".prev");
  var nextbtn = obj.find(".next");

  var len = im.length;
  var i;
  var j=0;
  
  function lisMove(i){
      tablis.animate({"margin-left":-i*74});
  }
  
  nextbtn.click(function(){
    if(i<len-5){
    i+=1;
    lisMove(i);
    prevbtn.removeClass("non");
    }      
    if(i==len-5){
      $(this).addClass("non");
      prevbtn.removeClass("non");
    }
    if(j<i){
      j=i;
    }else if(j>=i+4){
      j=i+4;
    }
    tabim(j);     
  });
  
  prevbtn.click(function(){
    if(i>0){
      i-=1;
      lisMove(i);
    nextbtn.removeClass("non");            
      
    }
    if(i==0){
      $(this).addClass("non");
      nextbtn.removeClass("non");
    }
    if(j<i){
      j=i;
    }else if(j>=i+4){
      j=i+4;
    }
    tabim(j);    
  });   

  function tabim(j){
    im.eq(j).addClass("on").siblings().removeClass("on");
    tabbtn.eq(j).addClass("on").siblings().removeClass("on");       
  } 
   
  tabbtn.mouseover(function(){
     tabim($(this).index());
     j=$(this).index();
  });
  
  //init
  i = 0;
  tabim(j);
  prevbtn.addClass("non");   
    
})();
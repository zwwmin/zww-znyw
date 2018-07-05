var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};
TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { 10px; border-right: 5px solid #000 }";
  document.body.appendChild(css);

    $(".power > li").each(function () {
        $(this).mouseenter(function () {
            $(this).find('.bg').css("background","#1fbcec");
            $(this).find('.power_center_img1').css("display","none");
            $(this).find('.power_center_img2').css("display","block");
            $(this).find('.power_center_bgimg').addClass("power_center_imgTop");
            $(this).find('.power_center_dian').addClass("power_center_diananim");
            $(this).find('.power_center_wen').addClass("power_center_title");
            $(this).find('p').addClass("power_center_written");
            $(this).find('.power_center_bgimg ').removeClass("power_center_imgTop1");
            $(this).find('.power_center_dian ').removeClass("power_center_diananim1");
            $(this).find('.power_center_wen ').removeClass("power_center_title1");
            $(this).find('p ').removeClass("power_center_written1")
        })
        $(this).mouseleave(function() {
            $(this).find('.bg').css("background","#000000");
            $(this).find('.power_center_img1').css("display","block");
            $(this).find('.power_center_img2').css("display","none");
            $(this).find('.power_center_bgimg').addClass("power_center_imgTop1");
            $(this).find('.power_center_dian').addClass("power_center_diananim1");
            $(this).find('.power_center_wen').addClass("power_center_title1");
            $(this).find('p').addClass("power_center_written1");
            $(this).find('.power_center_bgimg ').removeClass("power_center_imgTop")
            $(this).find('.power_center_dian ').removeClass("power_center_diananim")
            $(this).find('.power_center_wen ').removeClass("power_center_title")
            $(this).find('p ').removeClass("power_center_written")

        })
    });
    $(".content_powergrid_button").mouseenter(function () {
        $(this).css("background","#1eaad5")
        $(this).find('.content_powergrid_button_a ').addClass("powergrid_button_arrow")
        $(this).find('.content_powergrid_button_a ').removeClass("powergrid_button_arrowreturn")
    });
    $(".content_powergrid_button").mouseleave(function () {
        $(this).css("background","#1fbcec")
        $(this).find('.content_powergrid_button_a ').removeClass("powergrid_button_arrow")
        $(this).find('.content_powergrid_button_a ').addClass("powergrid_button_arrowreturn")
    });
    // 蓝帽子箭头
    $(".content_powergrid_button_blue").mouseenter(function () {
        $(this).css("background","#1eaad5")
        $(this).find('.content_powergrid_button_a_blue ').addClass("powergrid_button_arrow_blue")
        $(this).find('.content_powergrid_button_a_blue ').removeClass("powergrid_button_arrowreturn_blue")
    });
    $(".content_powergrid_button_blue").mouseleave(function () {
        $(this).css("background","#1fbcec")
        $(this).find('.content_powergrid_button_a_blue ').removeClass("powergrid_button_arrow_blue")
        $(this).find('.content_powergrid_button_a_blue ').addClass("powergrid_button_arrowreturn_blue")
    });
    $(".weixin").mouseenter(function(){
        $(this).find('.img1').css("display","none");
        $(this).find('.img2').css("display","block");
        $(this).addClass("all");
        $(this).removeClass("all2");
    });
    $(".weixin").mouseleave(function(){
        $(this).find('.img1').css("display","block");
        $(this).find('.img2').css("display","none");
        $(this).removeClass("all");
        $(this).addClass("all2");
    });

    //
    // $(".v4Banner_center").mouseover(function () {
    //     $(".v4Banner_bg").css({
    //         "transform":"scale(1.3)",
    //         "transition":"15s transform"
    //     })
    // });
    // $(".v4Banner_center").mouseleave(function () {
    //     $(".v4Banner_bg").css({
    //         "transform":"scale(1)",
    //         "transition":"15s transform"
    //     })
    // })
    $('.content_powergrid_button_blue').click(function() {
        $('html,body').animate({
            scrollTop: $('.center_from_center').offset().top
        }, 800);
    });
};

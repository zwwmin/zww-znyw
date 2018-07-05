/**
* bianlidian util
**/

var bld_util={};

// 右侧浮动显示隐藏
bld_util.right_nav=function(_settings) {
	var settings={
		obj:$('.right_nav')
		,page_bottom:'-10'
	};
	$.extend(settings,_settings);

	var st = 0;
	var sb = 0;
	var obj_h = settings.obj.height();
	var o2t = $(window).height() - obj_h;
	var obj_t = 0;

	var scrollUP = function () {
        st = $(document).scrollTop();
        sb = $(document).height() - $(window).height() - $(window).scrollTop();
        obj_t = o2t+st-20;
        if(sb>settings.page_bottom){
        	settings.obj.show();
        }else{
        	settings.obj.hide();
        }

		if($(window).scrollTop()==0){
			settings.obj.find(".backToTop").parent("li").hide();
		}
		else{
			settings.obj.find(".backToTop").parent("li").show();
		}
	}
	scrollUP();
	$(window).bind("scroll", scrollUP);

}

// 首页轮播图
bld_util.home_slider=function(_settings) {

	var settings={
		speed:500
		,slider_auto:true
		,auto_time:4000
	};
	$.extend(settings,_settings);

	var home_slider = $('.home_slider .slider_list');
	var slider_page = $('.home_slider .slider_page');
	var count_page = home_slider.find('li').size();
	var now_page = 1;
	var next_page = 0;
	var slider_auto = settings.slider_auto;
	var m_over = false;

	slider_page.css('margin-left','-'+(24*count_page)/2+'px');

	var slider_go = function(page){
		if(!m_over){
			if (page>count_page) {page=1;}
			home_slider.find('li').stop(true,true);
			home_slider.find('li').fadeOut(settings.speed);
			home_slider.find('li').eq(page-1).fadeIn(settings.speed);
			slider_page.find('li').removeClass('active');
			slider_page.find('li').eq(page-1).addClass('active');
			now_page = page;
		}
	}

	// 绑定 slider_page li 事件
	slider_page.find('li').on('mouseover',function(){
		var index = $(this).index();
		if(now_page!=(index+1)){
			slider_go(index+1);
		}
	});

	// 自动切换
	if(slider_auto){
		setInterval( function(){slider_go(now_page+1)} ,settings.auto_time);
		// 鼠标移上停止自动
		home_slider.on('mouseover',function(){
			m_over = true;
		});
		home_slider.on('mouseout',function(){
			m_over = false;
		});
		slider_page.on('mouseover',function(){
			m_over = true;
		});
		slider_page.on('mouseout',function(){
			m_over = false;
		});
	}

	slider_go(1);
	
}

// 首页优质工程公司切换
bld_util.home_service_slide=function(_settings) {

	var settings={
		speed:500
	};
	$.extend(settings,_settings);

	var home_service_obj = $('.home_service');
	var count_page = home_service_obj.find('.h_s_list').size();
	var now_page = 1;
	var next_page = 0;

	home_service_obj.find('.h_s_slide_box').css('width',count_page*1200+'px');

	var slide_box_go = function(page){
		home_service_obj.find('.h_s_slide_box').stop(true,true).animate({
			'left': '-'+(page-1)*1200+'px'
		},settings.speed);
	}

	home_service_obj.find('.h_s_l_btn').click(function(e){
		next_page = now_page-1;
		if(next_page>0){
			slide_box_go(next_page);
			now_page = next_page;
		}
	});
	home_service_obj.find('.h_s_r_btn').click(function(e){
		next_page = now_page+1;
		if(next_page<=count_page){
			slide_box_go(next_page);
			now_page = next_page;
		}
	});
	
}

// 工程公司详情slide
bld_util.service_slide_build=function(_settings) {

	var settings={
		item_box:$('.js_slidebox')
	};
	$.extend(settings,_settings);

	var item_box_length = settings.item_box.length;

	if(item_box_length>0){
		for (var i = 0; i < item_box_length; i++) {
		    bld_util.service_slide_box({
				item_box:settings.item_box.eq(i).parent()
			});
		}
	}

}
bld_util.service_slide_box=function(_settings) {

	var settings={
		item_box:$('.js_slidebox'),
		show_num:4,
		speed:500
	};
	$.extend(settings,_settings);

	var item_box = settings.item_box;
	var item_list = item_box.find('.item_list');

	var count_item = item_box.find('.item_list li').size();
	var count_page = Math.ceil(count_item/settings.show_num);

	var now_page = 1;
	var next_page = 0;

	var item_list_w = item_list.width();

	item_list.css('width',count_page*item_list_w+'px');

	var item_list_slide = function(page){
		item_box.find('.item_list').stop(true,true).animate({
			'left': '-'+(page-1)*item_list_w+'px'
		},settings.speed);
	}

	item_box.find('.previous_btn').click(function(e){
		next_page = now_page-1;
		if(next_page>0){
			item_list_slide(next_page);
			now_page = next_page;
		}
	});
	item_box.find('.next_btn').click(function(e){
		next_page = now_page+1;
		if(next_page<=count_page){
			item_list_slide(next_page);
			now_page = next_page;
		}
	});
	
}
$(function(){

    // home_hot
    $(".home_hot .h_h_list .h_h_item .item_a").mouseover(function(e){
        $(this).find('.layer,.tb_btn').show();
    }).mouseout(function(e) {
        $(this).find('.layer,.tb_btn').hide();
    });

    // home_technology
    $(".home_technology .h_t_list .h_t_item .h_t_img").mouseover(function(e){
        $(this).find('.layer,.tb_btn').show();
    }).mouseout(function(e) {
        $(this).find('.layer,.tb_btn').hide();
    });

    // right_nav
    $(".right_nav .rn_list li a.tel").mouseover(function(e){
        $(this).find('.tel_img').show();
    }).mouseout(function(e) {
        $(this).find('.tel_img').hide();
    });

    // .demand_list_select li dl dd span.sel_a
    $(".demand_list_select li dl dd span.sel_a").mouseover(function(e){
        $(this).find('.dlist_box').show();
    }).mouseout(function(e) {
        $(this).find('.dlist_box').hide();
    });
    
    //fix addClass/removeClass .active
    $(
        ".service_list_data li,.demand_list_data li,"
        +".demand_list_select li dl dd span.sel_a .dlist li,"
        +".demand_list_select li dl dd span.sel_a,"
        +".product_list li"
    ).mouseover(function(e){
        $(this).addClass('active');
    }).mouseout(function(e) {
        $(this).removeClass('active');
    });

});
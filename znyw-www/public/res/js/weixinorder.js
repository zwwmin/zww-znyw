/**
 * Created by DGDL-08 on 2017/3/31.
 */

    // add the animation to the popover
    $('a[rel=popover]').popover().click(function(e) {
    e.preventDefault();
    var open = $(this).attr('data-easein');
    if (open == 'shake') {
    $(this).next().velocity('callout.' + open);
} else if (open == 'pulse') {
    $(this).next().velocity('callout.' + open);
} else if (open == 'tada') {
    $(this).next().velocity('callout.' + open);
} else if (open == 'flash') {
    $(this).next().velocity('callout.' + open);
} else if (open == 'bounce') {
    $(this).next().velocity('callout.' + open);
} else if (open == 'swing') {
    $(this).next().velocity('callout.' + open);
} else {
    $(this).next().velocity('transition.' + open);
}

});

    // add the animation to the modal
    $(".modal").each(function(index) {
    $(this).on('show.bs.modal', function(e) {
        var open = $(this).attr('data-easein');
        if (open == 'shake') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'pulse') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'tada') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'flash') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'bounce') {
            $('.modal-dialog').velocity('callout.' + open);
        } else if (open == 'swing') {
            $('.modal-dialog').velocity('callout.' + open);
        } else {
            $('.modal-dialog').velocity('transition.' + open);
        }

    });
});
    $("#orderyes").click(function () {
        var project_id =$("#project_id").val();
        var service_id =$("#service_id").val();
        var uid =$("#uid").val();
        $.ajax({
            cache:true
            ,type:"post"
            ,url:"/user/serviceApp"
            ,data:{
                project_id:project_id
                ,uid:uid
                ,service_id:service_id
            }
            ,error:function () {

            }
            ,success:function(data){
                window.location.reload();
            }
        });
    });
    $("#acceptance").click(function () {
    var project_id =$("#project_id").val();
    var uid =$("#uid").val();
    $.ajax({
        cache:true
        ,type:"post"
        ,url:"/user/bycheck"
        ,data:{
            project_id:project_id
            ,uid:uid
        }
        ,error:function () {}
        ,success:function(data){
            window.location.reload();
        }
    });

});
    $(".advertising").click(function () {
        window.location.href='http://www.dianlibian.com/download';
    });
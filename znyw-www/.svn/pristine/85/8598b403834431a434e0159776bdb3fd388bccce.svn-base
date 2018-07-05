    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById('butt').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    function shouBott() {
        for(var i =0;i<buttons.length;i++){
            if (buttons[i].className == 'on'){
                buttons[i].className = ' ';
                break;
            }
        }
        buttons[index-1].className = 'on';

    }
    function animate(offle) {
        var time = 300;
        var inteval = 10;
        var speed = offle/(time/inteval);
        var left = parseInt(list.style.left) - offle;

        var go = function (){
            if( (speed>0&&parseInt(list.style.left) > -760)||(speed<0 && parseInt(list.style.left)<154) ){
                list.style.left = parseInt(list.style.left) -speed + 'px';

                setTimeout(go, inteval);
            }
        };
        go();
    }
    next.onclick=function () {
        index+= 1;
        shouBott();
        animate(914);
        prev.style.display = 'block';
        next.style.display = 'none';
    };
    prev.onclick = function () {
        index-= 1;
        shouBott();
        animate(-914);
        prev.style.display = 'none';
        next.style.display = 'block';
    };
    for(var i = 0;i<buttons.length;i++){
        buttons[i].onclick = function () {
            var myIndex = parseInt(this.getAttribute('index'));
            var offle = 914 * (myIndex - index);
            if(offle > 0){
                prev.style.display = 'block';
                next.style.display = 'none';
            }else {
                prev.style.display = 'none';
                next.style.display = 'block';
            }
            animate(offle);
            index = myIndex;
            shouBott();
        }
    }
    var isFirs = true;
    if (isFirs) {
        $(window).scroll(function () {
            var sum = $(window).scrollTop();
            if (sum > 1200) {
                isFirs = false;
                $(".power_service_written").addClass("service");
                setTimeout(function () {
                    $(".power_service_div1").addClass("service");
                }, 200);
                setTimeout(function () {
                    $(".power_service_div2").addClass("service");
                }, 400);
                setTimeout(function () {
                    $(".power_service_div3").addClass("service");
                }, 600);
                setTimeout(function () {
                    $(".power_service_div4").addClass("service");
                }, 800)
            }
        })
    }


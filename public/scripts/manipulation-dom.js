var mobile = "";

$(document).ready(function(){
    mobile = navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i);
    
    if(!mobile){
        $('.menu').height($(window,document).height());
        
        $(window,document).resize(function(){
            $('.menu').height($(window,document).height());
        });

        $('.identify-user').on('click', function(){
            if($('.config-user').is(':visible')){
                $('.config-user').slideUp(200);
            }else{
                $('.config-user').slideDown(200);
            }
        });
    }else{
        $('.menu').hide();
        $('.button-menu').removeClass('hidden');

        $('.button-menu').on('click', function(){
            if($('.menu').is(':visible')){
                $('.menu').slideUp(200);
            }else{
                $('.config-user').slideUp(200);
                $('.menu').slideDown(200);
            }
        });

        $('.identify-user').on('click', function(){
            if($('.config-user').is(':visible')){
                $('.config-user').slideUp(200);
            }else{
                $('.menu').slideUp(200);
                $('.config-user').slideDown(200);
            }
        });
    }    
});

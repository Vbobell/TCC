$(document).ready(function(){
    var mobile = navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i);
    
    /*if(!mobile){
        $('.menu').height($(window,document).height());
        
        $(window,document).resize(function(){
            $('.menu').height($(window,document).height());
        });
    }*/
});

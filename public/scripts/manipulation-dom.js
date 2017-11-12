$(document).ready(function(){
    $('.menu').height($(window,document).height());
    $('.menu-buttom:first-child').addClass('selected');
    $(window,document).resize(function(){
        $('.menu').height($(window,document).height());
    });
});

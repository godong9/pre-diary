$(document).ready(function(){
    var footerTop = $('footer').offset().top; 
    var headerHeight = $('header').height() + 8;
    var contentHeight = footerTop - headerHeight;
    $('.detail-content').css({'height': contentHeight });
});
$(function () {

    var $nav_a = $('.nav>li>a');

    $nav_a.eq(0).on('click',function(){
        location.href = './../index.html';
    });

    $nav_a.eq(1).on('click',function(){
        location.href = './../play/play.html';
    });

    $nav_a.eq(2).on('click',function(){
        location.href = './../guid/guid.html';
    });

    $nav_a.eq(3).on('click',function(){
        location.href = './../use/use.html';
    });

    $nav_a.eq(4).on('click',function(){
        location.href = './../report/report.html';
    });

    var free_use = $('.link>ul:first>li>a');
    free_use.on('click',function(){
        location.href = './../help.html';
    });

    var team = $('.link>ul:last>li>a');
    team.on('click',function(){
        location.href = './../about.html';
    });

    var $login = $('.login>span:first');
    $login.on('click',function(){
        location.href = './../login.html';
    });
    
    var $regist = $('.login>span:last');
    $regist.on('click',function(){
        location.href = './../regist.html';
    });
    
});
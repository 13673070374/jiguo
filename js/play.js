$(function () {

    //导航栏
    var $spans = $('.nav>span');
    $spans.eq(0).css('border-bottom', '3px solid #fc584e');
    $spans.on('click', function () {
        $(this).css('border-bottom', '3px solid #fc584e').siblings().css('border', 'none');

    });

    var $play = $('.play'); //商品
    var $type = $('.type'); //类别
    var $more = $('.play .more');//初始页面的更多
    var $show_more = $('.play .show-more');//最新
    var $hot_more = $('.play .hot-more');//最热
    var $play_nomore = $('.play .nomore');//最新的没有更多
    var $hot_nomore = $('.play .hot-nomore')//最热的没有
    var $no = $('.play .no');//初始页面的没有

    getGoods();
    function getGoods() {
        var $play_list = $('.play-list');
        var arr = [];
        $.ajax({
            type: "get",
            url: "http://192.168.43.66:3000/play/new",
            dataType: "json",
            success: function (response) {
                $.each(response, function (index, item) {
                    $.each(item, function (index, item) {
                        arr.push(item);
                    });

                });

                var html = template("play", {
                    value: arr.slice(0, 16)
                });

                $play_list.html(html);

                var $play_load = $('.play .load');//加载
                var play_start = 16;
                var play_size = 8;
                $hot_more.css('display', 'none');
                $show_more.css('display','none');
                console.log($show_more);
                $more.on('click', function () {
                    $play_load.show();
                    setTimeout(function () {
                        $play_load.hide();

                        $.ajax({
                            type: "get",
                            url: "http://192.168.43.66:3000/play/new",
                            dataType: "json",
                            success: function (response) {
                                var play_sum = arr.length;
                                if ((play_start + play_size) >= play_sum) {
                                    play_size = play_sum - play_start;

                                    $play_nomore.css('display', 'block');
                                    $more.css('display', 'none');
                                }
                                var html = template("play", {
                                    value: arr.slice(play_start, (play_start + play_size))
                                });
                                console.log(play_start, play_size);
                                console.log(play_start + play_size);

                                $play_list.append(html);
                                play_start += play_size
                            }
                        });

                    }, 1000);
                });
            }
        });
    }

   
    //最新
    $spans.eq(0).on('click', function () {
        getNewGoods();
        $show_more.css('display', 'block');
        $hot_nomore.css("display", 'none');
        $type.css('display', 'none');
        $play.css('display', 'block');
    });

    function getNewGoods() {
        var $play_list = $('.play-list');
        var arr = [];
        $.ajax({
            type: "get",
            url: "http://192.168.43.66:3000/play/new",
            dataType: "json",
            success: function (response) {
                $.each(response, function (index, item) {
                    $.each(item, function (index, item) {
                        arr.push(item);
                    });

                });

                var html = template("play", {
                    value: arr.slice(0, 16)
                });

                $play_list.html(html);


                var $play_load = $('.play .load');//加载
                var play_start = 16;
                var play_size = 8;
                var $hot_more = $('.play .hot-more');
                $hot_more.css('display', 'none');
                $more.css('display','none');
                console.log($show_more);
                $show_more.on('click', function () {
                    $play_load.show();
                    setTimeout(function () {
                        $play_load.hide();

                        $.ajax({
                            type: "get",
                            url: "http://192.168.43.66:3000/play/new",
                            dataType: "json",
                            success: function (response) {
                                var play_sum = arr.length;
                                if ((play_start + play_size) >= play_sum) {
                                    play_size = play_sum - play_start;

                                    $play_nomore.css('display', 'block');
                                    $show_more.css('display', 'none');
                                }
                                var html = template("play", {
                                    value: arr.slice(play_start, (play_start + play_size))
                                });
                                console.log(play_start, play_size);
                                console.log(play_start + play_size);

                                $play_list.append(html);
                                play_start += play_size
                            }
                        });

                    }, 1000);
                });
            }
        });
    }

    //最热
    $spans.eq(1).on('click', function () {
        getHotGoods();
        $hot_more.css('display', 'block');
        $type.css('display', 'none');
        $play.css('display', 'block');
        $play_nomore.css('display', 'none');

    });

    function getHotGoods() {
        var $play_list = $('.play-list');
        var arr = [];
        $.ajax({
            type: "get",
            url: "http://192.168.43.66:3000/play/hot",
            dataType: "json",
            success: function (response) {
                $.each(response, function (index, item) {
                    $.each(item, function (index, item) {
                        arr.push(item);
                    });

                });

                var html = template("play", {
                    value: arr.slice(0, 12)
                });

                $play_list.html(html);

                var $show_more = $('.play .show-more');
                var $hot_more = $('.play .hot-more');
                var $play_load = $('.play .load');//加载

                var play_start = 12;
                var play_size = 8;
                
                $more.css('display','none');
                $show_more.css('display', 'none');
                $hot_more.on('click', function () {
                    $play_load.show();
                    setTimeout(function () {
                        $play_load.hide();

                        $.ajax({
                            type: "get",
                            url: "http://192.168.43.66:3000/play/new",
                            dataType: "json",
                            success: function (response) {
                                var play_sum = arr.length;
                                if ((play_start + play_size) >= play_sum) {
                                    play_size = play_sum - play_start;
                                    $hot_nomore.css("display", 'block');
                                    $show_more.css('display', 'none');
                                    $hot_more.css('display', 'none');
                                }
                                var html = template("play", {
                                    value: arr.slice(play_start, (play_start + play_size))
                                });
                                console.log(play_start, play_size);
                                console.log(play_start + play_size);

                                $play_list.append(html);
                                play_start += play_size
                            }
                        });

                    }, 1000);
                });
            }
        });
    }

    //品类
    $spans.eq(2).on('click', function () {
        $type.css('display', 'block');
        $play.css('display', 'none');
    });
});
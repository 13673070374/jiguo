$(function () {

    //导航栏
    var $spans = $('.nav>span');
    $spans.eq(0).css('border-bottom', '3px solid #fc584e');
    $spans.on('click', function () {
        $(this).css('border-bottom', '3px solid #fc584e').siblings().css('border', 'none');

    });

    var $more = $('.guid .more');//初始页面的更多
    var $new_more = $('.guid .new-more');//最新
    var $hot_more = $('.guid .hot-more');//最热
    var $new_nomore = $('.guid .new-nomore');//最新的没有更多
    var $hot_nomore = $('.guid .hot-nomore')//最热的没有
    var $guid_list = $('.guid-list'); //商品列表

    getGoods();

    function getGoods() {
        $.ajax({
            type: "get",
            url: "http://192.168.1.45:3000/guid/new",
            dataType: "json",
            success: function (response) {

                var html = template("guid", {
                    value: response.slice(0, 12)
                });

                $guid_list.html(html);

                var $lis = $guid_list.children('li');
                $lis.on('click', function () {
                    location.href = './../guid/detail.html'
                });

                var $load = $('.guid .load');//加载
                var start = 12;
                var size = 8;
                $hot_more.css('display', 'none');
                $new_more.css('display', 'none');
                if (start > response.length) {
                    $more.css('display', "none");
                    $new_nomore.css('display', 'block');
                } else {
                    $more.on('click', function () {
                        $load.show();
                        setTimeout(function () {
                            $load.hide();

                            $.ajax({
                                type: "get",
                                url: "http://192.168.1.45:3000/guid/new",
                                dataType: "json",
                                success: function (response) {
                                    var sum = response.length;
                                    if ((start + size) > sum) {
                                        size = sum - start;
                                        $new_nomore.css('display', 'block');
                                        $more.css('display', 'none');
                                    }

                                    var html = template("guid", {
                                        value: response.slice(start, (start + size))
                                    });
                                    console.log(start, size);
                                    console.log(start + size);

                                    $guid_list.append(html);
                                    start += size

                                    var $lis = $guid_list.children('li');
                                    $lis.on('click', function () {
                                        location.href = './../guid/detail.html'
                                    });
                                }
                            });
                        }, 1000)
                    })
                }
            }
        });
    }


    $spans.eq(0).on('click', function () {
        getNewGoods();
        $new_more.css('display', 'block');
        $hot_nomore.css("display", 'none');
    });

    function getNewGoods() {
        $.ajax({
            type: "get",
            url: "http://192.168.1.45:3000/guid/new",
            dataType: "json",
            success: function (response) {

                var html = template("guid", {
                    value: response.slice(0, 12)
                });

                $guid_list.html(html);

                var $lis = $guid_list.children('li');
                $lis.on('click', function () {
                    location.href = './../guid/detail.html'
                });

                var load = $('.guid .load');//加载
                var start = 12;
                var size = 8;
                $hot_more.css('display', 'none');
                $more.css('display', 'none');

                if (start > response.length) {
                    $new_more.css('display', "none");
                    $new_nomore.css('display', 'block');
                } else {
                    $new_more.on('click', function () {
                        load.show();
                        setTimeout(function () {
                            load.hide();

                            $.ajax({
                                type: "get",
                                url: "http://192.168.1.45:3000/guid/new",
                                dataType: "json",
                                success: function (response) {
                                    var sum = response.length;
                                    if ((start + size) >= sum) {
                                        size = sum - start;

                                        $new_nomore.css('display', 'block');
                                        $new_more.css('display', 'none');
                                    }
                                    var html = template("guid", {
                                        value: response.slice(start, (start + size))
                                    });
                                    console.log(start, size);
                                    console.log(start + size);

                                    $guid_list.append(html);
                                    start += size

                                    var $lis = $guid_list.children('li');
                                    $lis.on('click', function () {
                                        location.href = './../guid/detail.html'
                                    });
                                }
                            });

                        }, 1000);
                    });
                }

            }
        });
    }

    $spans.eq(1).on('click', function () {
        getHotGoods();
        $hot_more.css('display', 'block');
        $new_nomore.css('display', 'none');
    });

    function getHotGoods() {
        $.ajax({
            type: "get",
            url: "http://192.168.1.45:3000/guid/hot",
            dataType: "json",
            success: function (response) {

                var html = template("guid", {
                    value: response.slice(0, 12)
                });

                $guid_list.html(html);

                var $lis = $guid_list.children('li');
                $lis.on('click', function () {
                    location.href = './../guid/detail.html'
                });

                var load = $('.guid .load');//加载
                var start = 12;
                var size = 8;
                $new_more.css('display', 'none');
                $more.css('display', 'none');

                if (start > response.length) {
                    $hot_more.css('display', "none");
                    $hot_nomore.css('display', 'block');
                } else {
                    $hot_more.on('click', function () {
                        load.show();
                        setTimeout(function () {
                            load.hide();

                            $.ajax({
                                type: "get",
                                url: "http://192.168.1.45:3000/guid/hot",
                                dataType: "json",
                                success: function (response) {
                                    var sum = response.length;
                                    if ((start + size) >= sum) {
                                        size = sum - start;

                                        $hot_nomore.css('display', 'block');
                                        $hot_more.css('display', 'none');
                                    }
                                    var html = template("guid", {
                                        value: response.slice(start, (start + size))
                                    });
                                    console.log(start, size);
                                    console.log(start + size);

                                    $guid_list.append(html);
                                    start += size

                                    var $lis = $guid_list.children('li');
                                    $lis.on('click', function () {
                                        location.href = './../guid/detail.html'
                                    });
                                }
                            });

                        }, 1000);
                    });
                }

            }
        });
    }
});
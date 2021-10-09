$(function () {
    //轮播图效果
    var $ul = $('.slide-list');
    var $lis = $('.slide-list>li');
    // var $point = $('.point>span');
    // var $next = $('.next');//下一页
    // var $prev = $('.prev');//上一页
    // var $slides = $('.slides');//可见区域
    var everyW = $lis.width();//图片的数量
    // var alltime = 400; //图片移动的总时间
    // var everytime = 20; // 图片移动的间隔时间
    // var index = 0;//下标
    // var imgcount = $point.length;//图片的实际数量
    // var page_width = 1920;//一页的宽度
    // var move = false; //图片移动的状态
    //设置ul的宽度
    $ul.width(everyW * $lis.length);

    //下一页
    // $next.on('click', function () {
    //     nextPage(true);
    // });

    //上一页
    // $prev.on('click', function () {
    //     nextPage(false);
    // });

    //点击圆点翻页
    // $point.on('click', function () {
    //     var targetIndex = $(this).index();
    //     if (targetIndex != index) {
    //         nextPage(targetIndex);
    //     }
    // });

    //自动翻页
    // var timer;
    // document.addEventListener('visibilitychange', function () {
    //     if (document.visibilityState == 'hidden') {
    //         clearInterval(timer);
    //     }

    //     if (document.visibilityState == 'visible') {
    //         timer = setInterval(function () {
    //             nextPage(true)
    //         }, 2000);
    //     }
    // });


    //鼠标进入停止翻页
    // $slides.hover(function () {
    //     // over
    //     clearInterval(timer);
    // }, function () {
    //     // out
    //     timer = setInterval(function () {
    //         nextPage(true);
    //     }, 3000);
    // }
    // );

    // function nextPage(next) {

    //     if (move == true) {
    //         return false;
    //     }
    //     move = true;//true表示正在翻页

    //     var offset = 0;
    //     if (typeof next === 'boolean') {
    //         offset = next ? -page_width : page_width;
    //     } else {
    //         offset = -(next - index) * page_width;
    //     }
    //     var itemleft = offset / (alltime / everytime);//每次移动的距离
    //     var currleft = $ul.position().left; //当前ul的偏移量
    //     var targetleft = currleft + offset; //目标位置
    //     var intervalId = setInterval(function () {
    //         currleft += itemleft;
    //         if (currleft == targetleft) {
    //             clearInterval(intervalId);

    //             move = false;

    //             if (parseInt(currleft) === -((imgcount + 1) * page_width)) {
    //                 currleft = -page_width;
    //             } else if (parseInt(currleft) === 0) {
    //                 currleft = -(imgcount * page_width);
    //             }
    //         }
    //         console.log(currleft);
    //         $ul.css('left', currleft);
    //     }, everytime);

    //     updatePoint(next);
    // }


    // function updatePoint(next) {
    //     var targetIndex = 0;
    //     if (typeof next === 'boolean') {
    //         if (next) {
    //             targetIndex = index + 1;
    //             if (targetIndex == imgcount) {
    //                 targetIndex = 0;
    //             }
    //         } else {
    //             targetIndex = index - 1;
    //             if (targetIndex == -1) {
    //                 targetIndex = imgcount - 1;
    //             }
    //         }
    //     } else {
    //         targetIndex = next;
    //     }

    //     $point.eq(index).removeClass('on');
    //     $point.eq(targetIndex).addClass('on');
    //     index = targetIndex;
    // }

    //倒计时
    var time = $('.time>span');
    var timer = setInterval(function () {

        var date1 = new Date();
        var date2 = new Date('12 25 , 2021 , 0:0:0');

        var t1 = date1.getTime();
        var t2 = date2.getTime();

        var times = t2 - t1;

        var day = parseInt(times / (1000 * 3600 * 24));
        var hour = parseInt((times - day * 1000 * 3600 * 24) / (1000 * 3600));
        var min = parseInt((times - day * 1000 * 3600 * 24 - hour * 1000 * 3600) / (1000 * 60));
        var sec = parseInt((times - day * 1000 * 3600 * 24 - hour * 1000 * 3600 - min * 1000 * 60) / 1000);
        time.html(day + '天' + hour + '时' + min + '分' + sec + '秒');

        if (times == 0) {

            clearInterval(timer);
        }

    }, 1000);

    //申请div 移动特效
    var apply = $('.apply');
    $(window).on('scroll', function () {
        var t = $(window).scrollTop();
        if (t === 0) {
            apply.addClass('move');
        } else {
            apply.removeClass('move');
        }
    })

    //热门试用
    var $hot_list = $('.hot-list');

    $.ajax({
        type: "get",
        url: "http://192.168.1.45:3000/report/hot",
        dataType: "json",
        success: function (response) {
            get(response);
            var $lis = $hot_list.children();//所有的li
            $lis.on('click', function () {
                location.href = './../use/use.html';
            });

            $.each($lis, function (index, item) {
                if ($(item).children('.log').html() === '首发') {
                    $(item).children('.log').css({
                        color: '#fff',
                        fontSize: '12px',
                        padding: '3px 5px',
                        background: '#ff4e4a',
                        borderTopRightRadius: '6px',
                        borderBottomLeftRadius: '6px'
                    });

                    $(item).children('p').children('span').css({
                        color: '#ff4e21',
                        border: '1px solid #ff4e21'
                    });

                    $(item).children('.time').css("color", "#ff4e21")
                }

                if ($(item).children('.log').html() === '体验师转享') {
                    $(item).children('.log').css({
                        color: '#beae97',
                        fontSize: '12px',
                        padding: '3px 5px',
                        background: '#fcf5c7',
                        borderTopRightRadius: '6px',
                        borderBottomLeftRadius: '6px'
                    });

                    $(item).children('p').children('span').css({
                        color: '#7acc68',
                        border: '1px solid #7acc68'
                    });

                    $(item).children('.time').html('查看试用名单');
                    $(item).children('.time').css("color", "#7acc68")
                }
            })

            $hot_list.css('width', ($lis.length * 253) + 'px');
            var $next = $('.hot-goods>.next');//下一页
            var $prev = $('.hot-goods>.prev');//上一页
            var $hot_goods = $('.hot-goods');//可见区域
            var alltime = 400; //li移动的总时间
            var everytime = 20; // li移动的间隔时间
            var liscount = $lis.length;//li实际数量
            var page_width = 240;//一页的宽度
            var move = false; //图片移动的状态
            $next.on('click', function () {
                nextPage(true);
            });

            $prev.on('click', function () {
                nextPage(false);
            });

            //自动滚动
            //自动循环播放轮播图
            var timer;
            document.addEventListener('visibilitychange', function () {
                if (document.visibilityState == 'hidden') {
                    clearInterval(timer);
                }

                if (document.visibilityState == 'visible') {
                    timer = setInterval(function () {
                        nextPage(true);
                    }, 3000);
                }
            });

            // 鼠标移入时停止，离开时开始
            $hot_goods.hover(function () {
                clearInterval(timer)
            }, function () {
                timer = setInterval(function () {
                    nextPage(true);
                }, 3000);
            })


            function nextPage(next) {

                if (move == true) {
                    return false;
                }
                move = true;//true表示正在翻页

                var offset = 0;
                if (typeof next === 'boolean') {
                    offset = next ? -page_width : page_width;
                }
                var itemleft = offset / (alltime / everytime);//每次移动的距离
                var currleft = $hot_list.position().left; //当前ul的偏移量
                var targetleft = currleft + offset; //目标位置
                var intervalId = setInterval(function () {
                    currleft += itemleft;
                    if (currleft == targetleft) {
                        clearInterval(intervalId);

                        move = false;

                        if (Math.round(currleft) === -((liscount - 3) * page_width)) {
                            currleft = -page_width * 3;
                        } else if (parseInt(currleft) === 0) {
                            currleft = -((liscount - 6) * page_width);
                        }
                    }

                    $hot_list.css('left', currleft);
                }, everytime);
                console.log(currleft);
            }
        }
    });



    function get(res) {
        var html = template("mov", {
            value: res
        });

        $hot_list.children('li:eq(2)').after(html);

    }

    //报告精选
    var $new_list = $('.new-list');
    $.ajax({
        type: "get",
        url: "http://192.168.1.45:3000/report/new",
        dataType: "json",
        success: function (response) {
            //初始化渲染页面
            getNew(response);
            var $lis = $new_list.children('li');
            $lis.on('click', function () {
                location.href = './../report/report.html';
            });

            //查看更多
            var $more = $('.new .title>.more');
            var $load = $('.new .load');
            var $nomore = $('.new .nomore');
            var start = 8;//开始加载的位置
            var size = 8;//每次加载的数量
            $more.on('click', function () {
                $load.show();
                setTimeout(function () {
                    $load.hide();

                    $.ajax({
                        type: "get",
                        url: "http://192.168.1.45:3000/report/new",
                        dataType: "json",
                        success: function (response) {
                            var sum = response.length;
                            console.log(sum);
                            if (start + size >= sum) {
                                size = sum - start;
                                $nomore.css("display", 'block');
                            }
                            var html = template("new", {
                                value: response.slice(start, start + size)
                            });

                            $new_list.append(html);
                            start += size;
                            var $lis = $new_list.children('li');
                            $lis.on('click', function () {
                                location.href = './../report/report.html';
                            });

                        }
                    });
                }, 1000);
            })
        }
    });

    function getNew(res) {
        var html = template("new", {
            value: res.slice(0, 8)
        });

        $new_list.html(html);

    }

    //导购精选
    var $guid_list = $('.guid-list');
    $.ajax({
        type: "get",
        url: "http://192.168.1.45:3000/guid/new",
        dataType: "json",
        success: function (response) {
            var html = template("guid", {
                value: response.slice(0, 4)
            });
            $guid_list.html(html);

            var $lis = $guid_list.children('li');
            $lis.on('click', function () {
                location.href = './../guid/guid.html';
            });

            var $guid_more = $('.guid_more');//更多
            var $guid_load = $('.guid_load');//加载
            var $guid_nomore = $('.guid_nomore');//没有更多
            var guid_start = 4;
            var guid_size = 8;
            $guid_more.on('click', function () {
                $guid_load.show();
                setTimeout(function () {
                    $guid_load.hide();

                    $.ajax({
                        type: "get",
                        url: "http://192.168.1.45:3000/guid/new",
                        dataType: "json",
                        success: function (response) {
                            var guid_sum = response.length;
                            if ((guid_start + guid_size) >= guid_sum) {
                                guid_size = guid_sum - guid_start;
                                $guid_nomore.css("display", 'block');
                            }
                            var html = template("guid", {
                                value: response.slice(guid_start, (guid_start + guid_size))
                            });
                            console.log(guid_start, guid_size);
                            console.log(guid_start + guid_size);

                            $guid_list.append(html);
                            guid_start += guid_size
                            var $lis = $guid_list.children('li');
                            $lis.on('click', function () {
                                location.href = './../guid/guid.html';
                            });
                        }
                    });


                }, 1000);
            });

        }
    });


    //发现酷玩
    var $play_list = $('.play-list');
    var arr = [];
    $.ajax({
        type: "get",
        url: "http://192.168.1.45:3000/play/new",
        dataType: "json",
        success: function (response) {
            $.each(response, function (index, item) {
                $.each(item, function (index, item) {
                    arr.push(item);
                })
            })

            var html = template("play", {
                value: arr.slice(0, 16)
            });
            $play_list.html(html);

            var $lis = $play_list.children('li');
            $lis.on('click', function () {
                location.href = './../play/play.html';
            });

            var $show_more = $('.play .show-more');
            var $play_load = $('.play .load');//加载
            var $play_nomore = $('.play .nomore');//没有更多
            var play_start = 16;
            var play_size = 8;
            console.log($show_more);
            $show_more.on('click', function () {
                $play_load.show();
                setTimeout(function () {
                    $play_load.hide();

                    $.ajax({
                        type: "get",
                        url: "http://192.168.1.45:3000/play/new",
                        dataType: "json",
                        success: function (response) {
                            var play_sum = arr.length;
                            if ((play_start + play_size) >= play_sum) {
                                play_size = play_sum - play_start;
                                $play_nomore.css("display", 'block');
                                $show_more.css('display', 'none');
                            }
                            var html = template("play", {
                                value: arr.slice(play_start, (play_start + play_size))
                            });
                            console.log(play_start, play_size);
                            console.log(play_start + play_size);

                            $play_list.append(html);
                            play_start += play_size
                            var $lis = $play_list.children('li');
                            $lis.on('click', function () {
                                location.href = './../play/play.html';
                            });
                        }
                    });


                }, 1000);
            });
        }
    });



});
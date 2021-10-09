$(function () {
    //导航栏
    var $spans = $('.nav>span');
    $spans.eq(0).css('border-bottom', '3px solid #fc584e');
    $spans.on('click', function () {
        $(this).css('border-bottom', '3px solid #fc584e').siblings().css('border', 'none');

    });

    //免费试用小导航栏
    var $small_nav = $('.small-nav>span');
    $small_nav.eq(0).css('color', 'black');
    $small_nav.on('click', function () {
        $(this).css('color', 'black').siblings().css('color', '#999');
    });

    //体验师的试用导航栏
    var $small_two_nav = $('.small-two-nav>span');
    $small_two_nav.eq(0).css('color', 'black');
    $small_two_nav.on('click', function () {
        $(this).css('color', 'black').siblings().css('color', '#999');
    });

    $small_two_nav.parent('div').css('display', 'none');

    var $use_list = $('.use-list');//商品列表
    var $more = $('.more'); //初始页面的加载更多按钮
    var $all = $('.all-more');//全部页面的加载更多按钮
    var $replay = $('.replay-more');//申请中加载更多按钮
    var $using = $('.using-more');//使用中的加载按钮
    var $end = $('.end-more');//结束的加载按钮
    var $exper = $('.exper-more');//体验师加载更多
    var $exper_replay = $('.exper-replay');//体验师的申请
    var $exper_using = $('.exper-using');//体验师的正在使用
    var $exper_end = $('.exper-end');//体验师的结束
    var $load = $('.load');//加载
    var $nomore = $('.nomore');//没有更多数据

    //初始化页面
    all("http://192.168.1.45:3000/useing/public", 'first', $more);

    function all(url, text, ele) {

        $.ajax({
            type: "get",
            url: url,
            dataType: "json",
            success: function (response) {

                var date1 = new Date('5 1 , 2020,0:0:0');
                var date2 = new Date('9 21 , 2020,0:0:0');
                var time1 = date1.getTime();
                var time2 = date2.getTime();
                var arr = [];//存放分隔时间后的字符串
                var timeArr = [];//存放时间的
                var replayArr = []; //存放申请中的
                var usingArr = []; //存放正在使用中的
                var endArr = [];//存放结束的
                var replayCss = [];//存放下标
                var usingCss = [];
                var endCss = [];
                $.each(response, function (index, item) {

                    var a = item.endTime.split('-');
                    arr.push(a)
                });

                $.each(arr, function (index, item) {
                    var date = new Date(item[1] + ' ' + item[2] + ',' + item[0] + ',0:0:0');
                    var t = date.getTime();
                    timeArr.push(t);
                });

                $.each(timeArr, function (index, item) {
                    if (item < time1) {
                        replayArr.push(response[index]);
                        replayCss.push(index);
                    } else if (item > time1 && item < time2) {
                        usingArr.push(response[index]);
                        usingCss.push(index);
                    } else {
                        endArr.push(response[index]);
                        endCss.push(index);
                    }
                });

                if (text === 'first' || text === "all") {
                    //全部
                    var html = template("use", {
                        value: response.slice(0, 8)
                    });
                    $use_list.html(html);
                    htmlAll(replayCss, usingCss, endCss);

                } else if (text === 'replay') {
                    var html2 = template("use", {
                        value: replayArr.slice(0, 8)
                    });
                    $use_list.html(html2);
                    htmlReplay();

                } else if (text === 'using') {
                    var html3 = template("use", {
                        value: usingArr.slice(0, 8)
                    });
                    $use_list.html(html3);
                    htmlUsing();
                } else if (text === 'end') {
                    var html4 = template("use", {
                        value: endArr.slice(0, 8)
                    });
                    $use_list.html(html4);
                    htmlEnd();
                }

                css();


                if (text === 'first') {
                    $more.css('display', 'block').siblings().css('display', 'none');

                } else if (text === 'all') {
                    $all.css('display', 'block').siblings().css('display', 'none');
                } else if (text === 'replay') {
                    $replay.css('display', 'block').siblings().css('display', 'none');
                } else if (text === 'using') {
                    $using.css('display', 'block').siblings().css('display', 'none');
                } else if (text === 'end') {
                    $end.css('display', 'block').siblings().css('display', 'none');
                }

                var start = 8;
                var size = 8;

                ele.on('click', function () {
                    $load.show();
                    setTimeout(function () {
                        $load.hide();

                        $.ajax({
                            type: "get",
                            url: "http://192.168.1.45:3000/useing/public",
                            dataType: "json",
                            success: function (response) {
                                var sum = 0;
                                if (text === 'first' || text === 'all') {
                                    sum = response.length;
                                } else if (text === 'replay') {
                                    sum = replayArr.length;
                                } else if (text === 'using') {
                                    sum = usingArr.length;
                                } else if (text === 'end') {
                                    sum = endArr.length;
                                }

                                if ((start + size) > sum) {
                                    size = sum - start;
                                    $nomore.css('display', 'block');
                                    if (text === 'first') {
                                        $more.css('display', 'none');
                                    } else if (text === 'all') {
                                        $all.css('display', 'none');
                                    } else if (text === 'replay') {
                                        $replay.css('display', 'none');
                                    } else if (text === 'using') {
                                        $using.css('display', 'none');
                                    } else if (text === 'end') {
                                        $end.css('display', 'none');
                                    }

                                    console.log(sum);
                                }

                                if (text === 'first' || text === 'all') {
                                    var html = template("use", {
                                        value: response.slice(start, (start + size))
                                    });
                                    $use_list.append(html);

                                    htmlAll(replayCss, usingCss, endCss);
                                } else if (text === 'replay') {
                                    var html1 = template("use", {
                                        value: replayArr.slice(start, (start + size))
                                    });
                                    $use_list.append(html1);

                                    htmlReplay()

                                } else if (text === 'using') {
                                    var html2 = template("use", {
                                        value: usingArr.slice(start, (start + size))
                                    });
                                    $use_list.append(html2);

                                    htmlUsing()
                                } else if (text === 'end') {
                                    var html3 = template("use", {
                                        value: endArr.slice(start, (start + size))
                                    });
                                    $use_list.append(html3);

                                    htmlEnd();
                                }

                                console.log(start, size);
                                console.log(start + size);

                                css();
                                start += size
                            }
                        });
                    }, 1000)
                })

            }
        });
    }

    //改变log的css样式
    function css() {
        var $lis = $use_list.children();
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
            }
        });
    }

    //全部页面的样式
    function htmlAll(arr1, arr2, arr3) {
        var $lis = $use_list.children('li');
        $lis.on('click', function () {
            location.href = './../use/detail.html';
        });
        //改变对应的li的样式
        $.each(arr1, function (index, item) {
            $lis.eq(item).children('p').children('span').css({
                color: '#ff4e21',
                border: '1px solid #ff4e21'
            });
            $lis.eq(item).children('.time').html('剩余时间2天');
            $lis.eq(item).children('.time').css('color', '#ff4e21');
        });

        $.each(arr2, function (index, item) {
            $lis.eq(item).children('p').children('span').css({
                color: '#7acc68',
                border: '1px solid #7acc68'
            });
            $lis.eq(item).children('.time').html('查看试用名单');
            $lis.eq(item).children('.time').css('color', '#7acc68');
        });

        $.each(arr3, function (index, item) {
            $lis.eq(item).children('p').children('span').css({
                color: '#999',
                border: '1px solid #999'
            });
            $lis.eq(item).children('.time').html('报告数量 : 8');
            $lis.eq(item).children('.time').css('color', '#999');
        });
    }

    //申请页面的样式
    function htmlReplay() {
        var $lis = $use_list.children('li');
        $lis.on('click', function () {
            location.href = './../use/detail.html';
        });
        $.each($lis, function (index, item) {
            $lis.eq(index).children('p').children('span').css({
                color: '#ff4e21',
                border: '1px solid #ff4e21'
            });
            $lis.eq(index).children('.time').html('剩余时间2天');
            $lis.eq(index).children('.time').css('color', '#ff4e21');
        });
    }

    //正在体验页面的样式
    function htmlUsing() {
        var $lis = $use_list.children('li');
        $lis.on('click', function () {
            location.href = './../use/detail.html';
        });
        $.each($lis, function (index, item) {
            $lis.eq(index).children('p').children('span').css({
                color: '#7acc68',
                border: '1px solid #7acc68'
            });
            $lis.eq(index).children('.time').html('查看试用名单');
            $lis.eq(index).children('.time').css('color', '#7acc68');
        });

    }

    //结束页面的样式
    function htmlEnd() {
        var $lis = $use_list.children('li');
        $lis.on('click', function () {
            location.href = './../use/detail.html';
        });
        $.each($lis, function (index, item) {
            $lis.eq(index).children('p').children('span').css({
                color: '#999',
                border: '1px solid #999'
            });
            $lis.eq(index).children('.time').html('报告数量 : 8');
            $lis.eq(index).children('.time').css('color', '#999');
        });
    }

    //大众体验
    $spans.eq(0).on('click', function () {
        $small_two_nav.parent('div').css('display', 'none');
        $small_nav.parent('div').css('display', 'block');

        all("http://192.168.1.45:3000/useing/public", 'all', $all);
        $all.css('display', 'block');
        $nomore.css('display', 'none');
        $small_nav.eq(0).css('color', 'black').siblings().css('color', '#999');

        //全部
        $small_nav.eq(0).on('click', function () {
            all("http://192.168.1.45:3000/useing/public", 'all', $all);
            $all.css('display', 'block');
            $nomore.css('display', 'none');
        });

        //申请
        $small_nav.eq(1).on('click', function () {
            all("http://192.168.1.45:3000/useing/public", 'replay', $replay);
            $replay.css('display', 'block');
            $nomore.css('display', 'none');
        });

        //试用
        $small_nav.eq(2).on('click', function () {
            all("http://192.168.1.45:3000/useing/public", 'using', $using);
            $using.css('display', 'block');
            $nomore.css('display', 'none');
        });

        //结束
        $small_nav.eq(3).on('click', function () {
            all("http://192.168.1.45:3000/useing/public", 'end', $end);
            $end.css('display', 'block');
            $nomore.css('display', 'none');
        });

    });

    //全部
    $small_nav.eq(0).on('click', function () {
        all("http://192.168.1.45:3000/useing/public", 'all', $all);
        $all.css('display', 'block');
        $nomore.css('display', 'none');
    });

    //申请
    $small_nav.eq(1).on('click', function () {
        all("http://192.168.1.45:3000/useing/public", 'replay', $replay);
        $replay.css('display', 'block');
        $nomore.css('display', 'none');
    });

    //试用
    $small_nav.eq(2).on('click', function () {
        all("http://192.168.1.45:3000/useing/public", 'using', $using);
        $using.css('display', 'block');
        $nomore.css('display', 'none');
    });

    //结束
    $small_nav.eq(3).on('click', function () {
        all("http://192.168.1.45:3000/useing/public", 'end', $end);
        $end.css('display', 'block');
        $nomore.css('display', 'none');
    });



    // experience();
    //体验师
    function experience(text, ele) {
        var arr = [];//存放全部数据
        var newArr = [];//存放体验师享的
        $.ajax({
            type: "get",
            url: "http://192.168.1.45:3000/useing/public",
            dataType: "json",
            success: function (response) {
                $.each(response, function (index, item) {
                    arr.push(item);
                });

                $.ajax({
                    type: "get",
                    url: "http://192.168.1.45:3000/useing/master",
                    dataType: "json",
                    success: function (response) {
                        $.each(response, function (index, item) {
                            arr.push(item);
                        });
                        // console.log(arr);

                        $.each(arr, function (index, item) {
                            if (arr[index].info_ty === '体验师转享') {
                                newArr.push(arr[index]);
                            }
                        });

                        var date1 = new Date('5 1 , 2020,0:0:0');
                        var date2 = new Date('9 21 , 2020,0:0:0');
                        var time1 = date1.getTime();
                        var time2 = date2.getTime();
                        var arrT = [];//存放分隔时间后的字符串
                        var timeArr = [];//存放时间的
                        var replayArr = []; //存放申请中的
                        var usingArr = []; //存放正在使用中的
                        var endArr = [];//存放结束的
                        var replayCss = [];//存放下标
                        var usingCss = [];
                        var endCss = [];
                        $.each(newArr, function (index, item) {

                            var a = item.endTime.split('-');
                            arrT.push(a)
                        });

                        $.each(arrT, function (index, item) {
                            var date = new Date(item[1] + ' ' + item[2] + ',' + item[0] + ',0:0:0');
                            var t = date.getTime();
                            timeArr.push(t);
                        });

                        $.each(timeArr, function (index, item) {
                            if (item < time1) {
                                replayArr.push(newArr[index]);
                                replayCss.push(index);
                            } else if (item > time1 && item < time2) {
                                usingArr.push(newArr[index]);
                                usingCss.push(index);
                            } else {
                                endArr.push(newArr[index]);
                                endCss.push(index);
                            }
                        });

                        if (text === "exper-all") {
                            //全部
                            var html = template("use", {
                                value: newArr.slice(0, 8)
                            });
                            $use_list.html(html);
                            htmlAll(replayCss, usingCss, endCss);

                        } else if (text === 'exper-replay') {
                            var html2 = template("use", {
                                value: replayArr.slice(0, 8)
                            });
                            $use_list.html(html2);
                            htmlReplay();

                        } else if (text === 'exper-using') {
                            var html3 = template("use", {
                                value: usingArr.slice(0, 8)
                            });
                            $use_list.html(html3);
                            htmlUsing();
                        } else if (text === 'exper-end') {
                            var html4 = template("use", {
                                value: endArr.slice(0, 8)
                            });
                            $use_list.html(html4);
                            htmlEnd();
                        }

                        var $lis = $use_list.children('li');
                        $lis.on('click', function () {
                            location.href = './../use/detail.html';
                        });

                        css();

                        if (text === 'exper-all') {
                            $exper.css('display', 'block').siblings().css('display', 'none');
                        } else if (text === 'exper-replay') {
                            $exper_replay.css('display', 'block').siblings().css('display', 'none');
                        } else if (text === 'exper-using') {
                            $exper_using.css('display', 'block').siblings().css('display', 'none');
                        } else if (text === 'exper-end') {
                            $exper_end.css('display', 'block').siblings().css('display', 'none');
                        }

                        var start = 8;
                        var size = 8;

                        ele.on('click', function () {
                            $load.show();
                            setTimeout(function () {
                                $load.hide();

                                var sum = 0;
                                if (text === 'exper-all') {
                                    sum = newArr.length;
                                } else if (text === 'exper-replay') {
                                    sum = replayArr.length;
                                } else if (text === 'exper-using') {
                                    sum = usingArr.length;
                                } else if (text === 'exper-end') {
                                    sum = endArr.length;
                                }

                                if ((start + size) > sum) {
                                    size = sum - start;
                                    $nomore.css('display', 'block');
                                    if (text === 'exper-all') {
                                        $exper.css('display', 'none');
                                    } else if (text === 'exper-replay') {
                                        $exper_replay.css('display', 'none');
                                    } else if (text === 'exper-using') {
                                        $exper_using.css('display', 'none');
                                    } else if (text === 'exper-end') {
                                        $exper_end.css('display', 'none');
                                    }
                                }

                                if (text === 'exper-all') {
                                    var html = template("use", {
                                        value: newArr.slice(start, (start + size))
                                    });
                                    $use_list.append(html);

                                    htmlAll(replayCss, usingCss, endCss);
                                } else if (text === 'exper-replay') {
                                    var html1 = template("use", {
                                        value: replayArr.slice(start, (start + size))
                                    });
                                    $use_list.append(html1);

                                    htmlReplay()

                                } else if (text === 'exper-using') {
                                    var html2 = template("use", {
                                        value: usingArr.slice(start, (start + size))
                                    });
                                    $use_list.append(html2);

                                    htmlUsing()
                                } else if (text === 'exper-end') {
                                    var html3 = template("use", {
                                        value: endArr.slice(start, (start + size))
                                    });
                                    $use_list.append(html3);

                                    htmlEnd();
                                }

                                css();
                                start += size

                            }, 1000)
                        })
                    }
                });
            }
        });




    }

    $spans.eq(1).on('click', function () {

        $small_two_nav.parent('div').css('display', 'block');
        $small_nav.parent('div').css('display', 'none');
        experience('exper-all', $exper);
        $exper.css('display', 'block');
        $nomore.css('display', 'none');
        $small_nav.eq(0).css('color', 'black').siblings().css('color', '#999');

        //全部
        $small_two_nav.eq(0).on('click', function () {
            experience('exper-all', $exper);
            $exper.css('display', 'block');
            $nomore.css('display', 'none');
        });

        //申请
        $small_two_nav.eq(1).on('click', function () {
            experience('exper-replay', $exper_replay);
            $exper_replay.css('display', 'block');
            $nomore.css('display', 'none');
        });

        //试用
        $small_two_nav.eq(2).on('click', function () {
            experience('exper-using', $exper_using);
            $exper_using.css('display', 'block');
            $nomore.css('display', 'none');
        });

        //结束
        $small_two_nav.eq(3).on('click', function () {
            experience('exper-end', $exper_end);
            $exper_end.css('display', 'block');
            $nomore.css('display', 'none');
        });


    });
});
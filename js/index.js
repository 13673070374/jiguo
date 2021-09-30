$(function () {
    //轮播图效果
    var $ul = $('.slide-list');
    var $lis = $('.slide-list>li');
    var $point = $('.point>span');
    var $next = $('.next');//下一页
    var $prev = $('.prev');//上一页
    var $slides = $('.slides');//可见区域
    var everyW = $lis.width();//图片的数量
    var alltime = 400; //图片移动的总时间
    var everytime = 20; // 图片移动的间隔时间
    var index = 0;//下标
    var imgcount = $point.length;//图片的实际数量
    var page_width = 1920;//一页的宽度
    var move = false; //图片移动的状态
    //设置ul的宽度
    $ul.width(everyW * $lis.length);

    //下一页
    $next.on('click', function () {
        nextPage(true);
    });

    //上一页
    $prev.on('click', function () {
        nextPage(false);
    });

    //点击圆点翻页
    $point.on('click', function () {
        var targetIndex = $(this).index();
        if (targetIndex != index) {
            nextPage(targetIndex);
        }
    });

    //自动翻页
    var timer;
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState == 'hidden') {
            clearInterval(timer);
        }

        if (document.visibilityState == 'visible') {
            timer = setInterval(function () {
                nextPage(true)
            }, 2000);
        }
    });


    //鼠标进入停止翻页
    $slides.hover(function () {
        // over
        clearInterval(timer);
    }, function () {
        // out
        timer = setInterval(function () {
            nextPage(true);
        }, 3000);
    }
    );

    function nextPage(next) {

        if (move == true) {
            return false;
        }
        move = true;//true表示正在翻页

        var offset = 0;
        if (typeof next === 'boolean') {
            offset = next ? -page_width : page_width;
        } else {
            offset = -(next - index) * page_width;
        }
        var itemleft = offset / (alltime / everytime);//每次移动的距离
        var currleft = $ul.position().left; //当前ul的偏移量
        var targetleft = currleft + offset; //目标位置
        var intervalId = setInterval(function () {
            currleft += itemleft;
            if (currleft == targetleft) {
                clearInterval(intervalId);

                move = false;

                if (parseInt(currleft) === -((imgcount + 1) * page_width)) {
                    currleft = -page_width;
                } else if (parseInt(currleft) === 0) {
                    currleft = -(imgcount * page_width);
                }
            }
            console.log(currleft);
            $ul.css('left', currleft);
        }, everytime);

        updatePoint(next);
    }


    function updatePoint(next) {
        var targetIndex = 0;
        if (typeof next === 'boolean') {
            if (next) {
                targetIndex = index + 1;
                if (targetIndex == imgcount) {
                    targetIndex = 0;
                }
            } else {
                targetIndex = index - 1;
                if (targetIndex == -1) {
                    targetIndex = imgcount - 1;
                }
            }
        } else {
            targetIndex = next;
        }

        $point.eq(index).removeClass('on');
        $point.eq(targetIndex).addClass('on');
        index = targetIndex;
    }

    
});
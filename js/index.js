$(function () {

    // 轮播图的初始化
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
    });


    // 渲染菜单栏
    $.ajax({
        url: 'http://localhost:9090/api/getindexmenu',
        success: function (res) {
            // console.log(res);
            // 获取截取完之后的字符串
            getQueryString(res.result)

            // 生成模板
            var navHtml = template('navTpl', res);

            // 添加到页面
            $('.nav>ul').html(navHtml);
        }
    })


    // 对菜单栏的更多注册点击事件
    $('.nav').on('tap', '.more', function () {
        // 切换类名active
        $(this).toggleClass('active');
        // 如果有active的高度就为3rem;
        if ($(this).hasClass('active')) {
            $('.nav').animate({
                height: '3rem'
            })
        } else {
            // 如果没有这个active类名 高度就为2rem;
            $('.nav').animate({
                height: '2rem'
            })
        }
    })


    // 对菜单栏进行注册点击跳转事件 
    $('.nav').on('tap', 'li', function () {
        var href = $(this).data('href');
        // console.log(href);
        if (href == 'history.html' || href == 'more.html') {
            return false;
        }
        // 进行跳转
        location = href;
    })

    // 对折扣列表发送ajax请求
    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrl',
        success: function (res) {
            // console.log(res);
            // 生成模板
            var productListsHtml = template('productListsTpl', res);
            // 添加到页面
            $('.productList .content ul').html(productListsHtml);
        }
    })

    // 给页面右下角的置顶图标注册事件
    // 默认隐藏 当页面滑动距离超出时显示
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("#scrollTopFooter").fadeIn(1000);
        } else {
            $("#scrollTopFooter").fadeOut(1000);
        }
    });

    // 点击置顶
    $('#scrollTopFooter').on('tap', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000)
    })

    // 给折扣商品注册点击事件
    $('.content ul').on('tap','li',function () {
        location = 'moneyctrl.html';
      })

    $('.saving-money').on('tap',function () {
        location = 'moneyctrl.html';
      })


    // 对后台返回数据img的截取
    function getQueryString(data) {
        // 遍历数组
        for (var k = 0; k < data.length; k++) {
            // 去除掉 <img src="images/ic_search.png" alt="比价搜索"> 的前5位  
            var name = data[k].img.substr(5, data[k].img.length - 1);
            // 以空格为准 分割成数组
            var arr = name.split(' ');
            // 遍历数组
            for (var i = 0; i < arr.length; i++) {
                // var res = arr[i].split('=')
                // 找到以src开头的字符串
                if (arr[i].split('=')[0] == "src") {
                    //  console.log((arr[i].split('=')[1]));
                    // 取值"images/ic_search.png"
                    var img = arr[i].split('=')[1];
                    // 去掉 ""
                    data[k].img = img.substr(1, img.length - 2);
                }
            }
        }
        // console.log(data);
    }

})
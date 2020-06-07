// JavaScript Document
//copyright c by zhangxinxu 2009-10-17 
//http://www.zhangxinxu.com
/*由于大图绑定在href属性中，故一般而言，需使用a标签的href指向大图。仅支持png,gif,jpg,bmp四种格式的图片。用法是：目标.preview();
 例如：<a href="xx.jpg">图片</a>
 $("a").preview();就可以了
 */
(function ($) {
    //命名空间定义
    $.loveyDefaults = $.loveyDefaults || {};

    //组件参数集合定义
    $.loveyDefaults.preview = {
        caller: "",//绑定的元素
        validate: false, //是否验证
        formErrorContent: ""//错误的信息
    };

    $.fn.preview = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyDefaults.preview, options || {});

        var xOffset = 10;
        var yOffset = 20;
        var w = $(window).width();
        $(this).each(function () {
            $(this).hover(
                function (e) {
                    var tagName = this.tagName.toLowerCase();

                    if ($(this).attr("rel") != undefined && /.png$|.gif$|.jpg$|.bmp$/.test($(this).attr("rel").toLowerCase())) {
                        $("body").append("<div id='preview'><div><img width='200' src='" + $(this).attr('rel') + "' /><p>" + $(this).attr('des') + "</p></div></div>");
                    } else if ($(this).attr("rel") != undefined && /.ecms$/.test($(this).attr("rel"))) {
                        $("body").append("<div id='preview'><div><img width='200' src='" + $(this).attr('rel') + "' /></div></div>");
                    } else if (op.validate) {
                        //修复一个bug
                        $("#preview").remove();
                        $("body").append("<div id='preview'><div><p>" + op.formErrorContent.html() + "</p></div></div>");
                    } else if (!op.validate && tagName == 'input') {
                        var imgUrl = $(this).val();
                        var index1 = imgUrl.lastIndexOf('/');
                        imgUrl = imgUrl.substring(index1);
                        if (imgUrl == undefined || imgUrl == '') {
                            return;
                        }

                        if (/.png$|.gif$|.jpg$|.bmp$/.test(imgUrl)) {
                            $("body").append("<div id='preview'><div><img src='" + easyloader.URI + "/attach/200x200/" + imgUrl + "' /></div></div>");
                        }
                    } else {
                        $("body").append("<div id='preview'><div><p>" + $(this).attr('des') + "</p></div></div>");
                    }
                    var preview = $("#preview");
                    preview.css({
                        position: "absolute",
                        padding: "4px",
                        border: "1px solid #f3f3f3",
                        backgroundColor: "#eeeeee",
                        top: (e.pageY - yOffset) + "px",
                        zIndex: 10000000
                    });
                    op.validate && preview.addClass("error_tips");
                    $("div", preview).css({
                        padding: "5px",
                        backgroundColor: "white",
                        border: "1px solid #cccccc"
                    });
                    $("div > p", preview).css({
                        textAlign: "center",
                        fontSize: "12px",
                        padding: "8px 0 3px",
                        margin: "0"
                    });
                    if (e.pageX < w / 2) {
                        $("#preview").css({
                            left: e.pageX + xOffset + "px",
                            right: "auto"
                        }).fadeIn("fast");
                    } else {
                        $("#preview").css("right", (w - e.pageX + yOffset) + "px").css("left", "auto").fadeIn("fast");
                    }
                },
                function () {
                    $("#preview").remove();
                }).mousemove(function (e) {
                    $("#preview").css("top", (e.pageY - xOffset) + "px");
                    if (e.pageX < w / 2) {
                        $("#preview").css("left", (e.pageX + yOffset) + "px").css("right", "auto");
                    } else {
                        $("#preview").css("right", (w - e.pageX + yOffset) + "px").css("left", "auto");
                    }
                });
        });
    };
})(jQuery);
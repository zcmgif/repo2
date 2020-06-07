/**
 * jQuery Iframe择组件
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
//定义一个内部管理器
if (typeof (LoveyUIManagers) == "undefined") LoveyUIManagers = {};
(function ($) {
    //JQ扩展函数
    $.fn.loveyGetIframeManager = function () {
        return LoveyUIManagers[this[0].id + "_Iframe"];
    };

    //组件命名空间定义
    $.loveyIframe = $.loveyIframe || {};

    //组件参数集合定义
    $.loveyIframe.Default = {
        id: "iframe", //iframe的id
        minHeight: 300, //iframe最小高度定义
        loadClassName: "tab_pageloading", //预加载的样式名称
        container: "iframe_container", //监听的容器区域,此区域的链接已iframe打开
        confirmclass: "open_iframe", //监听的className
        loadComplete: null,//iframe加载完成执行函数
        elementName: ""//用于搜索iframe的id或者className，符合Jquery表达式即可
    };

    //判断是否被Iframe集成
    $.loveyIframe.isIframe = function (options) {
        return (window != top);
    };

    //父页面获取子页面的body元素
    $.loveyIframe.iframeBody = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyIframe.Default, options || {});

        return $("#" + op.id)[0].contentWindow.document.body;
    };

    $.loveyIframe.iframeElement = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyIframe.Default, options || {});
        if (op.elementName == "") return "";

        return $(op.elementName, $("#" + op.id)[0].contentWindow.document);
    };

    /**
     * 在指定的iframe里面打开一个内容页，同域自适应
     * @param options
     */
    $.loveyIframe.openIframe = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyIframe.Default, options || {});
        var searchElement = $("#" + op.container);
        var g = {};

        //委托所有需要已Iframe打开的元素
        $("." + op.confirmclass, searchElement).live("click", function () {
            g.href_elem = $(this);
            g.url = g.href_elem.attr("rel");

            var iframe = $("#" + op.id);
            g.iframeLoading = "<div class='" + op.loadClassName + "'></div>";
            iframe.before(g.iframeLoading);

            //涉及到iframe的地方必须已这样的形式打开，否则IE6底下无法显示
            setTimeout(function () {
                //当iframe被完全加载时隐藏loading动画
                iframe.attr("src", g.url)
                    .attr("id", op.id).bind("load.iframe", function () {
                        $("." + op.loadClassName).hide();
                        if (typeof op.loadComplete == "function") op.loadComplete(iframe, g.href_elem);
                    });
            }, 0);
        });
    };

    //同域底下Iframe自适应
    $.loveyIframe.auto = function (options) {
        if (!$.loveyIframe.isIframe()) return;

        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyIframe.Default, options || {});

        var iframe = parent.document.getElementsByTagName("iframe");
        for (var i = 0; i < iframe.length; i++) {
            if (iframe[i].contentWindow == window) {
                var h1 = 0, h2 = 0, d = document, dd = d.documentElement;
                iframe[i].parentNode.style.height = iframe[i].offsetHeight + "px";
                iframe[i].style.height = "10px";
                if (dd && dd.scrollHeight) h1 = dd.scrollHeight;
                if (d.body) h2 = d.body.scrollHeight;
                var h = Math.max(h1, h2);
                if (document.all) {
                    h += 40;
                }
                if (window.opera) {
                    h += 40;
                }
                if (h < op.minHeight) {
                    h = op.minHeight;
                }
                iframe[i].style.height = iframe[i].parentNode.style.height = h + "px";
            }
        }
    };

    $.loveyIframe.autoHeight = function () {
        if (!$.loveyIframe.isIframe()) return;

        var iframe = parent.document.getElementsByTagName("iframe");
        for (var i = 0; i < iframe.length; i++) {
            iframe[i].height = iframe[i].contentWindow.document.documentElement.scrollHeight;
        }
    };

    //不允许系统被Iframe嵌入
    $.loveyIframe.disable = function () {
        if ($.loveyIframe.isIframe()) {
            window.parent.location.href = window.location.href;
        }
    };
})(jQuery);
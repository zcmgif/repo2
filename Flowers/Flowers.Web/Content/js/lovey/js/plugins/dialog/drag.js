/**
 * jQuery ligerUI 1.1.0
 *
 * Author leoxie [ gd_star@163.com ]
 *
 */

(function ($) {
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Drag = {
        handler: "",//拖动的作用区域，在这个区域才可以触发拖动。可以是字符串(jQuery selector)，也可以是一个Dom jQuery对象
        proxy: true,//代理 拖动时的主体,可以是'clone'或者是函数,放回jQuery 对象
        disabled: false,//禁止拖动
        onStartDrag: false,
        animate: true,
        onDrag: false,
        onStopDrag: false,
        proxyX: null,//代理相对鼠标指针的位置,如果不设置则对应target的left
        proxyY: null
    };

    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerDrag = function (p) {
        var options = $.extend({}, $.ligerDefaults.Drag, p || {});
        return this.each(function () {
            if (this.useDrag) return;

            var g = {
                start: function (e) {
                    //$('body').css('cursor', 'move');
                    g.current = {
                        target: g.target,
                        left: g.target.offset().left,
                        top: g.target.offset().top,
                        startX: e.pageX || e.screenX,
                        startY: e.pageY || e.clientY
                    };
                    g.cursor = "move";
                    g.createProxy(e);
                    //阻止拖动的时候选中元素
                    e.preventDefault();
                    //代理没有创建成功
                    if (options.proxy && !g.proxy) return false;
                    (g.proxy || g.handler).css('cursor', g.cursor);
                    $(document).bind("selectstart.drag", function () {
                        return false;
                    });
                    $(document).bind('mouseup.drag', function (e) {
                        g.stop.apply(g, arguments);
                    });
                    //离开代理层停止
                    (g.proxy || g.handler).bind('mouseleave.drag', function (e) {
                        g.stop.apply(g, arguments);
                    });
                    $(document).bind('mousemove.drag', function (e) {
                        g.drag.apply(g, arguments)
                    });
                    if (options.onStartDrag) p.onStartDrag(g.current, e);
                },
                drag: function (e) {
                    if (!g.current) return;
                    var pageX = e.pageX || e.screenX;
                    var pageY = e.pageY || e.screenY;
                    g.current.diffX = pageX - g.current.startX;
                    g.current.diffY = pageY - g.current.startY;
                    (g.proxy || g.handler).css('cursor', g.cursor);
                    if (options.onDrag) {
                        if (options.onDrag(g.current, e) != false) {
                            g.applyDrag();
                        }
                    }
                    else {
                        g.applyDrag();
                    }
                },
                stop: function (e) {
                    $(document).unbind("selectstart.drag");
                    $(document).unbind('mousemove.drag');
                    (g.proxy || g.handler).unbind('mouseleave.stop');
                    $(document).unbind('mouseup.drag');

                    if (options.proxy) {
                        g.applyDrag(g.target);
                        g.removeProxy();
                    }

                    $("body").css("cursor", "");

                    if (p.onStopDrag) options.onStopDrag(g.current, e);
                    g.removeProxy();
                    g.current = null;
                },
                //更新当前坐标
                applyDrag: function (applyResultBody) {
                    /**
                     * 鼠标的位置，代理层，代理的标识
                     * @type {{}}
                     */
                    var cur = {};
                    applyResultBody = applyResultBody || g.proxy || g.target;
                    //移动位置边界处理
                    var maxWidth = $(window).width() - g.target.width() - 10;//与浏览器可视窗口边际10像素距离
                    var maxHeight = $(window).height() - g.target.height() - 10;

                    if (g.current.diffX) {
                        if ((g.current.left + g.current.diffX) < 10) {
                            cur.left = 10;
                        } else if ((g.current.left + g.current.diffX) > maxWidth) {
                            cur.left = maxWidth;
                        } else {
                            cur.left = g.current.left + g.current.diffX;
                        }
                    }

                    if (g.current.diffY) {
                        if ((g.current.top + g.current.diffY) < 10) {
                            cur.top = 10;
                        } else if ((g.current.top + g.current.diffY) > maxHeight) {
                            cur.top = maxHeight;
                        } else {
                            cur.top = g.current.top + g.current.diffY;
                        }
                    }

                    applyResultBody.css(cur);
                },
                createProxy: function (e) {
                    if (!options.proxy) return;
                    if (typeof options.proxy == 'function') {
                        g.proxy = options.proxy.call(options.target, g, e);
                    } else if (options.proxy == "clone") {
                        g.proxy = g.target.clone().css('position', 'absolute');
                        g.proxy.appendTo('body');
                    } else {
                        g.id = "Drag1001";
                        g.proxy = $("<div class='l-draggable'></div>");
                        g.proxy.width(g.target.width()).height(g.target.height());
                        g.proxy.attr("dragid", g.id).appendTo('body');
                    }
                    g.proxy.css({
                        left: options.proxyX == null ? g.current.left : g.current.startX + options.proxyX,
                        top: options.proxyY == null ? g.current.top : g.current.startY + options.proxyY
                    }).show();
                },
                removeProxy: function () {
                    if (g.proxy) g.proxy.remove();
                }

            };

            g.target = $(this);
            g.cursor = "move";
            if (options.handler == undefined || p.handler == null) {
                g.handler = g.target;
            } else {
                g.handler = (typeof p.handler == 'string' ? $(options.handler, this) : p.handle);
            }

            g.handler.css('cursor', g.cursor);
            g.handler.bind("mousedown.drag", function (e) {
                if (options.disabled) return;
                g.start(e);
            }).bind("mousemove.drag", function () {
                if (options.disabled) return;
                g.handler.css("cursor", g.cursor);
            });
            this.useDrag = true;
        });
    };
})(jQuery);
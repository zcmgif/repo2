/**
 * jQuery ligerUI 1.1.0
 *
 * Author leoxie [ gd_star@163.com ]
 *
 */
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function ($) {
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetAccordionManager = function () {
        return LigerUIManagers[this[0].id + "_Accordion"];
    };
    $.fn.ligerRemoveAccordionManager = function () {
        return this.each(function () {
            LigerUIManagers[this.id + "_Accordion"] = null;
        });
    };

    $.fn.ligerAccordion = function (p) {
        this.each(function () {
            p = $.extend({
                className: "", //给accordion自定义样式
                height: null,
                speed: "fast", //动画延时
                changeHeightOnResize: false,
                heightDiff: 0, // 高度补差
                iframeId: "accordionIfarme", //抽屉组件iframe的打开的容器
                showWithIframe: false, //已iframe的形式打开，和tab同时只能用一个
                loadClassName: "tab_pageloading", //预加载的样式名称
                childClassName: "hasChild", //如果可以有三级子菜单
                dialogClassName: "l-tips", //抽屉组件弹出的样式
                dialogWidth: 200, //对话框的宽度
                dialogWaiting: false,   //调用等待对话框，在成功之后关闭
                accordClickFunction: null//三层弹出菜单的点击执行函数
            }, p || {});

            if (this.usedAccordion) return;
            var g = {
                onResize: function () {
                    if (!p.height || typeof (p.height) != 'string' || p.height.indexOf('%') == -1) return false;
                    //set accordion height
                    if (g.accordion.parent()[0].tagName.toLowerCase() == "body") {
                        var windowHeight = $(window).height();
                        windowHeight -= parseInt(g.layout.parent().css('paddingTop'));
                        windowHeight -= parseInt(g.layout.parent().css('paddingBottom'));
                        g.height = p.heightDiff + windowHeight * parseFloat(g.height) * 0.01;
                    } else {
                        g.height = p.heightDiff + (g.accordion.parent().height() * parseFloat(p.height) * 0.01);
                    }
                    g.accordion.height(g.height);
                    g.setContentHeight(g.height - g.headerHoldHeight);
                },
                setHeight: function (height) {
                    g.accordion.height(height);
                    height -= g.headerHoldHeight;
                    $("> .l-accordion-content", g.accordion).height(height);
                },
                addTab: function (options) {
                    if (easyloader.isIframe) {
                        //因为整个平台是可以被Iframe嵌入的，需要保证tab时可用的
                        self.navtab.addTabItem({
                            text: options.text ? options.text : '空菜单',
                            url: options.url ? options.url : '#',
                            tabid: options.tabid,
                            resizeFrame: true,
                            dialogWaiting: p.dialogWaiting,
                            menuPic: options.menuPic
                        });
                        //特别需要注意，此方法已由tab组件实现
                        /*if (p.resizeFrame)
                         setFrameZoneHeight(top_expanded);
                         刷新tab页的Iframe by yzhao
                         parent.navtab.reload(p.menuId);*/
                    } else {
                        top.navtab.addTabItem({
                            text: options.text ? options.text : '空菜单',
                            url: options.url ? options.url : '#',
                            tabid: options.tabid,
                            resizeFrame: true,
                            dialogWaiting: p.dialogWaiting,
                            menuPic: options.menuPic
                        });
                        //特别需要注意，此方法已由tab组件实现
                        /*if (p.resizeFrame)
                         setFrameZoneHeight(top_expanded);
                         刷新tab页的Iframe by yzhao
                         top.navtab.reload(p.menuId);*/
                    }
                }, addIframe: function (options) {
                    var iframe = $("#" + p.iframeId);
                    g.iframeLoading = "<div class='" + p.loadClassName + "'></div>";
                    iframe.before(g.iframeLoading);

                    //涉及到iframe的地方必须已这样的形式打开，否则IE6底下无法显示
                    setTimeout(function () {
                        //当iframe被完全加载时隐藏loading动画
                        iframe.attr("src", options.url)
                                .attr("id", p.iframeId).bind("load.iframe", function () {
                                    $("." + p.loadClassName).hide();
                                });
                    }, 0);
                }, toogleSrc: function (srcObject) {
                    /**
                     * 鼠标点击图片切换效果
                     */
                    var scr_value = srcObject.attr("src");
                    var t_scr_value = srcObject.attr("t_src");
                    var hasToogle = srcObject.attr("hasToogle");

                    if (scr_value == "" || t_scr_value == "" || hasToogle == "yes") return;

                    srcObject.attr("src", t_scr_value);
                    srcObject.attr("t_src", scr_value);
                    //选中的标识
                    srcObject.attr("hasToogle", "yes");
                }, reToogleSrc: function (srcObject) {
                    /**
                     * 鼠标点击图片切换效果
                     */
                    var scr_value = srcObject.attr("src");
                    var t_scr_value = srcObject.attr("t_src");
                    var hasClick = srcObject.attr("hasClick");

                    if (scr_value == "" || t_scr_value == "" || hasClick == "yes") return;

                    srcObject.attr("src", t_scr_value);
                    srcObject.attr("t_src", scr_value);
                    //选中的标识
                    srcObject.attr("hasToogle", "");
                }
            };

            g.accordion = $(this);
            if (!g.accordion.hasClass("l-accordion-panel")) g.accordion.addClass("l-accordion-panel");
            //增加自定义className
            g.accordion.addClass(p.className);
            var selectedIndex = 0;
            if ($("> div[lselected=true]", g.accordion).length > 0)
                selectedIndex = $("> div", g.accordion).index($("> div[lselected=true]", g.accordion));

            $("> div", g.accordion).each(function (i, box) {
                var header = $('<div class="l-accordion-header"><div class="l-accordion-toggle"></div><div class="l-accordion-header-inner"></div></div>');
                if (i == selectedIndex && i != 0)
                    $(".l-accordion-toggle", header).addClass("l-accordion-toggle-open");
                if ($(box).attr("title")) {
                    $(".l-accordion-header-inner", header).html($(box).attr("title"));
                    $(box).attr("title", "");
                }
                $(box).before(header);
                if (!$(box).hasClass("l-accordion-content")) $(box).addClass("l-accordion-content");
            });

            //添加tab
            $("> .l-accordion-content li a", g.accordion).bind("click", function () {
                var menuObj = $(this);
                //如果有子菜单直接返回
                if (menuObj.hasClass(p.childClassName)) return;

                var objs = $("> .l-accordion-content li a", g.accordion);
                //清除其他的selected的状态
                for (var i = 0; i < objs.length; i++) {
                    $(objs[i]).removeClass("selected");
                    //点击过的元素先交换回来，在置空
                    if ($(objs[i]).children().attr("hasClick") == "yes") {
                        //先置空自己，在交换图片信息
                        $(objs[i]).children().attr("hasClick", "");
                        g.reToogleSrc($(objs[i]).children());
                    }
                    //所有元素置空
                    $(objs[i]).children().attr("hasClick", "");
                }

                //点击的元素加上点击标识
                menuObj.children().attr("hasClick", "yes");
                if (!menuObj.hasClass("selected"))
                    menuObj.addClass("selected");
                // 去掉首页的判断，让首页也可以动态刷新
                if (!menuObj.attr("url")) return;
                //if(menuObj.html()=="首页"||!menuObj.attr("url"))return;
                if (p.showWithIframe) {
                    g.addIframe({ url: menuObj.attr("url") })
                } else {
                    g.addTab({
                        text: menuObj.attr("title") ? menuObj.attr("title") : menuObj.html(),
                        url: menuObj.attr("url"),
                        tabid: menuObj.attr("tabid") ? menuObj.attr("tabid") : (menuObj.attr("menuid") ? menuObj.attr("menuid") : new Date().getTime()),
                        menuPic: menuObj.attr("menuPic") ? menuObj.attr("menuPic") : "default.png"
                    });
                }

                /**
                 * 鼠标点击图片切换效果
                 */
                g.toogleSrc(menuObj.children());
                /*var imageElement = menuObj.children();
                 var scr_value = imageElement.attr("src");
                 var t_scr_value = imageElement.attr("t_src");
                 imageElement.attr("src",t_scr_value);
                 imageElement.attr("t_src",scr_value);*/
            });

            /**
             * 抽屉组件和弹出层组件进行组合实现级联
             */
            $("> .l-accordion-content li", g.accordion).hover(
                    function () {
                        var menuObj = $(this);
                        var aElement = menuObj.children();
                        //为匹配的元素集合中获取第一个元素的当前坐标
                        var top = menuObj.offset().top + menuObj[0].offsetHeight - 24;
                        var left = menuObj.offset().left + menuObj[0].offsetWidth;
                        var dialogId = aElement.attr("pkId");
                        var bottom = ($(window).height() - menuObj.offset().top);

                        //console.log("窗体高度:"+$(window).height());
                        //console.log("标签距离顶部高度:"+menuObj.offset().top);
                        //console.log("滚动条距离顶部高度:"+$(document).scrollTop());
                        //console.log("标签高度:"+menuObj.height());

                        g.toogleSrc(aElement.children());

                        if (aElement.hasClass(p.childClassName)) {
                            var dialogElement = $("#" + dialogId + "_dialog");
                            if (dialogElement.html() != null) {
                                dialogElement.show();
                            } else {
                                var dialogEl = $("#" + dialogId);
                                /**
                                 * 取得元素距离屏幕的位置，弹出层的高度，如果越界则往上弹出
                                 */
                                var dgHeight = dialogEl.height(), elementTop = aElement.offset().top;
                                var lessHeight = $(window).height() - elementTop;

                                if (lessHeight < (dgHeight)) {
                                    top = dgHeight + 80;
                                }
                                var dialog = $.ligerDialog.open({
                                    content: dialogEl.html(),
                                    modal: false,
                                    id: dialogId + "_dialog",
                                    top: top,
                                    left: left,
                                    allowClose: false,
                                    showButton: false,
                                    isDrag: false,
                                    showTitle: false,
                                    className: p.dialogClassName,
                                    width: p.dialogWidth,
                                    animationStart: "",
                                    completeFunction: function (dialog) {
                                        var dialogHeight = dialog.height();
                                        //如果弹出层的高度大于剩余的可视高度则冲底部往上展示,需要把地址栏的内容空出
                                        if (dialogHeight > bottom) {
                                            dialog.css({ top: ($(window).height() - dialogHeight - 30) });
                                        }
                                        //console.log(dialog.height());
                                        dialog.hover(function () {
                                            dialog.show();

                                            //先解除绑定,在绑定,否则会造成tab多打开
                                            $(".l-dialog-content > ul > li > a").unbind("click").click(function () {
                                                var options = $(this);
                                                if (typeof p.accordClickFunction == "function") {
                                                    p.accordClickFunction(options);
                                                } else {
                                                    navtab.addTabItem({
                                                        text: options.attr("text") ? options.attr("text") : "空菜单",
                                                        url: options.attr("url") ? options.attr("url") : '#',
                                                        tabid: options.attr("tabid") ? options.attr("tabid") : new Date().getTime(),
                                                        resizeFrame: true,
                                                        dialogWaiting: p.dialogWaiting,
                                                        menuPic: options.attr("menuPic") ? options.attr("menuPic") : "default.png"
                                                    });
                                                }
                                            })
                                        }, function () {
                                            dialog.hide();
                                        });
                                    }
                                }
                                );
                            }
                        }
                    },
                    function () {
                        var menuObj = $(this);
                        var aElement = menuObj.children();
                        var dialogId = aElement.attr("pkId");

                        g.reToogleSrc(aElement.children());

                        if (aElement.hasClass(p.childClassName)) {
                            $("#" + dialogId + "_dialog").hide();
                        }
                    }
            );

            //add Even
            $(".l-accordion-toggle", g.accordion).each(function () {
                if (!$(this).hasClass("l-accordion-toggle-open") && !$(this).hasClass("l-accordion-toggle-close")) {
                    $(this).addClass("l-accordion-toggle-close");
                }
                if ($(this).hasClass("l-accordion-toggle-close")) {
                    $(this).parent().next(".l-accordion-content:visible").hide();
                }
            });
            $(".l-accordion-header", g.accordion).hover(function () {
                $(this).addClass("l-accordion-header-over");
            }, function () {
                $(this).removeClass("l-accordion-header-over");
            });
            $(".l-accordion-toggle", g.accordion).hover(function () {
                if ($(this).hasClass("l-accordion-toggle-open"))
                    $(this).addClass("l-accordion-toggle-open-over");
                else if ($(this).hasClass("l-accordion-toggle-close"))
                    $(this).addClass("l-accordion-toggle-close-over");
            }, function () {
                if ($(this).hasClass("l-accordion-toggle-open"))
                    $(this).removeClass("l-accordion-toggle-open-over");
                else if ($(this).hasClass("l-accordion-toggle-close"))
                    $(this).removeClass("l-accordion-toggle-close-over");
            });
            $(">.l-accordion-header", g.accordion).click(function () {
                if (!$(this).hasClass("l-accordion-selected"))
                    $(this).addClass("l-accordion-selected");
                else $(this).removeClass("l-accordion-selected");
                $(this).siblings(".l-accordion-selected").removeClass("l-accordion-selected");

                var togglebtn = $(".l-accordion-toggle:first", this);
                if (togglebtn.hasClass("l-accordion-toggle-close")) {
                    togglebtn.removeClass("l-accordion-toggle-close")
                            .removeClass("l-accordion-toggle-close-over l-accordion-toggle-open-over")
                    togglebtn.addClass("l-accordion-toggle-open");
                    $(this).next(".l-accordion-content")
                            .show(p.speed)
                            .siblings(".l-accordion-content:visible").hide(p.speed);
                    $(this).siblings(".l-accordion-header").find(".l-accordion-toggle").removeClass("l-accordion-toggle-open").addClass("l-accordion-toggle-close");
                }
                else {
                    togglebtn.removeClass("l-accordion-toggle-open")
                            .removeClass("l-accordion-toggle-close-over l-accordion-toggle-open-over")
                            .addClass("l-accordion-toggle-close");
                    $(this).next(".l-accordion-content").hide(p.speed);
                }
            });
            //init
            g.headerHoldHeight = 0;
            $("> .l-accordion-header", g.accordion).each(function () {
                g.headerHoldHeight += $(this).height();
            });
            if (p.height && typeof (p.height) == 'string' && p.height.indexOf('%') > 0) {
                g.onResize();
                if (p.changeHeightOnResize) {
                    $(window).resize(function () {
                        g.onResize();
                    });
                }
            }
            else {
                if (p.height) {
                    g.height = p.heightDiff + p.height;
                    g.accordion.height(g.height);
                    g.setHeight(p.height);
                }
                else {
                    g.header = g.accordion.height();
                }
            }

            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_Accordion"] = g;
            this.usedAccordion = true;
        }
        )
        ;
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_Accordion"];
        var managers = [];
        this.each(function () {
            managers.push(LigerUIManagers[this.id + "_Accordion"]);
        });
        return managers;
    };

})
        (jQuery);
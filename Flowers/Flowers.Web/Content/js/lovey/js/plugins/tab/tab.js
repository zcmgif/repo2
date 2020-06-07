/**
 * jQuery ligerUI 1.1.0.1
 *
 * Author leoxie [ gd_star@163.com ]
 * history:zwzhao@wisedu.com 扩展
 *
 */
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function ($) {
    $.fn.ligerGetTabManager = function () {
        return LigerUIManagers[this[0].id + "_Tab"];
    };

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Tab = {
        className: "", //给tab自定样式
        loadClassName: "tab_pageloading", //预加载的样式名称
        height: null,
        heightDiff: 0, // 高度补差
        changeHeightOnResize: false,
        contextmenu: true,
        closeMessage: "关闭当前页",
        closeOtherMessage: "关闭其他",
        closeAllMessage: "关闭所有",
        reloadMessage: "刷新",
        favTaskBar: "菜单收藏到任务栏",
        unFavTaskBar: "取消收藏",
        overrideTabItem: "",//覆盖第一个tab还是最后一个tab,first/last
        onBeforeOverrideTabItem: null,
        onAfterOverrideTabItem: null,
        onBeforeRemoveTabItem: null,
        onAfterRemoveTabItem: null,
        onBeforeAddTabItem: null,
        onAfterAddTabItem: null,
        onBeforeSelectTabItem: null,
        onAfterSelectTabItem: null,
        isVerticalTab: false, //是否是纵向tab
        maxTabs: 6, //最大可以打开的tab数,length从0开始
        isDisplay: false, //tab内容默认是否隐藏，解决页面加载问题,不能同时和grid使用
        bindKeyboardEvent: false, //绑定backsapce 回退到上一个tab,左右键盘实现前移和后移
        resizeFrame: false //tab组件的高度是否刷新，只有和抽屉组件结合才需要设置
    };

    $.fn.ligerTab = function (p) {
        p = $.extend({}, $.ligerDefaults.Tab, p || {});
        this.each(function () {
            if (this.usedTab) return;
            if ($(this).hasClass('l-hidden')) {
                return;
            }
            var g = {
                //设置tab按钮(左和右),显示返回true,隐藏返回false
                setTabButton: function () {
                    var sumwidth = 0;
                    $("li", g.tab.links.ul).each(function () {
                        sumwidth += $(this).width() + 2;
                    });
                    var mainwidth = g.tab.width();
                    if (sumwidth > mainwidth) {
                        g.tab.links.append('<div class="l-tab-links-left"></div><div class="l-tab-links-right"></div>');
                        g.setTabButtonEven();
                        return true;
                    } else {
                        g.tab.links.ul.animate({ left: 0 });
                        $(".l-tab-links-left,.l-tab-links-right", g.tab.links).remove();
                        return false;
                    }
                },
                //设置左右按钮的事件 标签超出最大宽度时，可左右拖动
                setTabButtonEven: function () {
                    $(".l-tab-links-left", g.tab.links).hover(
                        function () {
                            $(this).addClass("l-tab-links-left-over");
                        },
                        function () {
                            $(this).removeClass("l-tab-links-left-over");
                        }).click(function () {
                            g.moveToPrevTabItem();
                        });
                    $(".l-tab-links-right", g.tab.links).hover(
                        function () {
                            $(this).addClass("l-tab-links-right-over");
                        },
                        function () {
                            $(this).removeClass("l-tab-links-right-over");
                        }).click(function () {
                            g.moveToNextTabItem();
                        });
                },
                //切换到上一个tab
                moveToPrevTabItem: function () {
                    var btnWitdth = $(".l-tab-links-left", g.tab.links).width();
                    var leftList = new Array(); //记录每个tab的left,由左到右
                    $("li", g.tab.links).each(function (i, item) {
                        var currentItemLeft = -1 * btnWitdth;
                        if (i > 0) {
                            currentItemLeft = parseInt(leftList[i - 1]) + $(this).prev().width() + 2;
                        }
                        leftList.push(currentItemLeft);
                    });
                    var currentLeft = -1 * parseInt(g.tab.links.ul.css("left"));
                    for (var i = 0; i < leftList.length - 1; i++) {
                        if (leftList[i] < currentLeft && leftList[i + 1] >= currentLeft) {
                            g.tab.links.ul.animate({ left: -1 * parseInt(leftList[i]) });
                            return;
                        }
                    }
                },
                //切换到下一个tab
                moveToNextTabItem: function () {
                    var btnWitdth = $(".l-tab-links-right", g.tab).width();
                    var sumwidth = 0;
                    var tabItems = $("li", g.tab.links.ul);
                    tabItems.each(function () {
                        sumwidth += $(this).width() + 2;
                    });
                    var mainwidth = g.tab.width();
                    var leftList = new Array(); //记录每个tab的left,由右到左
                    for (var i = tabItems.length - 1; i >= 0; i--) {
                        var currentItemLeft = sumwidth - mainwidth + btnWitdth + 2;
                        if (i != tabItems.length - 1) {
                            currentItemLeft = parseInt(leftList[tabItems.length - 2 - i]) - $(tabItems[i + 1]).width() - 2;
                        }
                        leftList.push(currentItemLeft);
                    }
                    var currentLeft = -1 * parseInt(g.tab.links.ul.css("left"));
                    for (var j = 1; j < leftList.length; j++) {
                        if (leftList[j] <= currentLeft && leftList[j - 1] > currentLeft) {
                            g.tab.links.ul.animate({ left: -1 * parseInt(leftList[j - 1]) });
                            return;
                        }
                    }
                },
                getTabItemCount: function () {
                    return $("li", g.tab.links.ul).length;
                },
                getSelectedTabItemID: function () {
                    return $("li.l-selected", g.tab.links.ul).attr("tabid");
                },
                removeSelectedTabItem: function () {
                    g.removeTabItem(g.getSelectedTabItemID());
                },
                //覆盖选择的tabitem
                overrideSelectedTabItem: function (options) {
                    g.overrideTabItem(g.getSelectedTabItemID(), options);
                },
                /**
                 * 覆盖
                 * @param targettabid，要覆盖的tabid
                 * @param options
                 * @return {*}
                 * history ：lovey扩展功能，如果tab的fix属性为ture，则tab不允许覆盖 by yzhao 2013-3-5 9:49
                 *
                 */
                overrideTabItem: function (targettabid, options) {
                    if (options.onBeforeOverrideTabItem && options.onBeforeOverrideTabItem(targettabid) == false) return false;

                    var tabitem = $("li[tabid=" + targettabid + "]", g.tab.links.ul);
                    var tempObj = [];

                    $("li", g.tab.links.ul).each(function (i, item) {
                        var fix = $(item).attr("fix");
                        if (fix == undefined) {
                            tempObj.push($(item));
                        }
                    });

                    //by yzhao 如果是固定tab则不允许覆盖
                    if (p.overrideTabItem == "first") {
                        tabitem = $("li[tabid=" + tempObj[0].attr("tabid") + "]", g.tab.links.ul);
                        targettabid = tempObj[0].attr("tabid");
                    } else if (p.overrideTabItem == "last") {
                        tabitem = $("li[tabid=" + tempObj[tempObj.length - 1].attr("tabid") + "]", g.tab.links.ul);
                        targettabid = tempObj[tempObj.length - 1].attr("tabid");
                    } else {
                        var fix = tabitem.attr("fix");
                        if (fix == "true") {
                            $.ligerDialog.waitting("固定Tab不允许覆盖！", 60000, true);
                            return false;
                        }
                    }

                    var tabid = options.tabid;
                    if (tabid == undefined) tabid = g.getNewTabid();
                    var url = options.url;
                    var content = options.content;
                    /*var target = options.target;*/
                    var text = options.text;
                    var showClose = options.showClose;
                    var height = options.height;

                    //如果达到最大的tab打开数，则覆盖当前Tab项目
                    var currentTabId = $("li.l-selected", g.tab.links).attr("tabid");
                    if ($(">ul >li", g.tab.links).length > p.maxTabs) {
                        tabid = currentTabId;
                    }

                    //如果不存在则返回
                    if (!g.isTabItemExist(tabid)) {
                        return;
                    }
                    var contentitem = $(".l-tab-content-item[tabid=" + targettabid + "]", g.tab.content);
                    if (!tabitem || !contentitem) return;
                    tabitem.attr("tabid", options.tabid);
                    tabitem.attr("url", options.url);
                    tabitem.attr("title", options.text);
                    contentitem.attr("tabid", options.tabid);

                    //判断内容区域是否是
                    if (url != undefined && url != '') {
                        if (options.dialogWaiting) {
                            contentitem.html("<iframe frameborder='0' scrolling='auto' allowtransparency='true'></iframe>");
                            /**
                             * 弹出全局的等待
                             */
                            $.ligerDialog.open({
                                content: easyloader.sysloading,
                                allowClose: false,
                                showButton: false,
                                isDrag: false,
                                showTitle: false,
                                className: p.dialogClassName
                            });
                        } else {
                            contentitem.html("<div class='" + p.loadClassName + "'></div><iframe frameborder='0' scrolling='auto' allowtransparency='true'></iframe>");
                        }
                    }

                    if (content) {
                        contentitem.html(content);
                    } else {
                        //预加载
                        var iframeloading = $("." + p.loadClassName, contentitem);
                        var iframe = $("iframe:first", contentitem);

                        if (url != undefined && url != '') {
                            //涉及到iframe的地方必须已这样的形式打开，否则IE6底下无法显示
                            setTimeout(function () {
                                iframe.attr("name", options.tabid)
                                    .attr("src", url)
                                    .attr("id", options.tabid).bind('load.tab', function () {
                                        if (options.dialogWaiting) {
                                            $.ligerDialog.close();
                                        } else {
                                            iframeloading.hide();
                                        }
                                    });
                                //只有框架页的集成时候才需要
                                /*if (easyloader.isIframe) {
                                 parent.setContentHeight(parent.top_expanded)
                                 }*/
                                //by yzhao 当抽屉组件和tab组件结合使用，需要刷新高度
                                if (options.resizeFrame) {
                                    parent.setFrameZoneHeight(parent.top_expanded);
                                }
                            }, 0);

                            $("iframe", contentitem).attr("name", options.tabid);
                        } else {
                            if (options.dialogWaiting) {
                                $.ligerDialog.close();
                            } else {
                                iframeloading.remove();
                                iframe.remove();
                            }
                        }
                    }

                    if (showClose == undefined) showClose = true;
                    if (showClose == false) $(".l-tab-links-item-close", tabitem).remove();
                    else {
                        if ($(".l-tab-links-item-close", tabitem).length == 0)
                            tabitem.append("<div class='l-tab-links-item-close'></div>");
                    }
                    if (text == undefined) text = tabid;
                    if (height) contentitem.height(height);
                    $("a", tabitem).text(text);

                    if (p.overrideTabItem == "first" || p.overrideTabItem == "last") {
                        g.selectTabItem(options.tabid);
                    } else {
                        g.selectTabItem(tabid);
                    }

                    if (g.setTabButton()) {
                        g.moveToLastTabItem();
                    }
                    //增加事件
                    //                    g.addTabItemEvent(tabitem);

                    p.onAfterOverrideTabItem && p.onAfterOverrideTabItem(targettabid);
                },
                //选中tab项
                selectTabItem: function (tabid) {
                    //关闭表单error提示
                    $(".formError").remove();
                    if (p.onBeforeSelectTabItem && p.onBeforeSelectTabItem(tabid) == false) return false;
                    g.selectedTabId = tabid;
                    $("> .l-tab-content-item[tabid=" + tabid + "]", g.tab.content).show().siblings().hide();
                    $("li[tabid=" + tabid + "]", g.tab.links.ul).addClass("l-selected").siblings().removeClass("l-selected");
                    $("div[tabid=" + tabid + "]", g.tab.content).attr("title", "");
                    p.onAfterSelectTabItem && p.onAfterSelectTabItem(tabid);
                },
                //移动到最后一个tab
                moveToLastTabItem: function () {
                    var sumwidth = 0;
                    $("li", g.tab.links.ul).each(function () {
                        sumwidth += $(this).width() + 2;
                    });
                    var mainwidth = g.tab.width();
                    if (sumwidth > mainwidth) {
                        var btnWitdth = $(".l-tab-links-right", g.tab.links).width();
                        g.tab.links.ul.animate({ left: -1 * (sumwidth - mainwidth + btnWitdth + 2) });
                    }
                },
                //判断tab是否存在
                isTabItemExist: function (tabid) {
                    return $("li[tabid=" + tabid + "]", g.tab.links.ul).length > 0;
                },
                //增加一个tab
                addTabItem: function (options) {
                    var tabid = options.tabid;
                    if (tabid == undefined) tabid = g.getNewTabid();
                    var url = options.url;
                    var content = options.content;
                    var text = options.text;
                    var showClose = options.showClose;
                    var height = options.height;
                    var menuPic = options.menuPic;

                    //如果已经存在
                    if (g.isTabItemExist(tabid)) {
                        g.selectTabItem(tabid);
                        return;
                    }
                    var currentTabId = $("li.l-selected", g.tab.links).attr("tabid");
                    if ($(">ul >li", g.tab.links).length > p.maxTabs) {
                        g.overrideTabItem(currentTabId, options);
                        return;
                    }

                    if (p.onBeforeAddTabItem && p.onBeforeAddTabItem(tabid) == false) return false;

                    var tabitem = $("<li><div class='maintab_left'><a></a></div><div class='maintab_right'><div class='l-tab-links-item-close'></div></div></li>");
                    //var contentitem = $("<div class='l-tab-content-item'><div class='" + p.loadClassName + "'></div><iframe frameborder='0' scrolling='auto'></iframe></div>");
                    var contentitem = "";
                    var iframeloading = "";
                    if (options.dialogWaiting) {
                        contentitem = $("<div class='l-tab-content-item'><iframe frameborder='0' scrolling='auto' allowtransparency='true'></iframe></div>");

                        /**
                         * 弹出全局的等待
                         */
                        $.ligerDialog.open({
                            content: easyloader.sysloading,
                            allowClose: false,
                            showButton: false,
                            isDrag: false,
                            showTitle: false,
                            className: p.dialogClassName
                        });
                    } else {
                        contentitem = $("<div class='l-tab-content-item'><div class='" + p.loadClassName + "'></div><iframe frameborder='0' scrolling='auto' allowtransparency='true'></iframe></div>");
                        //预加载
                        iframeloading = $("." + p.loadClassName, contentitem);
                    }
                    var iframe = $("iframe:first", contentitem);

                    if (g.makeFullHeight) {
                        var newheight = g.tab.height() - g.tab.links.height();
                        contentitem.height(newheight);
                    }

                    tabitem.attr("tabid", tabid);
                    //记录工具栏上的图标的名称
                    tabitem.attr("menuPic", menuPic);
                    tabitem.attr("url", url);
                    tabitem.attr("title", text);
                    contentitem.attr("tabid", tabid);

                    if (url != undefined && url != '') {
                        //涉及到iframe的地方必须已这样的形式打开，否则IE6底下无法显示
                        setTimeout(function () {
                            iframe.attr("name", tabid)
                                .attr("src", url)
                                .attr("id", tabid).bind('load.tab', function () {
                                    if (options.dialogWaiting) {
                                        $.ligerDialog.close();
                                    } else {
                                        iframeloading.hide();
                                    }
                                });

                            //by yzhao 当抽屉组件和tab组件结合使用，需要刷新高度
                            if (options.resizeFrame) {
                                parent.setFrameZoneHeight(parent.top_expanded);
                            }
                        }, 0);


                        $("iframe", contentitem).attr("name", tabid);
                    } else {
                        if (options.dialogWaiting) {
                            $.ligerDialog.close();
                        } else {
                            iframeloading.remove();
                            iframe.remove();
                        }
                    }

                    if (content) {
                        contentitem.html(content);
                    }

                    if (showClose == undefined) showClose = true;
                    if (showClose == false) $(".l-tab-links-item-close", tabitem).remove();
                    if (text == undefined) text = tabid;
                    if (height) contentitem.height(height);
                    $("a", tabitem).text(text);

                    g.tab.links.ul.append(tabitem);
                    g.tab.content.append(contentitem);
                    g.selectTabItem(tabid);
                    if (g.setTabButton()) {
                        g.moveToLastTabItem();
                    }
                    //增加事件
                    g.addTabItemEvent(tabitem);
                    p.onAfterAddTabItem && p.onAfterAddTabItem(tabid);
                },
                addTabItemEvent: function (tabitem) {
                    tabitem.click(function () {
                        var tabid = $(this).attr("tabid");
                        g.selectTabItem(tabid);
                    });
                    //右键事件支持
                    g.tab.menu && po.addTabItemContextMenuEven(tabitem);
                    $(".l-tab-links-item-close", tabitem).hover(
                        function () {
                            $(this).addClass("l-tab-links-item-close-over");
                        },
                        function () {
                            $(this).removeClass("l-tab-links-item-close-over");
                        }).click(function () {
                            var tabid = $(this).parent().parent().attr("tabid");
                            g.removeTabItem(tabid);
                        });

                },
                //移除tab项
                removeTabItem: function (tabid) {
                    if (p.onBeforeRemoveTabItem && p.onBeforeRemoveTabItem(tabid) == false) return false;
                    var currentIsSelected = $("li[tabid=" + tabid + "]", g.tab.links.ul).hasClass("l-selected");
                    if (currentIsSelected) {
                        $(".l-tab-content-item[tabid=" + tabid + "]", g.tab.content).prev().show();
                        $("li[tabid=" + tabid + "]", g.tab.links.ul).prev().addClass("l-selected").siblings().removeClass("l-selected");
                    }
                    $(".l-tab-content-item[tabid=" + tabid + "]", g.tab.content).remove();
                    $("li[tabid=" + tabid + "]", g.tab.links.ul).remove();
                    g.setTabButton();
                    p.onAfterRemoveTabItem && p.onAfterRemoveTabItem(tabid);
                },
                addHeight: function (heightDiff) {
                    var newHeight = g.tab.height() + heightDiff;
                    g.setHeight(newHeight);
                },
                setHeight: function (height) {
                    g.tab.height(height);
                    g.setContentHeight();
                },
                setContentHeight: function () {
                    var newheight = g.tab.height() - g.tab.links.height();
                    g.tab.content.height(newheight);
                    $("> .l-tab-content-item", g.tab.content).height(newheight);
                },
                getNewTabid: function () {
                    var now = new Date();
                    return now.getTime();
                },
                //notabid 过滤掉tabid的
                //noclose 过滤掉没有关闭按钮的
                getTabidList: function (notabid, noclose) {
                    var tabidlist = [];
                    $("> li", g.tab.links.ul).each(function () {
                        if ($(this).attr("tabid")
                            && $(this).attr("tabid") != notabid
                            && (!noclose || $(".l-tab-links-item-close", this).length > 0)) {
                            tabidlist.push($(this).attr("tabid"));
                        }
                    });
                    return tabidlist;
                },
                removeOther: function (tabid, compel) {
                    var tabidlist = g.getTabidList(tabid, true);
                    $(tabidlist).each(function () {
                        g.removeTabItem(this);
                    });
                },
                reload: function (tabid) {
                    $(".l-tab-content-item[tabid=" + tabid + "] iframe", g.tab.content).each(function (i, iframe) {
                        $(iframe).attr("src", $(iframe).attr("src"));
                    });
                },
                /******************************2011-12-14扩展函数****************************************/
                /**
                 *  指定tab重定向新地址
                 *  @param tabid tabId
                 *  @param url 要重定向的地址
                 *
                 */
                location: function (tabid, url) {
                    $(".l-tab-content-item[tabid=" + tabid + "] iframe", g.tab.content).each(function (i, iframe) {
                        $(iframe).attr("src", url);
                    });
                },
                /**********************************************************************/
                removeAll: function (compel) {
                    var tabidlist = g.getTabidList(null, true);
                    $(tabidlist).each(function () {
                        g.removeTabItem(this);
                    });
                },
                onResize: function () {
                    if (!p.height || typeof (p.height) != 'string' || p.height.indexOf('%') == -1) return false;
                    //set tab height
                    if (g.tab.parent()[0].tagName.toLowerCase() == "body") {
                        var windowHeight = $(window).height();
                        windowHeight -= parseInt(g.tab.parent().css('paddingTop'));
                        windowHeight -= parseInt(g.tab.parent().css('paddingBottom'));
                        g.height = p.heightDiff + windowHeight * parseFloat(g.height) * 0.01;
                    }
                    else {
                        g.height = p.heightDiff + (g.tab.parent().height() * parseFloat(p.height) * 0.01);
                    }
                    g.tab.height(g.height);
                    g.setContentHeight();
                }
            };

            var po = {
                menuItemClick: function (item) {
                    if (!item.id || !g.actionTabid) return;
                    //从指定的元素区域搜索满足条件的li
                    var clickElement = $("li[tabid=" + g.actionTabid + "]", g.tab.links.ul);
                    switch (item.id) {
                        case "close":
                            g.removeTabItem(g.actionTabid);
                            g.actionTabid = null;
                            break;
                        case "closeother":
                            g.removeOther(g.actionTabid);
                            break;
                        case "closeall":
                            g.removeAll();
                            g.actionTabid = null;
                            break;
                        case "reload":
                            g.selectTabItem(g.actionTabid);
                            g.reload(g.actionTabid);
                            g.actionTabid = null;
                            break;
                        case "fav":
                            if (easyloader.isIframe) {
                                //因为整个平台是可以被Iframe嵌入的，需要保证tab时可用的
                                self.taskbar.addTaskBar({
                                    taskid: g.actionTabid,
                                    url: clickElement.attr("url"),
                                    title: clickElement.attr("title"),
                                    icon: clickElement.attr("menupic")
                                });
                            } else {
                                top.taskbar.addTaskBar({
                                    taskid: g.actionTabid,
                                    url: clickElement.attr("url"),
                                    title: clickElement.attr("title"),
                                    icon: clickElement.attr("menupic")
                                });
                            }
                            g.actionTabid = null;
                            break;
                        case "unfav":
                            if (easyloader.isIframe) {
                                //因为整个平台是可以被Iframe嵌入的，需要保证tab时可用的
                                self.taskbar.removeTaskBar(g.actionTabid);
                            } else {
                                top.taskbar.removeTaskBar(g.actionTabid);
                            }
                            g.actionTabid = null;
                            break;
                    }
                },
                addTabItemContextMenuEven: function (tabitem) {
                    tabitem.bind("contextmenu", function (e) {
                        if (!g.tab.menu) return;
                        g.actionTabid = tabitem.attr("tabid");
                        g.tab.menu.show({ top: e.pageY, left: e.pageX });
                        if ($(".l-tab-links-item-close", this).length == 0) {
                            g.tab.menu.setDisable('close');
                        }
                        else {
                            g.tab.menu.setEnable('close');
                        }
                        return false;
                    });
                }
            };

            if (p.height) g.makeFullHeight = true;
            g.tab = $(this);
            if (!g.tab.hasClass("l-tab")) g.tab.addClass("l-tab");
            g.tab.addClass(p.className);
            if (p.contextmenu && $.ligerMenu) {
                g.tab.menu = $.ligerMenu({
                    width: 150, items: [
                        { text: p.closeMessage, id: 'close', click: po.menuItemClick },
                        { text: p.closeOtherMessage, id: 'closeother', click: po.menuItemClick },
                        { text: p.closeAllMessage, id: 'closeall', click: po.menuItemClick },
                        { text: p.favTaskBar, id: 'fav', click: po.menuItemClick },
                        { text: p.unFavTaskBar, id: 'unfav', click: po.menuItemClick },
                        { text: p.reloadMessage, id: 'reload', click: po.menuItemClick }
                    ]
                });
            }

            //modify by yzhao tab的内容默认不展示，在dom元素加载完成之后展示
            if (p.isDisplay) {
                g.tab.content = $('<div class="l-tab-content" style="display: none;"></div>');
            } else {
                g.tab.content = $('<div class="l-tab-content"></div>');
            }

            //构造content的容器,如果里面是Iframe会加载两次 todo
            $("> div", g.tab).appendTo(g.tab.content);
            g.tab.content.appendTo(g.tab);
            //构造ul的容器
            g.tab.links = $('<div class="l-tab-links"><ul style="left: 0px; "></ul></div>');
            g.tab.links.prependTo(g.tab);
            //取得ul
            g.tab.links.ul = $("ul", g.tab.links);
            if (p.isVerticalTab) {
                $("li", g.tab.links.ul).each(function () {
                    $(this).css("float", "left");
                });
                g.tab.links.css({ 'float': 'left', 'width': '20%' });
                g.tab.content.css({ 'float': 'left', 'width': '80%' });
            }
            var haslselected = $("> div[lselected=true]", g.tab.content).length > 0;
            g.selectedTabId = $("> div[lselected=true]", g.tab.content).attr("tabid");
            $("> div", g.tab.content).each(function (i, box) {
                //取得content里面的div元素，用于构造ul的li元素
                var li = $('<li class=""><div class="maintab_left"><a></a></div><div class="maintab_right"></div></li>');
                if ($(box).attr("title")) {
                    $(".maintab_left > a", li).html($(box).attr("title"));
                }
                var tabid = $(box).attr("tabid");

                var icon = $(box).attr("icon");
                if (icon) {
                    $(".maintab_left > a", li).before("<span class=\"" + icon + "\"></span>");
                }
                /**
                 *  为选择组件添加2个参数,不影响其他地方 update by junfang 20110229
                 *  增加任务栏支持 by yzhao 2013-3-19
                 */
                var leftUrl = $(box).attr("leftUrl");
                var rightUrl = $(box).attr("rightUrl");
                var fix = $(box).attr("fix");
                var url = $(box).attr("url");
                var menuPic = $(box).attr("menuPic");
                var title = $(box).attr("title");
                var roleUrl = $(box).attr("roleUrl");

                leftUrl && li.attr("leftUrl", leftUrl);
                rightUrl && li.attr("rightUrl", rightUrl);
                fix && li.attr("fix", fix);
                url && li.attr("url", url);
                menuPic && li.attr("menuPic", menuPic);
                title && li.attr("title", title);
                roleUrl && li.attr("roleUrl", roleUrl);

                if (tabid == undefined) {
                    tabid = g.getNewTabid();
                    $(box).attr("tabid", tabid);
                    if ($(box).attr("lselected")) {
                        g.selectedTabId = tabid;
                    }
                }
                li.attr("tabid", tabid);

                if (!haslselected && i == 0) g.selectedTabId = tabid;
                var showClose = $(box).attr("showClose");
                if (showClose) {
                    li.append("<div class='l-tab-links-item-close'></div>");
                }
                $("> ul", g.tab.links).append(li);
                if (!$(box).hasClass("l-tab-content-item")) $(box).addClass("l-tab-content-item");
            });
            //init
            g.selectTabItem(g.selectedTabId);

            //set content height
            if (p.height) {
                if (typeof (p.height) == 'string' && p.height.indexOf('%') > 0) {
                    g.onResize();
                    if (p.changeHeightOnResize) {
                        $(window).resize(function () {
                            g.onResize();
                        });
                    }
                } else {
                    g.setHeight(p.height);
                }
            }
            if (g.makeFullHeight)
                g.setContentHeight();


            //add even
            $("li", g.tab.links).each(function () {
                g.addTabItemEvent($(this));
            });

            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_Tab"] = g;
            this.usedTab = true;

            /**
             * add keydown even by yzhao 2013-3-5 12:32
             */
            if (p.bindKeyboardEvent) {
                var bodyEl = $("body");
                bodyEl.unbind(); //先解绑定，防止事件重复绑定
                bodyEl.bind("keydown.tab", function (e) {
                    var key = e.which;
                    var currentElement = $("li[tabid=" + g.getSelectedTabItemID() + "]");

                    //前移事件
                    if (key == 8 || key == 37) {
                        //取得当前选中tab的前一个同辈元算
                        var liPrev = currentElement.prev();
                        if (liPrev[0] != undefined) {
                            g.selectTabItem($(liPrev[0]).attr("tabid"));
                        }
                    } else if (key == 39) {
                        var liNext = currentElement.next();
                        if (liNext[0] != undefined) {
                            g.selectTabItem($(liNext[0]).attr("tabid"));
                        }
                    }

                    return false;
                });
            }
        });

        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_Tab"];
        var managers = [];
        this.each(function () {
            managers.push(LigerUIManagers[this.id + "_Tab"]);
        });

        return managers;
    };

})(jQuery);
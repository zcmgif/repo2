/**
 * 任务栏组建
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
if (typeof (LoveyUIManagers) == "undefined") LoveyUIManagers = {};
(function ($) {
    $.fn.loveyGetTaskBarManager = function () {
        return LoveyUIManagers[this[0].id + "_TaskBar"];
    };

    //参数命名空间定义
    $.loveyDefaults = $.loveyDefaults || {};

    //组件参数集合定义
    $.loveyDefaults.taskBar = {
        taskbarContainer: "taskbar", //任务栏的容器
        iconPath: easyloader.URI + "/custom_style/images/icons/", //icon的路径
        favUrl: "", //将tab收藏到任务栏处理地址
        unFavUrl: "", //从任务栏取消收藏的处理地址
        initJson: [], //初始化Json
        taskPkId: "pkId"//传输到后台的任务栏的组件编号
    };

    $.ligerDefaults.taskBarString = {
        errorTitle: "提示", //提示文本标题
        errorMsg: "数据保存失败"
    };

    /**
     * 任务栏组件的核心实现
     * @param options
     * @return {*}
     */
    $.fn.loveyTaskBar = function (options) {
        var op = $.extend({}, $.loveyDefaults.taskBar, $.ligerDefaults.taskBarString, options || {});

        var g = {
            initTaskBar: function () {
                g.initHtml = [];
                $(options.initJson).each(function (i, item) {
                    g.initHtml.push("<li taskid=" + item.taskid + " icon=" + item.icon + " url=" + item.url + " title=" + item.title + "><a href=\"javascript:void(0)\">");
                    g.initHtml.push("<img alt=\"" + item.title + "\" src=\"" + op.iconPath + item.icon + "\"/><span>" + item.title + "</span>");
                    g.initHtml.push("<b></b></a><div taskid=" + item.taskid + "></div></li>");
                });

                return g.initHtml.join("");
            },
            addTaskBar: function (item) {
                //如果已存在则不添加
                if (g.isTaskExist(item.taskid)) {
                    $.ligerDialog.waitting("菜单已收藏到任务栏", 5000, true);
                    return;
                }

                /**
                 * 发起一步请求
                 * @type {Array}
                 */
                $.ajax({
                    type: "post",
                    url: op.favUrl, //获取提交url
                    data: op.taskPkId + "=" + item.taskid,
                    dataType: "json",
                    success: function (data) {
                        //成功处理则添加到任务栏
                        if (data.status) {
                            g.addHtml = [];
                            g.addHtml.push("<li taskid=" + item.taskid + " icon=" + item.icon + " url=" + item.url + " title=" + item.title + "><a href=\"javascript:void(0)\">");
                            g.addHtml.push("<img alt=\"" + item.title + "\" src=\"" + op.iconPath + item.icon + "\"/><span>" + item.title + "</span>");
                            g.addHtml.push("<b></b></a><div taskid=" + item.taskid + "></div></li>");
                            g.taskBar.append(g.addHtml.join(""));

                            g.hoverTaskBar();
                            g.clickHref();
                            g.clickDiv();
                            g.selectTaskBar(item.taskid);

                            if (typeof item.favCompleteFunction == "function") item.favCompleteFunction();
                        } else {
                            $.ligerDialog.alert(op.errorMsg, op.errorTitle, "warn");
                        }
                    },
                    error: function (ret, status) {
                        if (status == "error")
                            $.ligerDialog.alert(op.errorMsg, op.errorTitle, "warn");
                    }
                });
            }, removeTaskBar: function (taskId, unFavCompleteFunction) {
                if (g.isTaskExist(taskId)) {
                    /**
                     * 发起一步请求
                     * @type {Array}
                     */
                    $.ajax({
                        type: "post",
                        url: op.unFavUrl, //获取提交url
                        data: op.taskPkId + "=" + taskId,
                        dataType: "json",
                        success: function (data) {
                            //成功处理则添加到任务栏
                            if (data.status) {
                                $("li[taskid=" + taskId + "]", g.taskBar).remove();

                                if (typeof unFavCompleteFunction == "function") unFavCompleteFunction();
                            } else {
                                $.ligerDialog.alert(op.errorMsg, op.errorTitle, "warn");
                            }
                        },
                        error: function (ret, status) {
                            if (status == "error")
                                $.ligerDialog.alert(op.errorMsg, op.errorTitle, "warn");
                        }
                    });
                }
            }, hoverTaskBar: function () {
                //li元素绑定hover事件
                $("li", g.taskBar).unbind("hover").hover(function () {
                    $("div", $(this)).addClass("menu_close");
                }, function () {
                    $("div", $(this)).removeClass("menu_close");
                });
            }, clickHref: function () {
                //li a元素的click事件
                $("li>a", g.taskBar).unbind("click").click(function () {
                    var liElement = $(this).parent();
                    var title = liElement.attr("title");
                    var url = liElement.attr("url");
                    var tabid = liElement.attr("taskid");
                    var icon = liElement.attr("icon");

                    if (easyloader.isIframe) {
                        //因为整个平台是可以被Iframe嵌入的，需要保证tab时可用的
                        parent.navtab.addTabItem({
                            text: title ? title : '空菜单',
                            url: url ? url : '#',
                            tabid: tabid,
                            resizeFrame: true,
                            dialogWaiting: true,
                            menuPic: icon
                        });
                    } else {
                        top.navtab.addTabItem({
                            text: title ? title : '空菜单',
                            url: url ? url : '#',
                            tabid: tabid,
                            resizeFrame: true,
                            dialogWaiting: true,
                            menuPic: icon
                        });
                    }

                    g.selectTaskBar(tabid);
                });
            }, clickDiv: function () {
                //div的click事件
                $("li >div", g.taskBar).unbind("click").click(function () {
                    g.removeTaskBar($(this).attr("taskid"), function () {
                        var collectObj = "";
                        if (easyloader.isIframe) {
                            collectObj = $(".collect:last", $("iframe:first", "div[tabid=" + parent.navtab.getSelectedTabItemID() + "]")[0].contentWindow.document);
                        } else {
                            collectObj = $(".collect:last", $("iframe:first", "div[tabid=" + top.navtab.getSelectedTabItemID() + "]")[0].contentWindow.document);
                        }
                        collectObj.parent().hide();
                        collectObj.parent().prev().show();
                    });
                });
            }, isTaskExist: function (taskId) {
                //是否已收藏到任务栏
                return $("li[taskid=" + taskId + "]", g.taskBar).length > 0;
            }, selectTaskBar: function (taskId) {
                //选中的任务栏
                $("li[taskid=" + taskId + "]", g.taskBar).addClass("tl-selected").siblings().removeClass("tl-selected");
            }, getSelectedTaskId: function () {
                //获取选中的task的id
                return $("li.tl-selected", g.taskBar).attr("taskid");
            }
        };

        /**
         * 绑定的元素进行初始化
         */
        this.each(function () {
            if (this.usedTaskBar) return;

            //绑定的元素区块
            g.taskBar = $(this);

            /**
             * 根据初始化数组初始化任务栏
             */
            g.taskBar.append(g.initTaskBar());

            //绑定鼠标经过事件,href点击事件，div点击事件
            g.hoverTaskBar();
            g.clickHref();
            g.clickDiv();

            if (this.id == undefined) this.id = "LoveyUI_" + new Date().getTime();
            LoveyUIManagers[this.id + "_TaskBar"] = g;

            this.usedTaskBar = true;
        });

        //返回管理器
        if (this.length == 0) return null;
        if (this.length == 1) return $(this[0]).loveyGetTaskBarManager();

        //如果初始化的是个数组，返回管理器的集合
        var managers = [];
        this.each(function () {
            managers.push($(this).loveyGetTaskBarManager());
        });
        return managers;
    };
})
        (jQuery);
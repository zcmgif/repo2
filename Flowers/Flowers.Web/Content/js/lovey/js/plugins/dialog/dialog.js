/**
 * jQuery ligerUI 1.1.0.1
 *
 * Author leoxie [ gd_star@163.com ]
 * history:zwzhao@wisedu.com 扩展
 *
 */
//dialog 图片文件夹的路径 针对于IE6设置
//var ligerDialogImagePath = "default/images/ie6/";
//easyloader.base + "/plugins/dialog/default/images/ie6/";//"../aqua/images/dialog/";

(function ($) {
    $.ligerDefaults = $.ligerDefaults || {};

    $.ligerDefaults.Dialog = {
        className: (easyloader.dialogCssName == "") ? "dialog_style02" : easyloader.dialogCssName, //dialog自定义样式名称
        btnClassName: "l-button-sure", //按钮的默认样式
        waittingClassName: "",//等待样式的名称
        cls: null, //给dialog附加css class
        animationStart: "fadeInDown", //添加初始动画效果 fadeIn,fadeInUp,fadeInDown
        opacity: 0.3,
        id: null, //给dialog附加id
        buttons: null, //按钮集合
        isDrag: true, //是否拖动
        width: 280, //宽度
        height: null, //高度，默认自适应
        content: '', //内容
        target: null, //目标对象，指定它将以appendTo()的方式载入
        url: null, //目标页url，默认以iframe的方式载入
        load: false, //是否以load()的方式加载目标页的内容
        type: 'none', //类型 warn、success、error、question
        left: null, //位置left
        top: null, //位置top
        modal: true, //是否模态对话框
        name: null, //创建iframe时 作为iframe的name和id
        isResize: false, // 是否调整大小
        allowClose: true, //允许关闭
        opener: null,
        timeParmName: null, //是否给URL后面加上值为new Date().getTime()的参数，如果需要指定一个参数名即可
        closeWhenEnter: null, //回车时是否关闭dialog
        isNeedNoPaddingClass: true, //是否需要nopaddingclass
        completeFunction: null, //回调函数
        scroll: false, //iframe是否带滚动条显示
        showButton: true, //是否显示button条，当是单独的弹出对话框的时候则不显示
        showTitle: true, //是否显示标题
        formUrl: null, //表单地址
        submitUrl: null, //表单响应地址
        redirectUrl: null, //处理后转向地址
        formId: 'form1', //表单Id
        isNeedFormValid: true, //是否需要表单验证，默认为true
        submitSuccessFunc: null,//提交成功执行的函数
        showTimeOut: false,//启用倒计时关闭提示
        delayMillions: 0//倒计时关闭时间
    };

    $.ligerDefaults.DialogString = {
        titleMessage: '提示', //提示文本标题
        waittingMessage: '正在等待中,请稍候...'
    };

    $.ligerDialog = {};

    /*dialog默认属性配置*/
    $.ligerDialog.defaultProps = {
        opacity: 0.3, //默认遮罩透明度
        backColor: '#ffffd7', //确认删除淡出效果容器背景色
        delay: 1000, //消失默认时间
        borderWidth: 1, //边框宽度
        borderStyle: 'solid', //边框样式
        borderColor: '#ccc', //边框颜色
        tips: '操作成功！', //默认提示值
        content: '确定要删除吗？', //默认提示内容
        btnSure: '确定', //确定按钮默认值
        btnCancel: '取消', //取消按钮默认值
        btnClose: '关闭' //取消按钮默认值
    };

    //高级Open方法可以实现自动Iframe判断，定位弹出成的位置
    $.ligerDialog.gradeOpen = function (p) {
        if (easyloader.isIframe) {
            parent.$.ligerDialog.open(p);
        } else {
            $.ligerDialog.open(p);
        }
    };

    $.ligerDialog.open = function (p) {
        var bodyHtml = $("body");
        p = $.extend({}, $.ligerDefaults.Dialog, $.ligerDefaults.DialogString, p || {});
        var g = {
            //按下回车
            enter: function () {
                var isClose;
                if (p.closeWhenEnter != undefined) {
                    isClose = p.closeWhenEnter;
                }
                else if (p.type == "warn" || p.type == "error" || p.type == "success" || p.type == "question") {
                    isClose = true;
                }
                if (isClose) {
                    g.dialog.close();
                }
            },
            esc: function () {
                g.dialog.close();
            },
            applyWindowMask: function () {
                //$(".l-window-mask:first").remove();
                var mask = $("<div class='l-window-mask' style='display: block;'></div>").height($(document).height());
                //  var mask = $("<div class='l-window-mask' style='display: block;'></div>").height($(document).height() + $(document).scrollTop());
                var zIndex = $('.l-dialog:last').css('z-index');
                var zIndex2 = $('.l-dialog').eq(-2).css('z-index');
                if (zIndex && zIndex2) {
                    mask.css('z-index', (Number(zIndex) + Number(zIndex2)) / 2);
                }
                //解决IE底下select挡住弹出层的BUG
                $(mask).append('<iframe style="width:100%;height:100%;position:absolute;filter:alpha(opacity=0);opacity:0;background: #000"></iframe>');
                mask.appendTo('body');
                $(mask).css("opacity", p.opacity);
            },
            removeWindowMask: function () {
                $(".l-window-mask:last").remove();
            },
            applyDrag: function () {
                if ($.fn.ligerDrag)
                    g.dialog.ligerDrag({ handler: '.l-dialog-title' });
            },
            applyResize: function () {
                if ($.fn.ligerResizable) {
                    g.dialog.ligerResizable({
                        onStopResize: function (current, e) {
                            var top = 0;
                            var left = 0;
                            if (!isNaN(parseInt(g.dialog.css('top'))))
                                top = parseInt(g.dialog.css('top'));
                            if (!isNaN(parseInt(g.dialog.css('left'))))
                                left = parseInt(g.dialog.css('left'));
                            if (current.diffTop != undefined) {
                                g.dialog.css({
                                    top: top + current.diffTop,
                                    left: left + current.diffLeft
                                });
                                g.dialog.body.css({
                                    width: current.newWidth - 26
                                });
                                $(".l-dialog-content", g.dialog.body).height(current.newHeight - 46 - $(".l-dialog-buttons", g.dialog).height());
                            }
                            return false;
                        }
                    });
                }
            },
            setImage: function () {
                if (p.type) {
                    if (p.type == 'success' || p.type == 'donne' || p.type == 'ok') {
                        $(".l-dialog-image", g.dialog).addClass("l-dialog-image-donne").show();
                        $(".l-dialog-content", g.dialog).addClass("l-dialog-padding");
                    }
                    else if (p.type == 'error') {
                        $(".l-dialog-image", g.dialog).addClass("l-dialog-image-error").show();
                        $(".l-dialog-content", g.dialog).addClass("l-dialog-padding");
                    }
                    else if (p.type == 'warn') {
                        $(".l-dialog-image", g.dialog).addClass("l-dialog-image-warn").show();
                        $(".l-dialog-content", g.dialog).addClass("l-dialog-padding");
                    }
                    else if (p.type == 'question') {
                        $(".l-dialog-image", g.dialog).addClass("l-dialog-image-question").show();
                        $(".l-dialog-content", g.dialog).addClass("l-dialog-padding");
                    }
                } else {
                    $(".l-dialog-image", g.dialog).addClass(p.waittingClassName).show();
                    $(".l-dialog-content", g.dialog).addClass("l-dialog-padding");
                }
            }
        };
        g.dialog = $('<div class="l-dialog ' + p.className + ' ' + p.animationStart + '"><div class="dialog-bg"></div><table class="l-dialog-table" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td class="l-dialog-tl"></td><td class="l-dialog-tc"><div class="l-dialog-tc-inner"><div class="l-dialog-icon"></div><div class="l-dialog-title"></div><div class="l-dialog-close"></div></div></td><td class="l-dialog-tr"></td></tr><tr><td class="l-dialog-cl"></td><td class="l-dialog-cc"><div class="l-dialog-body"><div class="l-dialog-image"></div> <div class="l-dialog-content"></div><div class="l-dialog-buttons"><div class="l-dialog-buttons-inner"></div></td><td class="l-dialog-cr"></td></tr><tr><td class="l-dialog-bl"></td><td class="l-dialog-bc"></td><td class="l-dialog-br"></td></tr></tbody></table></div>');
        var zIndex = $('.l-dialog:last').css('z-index');
        bodyHtml.append(g.dialog);
        g.dialog.css('z-index', Number(zIndex) + 10);

        g.dialog.body = $(".l-dialog-body:first", g.dialog);
        g.dialog.close = function () {
            if (g.dialog.frame) {
                $(g.dialog.frame.document).ready(function () {
                    g.removeWindowMask();
                    g.dialog.remove();
                });
            } else {
                g.removeWindowMask();
                g.dialog.remove();
            }
            bodyHtml.unbind("keydown.dialog");
        };
        g.dialog.doShow = function () {
            g.dialog.show();
            if (p.completeFunction) p.completeFunction(g.dialog);
        };
        if (p.allowClose == false) $(".l-dialog-close", g.dialog).remove();
        if (p.target || p.url || p.type == "none") p.type = null;
        if (p.cls) g.dialog.addClass(p.cls);
        if (p.id) g.dialog.attr("id", p.id);

        //设置锁定屏幕、拖动支持 和设置图片
        if (p.modal)
            g.applyWindowMask();
        if (p.isDrag)
            g.applyDrag();
        if (p.isResize)
            g.applyResize();
        if (p.type || p.waittingClassName)
            g.setImage();
        else {
            $(".l-dialog-image", g.dialog).remove();
            $(".l-dialog-content", g.dialog.body).addClass("l-dialog-content-noimage");
        }
        //设置主体内容
        if (p.target) {
            $(".l-dialog-content", g.dialog.body).prepend(p.target);
            $(p.target).show();
        } else if (p.url) {
            if (p.timeParmName) {
                p.url += p.url.indexOf('?') == -1 ? "?" : "&";
                p.url += p.timeParmName + "=" + new Date().getTime();
            }
            var iframe = $("<iframe frameborder='0'></iframe>");
            var framename = p.name ? p.name : "ligerwindow" + new Date().getTime();
            if (p.scroll) {
                iframe.attr("scrolling", "yes");
                // 如果需要滚动条，那么添加样式去控制,设置overflow_y为自动,因为默认的情况下iframe的样式是overflow为hidden
                iframe.addClass("iframe-scroll-auto");
            } else {
                iframe.attr("scrolling", "no");
            }
            iframe.attr("name", framename);
            iframe.attr("id", framename);
            $(".l-dialog-content", g.dialog.body).prepend(iframe);
            $(".l-dialog-content", g.dialog.body).addClass("l-dialog-content-nopadding");
            setTimeout(function () {
                iframe.attr("src", p.url);
                g.dialog.frame = window.frames[iframe.attr("name")];
            }, 0);
        } else if (p.content) {
            $(".l-dialog-content", g.dialog.body).html(p.content);
            //如果需要内容无padding样式，需要参数isNeedNoPaddingClass为true
            if (p.isNeedNoPaddingClass && typeof (p.isNeedNoPaddingClass) == 'boolean') {
                $(".l-dialog-content", g.dialog.body).addClass("l-dialog-content-nopadding");
            }
        }
        if (p.opener) g.dialog.opener = p.opener;
        //设置按钮
        if (p.showButton) {
            g.initButton = function (i, item) {
                var btn = $('<div class="l-dialog-btn"><div class="l-dialog-btn-l"></div><div class="l-dialog-btn-r"></div><div class="l-dialog-btn-inner"></div></div>');
                $(".l-dialog-btn-inner", btn).html(item.text);
                $(".l-dialog-buttons-inner", g.dialog.body).prepend(btn);
                item.width && btn.width(item.width);
                item.className && btn.addClass(item.className);
                item.onclick && btn.click(function () {
                    item.onclick(item, g.dialog, i)
                });
            };

            if (p.buttons) {
                $(p.buttons).each(function (i, item) {
                    g.initButton(i, item);
                });
            } else {
                var timeOutHtml = "";
                if (p.showTimeOut) {
                    var secondTime = parseInt(p.delayMillions / 1000);
                    timeOutHtml = "<span class=\"grey\">(<i id=\"show_time\" >" + secondTime + "</i>)</span>";
                }
                var defaultItem = {
                    text: $.ligerDialog.defaultProps.btnClose + timeOutHtml,
                    onclick: function (item, dg) {
                        dg.close();
                    }
                };
                g.initButton(0, defaultItem);
            }
        } else {
            $(".l-dialog-buttons", g.dialog).remove();
        }

        $(".l-dialog-buttons-inner", g.dialog).append("<div class='l-clear'></div>");

        //设置参数属性
        p.width && g.dialog.body.width(p.width - 26);

        // 如果没有设定按钮，那么$(".l-dialog-buttons", g.dialog).height()就是undefined，buttonHeight应该为0，否则调用的地方设置高度无效
        var buttonHeigt = $(".l-dialog-buttons", g.dialog).height() ? $(".l-dialog-buttons", g.dialog).height() : 0;
        if (p.height) {
            $(".l-dialog-content", g.dialog.body).height(p.height - 46 - buttonHeigt);
        }

        if (p.showTitle) {
            p.title = p.title || p.titleMessage;
            p.title && $(".l-dialog-title", g.dialog).html(p.title);
            $(".l-dialog-title", g.dialog).bind("selectstart", function () {
                return false;
            });
        } else {
            $(".l-dialog-tl", g.dialog).parent().remove();
        }

        //设置事件
        $(".l-dialog-btn", g.dialog.body).hover(function () {
            $(this).addClass("l-dialog-btn-over");
        }, function () {
            $(this).removeClass("l-dialog-btn-over");
        });
        $(".l-dialog-tc .l-dialog-close", g.dialog).hover(
                function () {
                    $(this).addClass("l-dialog-close-over");
                },
                function () {
                    $(this).removeClass("l-dialog-close-over");
                }).click(function () {
                    g.dialog.close();
                });

        //       //IE6 PNG Fix
        var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
        var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
        if ($.browser.msie && (ie55 || ie6)) {
            $(".l-dialog-tl:first", g.dialog).addClass("l-dialog-tl-ie6");
            $(".l-dialog-tc:first", g.dialog).addClass("l-dialog-tc-ie6");
            $(".l-dialog-tr:first", g.dialog).addClass("l-dialog-tr-ie6");
            $(".l-dialog-cl:first", g.dialog).addClass("l-dialog-cl-ie6");
            $(".l-dialog-cr:first", g.dialog).addClass("l-dialog-cr-ie6");
            $(".l-dialog-bl:first", g.dialog).addClass("l-dialog-bl-ie6");
            $(".l-dialog-bc:first", g.dialog).addClass("l-dialog-bc-ie6");
            $(".l-dialog-br:first", g.dialog).addClass("l-dialog-br-ie6");
        }

        //位置初始化
        var left = 0;
        var top = 0;
        var width = p.width || g.dialog.width();
        if (p.left != null) left = p.left;
        else p.left = left = 0.5 * ($(window).width() - width);
        if (p.top != null) top = p.top;
        else p.top = top = 0.5 * ($(window).height() - g.dialog.height()) + $(window).scrollTop() - 10;

        if (left < 0) p.left = left = 0;
        if (top < 0) p.top = top = 0;
        g.dialog.css({ left: left, top: top });
        g.dialog.doShow();
        $('#l-dialog').focus();

        bodyHtml.bind("keydown.dialog", function (e) {
            var key = e.which;
            if (key == 13) {
                g.enter();
            }
            else if (key == 27) {
                g.esc();
            }
        });

        //设置外框阴影的高度和宽度,必须指定搜索范围，否则两个弹出层会有问题
        $(".dialog-bg", g.dialog).height(g.dialog[0].clientHeight);
        $(".dialog-bg", g.dialog).width(g.dialog[0].clientWidth);

        return g.dialog;
    };
    $.ligerDialog.close = function () {
        $(".l-dialog:last,.l-window-mask:last").remove();
    };
    //增加对话框class，允许自定义对话框样式
    $.ligerDialog.alert = function (content, title, type, className, callback) {
        content = content || "";
        if (typeof (title) == "function") {

            callback = title;
            type = null;
        }
        else if (typeof (type) == "function") {
            callback = type;
        } else if (typeof (className) == "function") {
            callback = className;
        }
        var btnclick = function (item, Dialog, index) {
            Dialog.close();
            if (callback)
                callback(item, Dialog, index);
        };
        p = {
            className: (className && typeof (className) == "string") ? className : $.ligerDefaults.Dialog.className,
            content: content,
            buttons: [
                { text: '确定', onclick: btnclick }
            ],
            allowClose: (type == "success") ? easyloader.allowClose : true
        };
        if (typeof (title) == "string" && title != "") p.title = title;
        if (typeof (type) == "string" && type != "") p.type = type;

        var dialogContent = "";
        if (easyloader.isIframe) {
            dialogContent = parent.$.ligerDialog.open(p);
        } else {
            dialogContent = $.ligerDialog.open(p);
        }

        // 绑定回车和esc键的事件
        $("body").bind('keydown', function (e) {
            var key = e.which;
            if (key == 13) {
                dialogContent.close();
            }
            else if (key == 27) {
                dialogContent.close();
            }
        });

        $.ligerDialog.blurElement();

    };

    $.ligerDialog.confirm = function (content, title, callback, className, type) {
        var className = (callback && typeof (callback) == "string") ? callback : ((className && typeof (className == 'string')) ? className : $.ligerDefaults.Dialog.className);
        if (typeof (title) == "function") {
            callback = title;
            type = null;
        }
        var btnclick = function (item, Dialog) {
            Dialog.close();
            if (callback) {
                callback(item.type == 'ok');
            }
        };
        p = {
            opacity: $.ligerDialog.defaultProps.opacity,
            className: className,
            type: (type && typeof (type) == "string") ? type : 'question',
            content: content,
            buttons: [
                { text: '是', onclick: btnclick, type: 'ok', className: $.ligerDefaults.Dialog.btnClassName },
                { text: '否', onclick: btnclick, type: 'no' }
            ]
        };
        if (typeof (title) == "string" && title != "") p.title = title;
        if (easyloader.isIframe) {
            parent.$.ligerDialog.open(p);
        } else {
            $.ligerDialog.open(p);
        }

        $.ligerDialog.blurElement();
    };

    $.ligerDialog.warning = function (content, title, callback) {
        if (typeof (title) == "function") {
            callback = title;
            type = null;
        }
        var btnclick = function (item, Dialog) {
            Dialog.close();
            if (callback) {
                callback(item.type);
            }
        };
        p = {
            type: 'question',
            content: content,
            buttons: [
                { text: '是', onclick: btnclick, type: 'yes', className: $.ligerDefaults.Dialog.btnClassName },
                { text: '否', onclick: btnclick, type: 'no' },
                { text: '取消', onclick: btnclick, type: 'cancel' }
            ]
        };
        if (typeof (title) == "string" && title != "") p.title = title;
        if (easyloader.isIframe) {
            parent.$.ligerDialog.open(p);
        } else {
            $.ligerDialog.open(p);
        }

        $.ligerDialog.blurElement();
    };

    /**
     * 弹出通用的等待对话框
     *
     * @param title 等待的提示
     * @param delayMillions 关闭的时间，单位毫秒
     * @param showTimeOut   是否显示倒计时
     * @param callback  回调函数
     */
    $.ligerDialog.waitting = function (title, delayMillions, showTimeOut, callback, waittingClassName) {
        title = title || $.ligerDefaults.Dialog.waittingMessage;
        if (typeof showTimeOut == "function") {
            callback = showTimeOut;
            showTimeOut = false;
        }

        delayMillions = delayMillions ? delayMillions : 2000;
        showTimeOut = (showTimeOut == undefined) ? false : showTimeOut;

        //console.log(title);
        //console.log(delayMillions);
        //console.log(showTimeOut);
        //console.log(callback);
        //console.log(waittingClassName);
        var optinons = {
            cls: 'l-dialog-waittingdialog',
            type: 'none',
            content: '</div><div style="padding:10px">' + title + '</div>',
            allowClose: false,
            showTimeOut: showTimeOut,
            delayMillions: delayMillions,
            waittingClassName: waittingClassName,
            completeFunction: function () {
                if (showTimeOut) {
                    var tempInt = setInterval(function () {
                        var stElement = "";
                        if (easyloader.isIframe) {
                            stElement = parent.$("#show_time")
                        } else {
                            stElement = $("#show_time")
                        }
                        var timeCounter = stElement.html();
                        var updateTime = eval(timeCounter) - eval(1);
                        stElement.html(updateTime);
                        if (updateTime == 0) {
                            $.ligerDialog.closeWaitting(callback);
                            //by yzhao 清除调用否则会越点越快
                            clearInterval(tempInt);
                        }
                    }, 1000);
                }
            }
        };

        //console.log(optinons);

        if (easyloader.isIframe) {
            parent.$.ligerDialog.open(optinons);
        } else {
            $.ligerDialog.open(optinons);
        }

        //必须使用匿名函数，否则callback无法传递过去,当设计倒计时的时候会自动关闭，不需要重复调用
        if (!showTimeOut) {
            setTimeout(function () {
                $.ligerDialog.closeWaitting(callback);
            }, delayMillions);
        }
    };

    $.ligerDialog.closeWaitting = function (callback) {
        if (easyloader.isIframe) {
            parent.$(".l-dialog-waittingdialog:last,.l-window-mask:last").remove();
        } else {
            $(".l-dialog-waittingdialog:last,.l-window-mask:last").remove();
        }

        if (typeof (callback) == "function") callback();
    };

    $.ligerDialog.success = function (content, title, className, onBtnClick) {
        $.ligerDialog.alert(content, title, 'success', className, onBtnClick);
    };
    $.ligerDialog.error = function (content, title, className, onBtnClick) {
        $.ligerDialog.alert(content, title, 'error', className, onBtnClick);
    };
    $.ligerDialog.warn = function (content, title, className, onBtnClick) {
        $.ligerDialog.alert(content, title, 'warn', className, onBtnClick);
    };
    $.ligerDialog.question = function (content, title, className) {
        $.ligerDialog.alert(content, title, 'question', className);
    };

    // 防止重复点击enter键，重复弹出提示框，这里统一将弹出页面的a和input标签失去焦点，以防连接到其他地方，或者表单提交之类的
    $.ligerDialog.blurElement = function () {
        $("a").blur();
        $("input").blur();
    };


    $.ligerDialog.prompt = function (title, value, multi, callback) {
        var target = $('<input type="text" class="l-dialog-inputtext"/>');
        if (typeof (multi) == "function") {
            callback = multi;
        }
        if (typeof (value) == "function") {
            callback = value;
        }
        else if (typeof (value) == "boolean") {
            multi = value;
        }
        if (typeof (multi) == "boolean" && multi) {
            target = $('<textarea class="l-dialog-textarea"></textarea>');
        }
        if (typeof (value) == "string" || typeof (value) == "int") {
            target.val(value);
        }
        var btnclick = function (item, Dialog, index) {
            Dialog.close();
            if (callback) {
                callback(item.type == 'yes', target.val());
            }
        }
        p = {
            title: title,
            target: target,
            width: 320,
            buttons: [
                { text: '确定', onclick: btnclick, type: 'yes' },
                { text: '取消', onclick: btnclick, type: 'cancel' }
            ]
        };
        if (easyloader.isIframe) {
            parent.$.ligerDialog.open(p);
        } else {
            $.ligerDialog.open(p);
        }

    };

    /*******************************************************************************************************************/
    /*********************************************对话框新扩展函数********************************************/
    /*******************************************************************************************************************/


    /**
     * 确认删除框
     * @param content   提示内容
     * @param title     标题
     * @param elObj     要删除记录的dom对象,必要参数
     * @param showAlert 是否用弹出框提示返回内容 showAlert==true:弹出框提示,false:页面提示；
     * @param showIconType 指定提示图标类型，默认为question，
     * @param disBackColor 提示消失的背景色
     * @param tips 可以指定删除完后的显示内容文字
     * @param contentUrl 提示内容可以是一个url地址展示
     */
    $.ligerDialog.confirmDelete = function (p) {
        //需要用临时变量将p暂存下来
        var cp = $.extend({}, $.ligerDefaults.Dialog, $.ligerDefaults.DialogString, p || {});
        var elObj = $(cp.elObj);
        var btnclick = function (item, Dialog) {
            Dialog.close();//关闭提示框
            if (elObj && item.type == 'ok') {
                var returnValue;
                $.ajax({
                    type: 'post',
                    //如果元素dom配置了url属性，则提交地址直接去找元素dom的url属性配置，否则去找传递的submitUrl,如果都没提供，则找系统默认配置
                    url: elObj.attr('url') ? elObj.attr('url') : (cp.submitUrl ? cp.submitUrl : $.ligerDialog.defaultProps.submitUrl), //获取提交url
                    data: elObj.attr('data') ? elObj.attr('data') : '', //获取提交数据
                    success: function (ret) {
                        var tip_style = 'padding:5px;background:' + (cp.disBackColor ? cp.disBackColor : $.ligerDialog.defaultProps.backColor) + ';border:' + (cp.borderWidth ? cp.borderWidth : $.ligerDialog.defaultProps.borderWidth) + 'px ' + (cp.borderStyle ? cp.borderStyle : $.ligerDialog.defaultProps.borderStyle) + ' ' + (cp.borderColor ? cp.borderColor : $.ligerDialog.defaultProps.borderColor);
                        returnValue = $.trim(ret);
                        try {
                            returnValue = eval('(' + returnValue + ')'); //json模式；
                            if (returnValue.status == 1) {
                                if (cp.showAlert)
                                    $.ligerDialog.alert(cp.tips ? cp.tips : $.ligerDialog.defaultProps.tips, '提示', 'success', function () {
                                        if (cp.completeFunction) cp.completeFunction();
                                    });

                                else {
                                    elObj.html("<div style='" + tip_style + "'>" + (cp.tips ? cp.tips : $.ligerDialog.defaultProps.tips) + "</div>");
                                    elObj.fadeOut(cp.delayMillions ? cp.delayMillions : $.ligerDialog.defaultProps.delay);
                                }
                                //淡出方式操作当前元素
                                /**elObj_parent.fadeOut('slow', function () {
                                    elObj_parent.remove();
                                })*/

                                //成功的回调函数
                                //if (op.successFunction) op.successFunction(g);
                            } else {
                                $.ligerDialog.alert(returnValue.msg, '提示', 'warn');
                            }
                        } catch (e) {  //非json模式
                            //elObj.html(returnValue);
                        }
                    },
                    error: function (ret, status) {
                        if (status == 'error')
                            $.ligerDialog.alert('出错啦！', '出错提示', 'warn');
                    }
                });
            }
        };
        var content = cp.content ? cp.content : $.ligerDialog.defaultProps.content;
        if (cp.contentUrl) {//指定了提示内容url
            content = "<iframe frameborder='0' src='" + cp.contentUrl + "' width='100%' height='100%'></iframe>";
        }
        p = {
            type: (cp.showIconType && typeof (cp.showIconType) == "string") ? cp.showIconType : "question",
            content: content,
            width: cp.width ? cp.width : 280,
            height: cp.height ? cp.height : null,
            buttons: [
                { text: '是', onclick: btnclick, type: 'ok', className: cp.btnClassName },
                { text: '否', onclick: btnclick, type: 'no' }
            ]
        };
        if (typeof (cp.title) == "string" && cp.title != "") p.title = cp.title;
        if (easyloader.isIframe) {
            parent.$.ligerDialog.open(p);
        } else {
            $.ligerDialog.open(p);
        }

    };
    /**
     * ajax提交表单封装；formAddr,formId,formAction
     * @param p{title:标题,formUrl:表单地址,formId:表单Id,submitUrl:表单提交action,isFormReset:表单是否重置,redirectUrl:成功重定向地址}
     */
    $.ligerDialog.ajaxFormSubmit = function (p) {
        //需要用临时变量将p暂存下来
        var p = $.extend({}, $.ligerDefaults.Dialog, $.ligerDefaults.DialogString, p || {});

        if (p.opacity != "undefined") {
            $.ligerDefaults.Dialog.opacity = p.opacity;
        } else {
            $.ligerDefaults.Dialog.opacity = $.ligerDefaults.DialogString.opacity;
        }

        var pp = {
            className: p.className ? p.className : $.ligerDefaults.Dialog.className,
            name: p.name,//iframe的id和name
            animationStart: p.animationStart ? p.animationStart : $.ligerDefaults.Dialog.animationStart,
            title: p.title ? p.title : '提示',
            url: p.formUrl ? p.formUrl : $.ligerDialog.defaultProps.formUrl,
            width: p.width ? p.width : $.ligerDefaults.Dialog.width,
            height: p.height ? p.height : $.ligerDefaults.Dialog.height,
            scroll: p.scroll ? p.scroll : false,
            left: p.left ? p.left : null, // 可以通过参数来控制ajax提交框的定位（left）
            top: p.top ? p.top : null, // 可以通过参数来控制ajax提交框的定位（top）
            buttons: [
                {
                    text: p.btnSure ? p.btnSure : $.ligerDialog.defaultProps.btnSure,
                    className: p.btnClassName,
                    onclick: function (item, dg) {
                        var submitButton = $(".l-dialog-btn:last", dg);
                        if (submitButton.hasClass("l-dialog-btn-disable")) {
                            return;
                        }

                        //提交之前执行的函数，回调2个参数。一个是当前参数对象p，一个是当前弹出的对话框对象
                        if (p.beforeSubmit && typeof (p.beforeSubmit) == "function") {
                            if (p.beforeSubmit(p, dg) == false) {
                                return false;
                            }
                        }

                        var formObj = $(dg.frame.document).find("#" + (p.formId ? p.formId : $.ligerDialog.defaultProps.formId));
                        var returnValue;
                        if (formObj) {
                            //判断是否需要表单验证
                            var isNeedFormValid = (typeof p.isNeedFormValid == "boolean") ? p.isNeedFormValid : $.ligerDialog.defaultProps.isNeedFormValid;
                            //表单验证
                            var isValid = true;
                            if (isNeedFormValid)
                                isValid = dg.frame.$.validationEngine.doValidate("#" + p.formId);
                            if (isValid) {
                                //提交之前执行的函数，回调2个参数。一个是当前参数对象p，一个是当前弹出的对话框对象
                                /*if (p.beforeSubmit && typeof(p.beforeSubmit) == "function") {
                                    if (p.beforeSubmit(p, dg) == false) {
                                        return false;
                                    }
                                }*/

                                //提交按钮变灰
                                submitButton.addClass("l-dialog-btn-disable");
                                $(".l-dialog-btn-inner", submitButton).html("提交中...");

                                formObj.ajaxSubmit({
                                    type: 'post',
                                    //url: ($("#form").attr("action") != "") ? $("#form").attr("action") : p.submitUrl,
                                    //解决和UCP的兼容问题
                                    url: (p.submitUrl == "" || p.submitUrl == undefined) ? $("#form").attr("action") : p.submitUrl,
                                    resetForm: p.isFormReset ? p.isFormReset : false,
                                    data: p.data ? p.data : '',
                                    success: function (ret) {
                                        returnValue = $.trim(ret);
                                        submitButton.removeClass("l-dialog-btn-disable");
                                        $(".l-dialog-btn-inner", submitButton).html(p.btnSure ? p.btnSure : $.ligerDialog.defaultProps.btnSure);
                                        try { //返回json数据
                                            returnValue = eval('(' + returnValue + ')');
                                            var msg = (returnValue.msg && returnValue.msg != null) ? returnValue.msg : (returnValue.status == 1 ? '保存成功！' : '保存失败！');
                                            if (!p.submitSuccessFunc) {
                                                if (returnValue.status == 1) {
                                                    if (p.redirectUrl) {
                                                        // 在弹出层提交成功之后应该将弹出层关闭，然后再去处理重定向的情况
                                                        dg.close();

                                                        $.ligerDialog.waitting("操作处理成功", 1000, function () {
                                                            if (p.tabObj) {//如果指定了tab对象
                                                                p.tabObj.location(p.tabObj.getSelectedTabItemID(), p.redirectUrl);
                                                            } else {
                                                                if (easyloader.isIframe) {
                                                                    self.location = p.redirectUrl;
                                                                } else {
                                                                    top.location = p.redirectUrl;
                                                                }

                                                            }
                                                        });
                                                    } else {
                                                        dg.close();

                                                        $.ligerDialog.waitting("操作处理成功", 1000, function () {
                                                            if (p.tabObj) {
                                                                p.tabObj.reload(p.tabObj.getSelectedTabItemID());
                                                            }
                                                        });
                                                    }
                                                } else if (returnValue.status == 0) {
                                                    $.ligerDialog.error(msg);
                                                } else {
                                                    $.ligerDialog.warn(msg);
                                                }
                                            } else {
                                                dg.close();

                                                if (typeof (p.submitSuccessFunc) == 'function') {
                                                    p.submitSuccessFunc($.trim(ret), dg);
                                                }
                                            }
                                        } catch (e) {
                                            alert('解析错误' + e.description);
                                        }
                                    }, error: function (ret, status) {
                                        $.ligerDialog.error('错误！可能原因：参数配置错误、响应出现异常。');
                                    }
                                });
                            }
                        } else $.ligerDialog.warn('表单不存在！');
                    }
                },
                {
                    text: p.btnCancel ? p.btnCancel : $.ligerDialog.defaultProps.btnCancel,
                    onclick: function (item, dg) {
                        dg.close();
                    }
                }
            ]
        };
        if (easyloader.isIframe) {
            parent.$.ligerDialog.open(pp);
        } else {
            $.ligerDialog.open(pp);
        }
    }

    /**
     * 非表单提交的ajax处理，主要用于简单交互异步处理,比如只更新一个记录的一个状态等等..
     * （待完善）
     * @param p
     */
    $.ligerDialog.ajaxRequest = function (p) {
        var p = p;
        if (!p.showDialog) {//不显示确认对话框直接处理
            $.ajax({
                type: 'post',
                url: p.submitUrl ? p.submitUrl : $.ligerDialog.defaultProps.submitUrl,
                data: p.data ? p.data : null,
                success: function (ret) {
                    if (!p.successFunc) {

                    } else {
                        if (typeof (p.successFunc) == 'function') {

                        }
                    }
                }
            });
        } else {
            if (easyloader.isIframe) {
                parent.$.ligerDialog.open({ title: p.title ? p.title : '确定要执行？' });
            } else {
                $.ligerDialog.open({ title: p.title ? p.title : '确定要执行？' });
            }
        }

    }

    /**
     * 提交评论
     * @param p{contentId:文本框(textarea)Id,url:提交地址,parentElement:父容器对象}
     */
    $.ligerDialog.postComment = function (p) {
        var cms_list = "cms_list";//定义列表list标记
        var p = p;
        if (!p.contentId || !p.url) return;
        var content = $("#" + p.contentId).val();
        if (!content && '' == content) {
            $('#' + p.contentId).focus();
            return;
        }
        var returnValue;
        $.ajax({
            type: 'post',
            url: p.url ? p.url : '',
            data: p.data ? p.data : '',
            success: function (ret) {
                returnValue = $.trim(ret);
                try {
                    returnValue = eval('(' + returnValue + ')');
                    if (returnValue.status == 1) {
                        $.ligerDialog.alert(returnValue.msg, '提示', 'success', function () {
                            $("#" + p.contentId).val('');//置空
                            var first_li = $("#" + p.parentElement + " ." + cms_list + " li").first();
                            $("#" + p.parentElement + " ." + cms_list + " li").first().before(returnValue.htmlStr);
                            $("#" + p.parentElement + " ." + cms_list + " li").first().hide();
                            $("#" + p.parentElement + " ." + cms_list + " li").first().fadeIn(1000);
                        });
                    }
                } catch (e) {
                    //
                }
            }, error: function (ret, status) {
                alert(status);
            }
        });

    }
    $.ligerDialog.submit = function (formId, submitUrl, dialog, p) {
        var returnValue;
        //提交之前执行的函数，回调2个参数。一个是当前参数对象p，一个是当前弹出的对话框对象
        if (p && p.beforeSubmit && typeof (p.beforeSubmit) == "function") {
            if (p.beforeSubmit() == false) {
                return false;
            }
        }
        $(dialog.frame.document).find("#" + formId).ajaxSubmit({
            type: 'post',
            url: submitUrl, //获取提交url
            success: function (ret) {
                returnValue = $.trim(ret);
                try {
                    returnValue = eval('(' + returnValue + ')'); //json模式；
                    var msg = (returnValue.msg && returnValue.msg != null) ? returnValue.msg : (returnValue.status == 1 ? '保存成功！' : '保存失败！');
                    if (returnValue.status == 1) {
                        if (easyloader.isIframe) {
                            parent.$.ligerDialog.alert(msg, '提示', 'success', function () {
                                if (p.redirectUrl) {
                                    parent.location = p.redirectUrl;
                                }
                            });
                        } else {
                            top.$.ligerDialog.alert(msg, '提示', 'success', function () {
                                if (p.redirectUrl) {
                                    top.location = p.redirectUrl;
                                }
                            });
                        }
                    } else {
                        if (easyloader.isIframe) {
                            parent.$.ligerDialog.alert(msg, '提示', 'error');
                        } else {
                            top.$.ligerDialog.alert(msg, '提示', 'error');
                        }

                    }
                } catch (e) {  //非json模式
                    //elObj.html(returnValue);
                }
            },
            error: function (ret, status) {
                if (status == 'error')
                    $.ligerDialog.alert('出错啦！', '出错提示', 'warn');
            }
        });
    }
    window.dialog = $.ligerDialog;//简化前台调用

})(jQuery);
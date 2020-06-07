/**
 * jQuery 选择组件
 *
 * Author junfang [ junfang@wisedu.com ]
 * history:
 *
 */
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function ($) {

    $.fn.ligerGetSelectManager = function () {
        return LigerUIManagers[this[0].id + "_Select"];
    };
    $.ligerDefaults = $.ligerDefaults || {};

    $.ligerDefaults.Select = {
        title: '请选择', //标题
        selectType: 'checkBox', //类型
        rightItemName: 'name', //右侧元素名字
        rightItemValue: 'value', //右侧元素值
        rightItemOrgName: 'orgName',//右侧鼠标停留在待选项上的名称
        rightItemDisable: 'disable',//右侧选项是否可以点击
        useDisable: easyloader.useDisable ? easyloader.useDisable : false,//启用disable属性
        initJson: [], //初始化json
        maxItemCount: null, //最大可选数
        width: 940, //弹出选择框的宽度，默认为630 + 10     注：加10是为了后面自适应调整
        inputName: "", //记录选人组件的隐藏域的表单名称
        inputWidth: "100%", //自定义input或者textarea的宽度
        items: [], //tab参数
        submitFunction: null, //点击确定后执行的函数
        readOnly: false,//选人组件只读模式
        displayMode: false,//隐藏模式，实现自己接管
        autoComplete: false,//选人组件搜索自动完成模式
        moveSelect: false,//增加选人组建的选中，反选，上移，下移功能
        shortCutUrl: "",//常用联系人快捷方式
        iframeId: "",//iframe的唯一标识
        isDialog: false,//是否是对话框里面调用选人组件
        gradeSearch: "gradeSearch",//父页面高级查询条件
        gradeClass: "gradeParams",//高级查询的选项样式标识
        wattingTitle: "节点移动操作只能是单节点！",//等待的提示内容
        wattingTime: 3000,//等待的时间，单位毫秒
        callback: {}//基教的全选函数
    };

    $.ligerSelect = {};
    $.ligerDialogSelect = {};

    $.ligerSelect.open = function (p, element) {
        //初始化的元素需要往后传递
        p.elementId = element.attr("id");
        var options = {
            cls: "l-dialog-content-select",
            title: p.title,
            content: '<div id="selectPlugin" class="l-dialog-hack"></div><script type="text/javascript"> $(document).ready(function () {using("select", function() {$("#selectPlugin").ligerSelect(' + JSON.stringify(p) + ');});});</script>',
            width: p.width,
            height: p.height ? p.height : p.shortCutUrl == "" ? 510 : 585,
            /*width: $(document).width()-20,
             height: $(document).height()-60,*/
            isNeedNoPaddingClass: true,
            buttons: [
                {
                    text: '确定', className: 'l-button-sure', onclick: function (item, dialog) {
                        element.focus();//焦点聚焦
                        $.ligerSelect.submit(dialog, p, element);
                    }
                },
                {
                    text: '取消', onclick: function (item, dialog) {
                        dialog.close();
                    }
                }
            ]
        };

        if (easyloader.isIframe) {
            parent.$.ligerDialog.open(options);
        } else {
            top.$.ligerDialog.open(options);
        }
    };

    $.ligerSelect.submit = function (dialog, p, element) {
        var count = $("li.single", dialog).size();
        if (p.maxItemCount && p.maxItemCount < count) {
            if (easyloader.isIframe) {
                parent.$.ligerDialog.error("您最多可以选择" + p.maxItemCount + "项");
            } else {
                top.$.ligerDialog.error("您最多可以选择" + p.maxItemCount + "项");
            }
            return;
        }

        var backValue = "";
        var backHiddenValue = "";
        var backHtml = ["<ul>"];
        $("li.single", dialog).each(function (i) {
            var value = $(this).attr("id").substr("t-selected-item-".length);
            if (element[0].tagName.toLowerCase() == "div") {
                backHtml.push("<li class=\"single\"><span>" + $("span", $(this)).text() + "</span></li>");
            } else {
                backValue += $("span", $(this)).text();
            }
            backHiddenValue += value;
            if (i < $("li.single", dialog).size() - 1) {
                backValue += ",";
                backHiddenValue += ",";
            }
        });

        if (element[0].tagName.toLowerCase() == "div") {
            backHtml.push("</ul");
            element.html(backHtml.join(""));
        } else {
            element.val(backValue);
        }
        element.next().val(backHiddenValue);
        dialog.close();
        if ((typeof p.submitFunction == "function")) p.submitFunction({ selectUserCount: count, selectValue: backHiddenValue });
    };

    $.fn.ligerDialogSelect = function (p) {
        this.each(function () {
            p = $.extend({}, $.ligerDefaults.Select, p || {});
            //todo by yzhao 在easyloader上开一个空间存储回调函数，可能会有问题
            if (easyloader.isIframe) {
                parent.window.document.body.selectCallBack = p.callback;
            } else {
                window.document.body.selectCallBack = p.callback;
            }
            var gg = {
                initEvent: function () {
                    gg.img.click(function () {
                        var names;
                        if (gg.input[0].tagName.toLowerCase() == "div") {
                            names = $("ul>li>span", gg.input);
                        } else {
                            names = gg.input.val().split(",");
                        }
                        var values = gg.input.next().val().split(",");
                        var list = [];
                        //初始化json,用于在调用页面显示
                        for (var i = 0; i < values.length; i++) {
                            var initObject = {};
                            if (gg.input[0].tagName.toLowerCase() == "div") {
                                initObject[p.rightItemName] = $(names[i]).html();
                            } else {
                                initObject[p.rightItemName] = names[i];
                            }
                            initObject[p.rightItemValue] = values[i];
                            if (values[i] != "") {
                                list[i] = initObject;
                            }
                        }
                        p.initJson = list;
                        //打开选择对话框
                        $.ligerSelect.open(p, gg.input);
                    });
                }
            };
            gg.input = $(this);
            if (this.tagName.toLowerCase() == "input" || this.tagName.toLowerCase() == "textarea" || this.tagName.toLowerCase() == "div") {
                this.readOnly = true;
                gg.selectDiv = gg.input.wrap('<div class="select_div"></div>').parent();
                if (this.tagName.toLowerCase() == "input") {
                    gg.userDiv = gg.selectDiv.wrap("<div class=\"user_div_input float_left\" style=\"width:" + p.inputWidth + "\"></div>").parent();
                } else if (this.tagName.toLowerCase() == "textarea") {
                    gg.input.attr("rows", "3");
                    gg.userDiv = gg.selectDiv.wrap("<div class=\"user_div_textarea float_left\" style=\"width:" + p.inputWidth + "\"></div>").parent();
                } else {
                    gg.userDiv = gg.selectDiv.wrap("<div class=\"user_div float_left\" style=\"width:" + p.inputWidth + "\"></div>").parent();
                }
                gg.img = $("");

                if (!p.readOnly) {
                    gg.img = gg.userDiv.append('<div class="select_img"><a class="l-click-open" href="javascript:void(0);"></a></div>').find(".select_img");
                }

                //by yzhao 2013-3-20 隐藏域的名称可以又用户指定
                if (p.inputName == "") {
                    gg.input.after('<input type="hidden" name="' + gg.input.attr("id") + '_val" value=""/>');
                } else {
                    gg.input.after('<input type="hidden" name="' + p.inputName + '" value=""/>');
                }

                var backValue = "";
                var backHiddenValue = "";
                var backHtml = ["<ul>"];
                //用于在对话框窗体上显示
                if (p.initJson) {
                    $(p.initJson).each(function (i, item) {
                        if (item != null) {
                            backValue += item[p.rightItemName];
                            backHiddenValue += item[p.rightItemValue];
                            backHtml.push("<li class=\"single\"><span>" + item[p.rightItemName] + "</span></li>");

                            if (i < $(p.initJson).size() - 1) {
                                backValue += ",";
                                backHiddenValue += ",";
                            }
                        }
                    });
                    if (this.tagName.toLowerCase() == "div") {
                        backHtml.push("</ul");

                        $(this).html(backHtml.join(""));
                    } else {
                        $(this).val(backValue);
                    }
                    $(this).next().val(backHiddenValue);

                    gg.initEvent();

                    //如果是隐藏模式在初始化完成后去实现
                    if (p.displayMode) {
                        gg.input.parent().parent().hide();
                    }
                }
            }
        });
    };

    $.fn.ligerSelect = function (p) {
        this.each(function () {
            p = $.extend({}, $.ligerDefaults.Select, p || {});
            var g = {
                initSelectedItem: function () {
                    $(p.initJson).each(function (i, item) {
                        g.addTopItem(item[p.rightItemName], item[p.rightItemValue]);
                    });
                },
                refreshSelectCount: function () {
                    var count = $("li.single", g.select).size();
                    $("#t-selectCount").html(count);
                },
                selectArea: function () {
                    var selectAreaHtml = [];
                    if (p.moveSelect) {
                        selectAreaHtml.push('<div class="user_stats_div"><span class="pull_left">已经选择<b id="t-selectCount">0</b>个选项</span><span class="pull_right mr5"><a href="javascript:void(0)" class="ui_btn ui_btn_success ui_btn_mini unSelect">反选</a><a href="javascript:void(0)" class="ui_btn ui_btn_danger ui_btn_mini removeSelect">删除</a><a href="javascript:void(0)" class="ui_btn ui_btn_mini movePrev">前移</a><a href="javascript:void(0)" class="ui_btn ui_btn_mini moveNext">后移</a><a href="javascript:void(0)" class="ui_btn ui_btn_mini moveTop">置顶</a><a href="javascript:void(0)" class="ui_btn ui_btn_mini moveFoot">置底</a></span></div>');
                    } else {
                        selectAreaHtml.push('<div class="user_stats_div"><span class="pull_left">已经选择<b id="t-selectCount">0</b>个选项</div></span>');
                    }
                    selectAreaHtml.push('<div class="show_select">');
                    selectAreaHtml.push('<ul class="t-selected-ul">');
                    selectAreaHtml.push('</ul></div>');
                    $("#selectArea").html(selectAreaHtml.join(''));
                    g.initSelectedItem();
                },
                addItem: function (i, item) {
                    var ditem = $('<div tabid="select-' + i + '"></div>');
                    // 单选按钮的时候，不需要显示全选按钮
                    var dispalyValue = "";
                    if (p.selectType.toLowerCase() == "radio") {
                        dispalyValue = "none";
                    }
                    if (item.leftUrl == undefined || item.leftUrl == '') {
                        ditem.html('<div class="tree_div" style="display: none;"><ul id="select-' + i + '"  style="height:305px"></ul></div><div class="chose_div" style="width: 100%;"><div class="toolbar_query"><li><div class="btn_query"><input id="keyword" name="keyword" class="autoComplete" type="text"/><a href="javascript:void(0);" class="r-query-button" title="查询"></a></div></li><li style="display: ' + dispalyValue + '"><input name="selectAll" id="selectAll" type="checkbox" value=""/>全选&nbsp;</li><span class="pull_right mr5" id="roleList"></span></div><div class="list"></div><div class="page_blue"></div></div></div>');
                    } else {
                        ditem.html('<div class="tree_div"><ul id="select-' + i + '"  style="height:305px"></ul></div><div class="chose_div"><div class="toolbar_query"><li><div class="btn_query"><input id="keyword" name="keyword" class="autoComplete" type="text"/><a href="javascript:void(0);" class="r-query-button" title="查询"></a></div></li><li><input name="selectAll" id="selectAll" type="checkbox" value=""/>全选&nbsp;</li><span class="pull_right mr5" id="roleList"></span></div><div class="list"></div><div class="page_blue"></div></div></div>');
                    }

                    //高级查询的选项
                    g.graderSearchObj = "";
                    if (p.iframeId != undefined && p.iframeId != "") {
                        g.graderSearchObj = $("#" + p.gradeSearch, $("#" + p.iframeId)[0].contentWindow.document);
                    } else {
                        g.graderSearchObj = p.isDialog ? $("#" + p.gradeSearch, $("iframe", parent.document)[0].contentWindow.document) : parent.$("#" + p.gradeSearch);
                    }
                    if (g.graderSearchObj.length > 0) {
                        $(".toolbar_query>li:first", ditem).after("<li><a href=\"javascript:void(0);\" class=\"gradeSearch ui_btn ui_btn_mini\">展开高级</a></li>");
                        $(".toolbar_query", ditem).after(g.graderSearchObj.html());
                        $(".toolbar_query", ditem).next().addClass("hidden");
                    }

                    $("#content", g.select).append(ditem);
                    /**
                     * 将每个Tab展示的树的主键和键明传递到后面
                     * tab的名称，左边的URL地址，右边的URL地址，左边URL树的键名，键值
                     */
                    item.title && ditem.attr("title", item.title);
                    item.leftUrl && ditem.attr("leftUrl", item.leftUrl);
                    item.rightUrl && ditem.attr("rightUrl", item.rightUrl);
                    item.idFieldName && ditem.attr("idFieldName", item.idFieldName);
                    item.textFieldName && ditem.attr("textFieldName", item.textFieldName);
                    item.roleUrl && ditem.attr("roleUrl", item.roleUrl);
                    item.roleId && ditem.attr("roleId", item.roleId);
                    //by yzhao 房俊需要左边的人员也可以指定值和名称，且这些id必须全局唯一
                    item.rightIdFieldName && ditem.attr("rightIdFieldName", item.rightIdFieldName);
                    item.rightTextFieldName && ditem.attr("rightTextFieldName", item.rightTextFieldName);
                    /**
                     * 修改文件上传样式为根据宽度传值自适应布局
                     * by sjsong01@wisedu.com
                     * @date:2013-08-27
                     */
                    var tree_div = $('.tree_div');
                    tree_div.parent().addClass('row');
                    tree_div.addClass('grid_4');
                    tree_div.children().addClass('grid_4');
                    if (item.leftUrl != undefined && item.leftUrl != '') tree_div.next().addClass('left_4');
                },
                initRole: function (tabId, roleUrl) {
                    if (roleUrl == undefined || roleUrl == "") return;

                    $.ajax({
                        url: roleUrl,
                        dataType: "json",
                        success: function (data) {
                            var tabContent = $("div[tabid=" + tabId + "]", ".l-tab-content");
                            var roleData = ["<select id='roleList'>"];
                            for (var i = 0; i < data.length; i++) {
                                if (tabContent.attr("roleId") != undefined && data[i].roleId == tabContent.attr("roleId")) {
                                    roleData.push("<option selected=\"selected\" value='" + data[i].roleId + "'>" + data[i].roleName + "</option>");
                                } else {
                                    roleData.push("<option value='" + data[i].roleId + "'>" + data[i].roleName + "</option>");
                                }
                            }
                            roleData.push("</select>");

                            $("#roleList", tabContent).html(roleData.join(""));
                        }
                    });
                },
                initEvents: function (url, tabId) {
                    g.searchObj = $("div[tabid=" + tabId + "]");
                    //初始化分页事件
                    $(".page", g.searchObj).unbind("click").click(function () {
                        var button = $(".r-query-button", g.searchObj);
                        var page = $(this).attr("num");
                        var pkId = button.attr("pkId") == null ? "" : button.attr("pkId");
                        var keyword = button.attr("keyword") == null ? "" : button.attr("keyword");
                        var param = "page=" + page + "&pkId=" + pkId + "&keyword=" + encodeURI(keyword);
                        g.loadRightData(url, param, tabId);
                    });

                    //搜索事件
                    $(".r-query-button", g.searchObj).unbind("click").click(function () {
                        var pkId = $(this).attr("pkId") == null ? "" : $(this).attr("pkId");
                        var keyword = $(this).prev().val();
                        $(this).attr("keyword", keyword);
                        var param = "pkId=" + pkId + "&keyword=" + encodeURI(keyword);

                        g.loadRightData(url, param, tabId);
                    });

                    //选中事件
                    $(".r-selected-li", g.searchObj).unbind("click").click(function () {
                        if (p.useDisable && $(this).attr("disabled") && $(this).attr("disabled").toLowerCase() == "disabled")
                            return;
                        // 单选按钮的时候，当前页只允许选择一个
                        if (p.selectType.toLowerCase() == "radio") {
                            $(".r-selected-li", $(this).parents(".l-tab-content-item")).each(function () {
                                g.cancelSelectItem($(this));
                            });
                            // 删除已经选择的selected-ul区域的数据
                            $(".t-selected-ul li").each(function () {
                                $(this).remove();
                            });
                        }

                        var selected = $(this).hasClass("selected");
                        if (selected) {
                            g.cancelSelectItem($(this));
                        }
                        else {
                            g.selectItem($(this));
                        }
                    });

                    //展开隐藏事件
                    $(".gradeSearch", g.searchObj).unbind("click").click(function () {
                        var gradeObj = $(".advancedSearch", g.searchObj);
                        var thisObj = $(this);
                        if (gradeObj.hasClass("hidden")) {
                            gradeObj.removeClass("hidden");
                            thisObj.html("收起高级");
                        } else {
                            gradeObj.addClass("hidden");
                            thisObj.html("展开高级");
                        }
                    });
                    //全选事件
                    $("#selectAll", g.searchObj).unbind("click").click(function () {
                        var intTabId = parseInt(tabId.substring(7, tabId.length));
                        var selected = $(this).attr("checked");

                        var cilickFun = null;

                        if (easyloader.isIframe) {
                            cilickFun = parent.window.document.body.selectCallBack != undefined && parent.window.document.body.selectCallBack["selectAllClick" + intTabId];
                        } else {
                            cilickFun = window.document.body.selectCallBack != undefined && window.document.body.selectCallBack["selectAllClick" + intTabId];
                        }

                        if ((typeof cilickFun) == "function") {
                            var objData = {};
                            objData.selectCount = $("#t-selectCount");
                            objData.showSelectUl = $(".t-selected-ul", g.selectAreaObj);
                            objData.selectUl = $(".list>ul", g.searchObj);
                            objData.g = g;
                            return cilickFun(this, selected == "checked", objData);
                        }

                        if (selected) {
                            $(".r-selected-li", $(this).parents(".l-tab-content-item")).each(function () {
                                g.selectItem($(this));
                            });
                        } else {
                            $(".r-selected-li", $(this).parents(".l-tab-content-item")).each(function () {
                                g.cancelSelectItem($(this));
                            });
                        }
                    });

                    //绑定本tab的页面上的id为keyword的回车事件,必须先解除绑定，否则会提交多次
                    $("#keyword", g.searchObj).bind("keydown.select", function (e) {
                        var key = e.which;
                        if (key == 13) {
                            var donwNode = $(this);
                            var downNextNode = $(this).next();
                            var pkId = downNextNode.attr("pkId") == null ? "" : downNextNode.attr("pkId");
                            var keyword = donwNode.val();
                            $(".r-query-button", g.searchObj).attr("keyword", keyword);
                            var param = "pkId=" + pkId + "&keyword=" + encodeURI(keyword);
                            g.loadRightData(url, param, tabId);
                        }
                    });
                },
                addTopItem: function (name, value) {
                    $(".t-selected-ul", g.selectAreaObj).append('<li id="t-selected-item-' + value + '" class="single"><span>' + name + '</span><a class="t-delete-item"></a></li>');
                    g.refreshSelectCount();
                    //删除选中事件
                    g.deleteli();
                    g.liSelectClick();
                    //模拟点击
                    $($("span[userId=" + value + "]"), g.shortCutAreaObj).parent().addClass("li_select");
                }, deleteli: function () {
                    $(".t-delete-item", g.selectAreaObj).unbind("click").click(function () {
                        var li = $(this).parent();
                        var id = li.attr("id").substr("t-selected-item-".length);
                        var checkedItem = $("#" + id, g.select).parent();
                        li.remove();
                        g.cancelSelectItem(checkedItem);
                        // 防止当前分页数据中没有这条数据，那么计数会显示不正确，所以在这里再次刷新计数
                        g.refreshSelectCount();
                        $($("span[userId=" + id + "]"), g.shortCutAreaObj).parent().removeClass("li_select");
                    });
                },
                selectItem: function (item) {
                    var checkbox = $(".r-selected-item", item);
                    if (p.useDisable && checkbox.attr("disabled") == "disabled") return;
                    if (!item.hasClass("selected")) {
                        checkbox.attr("checked", 'checked');
                        item.addClass("selected");
                        g.addTopItem(checkbox.attr("text"), checkbox.attr("id"));
                    }
                },
                cancelSelectItem: function (item) {
                    var checkbox = $(".r-selected-item", item);
                    if (item.hasClass("selected")) {
                        checkbox.removeAttr("checked");
                        item.removeClass("selected");
                        $("#t-selected-item-" + checkbox.attr("id"), g.select).remove();
                        g.refreshSelectCount();
                        $($("span[userId=" + checkbox.attr("id") + "]"), g.shortCutAreaObj).parent().removeClass("li_select");
                    }
                },
                setPage: function (url, ps, tabId) {
                    var rightPageHtml = [];
                    if (ps == undefined || ps == null) return;

                    if (ps.pageCount > 1) {
                        if (ps.currentIndex != 1) {
                            rightPageHtml.push('<a class="page" href="javascript:void(0);" num="1"> 首页 </a>');
                            rightPageHtml.push('<a class="page" href="javascript:void(0);" num="' + (ps.currentIndex - 1) + '"> < </a>');
                        }
                    }
                    if (ps.pageCount > 1) {
                        for (var i = ps.startIndexOnShow; i < ps.endIndexOnShow + 1; i++) {
                            if (i == ps.currentIndex) {
                                rightPageHtml.push('<span class="current">' + i + '</span>');
                            } else {
                                rightPageHtml.push('<a class="page" href="javascript:void(0);" num="' + i + '">' + i + '</a>');
                            }
                        }
                    }
                    if (ps.currentIndex < ps.endIndex) {
                        rightPageHtml.push('<a class="page" href="javascript:void(0);" num="' + (ps.currentIndex + 1) + '"> > </a>');
                        rightPageHtml.push('<a class="page" href="javascript:void(0);" num="' + (ps.endIndex) + '"> 尾页 </a>');
                    }
                    $(".page_blue", g.select).html(rightPageHtml.join(''));
                    g.initEvents(url, tabId);
                },
                setRightHtml: function (url, res, tabId) {
                    var tabContent = $("div[tabid=" + tabId + "]");
                    var rightIdFieldName = tabContent.attr("rightIdFieldName") == undefined ? p.rightItemValue : tabContent.attr("rightIdFieldName");
                    var rightTextFieldName = tabContent.attr("rightTextFieldName") == undefined ? p.rightItemName : tabContent.attr("rightTextFieldName");

                    var ps = res.pageObject;
                    var rightData = null;
                    if (ps != null) {
                        rightData = ps.items;
                    }
                    var rightContentHtml = ['<ul>'];
                    if (ps && rightData.length > 0) {
                        for (var i = 0; i < rightData.length; i++) {
                            var name = rightData[i][rightTextFieldName];
                            var orgName = (rightData[i][p.rightItemOrgName] == undefined || rightData[i][p.rightItemOrgName] == "") ? rightData[i][rightTextFieldName] : rightData[i][p.rightItemOrgName];
                            var value = rightData[i][rightIdFieldName];
                            var _checked = "";
                            var _selected = "";
                            $("li.single", g.select).each(function () {
                                var id = $(this).attr("id").substr("t-selected-item-".length);
                                if (id == value) {
                                    _checked = "checked";
                                    _selected = " selected";
                                }
                            });
                            if (p.useDisable && rightData[i][p.rightItemDisable]) {
                                rightContentHtml.push('<li class="r-disable r-selected-li' + _selected + '" disabled=\"disabled\" title="' + orgName + '"><input class="r-selected-item" ' + _checked + ' disabled=\"disabled\" type="' + p.selectType + '" value="' + value + '"  id="' + value + '" text="' + name + '"/>' + name + '</li>');
                            } else {
                                rightContentHtml.push('<li class="r-selected-li' + _selected + '" title="' + orgName + '"><input class="r-selected-item" ' + _checked + ' type="' + p.selectType + '" value="' + value + '"  id="' + value + '" text="' + name + '"/>' + name + '</li>');
                            }
                        }
                    } else {
                        rightContentHtml.push('<li>暂无数据</li>');
                    }
                    rightContentHtml.push('</ul>');
                    $(".list", g.select).html(rightContentHtml.join(''));
                    g.setPage(url, ps, tabId);
                },
                clearHtml: function () {
                    $(".list", g.select).empty();
                    $(".page_blue", g.select).empty();
                    $("#selectAll", g.select).removeAttr("checked");
                },
                treeNodeClick: function (tabId) {
                    $("#keyword", g.select).val("");
                    $(">div[tabid=" + tabId + "]", ".l-tab-content").find(".btn_query>a").removeAttr("keyword");
                    $("#selectAll", g.select).removeAttr("checked");
                },
                autoComplete: function () {
                    //绑定keyword的自动完成事件,必须查找每个tab的keyword进行绑定
                    if (p.autoComplete) {
                        //var tabId = $("li.l-selected", ".l-tab-links>ul").attr("tabid");
                        //var tabContent = $("div[tabid=" + tabId + "]", ".l-tab-content");
                        $(".autoComplete", g.select).autocomplete({
                            source: function (request, response) {
                                $.ajax({
                                    url: "test.json",
                                    dataType: "json",
                                    data: {
                                        pagesize: 5,
                                        keyword: request.term
                                    },
                                    success: function (data) {
                                        response($.map(data.Rows, function (item) {
                                            return {
                                                label: item.loginName + (item.firstName ? ", " + item.firstName : ""),
                                                value: item.loginName
                                            }
                                        }));
                                    }
                                });
                            }
                        });
                    }
                },
                loadRightData: function (url, param, tabId) {
                    //把用户选中的角色传递到后台
                    var tabContent = $("div[tabid=" + tabId + "]");
                    var roleId = $("#roleList", tabContent).find("option:selected").val();
                    g.clearHtml();
                    //g.loading.show();
                    $(".l-tree-loading", g.select).show();
                    var ajaxtype = param ? "post" : "get";
                    //这里的参数是作为字符串传递的
                    var roleUrl = tabContent.attr("roleUrl");
                    if (param != null && roleUrl != undefined && roleUrl != "") {
                        param += "&roleId=" + roleId;
                    }

                    //需要重新查找不能用临时变量
                    var tempSearchObj = $(".advancedSearch", tabContent);
                    $("." + p.gradeClass, tempSearchObj).each(function (index, item) {
                        var itemObj = $(item);
                        var name = itemObj.attr("name");
                        if (name != undefined && name != "") {
                            if (item.nodeName.toLocaleLowerCase() == "select") {
                                param += "&" + name + "=" + itemObj.find("option:selected").val();
                            } else {
                                if (item.type.toLocaleLowerCase() == "checkbox" || item.type.toLocaleLowerCase() == "radio") {
                                    if (itemObj.attr("checked")) {
                                        param += "&" + name + "=" + itemObj.val();
                                    }
                                } else {
                                    param += "&" + name + "=" + itemObj.val();
                                }
                            }
                        }
                    });
                    //请求服务器
                    $.ajax({
                        type: ajaxtype,
                        url: url,
                        data: param,
                        dataType: "json",
                        success: function (data) {
                            if (!data) return;
                            $(".l-tree-loading", g.select).hide();
                            g.setRightHtml(url, data, tabId);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            try {
                                g.loading.hide();
                                if (p.onError)
                                    p.onError(XMLHttpRequest, textStatus, errorThrown);
                            }
                            catch (e) {

                            }
                        }
                    });
                }, liSelectClick: function () {
                    if (p.moveSelect) {
                        $(".t-selected-ul>li", g.selectAreaObj).unbind("click").click(function () {
                            if ($(this).hasClass("li_select")) {
                                $(this).removeClass("li_select");
                            } else {
                                $(this).addClass("li_select");
                            }
                        });
                    }
                }, unSelect: function () {
                    $(".unSelect", g.select).unbind("click").click(function () {
                        $(".t-selected-ul>li", g.selectAreaObj).each(function (index, obj) {
                            if ($(obj).hasClass("li_select")) {
                                $(obj).click();
                            } else {
                                $(obj).addClass("li_select");
                            }
                        });

                        //所有的.t-selected-ul>li必须重新绑定监听
                        g.liSelectClick();
                    });
                }, removeSelect: function () {
                    $(".removeSelect", g.select).unbind("click").click(function () {
                        $(".t-selected-ul>li", g.selectAreaObj).each(function (index, obj) {
                            if ($(obj).hasClass("li_select")) {
                                $(".t-delete-item", $(obj)).click();
                            }
                        });

                        //所有的.t-selected-ul>li必须重新绑定监听
                        g.liSelectClick();
                        //g.reSetSelectValeu();
                    });
                }, moveTop: function () {
                    $(".moveTop", g.select).unbind("click").click(function () {
                        var liSelect = $(".t-selected-ul>li.li_select", g.selectAreaObj);
                        if (liSelect.length == 1) {
                            liSelect.remove();
                            $(".t-selected-ul>li:first", g.selectAreaObj).before(liSelect);

                            //所有的.t-selected-ul>li必须重新绑定监听
                            g.deleteli();
                            g.liSelectClick();
                            //g.reSetSelectValeu();
                        } else {
                            g.showWatting();
                        }
                    });
                }, moveFoot: function () {
                    $(".moveFoot", g.select).unbind("click").click(function () {
                        var liSelect = $(".t-selected-ul>li.li_select", g.selectAreaObj);
                        if (liSelect.length == 1) {
                            liSelect.remove();
                            $(".t-selected-ul>li:last", g.selectAreaObj).after(liSelect);

                            //所有的.t-selected-ul>li必须重新绑定监听
                            g.deleteli();
                            g.liSelectClick();
                            //g.reSetSelectValeu();
                        } else {
                            g.showWatting();
                        }
                    });
                }, moveNext: function () {
                    $(".moveNext", g.select).unbind("click").click(function () {
                        var liSelect = $(".t-selected-ul>li.li_select", g.selectAreaObj);
                        if (liSelect.length == 1) {
                            if (liSelect.next().length == 0) return;
                            liSelect.next().after(liSelect);

                            //所有的.t-selected-ul>li必须重新绑定监听
                            g.deleteli();
                            g.liSelectClick();
                            //g.reSetSelectValeu();
                        } else {
                            g.showWatting();
                        }
                    });
                }, movePrev: function () {
                    $(".movePrev", g.select).unbind("click").click(function () {
                        var liSelect = $(".t-selected-ul>li.li_select", g.selectAreaObj);
                        if (liSelect.length == 1) {
                            if (liSelect.prev().length == 0) return;
                            liSelect.prev().before(liSelect);

                            //所有的.t-selected-ul>li必须重新绑定监听
                            g.deleteli();
                            g.liSelectClick();

                            //g.reSetSelectValeu();
                        } else {
                            g.showWatting();
                        }
                    });
                }, showWatting: function () {
                    using("dialog", function () {
                        $.ligerDialog.waitting(p.wattingTitle, p.wattingTime, true);
                    });
                }, initShortCut: function () {
                    $(".shortCut", "#shortCutArea").unbind("click").click(function () {
                        var spanObj = $(this).children();
                        var value = spanObj.attr("userId");
                        var name = spanObj.html();
                        var itemObj = $("#" + value, g.select);
                        //不能进行模拟点击，否则会死循环
                        if ($(this).hasClass("li_select")) {
                            $(this).removeClass("li_select");

                            $("#t-selected-item-" + value, g.selectAreaObj).remove();
                            itemObj.attr("checked", false);
                            itemObj.parent().removeClass("selected");
                        } else {
                            $(this).addClass("li_select");

                            $(".t-selected-ul", g.selectAreaObj).append('<li id="t-selected-item-' + value + '" class="single"><span>' + name + '</span><a class="t-delete-item"></a></li>');

                            itemObj.attr("checked", true);
                            itemObj.parent().addClass("selected");
                        }

                        g.refreshSelectCount();
                        //删除选中事件
                        g.deleteli();
                        g.liSelectClick();
                    });
                }/*, reSetSelectValeu: function () {
                 var backValue = "";
                 var backHiddenValue = "";
                 $("li.single", g.select).each(function (i) {
                 var value = $(this).attr("id").substr("t-selected-item-".length);
                 backValue += $("span", $(this)).text();
                 backHiddenValue += value;
                 if (i < $("li.single", g.select).size() - 1) {
                 backValue += ",";
                 backHiddenValue += ",";
                 }
                 });

                 var element = $("#" + p.elementId);
                 element.val(backValue);
                 element.next().val(backHiddenValue);
                 }*/
            };
            //选人组件的窗体对象
            g.select = $(this);

            //组件整体框架
            var frame = $('<div id="selectArea" style="height:100px;"></div><div class="tab_style05"><div id="content"></div></div>');
            g.select.append(frame);
            g.selectArea();

            //添加tab项
            if (p.items) {
                $(p.items).each(function (i, item) {
                    g.addItem(i, item);
                });
            }

            g.selectAreaObj = $("#selectArea");
            g.loading = $("<div class='l-tree-loading'></div>");
            if (p.shortCutUrl != "") {
                g.selectAreaObj.after('<div id="shortCutArea" style="height:80px;"></div>');

                $.ajax({
                    url: p.shortCutUrl,
                    dataType: "json",
                    success: function (data) {
                        var shortCutUrl = ["<div class=\"short_title\">快捷选择</div><div class=\"short_select\"><ul class=\"t-selected-ul\">"];
                        for (var i = 0; i < data.length; i++) {
                            var className = "";
                            $("li.single", g.select).each(function () {
                                var id = $(this).attr("id").substr("t-selected-item-".length);
                                if (id == data[i][p.rightItemValue]) {
                                    className = "li_select";
                                }
                            });

                            shortCutUrl.push("<li class=\"shortCut " + className + "\"><span userId=" + data[i][p.rightItemValue] + ">" + data[i][p.rightItemName] + "</span></li>");

                        }
                        shortCutUrl.push("</ul></div>");

                        $("#shortCutArea").html(shortCutUrl.join(""));

                        g.initShortCut();
                    }
                });
            }

            g.shortCutAreaObj = $("#shortCutArea");

            $("#content", g.select).ligerTab({
                onAfterSelectTabItem: function (tabId) {
                    var li = $("div[tabid=" + tabId + "]");
                    var leftUrl = li.attr("leftUrl");
                    var rightUrl = li.attr("rightUrl");
                    var roleUrl = li.attr("roleUrl");
                    //兼容原来的默认不指定取pkId,treeNodeName
                    var idFieldName = li.attr("idFieldName") == undefined ? "pkId" : li.attr("idFieldName");
                    var textFieldName = li.attr("textFieldName") == undefined ? "treeNodeName" : li.attr("textFieldName");

                    g.initRole(tabId, roleUrl);
                    g.loadRightData(rightUrl, "", tabId);
                    //初始化左侧树,树异步加载
                    var tabItem = $("#" + tabId);
                    var manager = null;
                    tabItem.ligerTree({
                        url: leftUrl,
                        checkbox: false,
                        onSelect: function (node) {
                            $(".r-query-button", g.select).attr("pkId", node.data[idFieldName]);
                            var param = idFieldName + "=" + node.data[idFieldName];
                            g.nodeData = {};
                            g.nodeData[idFieldName] = node.data[idFieldName];
                            g.loadRightData(rightUrl, param, tabId);

                            g.treeNodeClick(tabId);

                        },
                        onBeforeExpand: function (node) {
                            //展开前事件,如果孩子为空且非叶子节点，则进行异步加载
                            if ($(".l-children>li", node.target).length == 0 && !(node.data.leaf)) {
                                manager.loadData(node.target, leftUrl, { "nodeData": JSON.stringify(node.data) });
                            }
                        },
                        idFieldName: idFieldName,
                        textFieldName: textFieldName
                    });
                    //取消选中，并将pkId置为空
                    manager = tabItem.ligerGetTreeManager();
                    $("li", tabItem).each(function () {
                        manager.cancelSelect(this);
                    });

                    $(".r-query-button", g.select).attr("pkId", "");
                }
            });
            //绑定反选事件,删除事件,置顶,置底,下移,上移
            g.unSelect();
            g.removeSelect();
            g.moveTop();
            g.moveFoot();
            g.moveNext();
            g.movePrev();

            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_Select"] = g;
            this.usedToolBar = true;
        });

        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_Select"];
        var managers = [];
        this.each(function () {
            managers.push(LigerUIManagers[this.id + "_Select"]);
        });
        return managers;
    };

})(jQuery);



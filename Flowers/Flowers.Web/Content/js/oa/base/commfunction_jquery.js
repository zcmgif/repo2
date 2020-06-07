/* 
 公共table行删除方法
 参数：
 requestURL：请求Controller删除方法的url
 responseURL：弹窗后，点击确定，求Controller刷新页面的url
 **/
function oaRemoveRow(requestURL, responseURL) {
    jQuery.ligerDialog.confirm("确定删除该条记录？", "提示", function (flag) {
        if (flag) {
            jQuery.ajax({
                type: "POST",
                url: requestURL,
                success: function (msg) {
                    var _e = jQuery.parseJSON(msg);
                    if (_e && _e.status == 1) {
                        jQuery.ligerDialog.success("删除成功！", "提示", function () {
                            window.location.href = responseURL;
                        });
                    } else {
                        jQuery.ligerDialog.warn('删除失败！');
                    }
                },
                error: function (o) {
                    jQuery.ligerDialog.warn('删除失败！');
                }
            });
        }
    });
};

/*
 * 公共删除方法 参数： PId： checkbox的名称 requestURL：请求Controller删除方法的url
 * responseURL：弹窗后，点击确定，求Controller刷新页面的url
 */
function oaRemove(PId, requestURL, responseURL, popMsg) {

    if (popMsg == "") {
        popMsg = "确定删除选中的记录？";
    }

    var removeString = "";
    var PIds = document.getElementsByName(PId);
    var PIdsLength = PIds.length;

    // 获取选中的checkbox框的value值.
    for (var i = 0; i < PIdsLength; i++) {
        if (PIds[i].checked) {
            removeString += PIds[i].value + ",";
        }
    }
    if (removeString == "") {

        jQuery.ligerDialog.warn("请选择需要删除的行！", "提示");

        return;
    } else {
        jQuery.ligerDialog.confirm(popMsg, "提示", function (flag) {
            if (flag) {
                if (requestURL.indexOf("?") == -1) {
                    requestURL += "?";
                } else {
                    requestURL += "&";
                }
                requestURL = requestURL + "pid=" + removeString;
                jQuery.ajax({
                    type: "POST",
                    url: requestURL,
                    success: function (msg) {
                        var _e = jQuery.parseJSON(msg);
                        if (_e && _e.status == 1) {
                            var msg = _e.msg;
                            if (!msg || msg.length == 0) {
                                msg = "删除成功！";
                            }
                            jQuery.ligerDialog.success(msg, "提示", function () {
                                window.location.href = responseURL
                            });
                        } else if (_e && _e.status == -1) {
                            jQuery.ligerDialog.warn("存在关联关系，无法删除！", "提示");
                        } else {
                            // alert(GE.cst.MSG.ASYNC_FAILURE);
                            jQuery.ligerDialog.alert();
                        }
                    },
                    error: function (o) {
                        // alert(GE.cst.MSG.ASYNC_FAILURE);
                        jQuery.ligerDialog.alert();
                    }
                });
            }
        });
    }
}

/**
 * 公共编辑新方法
 * @param param
 * @return
 */
function oaEditFunc(param, context) {
    var formId = param.formId;                                  //编辑页面的formId
    var requestURL = param.requestURL;                          //请求Controller保存方法的url
    var responseURL = param.responseURL;                        //弹窗后，点击确定，请求Controller刷新页面的url
    var arg0 = param.arg0;                                      //富文本编辑器的id
    var arg1 = param.arg1;                                      //富文本编辑器的id
    var popMsg = param.popMsg || "更新成功！";                   //保存后弹窗的提示语句，默认是更新成功
    var isShowWaitPage = param.isShowWaitPage || false;         //是否显示等待页面,默认不显示

    var validationEngine = jQuery.validationEngine;
    if (context) {
        formObj = $('#' + formId, context.document);
        validationEngine = context.jQuery.validationEngine;
    }
    // 校验表单
    var flag = validationEngine.doValidate(formObj);

    if (flag) {
        formObj.ajaxSubmit({
            type: "POST",
            url: requestURL,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (json) {
                if (json && json.status == 1) {
                    jQuery.ligerDialog.success(popMsg, "提示", function () {
                        // 如果回调函数有效，则执行回调函数
                        if (typeof (submitSuccessFunc) == 'function') {
                            submitSuccessFunc();
                        } else {
                            if (responseURL) {
                                window.location.href = responseURL
                            } else {
                                // 使用定时刷新达到自动隐藏提示框的目的
                                setTimeout("window.location.reload(true)", 2000);
                            }
                        }
                    });
                } else {
                    var msg = json.msg ? json.msg : failureMsg;
                    jQuery.ligerDialog.warn(msg, "提示");
                    if ($("#submitWorkflow")) {
                        $("#submitWorkflow").removeAttr('disabled');
                    }
                }
            },
            error: function (o) {
                jQuery.ligerDialog.alert(o);
            }
        });
    }
}

/**
* 公共保存新方法，校验成功后才会保存
* <p>
* action处理非保存成功返回消息名为msg，格式为{"msg":"错误消息"}<p>
* 
* <b>注意：</b>此方法的调用页面必须引入validationEngine插件；<p>
* 
* 对于需要处理ckeditor富文本内容的表达，表单页面必须有ID为htmlEditorIds的隐藏域，其value为富文本编辑器id，多个id间以逗号（,）分割
* 
* @param param
*            参数
* @return 表单校验失败时返回'validate_failed'
*/

function oaSaveFunc(param, context) {


    // 新增页面的formId
    var formId = param.formId;
    // 请求Controller保存方法的url
    var requestURL = param.requestURL;
    // 弹窗后，点击确定，请求Controller刷新页面的url
    var responseURL = param.responseURL;
    // 保存成功提示消息
    var successMsg = param.successMsg ? param.successMsg : '保存成功';

    // 保存失败提示消息
    var failureMsg = param.failureMsg ? param.failureMsg : '保存失败';
    // ckeditor富文本编辑器的id
    //var htmlEditId = param.htmlEditId;
    // 弹窗后，点击确定，请求Controller刷新页面的url
    var submitSuccessFunc = param.submitSuccessFunc;

    // 富文本编辑器的id
    // var arg0 = param.arg0;
    // 富文本编辑器的id
    // var arg1 = param.arg1;
    // 保存后弹窗的提示语句，默认是保存成功
    // var popMsg = param.popMsg || "办理成功！";
    // 是否显示等待页面,默认不显示
    // var isShowWaitPage = param.isShowWaitPage || false;
    // var arg0_value = "";
    // var arg1_value = "";
    // var heightValue = "40px";
    // var widthValue = "350px";
    // 获取新增的form对象
    // var addform = $('#' + formId);
    // var flag = false;

    // var waitPage = param.waitPage || false;
    // var msg = param.msg || '';
    // var dialogId = param.dialogId;

    // var waitPagePanel = null;

    var formObj = $('#' + formId);
    var validationEngine = jQuery.validationEngine
    if (context) {
        formObj = $('#' + formId, context.document);
        validationEngine = context.jQuery.validationEngine;
    }
    // 校验表单
    var flag = validationEngine.doValidate(formObj);

    if (!flag) {
        return;
    }

    //处理富文本编辑器 begin
    var htmlEditorIds = $('#htmlEditorIds');

    if (context) {
        htmlEditorIds = $('#htmlEditorIds', context.document);
    }

    if (htmlEditorIds.length > 0) {
        var arrIds = htmlEditorIds.val().split(',');
        for (var i = 0; i < arrIds.length; i++) {

            var htmlEditId = arrIds[i];

            if (htmlEditId) {
                if (context && $('#' + htmlEditId, context.document).length > 0) {
                    //取得CKEDITOR实例
                    var instance = context.CKEDITOR.instances[htmlEditId];
                    // 对于CKEDITOR，富文本内容并不在p.htmlEditId对应的元素中，所以通过赋值以便后台获取
                    $('#' + htmlEditId, context.document).val(instance.getData());

                } else if ($('#' + htmlEditId).length > 0) {
                    //取得CKEDITOR实例
                    var instance = CKEDITOR.instances[htmlEditId];
                    // 对于CKEDITOR，富文本内容并不在p.htmlEditId对应的元素中，所以通过赋值以便后台获取
                    $('#' + htmlEditId).val(instance.getData());
                }
            }
        }
    }
    //处理富文本编辑器 end

    formObj.ajaxSubmit({
        type: "POST",
        url: requestURL,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (json) {
            // var _e = jQuery.parseJSON(o);
            if (json && json.status == 1) {
                jQuery.ligerDialog.success(successMsg, "提示", function () {
                    // 如果回调函数有效，则执行回调函数
                    if (typeof (submitSuccessFunc) == 'function') {
                        submitSuccessFunc();
                    } else {
                        if (responseURL) {
                            window.location.href = responseURL
                        } else {
                            // 使用定时刷新达到自动隐藏提示框的目的
                            setTimeout("window.location.reload(true)", 2000);
                        }
                    }
                });
          

            } else {
                var msg = json.msg ? json.msg : failureMsg;
                jQuery.ligerDialog.warn(msg, "提示");
                if ($("#submitWorkflow")) {
                    $("#submitWorkflow").removeAttr('disabled');
                }
            }
        },
        error: function (o) {

            jQuery.ligerDialog.error("服务端异常," + failureMsg);
        }
    });
}

/*
 * 公共链接至编辑页面的方法 参数： PId：checkbox的名称 requestURL：请求Controller链接至编辑页面方法的url
 */
function oaHrefEditPage(PId, requestURL) {
    var PIds = document.getElementsByName(PId);
    var PIdsLength = PIds.length;
    var checkedCount = 0;
    for (var i = 0; i < PIdsLength; i++) {
        if (PIds[i].checked) {
            checkedCount += 1;
        }
    }

    if (checkedCount == 1) {
        var removeString = "";
        for (var i = 0; i < PIdsLength; i++) {
            if (PIds[i].checked) {
                removeString += PIds[i].value + ",";
            }
        }
        if (removeString.indexOf(",") > 0) {
            removeString = removeString.substring(0, removeString.length - 1);
        }
        //openLoading();
        window.location.href = requestURL + removeString;
    } else {
        if (checkedCount < 1) {
            // WE.app.PopWindow.pop({windowTitle:"提示", cancelButton:false,
            // alertMsg:"请选择一行进行编辑！"});
            jQuery.ligerDialog.warn("请选择一行进行编辑！", "提示");
        } else if (checkedCount > 1) {
            // WE.app.PopWindow.pop({windowTitle:"提示", cancelButton:false,
            // alertMsg:"只能选择一行进行编辑！"});
            jQuery.ligerDialog.warn("只能选择一行进行编辑！", "提示");
        }
        return;
    }
}

/**
 * 获取table中被选中的行的对象ID
 * 
 * @param pId
 *            checkbox的name
 * @param single
 *            是否是多选
 * @return
 */
function getSelectedRows(pId, single) {

    var result = [];
    var pIdFields = $('input[type=checkbox][name=' + pId + ']:checked');

    if (pIdFields.length == 0) {
        jQuery.ligerDialog.warn("至少选择一行！", "提示");
    } else if (pIdFields.length > 1 && single) {
        jQuery.ligerDialog.warn("只能选择一行！", "提示");
    } else {
        for (var i = 0; i < pIdFields.length; i++) {
            result[i] = pIdFields[i].value;
        }
    }

    return result;
}

/*
 * 公共链接至添加页面的方法 参数： requestURL：请求Controller层链接至添加页面方法的url
 */
function oaHrefAddPage(requestURL) {
    window.location.href = requestURL;
}

/*
 * 公共table行编辑方法 参数： requestURL：请求Controller编辑方法的url
 */
function oaEditRow(requestURL) {
    window.location.href = requestURL;
}

function removeSelect(PId, requestURL, responseURL) {
    var removeString = "";
    var pids = "";
    var PIds = document.getElementsByName(PId);
    var PIdsLength = PIds.length;
    // 获取选中的checkbox框的value值.
    for (var i = 0; i < PIdsLength; i++) {
        if (PIds[i].checked) {
            removeString += PIds[i].value + ",";
            pids += "&pkId=" + PIds[i].value;
        }
    }

    if (removeString == "") {
        jQuery.ligerDialog.warn("请选择需要删除的行！", "提示");
    } else {
        jQuery.ligerDialog.confirm("确定删除所选记录？", "提示", function (flag) {
            if (flag) {
                jQuery.ajax({
                    type: "POST",
                    url: requestURL,
                    data: pids,
                    success: function (o) {
                        var _e = jQuery.parseJSON(o);
                        if (_e && _e.status == 1) {
                            jQuery.ligerDialog.success("删除成功！", "提示", function () {
                                if (responseURL) {
                                    window.location.href = responseURL
                                }
                                else {
                                    // 使用定时刷新达到自动隐藏提示框的目的
                                    window.location.reload(true);
                                }
                            });
                        } else {
                            jQuery.ligerDialog.warn("数据存在关联，无法删除！", "提示", function () {
                                if (responseURL) {
                                    window.location.href = responseURL
                                } else {
                                    // 使用定时刷新达到自动隐藏提示框的目的
                                    window.location.reload(true);
                                }
                            });
                        }
                    },
                    error: function (o) {
                        // alert(GE.cst.MSG.ASYNC_FAILURE);
                        jQuery.ligerDialog.alert(o);
                    }
                });
            }
        });
    }
};

 

function showUser(color, width, wrap) {
    $(".showUser span").colorTip({ color: color, width: width, wrap: wrap });
}

/**
 * @param params
    {
     showDivId : '', 展示附件的div
     resourceType : "", 资源类型
     resourceId : 资源id
   }
 */
function oaAttachment(params) {
    //获取当前tab的id(也是当前iframe的id)
    var tabElement = top.$("#content_right");
    var navtab = tabElement.ligerGetTabManager();
    var currentNavTabId = navtab.getSelectedTabItemID();

    var listFilesUrl = easyloader.URI + "/forum/attachments.do?resourceId=" + params.resourceId
        + "&resourceType=" + params.resourceType + "&templateName=fileName.html&__V=" + new Date().getTime();
    var serverTimeUrl = easyloader.URI + "/file/getServerTime.do";
    var uploadFileUrl = easyloader.URI + "/forum/uploadFile.do";
    using(['selectfiles', 'tmpl'], function () {
        jQuery.ajax({
            dataType: "json",
            url: listFilesUrl,
            success: function (data) {
                $("#" + params.showDivId).after(data.templateContent);
                $("#" + params.showDivId).loveySelectFile({
                    useTemplates: true,
                    iframeId: currentNavTabId,
                    title: "请选择上传文件",
                    fileTypes: "*.*",
                    fileTypeDescription: "所有文件",
                    checkbox: true,
                    serverTimeUrl: serverTimeUrl,
                    getTempFilesUrl: listFilesUrl,
                    initJson: data.files,
                    dealFiles: dealFiles,
                    items: [
                        {
                            title: "上传",
                            ctxUrl: uploadFileUrl,
                            flashUpload: true
                        }
                    ], params: {
                        resourceId: params.resourceId,
                        resourceType: params.resourceType,
                        iPlanetDirectoryPro: data.iPlanetDirectoryPro
                    },
                    initFunction: function () {
                        $("#attachmentPanel_" + params.showDivId).setTemplate($("#fileList").text()).processTemplate(data.files);
                    }
                });

            }
        });

    });
}

// 空方法
function dealFiles(files) { }

/**
 * @param params
    {
     showDivId : '', 展示附件的div
     resourceType : "", 资源类型
     resourceId : 资源id
   }
 */
function oaAttachmentShow(params) {
    var listFilesUrl = easyloader.URI + "/forum/attachments.do?resourceId=" + params.resourceId
        + "&resourceType=" + params.resourceType + "&templateName=fileNameShow.html&__V=" + new Date().getTime();
    using(['selectfiles', 'tmpl'], function () {
        jQuery.ajax({
            dataType: "json",
            url: listFilesUrl,
            success: function (data) {
                $("#" + params.showDivId).after(data.templateContent);
                $("#" + params.showDivId).loveySelectFile({
                    useTemplates: true,
                    initJson: data.files,
                    readOnly: true,
                    initFunction: function () {
                        $("#attachmentPanel_" + params.showDivId).setTemplate($("#fileList").text()).processTemplate(data.files);
                    }
                });

            }
        });
    });
}

/*
公共返回至返回页面方法
参数：
requestURL：请求Controller层返回至列表页面方法的url
**/
function oaBack(requestURL) {
    window.location.href = requestURL;
}

/**
 * 设置查询区域
 */
function setQueryArea() {
    var hiddenElement = $(".j_hidden_area");
    var showElement = $(".j_show");
    if (isShowQueryArea) {//全局开关 在commJs.jsp中
        hiddenElement.css("display", "block");
        showElement.addClass("shrink").removeClass("expand");
    } else {
        hiddenElement.css("display", "none");
        showElement.addClass("expand").removeClass("shrink");
    }

    showElement.click(function () {
        if (showElement.hasClass("shrink")) {
            hiddenElement.delay(10).hide("fast");
            showElement.addClass("expand").removeClass("shrink");
        } else {
            hiddenElement.delay(10).show("fast");
            showElement.addClass("shrink").removeClass("expand");
        }
    });
}

//固定办理的浮动按钮的js
function formActionFixedBottom() {
    var tableEle = $(".ui_table");
    var actEle = $(".ui_form_actions");
    if (typeof (actEle) != "undefined" && actEle.length > 0) {
        var _height = actEle.outerHeight();
        var _offsetTop = actEle.offset().top;
        var bodyHeight = $("html").height();
        if (bodyHeight - _offsetTop < _height) {
            actEle.addClass("fixed_bottom a_shadow");
            if (typeof (tableEle) != "undefined" && tableEle.length > 0) {
                tableEle.css("margin-bottom", "50px");
            }
        }
        else if (bodyHeight - _offsetTop < _height) {
        } else {
            actEle.removeClass("fixed_bottom a_shadow");
        }
    }
}

/**
 * 选人组件
 * @param params
 */
function oaSelectUser(params) {
    var selectParams = {
        rightItemName: 'firstName',
        rightItemValue: 'id',
        inputName: params.selectId,
        inputWidth: params.inputWidth,
        moveSelect: true,
        initJson: params.initJson,
        items: [
            {
                title: '用户',
                leftUrl: easyloader.URI + '/selectOrgUser/getOrgTree.do?groupFlag=0',
                rightUrl: easyloader.URI + '/selectOrgUser/getUsers.do?participateInOffice=1',
                roleUrl: easyloader.URI + '/selectOrgUser/getJobTypes.do'
            },
            {
                title: '常用群组',
                leftUrl: easyloader.URI + '/selectOrgUser/getOrgTree.do?groupFlag=1',
                rightUrl: easyloader.URI + '/selectOrgUser/getUsers.do?participateInOffice=1'
            }/*,
            {title: '个人群组',
                leftUrl: easyloader.URI + '/selectOrgUser/getOrgTree.do?groupFlag=2',
                rightUrl: easyloader.URI + '/selectOrgUser/getUsers.do?participateInOffice=1'
            }*/
        ]
    };
    if (!params.isChooseMore) {
        selectParams.maxItemCount = 1;
    }
    if (params.defaultJobType) {
        selectParams.items[0].roleId = params.defaultJobType;
    }
    if (params.submitFunction) {
        selectParams.submitFunction = params.submitFunction;
    }
    using(['select'], function () {
        $('#' + params.textareaName).ligerDialogSelect(selectParams);
    });
}

/**
 * 指令式修改动作，不提交表单数据，没有form校验<p>
 * 
 * <b>备注</b>
 *    设计初衷是根据数据主键，修改其状态<p>
 *    抽象自站内信置已读/未读、删除
 * 
 * @param param 
 */
function simpleModify(param) {

    var requestURL = param.requestURL;
    // 弹窗后，点击确定，请求Controller刷新页面的url
    var responseURL = param.responseURL;
    var data = param.data ? param.data : '';
    // 修改成功提示消息
    var successMsg = param.successMsg ? param.successMsg : '修改成功';
    // 修改失败提示消息
    var failureMsg = param.failureMsg ? param.failureMsg : '修改失败';
    // 弹窗后，点击确定，请求Controller刷新页面的url
    var submitSuccessFunc = param.submitSuccessFunc;

    jQuery.ajax({
        type: "POST",
        url: requestURL,
        data: data,
        dataType: "json",
        success: function (data) {
            if (data && data.status == 1) {
                // 如果回调函数有效，则执行回调函数
                if (typeof (submitSuccessFunc) == 'function') {
                    submitSuccessFunc();
                } else {
                    jQuery.ligerDialog.success(successMsg, "提示", function () {
                        if (responseURL) {
                            window.location.href = responseURL
                        } else {
                            window.location.reload(true);
                        }
                    });
                }
            } else if (data) {
                jQuery.ligerDialog.warn(data.msg ? data.msg : failureMsg);
            } else {
                jQuery.ligerDialog.warn(failureMsg);
            }
        },
        error: function (data) {
            if (data) {
                jQuery.ligerDialog.warn(data.msg ? data.msg : '系统内部错误');
            } else {
                jQuery.ligerDialog.warn('系统内部错误');
            }
        }
    });
}

//点击“发起”按钮，触发的js事件.
function submit3(fcid, formDefId, conPath) {

    var isEdit = $("#editFile").attr("style");
    // 没有正文不允许发起
    if (isEdit != null && isEdit.substring(isEdit.length - 4, isEdit.length) == "none") {
        jQuery.ligerDialog.warn('请先起草正文！');
        return;
    }

    var designform = document.getElementById("designform");
    designform.action = conPath + "/form.create.do?.fcid=" + fcid + "&process=true&moduleId=${param.moduleId}";

    var formObj = $(document).find('#designform');
    var validate = jQuery.validationEngine.doValidate(formObj);
    if (validate) {
        jQuery.ligerDialog.open({
            showButton: false,
            url: conPath + "/workFlow/getWorkFlowNextNodeInfo.do?formDefId=" + formDefId + "&currentNodeName=start_&confirmAction=null&isWindow=true",
            width: 700,
            height: 370,
            title: '选择下一步',
            dialogWaiting: true
        });
    }
}
/**
 * 加载等待
 */
function openLoading() {
    top.$.ligerDialog.open({
        content: easyloader.sysloading,
        allowClose: false,
        showButton: false,
        isDrag: false,
        showTitle: false
    });
}

/**
 * 关闭等待
 */
function closeLoading() {
    top.$.ligerDialog.close();
}

function redirectPage(url) {
    //获取当前tab的id(也是当前iframe的id)
    var tabElement = top.$("#content_right");
    if (tabElement != null) {
        var navtab = tabElement.ligerGetTabManager();
        if (navtab != null) {
            var currentNavTabId = navtab.getSelectedTabItemID();
            var liElement = top.$("li[tabid=" + tabid + "]", top.$(".l-tab-links"));
            liElement.attr("url", url);
            navtab.location(currentNavTabId, url);
        }
    }
}

/**
 * List页面没有功能按钮则隐藏checkbox列
 * @param hasFunc 是否有功能按钮 headID 表头checkbox ID className列表页面选择框className
 */
function setChkBoxC(hasNoFunc, headID, className) {
    if (hasNoFunc) {
        if (headID == null)
            headID = 'chooseAll';
        if (className == null)
            className = 'choose';
        $("#" + headID).parent().hide();
        $("input." + className).parent().hide();
    }
}

function newfilePublish(formId, dataId) {
    var conPath = easyloader.URI;
    var content = formId + '_' + dataId;
    $.ajax({
        type: 'post',
        url: conPath + "/fileRelease/hasFileReleasePub.do?content=" + content + "&moduleId=${param.moduleId}",
        dataType: "json",
        success: function (o) {

            if (o.status == 1) {
                jQuery.ligerDialog.alert('文件已发布,可删除已发布记录后重新发布！');
            } else if (o.status == 0) {
                var url;
                //文件发布前选择页面
                var title = document.getElementById("wjbt_").value;
                url = conPath + "/fileRelease.preFileReleasePubJsp.do?formId=" + formId + "&dataId=" + dataId + "&moduleId=${param.moduleId}&obj=${obj.fj_}&ffid=${ffid}&dis=${dis.fj_}&rea=${rea.fj_}" + "&title=" + title;
                url = encodeURI(url);
                dialog = jQuery.ligerDialog.open({
                    showButton: false,
                    url: url,
                    width: 920,
                    height: 450,
                    title: '文件发布',
                    dialogWaiting: true,
                    scroll: true
                });

            } else {
                alert(GE.cst.MSG.ASYNC_FAILURE);
            }
        }
    });
}
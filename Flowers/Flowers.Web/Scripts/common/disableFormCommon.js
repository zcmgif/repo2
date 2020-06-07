
//禁用form表单中所有的input[文本框、复选框、单选框],select[下拉选],多行文本框[textarea]

function disableForm(formId, isDisabled) {

    $("a").each(function () {
        $(this).text() == "选择" && $(this).remove();
    });

    var attr = "disable";
    if (!isDisabled) {
        attr = "enable";
    }
    $("form[id='" + formId + "'] :text").attr("disabled", isDisabled);
    $("form[id='" + formId + "'] textarea").attr("disabled", isDisabled);
    $("form[id='" + formId + "'] select").attr("disabled", isDisabled);
    $("form[id='" + formId + "'] :radio").attr("disabled", isDisabled);
    $("form[id='" + formId + "'] :checkbox").attr("disabled", isDisabled);
    $("form[id='" + formId + "'] :button").attr("disabled", isDisabled);

    $("form[id='" + formId + "'] :text").css("background-color", "#cccccc");
    $("form[id='" + formId + "'] :button").css("background-color", "#cccccc");

    //禁用jquery easyui中的下拉选（使用input生成的combox）

    $("#" + formId + " input[class='combobox-f combo-f']").each(function () {
        if (this.id) {
            alert("input" + this.id);
            $("#" + this.id).combobox(attr);
        }
    });

    //禁用jquery easyui中的下拉选（使用select生成的combox）
    $("#" + formId + " select[class='combobox-f combo-f']").each(function () {
        if (this.id) {
            alert(this.id);
            $("#" + this.id).combobox(attr);
        }
    });

    //禁用jquery easyui中的日期组件dataBox
    $("#" + formId + " input[class='datebox-f combo-f']").each(function () {
        if (this.id) {
            alert(this.id)
            $("#" + this.id).datebox(attr);
        }
    });
}


function ChangeColor(obj) {
    $("form[id='AddOrUpdateForm'] :text").css("background-color", "");
    $(obj).css("background-color", "#EEFFBB");





}


function tongji(obj) {
    var target = $(obj).parents("tr");

    if ($(obj).attr("name") == "BoxNum") {
        target.find("input[name=BoxNum]").val($(obj).val());
        target.find("input[name=Num]").val($(obj).val());
        var Price = target.find("input[name=Price]").val();
        if (Price != "" && $(obj).val() != "") {
            target.find("input[name=SumPrice]").val(parseFloat($(obj).val()) * parseFloat(Price));
        }
    }
    if ($(obj).attr("name") == "Num") {
        target.find("input[name=BoxNum]").val($(obj).val());
        target.find("input[name=Num]").val($(obj).val());
        var Prices = target.find("input[name=Price]").val();
        if (Prices != "" && $(obj).val() != "") {
            target.find("input[name=SumPrice]").val(parseFloat($(obj).val()) * parseFloat(Prices));
        }
    }



    if ($(obj).attr("name") == "Price") {

        target.find("input[name=Price]").val($(obj).val());
        var Num = target.find("input[name=Num]").val();
        if (Num != "" && $(obj).val() != "") {
            target.find("input[name=SumPrice]").val(parseFloat($(obj).val()) * Num);
        }

    }

    if ($(obj).attr("name") == "HHNo") {

                var Price = target.find("input[name=Price]").val();
                var Nums = target.find("input[name=Num]").val();
                if (Price != "" && Nums != "") {
                    target.find("input[name=SumPrice]").val(parseFloat(Nums) * parseFloat(Price));
                }

            }

         
    if ($(obj).attr("name") == "SumPrice") {
        target.find("input[name=SumPrice]").val($(obj).val());
        var Num = target.find("input[name=Num]").val();
        if (Num > 0 && $(obj).val() != "") {
            target.find("input[name=Price]").val(parseFloat($(obj).val()) / Num);
        }
    }
    Sum();
}

function _tableProductDelete(obj) {
    var target = $(obj).parents("tr");
    var id = target.find("input[name=id]").val();
    if (id > 0) {
        target.hide();
        target.find("input[name=DeleteFlag]").val(true);
        target.remove();
    }
    else {
        target.remove();
    }
    GetKeyCode();
    AutoSort();
    Sum()
}

function _tableProductAdd(obj) {
    var tr = $("#tableProduct tfoot tr").clone();
    tr.show();
    tr.appendTo($("#tableProduct tbody"));
    AutoSort();
    Sum();
}
function Sum() {
   
    var SumPrice = 0.00;
    var SumBoxNum = 0.00;
    var SumNum = 0.00;
    var SumSendNum = 0.00;
    var TotalSumPrice = 0.00;

    $("#tableProduct").find("tbody tr").each(function () {

        $(this).find("input[name]").each(function () {

            if ($(this).attr("name") == "Price") {
                if ($(this).val() != "") {
                    SumPrice += parseFloat($(this).val());
                }

            }
            if ($(this).attr("name") == "BoxNum") {
                if ($(this).val() != "") {

                    SumBoxNum += parseFloat($(this).val());
                }
            }

            if ($(this).attr("name") == "Num") {
                if ($(this).val() != "") {
                    SumNum += parseFloat($(this).val());
                }
            }

      
            
            if ($(this).attr("name") == "SumPrice") {
                if ($(this).val() != "") {
                    TotalSumPrice += parseFloat($(this).val());
                }
            }
        });
    });

  
    $("#Sum_BoxNum").html(fmoney(SumBoxNum / 2.0, 2));
    $("#Sum_Num").html(fmoney(SumNum / 2.0, 2));

    if ($("#id").val() == "0") {
        $("#Total_SumPrice").html(fmoney(TotalSumPrice / 2, 2));
    }
    else {
        $("#Total_SumPrice").html(fmoney(TotalSumPrice, 2));
    }
}


//格式化金额
function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; //更改这里n数也可确定要保留的小数位
    var l = s.split(".")[0].split("").reverse(),
		   r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r.substring(0, 2); //保留2位小数  如果要改动 把substring 最后一位数改动就可
}

function selectCommon(url, title) {
    $.ligerDialog.open({
        className: 'dialog_style02',
        height: 490,
        width: 400,
        title: title,
        url: '' + url,
        dialogWaiting: true,
        buttons: [{ text: '关闭', onclick: close}]
    });
}
function close(button, dg) {
    $.ligerDialog.close();
}

function save() {
    var haveProduct = false;
    var num = 0;
    var ProductList = new Array();
    $("#tableProduct").find("tbody tr").each(function () {
        var ProductInfo = {};

        $(this).find("input[name]").each(function () {

            if ($(this).attr("name") == "Price") {
      
                if (isNaN($(this).val())) {
                    $(this).css("background", "#9DB7D0");
                    $(this).focus();
                    num = 1;
                    alert("价格必须数字！");
                    return false;
                }
            }
            if ($(this).attr("name") == "BoxNum") {
                if (isNaN($(this).val())) {
                    $(this).css("background", "#9DB7D0");
                    $(this).focus();
                    num = 1;
                    alert("箱数必须数字！");
                    return false;
                }
            }

            if ($(this).attr("name") == "Num") {
                if (isNaN($(this).val())) {
                    $(this).css("background", "#9DB7D0");
                    $(this).focus();
                    num = 1;
                    alert("数量必须数字！");
                    return false;
                }
            }

            if ($(this).attr("name") == "SumPrice") {
                if (isNaN($(this).val())) {
                    $(this).css("background", "#9DB7D0");
                    $(this).focus();
                    num = 1;
                    alert("小计金额必须数字！");
                    return false;
                }
            }


            if ($(this).attr("name") == "DeleteFlag") {
                if ($(this).val() == "false" || $(this).val() == "False") {
                    haveProduct = true;
                }
            }

            ProductInfo[$(this).attr("name")] = $(this).val();
        })
        ProductList.push(ProductInfo);
    })

    if (!haveProduct) {
        $.ligerDialog.warn("请选择产品！");
        return false;
    }
    $("#JsonString").val(JSON.stringify(ProductList))

    if (num == 0) {
        return true;
    }
    else {
        return false;
    }
}			
   //验证是否同意条约
    if ($("#cb_clause").prop("checked") == true) {
       $("#btnsubmit").attr("disabled", false);
    }
    else {
       $("#btnsubmit").attr("disabled", true);
        }
    $("#cb_clause").click(function () {
        if ($("#cb_clause").prop("checked") == true) {
            $("#btnsubmit").attr("disabled", false);
        }
        else {
            $("#btnsubmit").attr("disabled", true);
        }
    });
//$("#btnsubmit").click(function () {
//      var str;
//       $.get("CodeHandle.ashx", function (data) {
//           alert(data);
//           str = $.parseJSON(data);

//    });
//    alert(str);
    
//});
    function getCode() {
        var code = document.getElementById("ImgCode");
        code.src = "../../Controllers/CodeHandle.ashx?i=" + Math.random();
}

//三级联动
function CreatP(Dprivence, text, value) {
    Dprivence.options.add(new Option(text, value));

}
function getP() {
    $("#DCity").empty();
    var pid = $("#Dprovince").val();
    $.get("register.ashx", { ProvinceID: pid }, function (data) {
        var obj = eval("(" + data + ")");
        var Dcity = $("#DCity")[0];
        for (var i = 0; i < obj.CityList.length; i++) {
            CreatP(Dcity, obj.CityList[i].CityName, obj.CityList[i].CityID);
        }
    });
    var dp = document.getElementById("<%=Dprovince.ClientID%>");
    var dpvalue = dp.options[dp.selectedIndex].text;
    document.getElementById("HiddenField1").value = dpvalue;
    //alert(document.getElementById("HiddenField1").value);
    $("#DDistry").options.add(new Option("请选择", "0"));
}

function getDis() {
    $("#DDistry").empty();
    var cid = $("#DCity").val();
    $.get("register.ashx", { CityID: cid }, function (data) {
        var obj = eval("(" + data + ")");
        var Dcity = $("#DDistry")[0];
        for (var i = 0; i < obj.DistrictList.length; i++) {
            CreatP(Dcity, obj.DistrictList[i].DistrictName, obj.DistrictList[i].DistrictID);
        }
    });
    var dp = document.getElementById("<%=DCity.ClientID%>");
    var dpvalue = dp.options[dp.selectedIndex].text;
    document.getElementById("HiddenField2").value = dpvalue;
    //alert(document.getElementById("HiddenField2").value);
}
function getAdress() {
    var dp = document.getElementById("<%=DDistry.ClientID%>");
    var dpvalue = dp.options[dp.selectedIndex].text;
    document.getElementById("HiddenField3").value = dpvalue;
    //alert(document.getElementById("HiddenField3").value);
}
//验证姓名
function getName() {
    var name = $("#txtName").val();
    var url = "register1.ashx?Name=" + encodeURIComponent(name) + "";
    if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHttp");
    }
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    if (req) {
        req.open("get", url, true);
        req.onreadystatechange = callback;
        req.send(null);
    }
}


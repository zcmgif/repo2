(function ($) {
    $(document).ready(function () {
        if ($("#username").val() != "") {
            $("#password").focus();
        } else {
            $("#username").focus();
        }
        $("#username").bind("blur", function () {
            getCaptcha();
        });
        $("#password").bind("blur", function () {
            getCaptcha();
        });
        var casLoginForm = $("#casLoginForm");
        casLoginForm.submit(doLogin);
        function getCaptcha() {
            if ($.trim($("#username").val()) != "" && $("#captchaResponse").length == 0) {
                $.ajax("needCaptcha.html", {
                    data: { username: $("#username").val() },
                    cache: false,
                    dataType: "text",
                    success: function (data) {
                        if (data.indexOf("true") > -1) {
                            var casCaptcha = $("#casCaptcha");
                            casCaptcha.empty();
                            casCaptcha.append($("<div>").attr("class", "captcha-img").append($("<img>").attr("id", "captchaImg").attr("src", "captcha.html")));
                            var strong = $("<strong>").attr("class", "captcha-label");
                            strong.append("输入上图中显示的数字。").append("<a id=\"changeCaptcha\">看不清，换一张</a>");
                            casCaptcha.append($("<label>").append(strong))
                                .append($("<input>").attr("type", "text").attr("id", "captchaResponse").attr("name", "captchaResponse"));
                            casCaptcha.append("<span id=\"captchaError\" class=\"errormsg\"></span>");
                            $("#changeCaptcha").bind("click", function () {
                                $("#captchaImg").attr("src", "captcha.html?ts=" + new Date().getMilliseconds());
                            });
                            casCaptcha.fadeIn("slow");
                        }
                    }
                });
            }
        }
        function doLogin() {
            var username = $("#username");
            if (username.val() == "") {
                username.addClass("form-error");
                $("#usernameError").addClass("errormsg").text("请输入您的用户名");
                username.focus();
                return false;
            }
            var password = $("#password");
            if (password.val() == "") {
                password.addClass("form-error");
                $("#passwordError").addClass("errormsg").text("请输入您的密码");
                password.focus();
                return false;
            }
            var captchaResponse = $("#captchaResponse");
            if (captchaResponse.length > 0 && captchaResponse.val() == "") {
                captchaResponse.addClass("form-error");
                $("#captchaError").text("请输入验证码");
                captchaResponse.focus();
                return false;
            }
        }
        $("#changeCaptcha").bind("click", function () {
            $("#captchaImg").attr("src", "captcha.html?ts=" + new Date().getMilliseconds());
        });
    });

})(jQuery);
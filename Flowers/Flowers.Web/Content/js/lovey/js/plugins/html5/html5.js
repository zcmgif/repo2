/**
 * placeholder浏览器兼容解决方案
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
(function ($) {
    //命名空间定义
    $.loveyDefaults = $.loveyDefaults || {};

    //组件参数集合定义
    $.loveyDefaults.placeholder = {
        chooseIdName: "chooseAll", //触发的id
        selectClassName: "choose", //实现选择的checkbox的样式名
        selectContainer: "list", //指定搜索的容器访问
        selectSplit: ","//选择的checkbox的分隔符
    };

    //函数命名空间
    $.loveyHtml5 = $.loveyHtml5 || {};

    /**
     * 实现placeholder
     */
    $.loveyHtml5.placeholder = function () {
        //参数装配,重新定义防止客户端未定义的情况下出错
        //var op = $.extend({}, $.loveyDefaults.placeholder, options || {});
        var placeHolderEl = $('[placeholder]');

        if (!('placeholder' in document.createElement('input'))) {
            placeHolderEl.focus(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.val(input.attr('placeholder'));
                }
            }).blur();

            // 表单提交的时候如果是placeholder的值，那么就清空
            placeHolderEl.closest("form").submit(function () {
                $('[placeholder]').each(function () {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

            });
        }
    };

    /**
     * 实现全选和取消全选
     */
    $.loveyHtml5.selected = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyDefaults.placeholder, options || {});
        var chooseElement = $("#" + op.chooseIdName);

        chooseElement.bind("click.chooseAll", function () {
            var selectContainer = $("#" + op.selectContainer);
            var arrSelected = null;
            var hasSelected = false;
            /**
             * 如果指定容器可以获得更高的效率
             */
            if (selectContainer.length == 0) {
                arrSelected = $("." + op.selectClassName);
            } else {
                arrSelected = $("." + op.selectClassName, selectContainer);
            }

            if (chooseElement.hasClass("selected")) {
                chooseElement.removeClass("selected");
            } else {
                hasSelected = true;
                chooseElement.addClass("selected");
            }

            if (arrSelected) {
                for (var i = 0; i < arrSelected.length; i++) {
                    arrSelected[i].checked = hasSelected;
                }
            }
        });
    };

    $.loveyHtml5.selectedToString = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyDefaults.placeholder, options || {});

        var selectContainer = $("#" + op.selectContainer);
        var arrSelected = null;
        var selectedString = "";
        /**
         * 如果指定容器可以获得更高的效率
         */
        if (selectContainer.length == 0) {
            arrSelected = $("." + op.selectClassName);
        } else {
            arrSelected = $("." + op.selectClassName, selectContainer);
        }

        if (arrSelected) {
            for (var i = 0; i < arrSelected.length; i++) {
                if (!arrSelected[i].checked) continue;

                selectedString += arrSelected[i].value + op.selectSplit;
            }
        }

        return (selectedString == "") ? selectedString : selectedString.substr(0, selectedString.length - 1);
    }
})
    (jQuery);


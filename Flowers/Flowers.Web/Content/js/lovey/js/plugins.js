[
    {
        "moduleName": "icolorpicker",
        "modeulCnName": "色板",
        "moduleJs": "icolorpicker.js",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "common",
        "modeulCnName": "系统公用",
        "moduleJs": "common.js",
        "api": false
    },
    {
        "moduleName": "commonjs",
        "modeulCnName": "框架公用",
        "moduleDependencies": ["plugins/dialog/drag.js", "plugins/dialog/dialog.js"],
        "api": false
    },
    {
        "moduleName": "uiwidget",
        "modeulCnName": "widget公用",
        "moduleDependencies": "plugins/jquery.ui.widget.js",
        "api": false
    },
    {
        "moduleName": "jqueryui",
        "modeulCnName": "JqueryUI框架公用",
        "moduleDependencies": ["plugins/jquery.ui.core.js", "uiwidget"],
        "api": false
    },
    {
        "moduleName": "lightbox",
        "modeulCnName": "图片展示",
        "moduleJs": "lightbox.js",
        "moduleCss": "lightbox.css",
        "api": true
    },
    {
        "moduleName": "validationengine",
        "modeulCnName": "表单验证",
        "moduleCss": "validationengine.css",
        "moduleJs": "validationengine.js",
        "moduleDependencies": "imagepreview",
        "api": true
    },
    {
        "moduleName": "dialog",
        "moduleJs": "dialog.js",
        "moduleCss": "dialog.css",
        "modeulCnName": "对话框",
        "moduleDependencies": ["plugins/dialog/drag.js", "form"],
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "tab",
        "moduleJs": "tab.js",
        "moduleCss": "tab.css",
        "modeulCnName": "tab窗口",
        "moduleDependencies": ["menu"],
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "prototip",
        "moduleJs": "prototip.js",
        "moduleCss": "prototip.css",
        "modeulCnName": "tips提示",
        "api": false,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "qtip",
        "moduleJs": "jquery.qtip.min.js",
        "moduleCss": "jquery.qtip.min.css",
        "modeulCnName": "qtip提示",
        "api": false
    },
    {
        "moduleName": "grid",
        "moduleJs": "grid.js",
        "moduleCss": "grid.css",
        "modeulCnName": "表格",
        "moduleDependencies": ["plugins/grid/json2.js", "textbox", "spinner"],
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "textbox",
        "moduleJs": "textbox.js",
        "modeulCnName": "文本框",
        "api": false,
        "canShow": false,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "spinner",
        "moduleJs": "spinner.js",
        "moduleCss": "spinner.css",
        "modeulCnName": "位数调整",
        "api": true
    },
    {
        "moduleName": "checkbox",
        "moduleJs": "checkbox.js",
        "modeulCnName": "复选框",
        "api": false
    },
    {
        "moduleName": "noselect",
        "moduleJs": "noselect.js",
        "modeulCnName": "noselect",
        "api": false
    },
    {
        "moduleName": "tree",
        "moduleJs": "tree.js",
        "moduleCss": "tree.css",
        "modeulCnName": "树",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "menu",
        "moduleJs": "menu.js",
        "moduleCss": "menu.css",
        "modeulCnName": "菜单",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "menubar",
        "moduleJs": "menubar.js",
        "moduleCss": "menubar.css",
        "modeulCnName": "菜单栏",
        "api": true
    },
    {
        "moduleName": "toolbar",
        "moduleJs": "toolbar.js",
        "moduleCss": "toolbar.css",
        "modeulCnName": "工具栏",
        "api": true
    },
    {
        "moduleName": "accordion",
        "moduleJs": "accordion.js",
        "moduleCss": "accordion.css",
        "modeulCnName": "抽屉菜单",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "switch",
        "moduleJs": "switch.js",
        "moduleCss": "switch.css",
        "modeulCnName": "开关插件",
        "api": true
    },
    {
        "moduleName": "combobox",
        "moduleJs": "ligercombobox.js",
        "modeulCnName": "下拉框",
        "moduleCss": "combobox.css",
        "moduleDependencies": ["tree", "plugins/tree/ligerResizable.js"],
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "attachment",
        "moduleJs": "attachment.js",
        "modeulCnName": "文件上传",
        "moduleCss": "attachment.css",
        "moduleDependencies": "plugins/grid/json2.js",
        "api": true
    },
    {
        "moduleName": "select",
        "moduleJs": "select.js",
        "modeulCnName": "选择组件",
        "moduleCss": "select.css",
        "moduleDependencies": ["plugins/grid/json2.js", "dialog", "tab", "tree", "autocomplete"],
        "api": true,
        "canShow": true,
        "open": false,
        "isSelf": true
    },
    {
        "moduleName": "selectfiles",
        "moduleJs": "selectfiles.js",
        "modeulCnName": "文件选择组件",
        "moduleCss": "files.css",
        "moduleDependencies": ["plugins/grid/json2.js", "dialog", "moment"],
        "api": true,
        "canShow": true,
        "open": false,
        "isSelf": true
    },
    {
        "moduleName": "form",
        "modeulCnName": "表单异步提交",
        "moduleJs": "jquery.form.js",
        "moduleDependencies": "validationengine",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "dateeditor",
        "modeulCnName": "时间选择组件",
        "moduleJs": "dateeditor.js",
        "moduleCss": "ligerui-form.css",
        "moduleDependencies": "dialog",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "datepicker",
        "modeulCnName": "时间选择组件",
        "moduleJs": "jquery.ui.datepicker.js",
        "moduleCss": "jquery.ui.all.css",
        "moduleDependencies": "jqueryui",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "flashimgplay",
        "modeulCnName": "flash图片播放插件",
        "moduleJs": "flashimgplay.js",
        "moduleCss": "flashimgplay.css",
        "api": true
    },
    {
        "moduleName": "marquee",
        "modeulCnName": "图片滚动插件",
        "moduleJs": "marquee-1.1.js",
        "api": true
    },
    {
        "moduleName": "fancybox",
        "modeulCnName": "fancybox图片播放插件",
        "moduleCss": "jquery.fancybox-1.3.4.css",
        "moduleJs": "jquery.fancybox-1.3.4.min.js",
        "api": true
    },
    {
        "moduleName": "imagepreview",
        "modeulCnName": "图片预览",
        "moduleJs": "jquery.imagepreview.1.0.js",
        "api": true
    },
    {
        "moduleName": "fullcalendar",
        "modeulCnName": "日历",
        "moduleJs": "fullcalendar.min.js",
        "moduleCss": "calendar_all.css",
        "api": true
    },
    {
        "moduleName": "pjax",
        "modeulCnName": "pushState",
        "moduleJs": "jquery.pjax.js",
        "api": false
    },
    {
        "moduleName": "metadata",
        "modeulCnName": "metadata",
        "moduleJs": "jquery.metadata.js",
        "api": false
    },
    {
        "moduleName": "tmpl",
        "modeulCnName": " jTemplates",
        "moduleJs": "jquery-jtemplates_uncompressed.js",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "autocomplete",
        "moduleJs": "autocomplete.js",
        "moduleCss": "autocomplete.css",
        "modeulCnName": "自动补全",
        "moduleDependencies": [
            "jqueryui",
            "plugins/autocomplete/dependencies/position.js"
        ],
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "cluetip",
        "moduleJs": "jquery.cluetip.all.js",
        "moduleCss": "jquery.cluetip.css",
        "modeulCnName": "Tip提示",
        "api": true
    },
    {
        "moduleName": "drag",
        "moduleJs": "drag.js",
        "modeulCnName": "拖拽排序功能",
        "moduleDependencies": [
            "jqueryui",
            "plugins/drag/dependencies/jquery.ui.mouse.js",
            "plugins/drag/dependencies/jquery.ui.draggable.js",
            "plugins/drag/dependencies/jquery.ui.sortable.js"
        ],
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "drag2",
        "moduleJs": "jquery.draggable.js",
        "modeulCnName": "拖拽功能",
        "moduleDependencies": "plugins/drag2/jquery.droppable.js",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "codemirror",
        "moduleJs": "codemirror.js",
        "modeulCnName": "编辑文本高亮功能",
        "moduleCss": "codemirror.css",
        "api": false
    },
    {
        "moduleName": "drag3",
        "modeulCnName": "OA拖拽功能",
        "moduleDependencies": [
            "plugins/drag3/dependencies/ui.draggable.min.js",
            "plugins/drag3/dependencies/ui.droppable.min.js",
            "plugins/drag3/dependencies/ui.sortable.js"
        ],
        "api": true
    },
    {
        "moduleName": "layout",
        "moduleCss": "ligerui-layout.css",
        "moduleJs": "ligerLayout.js",
        "modeulCnName": "liger布局",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "window",
        "moduleJs": "ligerWindow.js",
        "modeulCnName": "liger窗体",
        "api": false
    },
    {
        "moduleName": "resizable",
        "moduleJs": "ligerResizable.js",
        "modeulCnName": "liger大小调整",
        "api": false
    },
    {
        "moduleName": "slides",
        "moduleCss": "slides.css",
        "moduleJs": "slides.jquery.js",
        "modeulCnName": "响应滑块插件",
        "api": true
    },
    {
        "moduleName": "raty",
        "moduleJs": "jquery.raty.js",
        "modeulCnName": "评分插件",
        "api": true
    },
    {
        "moduleName": "jcrop",
        "modeulCnName": "图片裁剪",
        "moduleJs": "jquery.Jcrop.js",
        "moduleCss": "jquery.Jcrop.css",
        "moduleDependencies": ["form", "dialog", "validationengine"],
        "api": false
    },
    {
        "moduleName": "ccscrop",
        "modeulCnName": "CCS图片裁剪",
        "moduleJs": "base.crop.js",
        "moduleDependencies": "dialog",
        "api": true
    },
    {
        "moduleName": "tag",
        "modeulCnName": "TAG插件",
        "moduleJs": "tag-it.js",
        "moduleCss": "tag-it.css",
        "moduleDependencies": "plugins/tag/jquery-ui.min.js",
        "api": true
    },
    {
        "moduleName": "emoticon",
        "modeulCnName": "TextArea表情插件",
        "moduleJs": "jquery.emoticons.js",
        "moduleCss": "emoticon.css",
        "api": true
    },
    {
        "moduleName": "jplayer",
        "modeulCnName": "音频、视频播放",
        "moduleCss": "skin/blue.monday/jplayer.blue.monday.css",
        "moduleJs": "jquery.jplayer.min.js",
        "api": false
    },
    {
        "moduleName": "dropmenu",
        "modeulCnName": "多级滑动下拉菜单",
        "moduleJs": "dropmenu.js",
        "moduleCss": "dropmenu.css",
        "api": true
    },
    {
        "moduleName": "downmenu",
        "modeulCnName": "Lovey多级滑动下拉菜单",
        "moduleJs": "downmenu.js",
        "api": false
    },
    {
        "moduleName": "ckeditor",
        "modeulCnName": "多功能编辑器",
        "moduleJs": "ckeditor.js",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "focuspic",
        "modeulCnName": "焦点图",
        "moduleJs": "general.js",
        "moduleCss": "screen.css",
        "moduleDependencies": "plugins/focuspic/data.js",
        "api": true
    },
    {
        "moduleName": "comment",
        "modeulCnName": "评论",
        "moduleJs": "comment.js",
        "moduleCss": "comment.css",
        "moduleDependencies": ["cluetip", "dialog"],
        "api": false
    },
    {
        "moduleName": "confirm",
        "modeulCnName": "收藏",
        "moduleJs": "confirm.js",
        "moduleDependencies": "dialog",
        "api": true
    },
    {
        "moduleName": "checkinputnum",
        "modeulCnName": "字数统计",
        "moduleJs": "checkInputNum.js",
        "api": true
    },
    {
        "moduleName": "visitor",
        "modeulCnName": "访客",
        "moduleJs": "visitor.js",
        "api": false
    },
    {
        "moduleName": "imglazyload",
        "modeulCnName": "图片懒加载",
        "moduleJs": "jquery.lazyload.min.js",
        "moduleDependencies": "plugins/imglazyload/jquery.scrollstop.min.js",
        "api": false
    },
    {
        "moduleName": "scrollpagination",
        "modeulCnName": "无限滚动",
        "moduleJs": "scrollpagination.js",
        "api": false
    },
    {
        "moduleName": "masonry",
        "modeulCnName": "瀑布流",
        "moduleCss": "masonry.css",
        "moduleJs": "jquery.masonry.min.js",
        "api": false
    },
    {
        "moduleName": "iscroll",
        "moduleCss": "iscroll.css",
        "modeulCnName": "拖拽刷新",
        "moduleJs": "jquery.iscroll.js",
        "moduleDependencies": "plugins/iscroll/iscroll.js",
        "api": true
    },
    {
        "moduleName": "iframe",
        "moduleCss": "iframe.css",
        "modeulCnName": "Iframe集成",
        "moduleJs": "iframe.js",
        "api": true
    },
    {
        "moduleName": "moment",
        "modeulCnName": "时间处理库",
        "moduleJs": "moment.js",
        "api": true,
        "canShow": true,
        "open": true,
        "isSelf": false
    },
    {
        "moduleName": "string",
        "modeulCnName": "字符串处理函数",
        "moduleJs": "string.js",
        "api": true,
        "canShow": true,
        "open": false,
        "isSelf": true
    },
    {
        "moduleName": "html5",
        "modeulCnName": "html5兼容处理",
        "moduleJs": "html5.js",
        "api": true
    },
    {
        "moduleName": "progressbar",
        "modeulCnName": "进度条",
        "moduleJs": "jquery.progressbar.js",
        "api": true
    },
    {
        "moduleName": "scrollbar",
        "modeulCnName": "滚动条",
        "moduleJs": "jquery.nicescroll.min.js",
        "api": true
    },
    {
        "moduleName": "wizard",
        "modeulCnName": "步骤向导",
        "moduleJs": "wizard.js",
        "moduleCss": "wizard.css",
        "moduleDependencies": "form",
        "api": true
    },
    {
        "moduleName": "taskbar",
        "modeulCnName": "任务栏组件",
        "moduleJs": "taskbar.js",
        "api": true
    },
    {
        "moduleName": "hotkeys",
        "modeulCnName": "键盘事件",
        "moduleJs": "jquery.hotkeys.min.js",
        "api": true
    },
    {
        "moduleName": "heartbeat",
        "modeulCnName": "心跳",
        "moduleJs": "jquery.heartbeat.js",
        "api": true
    },
    {
        "moduleName": "ddmenu",
        "modeulCnName": "多级下拉菜单",
        "moduleJs": "ddmenu.js",
        "moduleCss": "ddmenu.css",
        "api": true
    },
    {
        "moduleName": "boxfix",
        "modeulCnName": "容器固定不滚动",
        "moduleJs": "boxfix.js",
        "api": true
    }
]
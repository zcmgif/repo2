/*!
 * jQuery UI Widget 1.8.21
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function ($, undefined) {

    // jQuery 1.4+
    if ($.cleanData) {
        var _cleanData = $.cleanData;
        //重写cleanData方法，调用后触发每个元素的remove事件
        $.cleanData = function (elems) {
            for (var i = 0, elem; (elem = elems[i]) != null; i++) {
                try {
                    $(elem).triggerHandler("remove");
                    // http://bugs.jquery.com/ticket/8235
                } catch (e) {
                }
            }
            _cleanData(elems);
        };
    } else {
        var _remove = $.fn.remove;
        $.fn.remove = function (selector, keepData) {
            return this.each(function () {
                if (!keepData) {
                    if (!selector || $.filter(selector, [this]).length) {
                        $("*", this).add([this]).each(function () {
                            try {
                                $(this).triggerHandler("remove");
                                // http://bugs.jquery.com/ticket/8235
                            } catch (e) {
                            }
                        });
                    }
                }
                //dom元素在被删除前，触发一下remove事件，jquery框架本身没有对元素删除绑定事件
                return _remove.call($(this), selector, keepData);
            });
        };
    }

    $.widget = function (name, base, prototype) {
        var namespace = name.split(".")[0],
            fullName;
        name = name.split(".")[1];
        fullName = namespace + "-" + name;

        //如果没有prototype,那么prototype就是base参数,实际base默认为$.Widget
        if (!prototype) {
            prototype = base;
            base = $.Widget;
        }

        // create selector for plugin
        $.expr[":"][fullName] = function (elem) {
            return !!$.data(elem, name);
        };

        $[namespace] = $[namespace] || {};//是否有命名空间
        $[namespace][name] = function (options, element) {
            // allow instantiation without initializing for simple inheritance
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };

        var basePrototype = new base();//初始化，一般都是调用了new $.Widget()
        // we need to make the options hash a property directly on the new instance
        // otherwise we'll modify the options hash on the prototype that we're
        // inheriting from
        //	$.each( basePrototype, function( key, val ) {
        //		if ( $.isPlainObject(val) ) {
        //			basePrototype[ key ] = $.extend( {}, val );
        //		}
        //	});
        basePrototype.options = $.extend(true, {}, basePrototype.options);//初始化options值，注意不需要深度拷贝
        //为新的ui模块创建原型，使用深度拷贝，在basePrototype上扩展一些模块基本信息，在扩展prototype,比如ui.tabs.js中就是tab的拥有各种方法的大对象
        $[namespace][name].prototype = $.extend(true, basePrototype, {
            namespace: namespace,
            widgetName: name,
            widgetEventPrefix: $[namespace][name].prototype.widgetEventPrefix || name,
            widgetBaseClass: fullName
        }, prototype);

        $.widget.bridge(name, $[namespace][name]);
    };

    //将此方法挂在jQuery对象上
    $.widget.bridge = function (name, object) {
        $.fn[name] = function (options) {
            var isMethodCall = typeof options === "string",
                args = Array.prototype.slice.call(arguments, 1),
                returnValue = this;
            //如果第一个参数是string类型,就认为是调用模块方法,剩下的参数作为方法的参数，后面会用到

            // allow multiple hashes to be passed on init
            options = !isMethodCall && args.length ?
                $.extend.apply(null, [true, options].concat(args)) :
                options;
            //可以简单认为是$.extend(true,options,args[0],...),args可以是一个参数或是数组
            //开头带下划线的方法都是私有方法，不让调用
            // prevent calls to internal methods
            if (isMethodCall && options.charAt(0) === "_") {
                return returnValue;
            }

            if (isMethodCall) {
                this.each(function () {//如果是调用函数
                    //得到实例，实例作为一个数据和元素关联上
                    var instance = $.data(this, name),
                        methodValue = instance && $.isFunction(instance[options]) ?
                            instance[options].apply(instance, args) :
                            instance;
                    //如果实例和方法均存在，调用方法，把args作为参数传进去 instance;//否则返回undefined
                    // TODO: add this back in 1.9 and use $.error() (see #5972)
                    //				if ( !instance ) {
                    //					throw "cannot call methods on " + name + " prior to initialization; " +
                    //						"attempted to call method '" + options + "'";
                    //				}
                    //				if ( !$.isFunction( instance[options] ) ) {
                    //					throw "no such method '" + options + "' for " + name + " widget instance";
                    //				}
                    //				var methodValue = instance[ options ].apply( instance, args );
                    //如果methodValue不是jquery对象也不是undefined
                    if (methodValue !== instance && methodValue !== undefined) {
                        //跳出each，一般获取options的值会走这个分支
                        returnValue = methodValue;
                        return false;
                    }
                });
            } else {//不是函数调用的话
                this.each(function () {
                    var instance = $.data(this, name);
                    if (instance) {//实例存在,再次调用此函数，根据options调整
                        instance.option(options || {})._init();
                    } else {
                        //没有实例的话，给元素绑定一个实例。注意这里的this是dom，object是模块类
                        $.data(this, name, new object(options, this));
                    }
                });
            }
            //返回，有可能是jquery对象，有可能是其他值
            return returnValue;
        };
    };

    $.Widget = function (options, element) {//所有模块的基类
        // allow instantiation without initializing for simple inheritance
        if (arguments.length) {
            //如果有参数，调用初始化函数
            this._createWidget(options, element);
        }
    };

    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        }, //上面的属性会在创建模块时被覆盖
        _createWidget: function (options, element) {
            // $.widget.bridge stores the plugin instance, but we do it anyway
            // so that it's stored even before the _create function runs
            $.data(element, this.widgetName, this);//缓存实例，保存jquery对象
            this.element = $(element);
            this.options = $.extend(true, {},
                this.options,
                this._getCreateOptions(),
                options);

            var self = this;
            this.element.bind("remove." + this.widgetName, function () {
                self.destroy();
            });//注册销毁事件

            this._create();//创建
            this._trigger("create");
            this._init();//初始化
        },
        _getCreateOptions: function () {
            return $.metadata && $.metadata.get(this.element[0])[this.widgetName];//参数处理
        },
        _create: function () {
        },
        _init: function () {
        },

        destroy: function () {
            //销毁模块：去除绑定事件、去除数据、去除样式、属性
            this.element
                .unbind("." + this.widgetName)
                .removeData(this.widgetName);
            this.widget()
                .unbind("." + this.widgetName)
                .removeAttr("aria-disabled")
                .removeClass(
                    this.widgetBaseClass + "-disabled " +
                        "ui-state-disabled");
        },

        widget: function () {
            //返回jquery对象
            return this.element;
        },

        option: function (key, value) {//设置选项函数
            var options = key;

            if (arguments.length === 0) {
                // don't return a reference to the internal hash
                return $.extend({}, this.options);//返回一个新的对象，不是内部数据的引用
            }

            if (typeof key === "string") {
                if (value === undefined) {
                    return this.options[key];//取值
                }
                options = {};
                options[key] = value;//设置值
            }

            this._setOptions(options);//调用内部的_setOption

            return this;
        },
        _setOptions: function (options) {
            var self = this;
            $.each(options, function (key, value) {
                self._setOption(key, value);
            });

            return this;
        },
        _setOption: function (key, value) {
            this.options[key] = value;

            if (key === "disabled") {//增加或是去除className
                this.widget()
                    [value ? "addClass" : "removeClass"](
                        this.widgetBaseClass + "-disabled" + " " +
                            "ui-state-disabled")
                    .attr("aria-disabled", value);
            }

            return this;
        },

        enable: function () {
            return this._setOption("disabled", false);
        },
        disable: function () {
            return this._setOption("disabled", true);
        },

        _trigger: function (type, event, data) {
            var prop, orig,
                callback = this.options[type];

            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ?
                type :
                this.widgetEventPrefix + type).toLowerCase();
            // the original event may come from any element
            // so we need to reset the target on the new event
            event.target = this.element[0];

            // copy original event properties over to the new event
            orig = event.originalEvent;
            if (orig) { //把原始的event属性重新赋到event变量上
                for (prop in orig) {
                    if (!(prop in event)) {
                        event[prop] = orig[prop];
                    }
                }
            }

            this.element.trigger(event, data);

            return !($.isFunction(callback) &&
                callback.call(this.element[0], event, data) === false ||
                event.isDefaultPrevented());
        }
    };

})(jQuery);

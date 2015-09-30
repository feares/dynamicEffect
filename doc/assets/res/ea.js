/**
 * EA is easy animation
 *
 * @module EA
 * @file EA is easy animation
 * @author donkunshan(dongkunshan@baidu.com)
 * @date 2015-02-14
 */

define(function (require) {

    /**
     * 版本号
     * @property version
     * @type{String}
     *
     * @final
     */
    var version = '0.0.1';

    /**
     * 浏览器前缀
     *
     * @public
     */
    var prefixed = null;

    /**
     * 浏览器前缀
     *
     * @public
     */
    var used = true;

    /**
     * 动画名称集合
     *
     * @public
     */
    var animations = {};

    /**
     * EA 动效库实例
     *
     * @constructor
     * @class EA
     * @param {string|Object} selector id、class 选择器或dom对象
     *
     * @return {Object} 生成后的EA对象
     *
     * @demo init.html
     */
    var EA = function (selector) {
        return new EA.prototype.Init(selector);
    };

    EA.prototype = {

        /**
         * 构造EA对象
         *
         * @param {string|Object} selector id、class 选择器或dom对象
         * @return {Object} 生成后的EA对象
         */
        'Init': function (selector) {
            prefixed = getPrefixed();
            if (!selector) {
                return this;
            }
            if (selector.jquery) {
                this.elm = selector[0];
            }
            else if (is(selector, 'dom')) {
                this.elm = selector;
            }
            else if (selector.indexOf('#') === 0) {
                this.elm = document.getElementById(selector.substr(1));
            }
            else if (selector.indexOf('.') === 0) {
                var tmp = document.getElementsByClassName(selector.substr(1));
                if (tmp && tmp.length > 0) {
                    this.elm = tmp[0];
                }
            }
            return this;
        },

        /**
         * 返回当前版本号
         *
         * @method getVersion
         *
         * @return {string} 当前版本号
         *
         * @demo version.html
         */
        'getVersion': function () {
            return version;
        },
        'constructor': EA,

        /**
         * 创建动画
         *
         * @method create
         * @param {Object} option 运动参数
         * @param {string} option.name 动画名称
         * @param {number} option.time 动画时间
         * @param {string=} option.easing 缓动函数，可选参数
         * @param {number=} option.delay 延迟时间，可选参数
         * @param {number | string=} option.count 动画次数，可选参数默认为1，forever无限
         * @param {boolean=} option.back 是否反向播放动画，可选参数
         * @param {boolean=} option.save 是否保持动画结束时的状态
         * @param {Array} option.keyframe 关键帧动作
         * @param {Function=} callback 回调函数，可选
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo create.html
         */
        'create': function (option, callback) {
            var that = this;
            if (prefixed.used) {
                setEnd3(this.elm, prefixed.lowercase, clear);
            }
            else {
                callback();
            }
            if (option.name && option.keyframe) {
                var cssText = '';
                var plan = option.name + ' ' + getTime(option.time) + 's';
                cssText = '@' + prefixed.css + 'keyframes ' + option.name
                + ' {' + getCssText(option.keyframe, prefixed.css) + '}';
                addCSS(cssText, option.name);
                if (!option.easing) {
                    option.easing = 'ease';
                }
                if (!option.delay) {
                    option.delay = 0;
                }
                if (!option.count) {
                    option.count = 1;
                }
                else if (option.count === 'forever') {
                    option.count = 'infinite';
                }
                if (option.back === true) {
                    option.back = 'alternate';
                }
                else {
                    option.back = 'normal';
                }
                plan += ' ' + option.easing + ' ' + option.delay + 's '
                + option.count + ' ' + option.back;
                setStyle3(this.elm, prefixed.js, 'animation', plan);
                if (!option.save) {
                    setStyle3(this.elm, prefixed.js, 'animationFillMode', 'none');
                }
                else {
                    setStyle3(this.elm, prefixed.js, 'animationFillMode', 'forwards');
                }
                return this;
            }

            function clear() {
                if (callback) {
                    callback();
                }
                if (!option.save) {
                    clearStyle3(that.elm, that.prefixed.js);
                }
            }
        },

        /**
         * 移动元素
         *
         * @method move
         * @param {Object} option 运动参数
         * @param {number=} option.top top位移，可选参数
         * @param {number=} option.right right位移，可选参数
         * @param {number=} option.bottom bottom位移，可选参数
         * @param {number=} option.left left位移，可选参数
         * @param {number=} option.up up位移，可选参数
         * @param {number=} option.down down位移，可选参数
         * @param {number=} option.mix 混合动画，可选参数
         * @param {number} time 动画时间
         * @param {Function=} callback 回调函数，可选参数
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo move.html
         */
        'move': function (option, time, callback) {
            var plan = '';
            setStyle3(this.elm, prefixed.js, 'transition', getTime(time) + 's');
            if (callback) {
                if (prefixed.used) {
                    setEnd3(this.elm, prefixed.lowercase, callback);
                }
                else {
                    callback();
                }
            }
            if (option.top) {
                plan += ' translateY(-' + option.top + 'px)';
            }
            if (option.right) {
                plan += ' translateX(' + option.right + 'px)';
            }
            if (option.bottom) {
                plan += ' translateY(' + option.bottom + 'px)';
            }
            if (option.left) {
                plan += ' translateX(-' + option.left + 'px)';
            }
            if (option.up) {
                plan += ' translateZ(' + option.up + 'px)';
            }
            if (option.down) {
                plan += ' translateZ(-' + option.down + 'px)';
            }
            if (option.mix) {
                plan += getStyle3(this.elm, prefixed.js, 'transform');
            }
            setStyle3(this.elm, prefixed.js, 'transform', plan);
            return this;
        },

        /**
         * 旋转元素
         *
         * @method rotate
         * @param {Object} option 运动参数
         * @param {number=} option.x 相对于x轴角度，可选参数
         * @param {number=} option.y 相对于y轴角度，可选参数
         * @param {number=} option.z 相对于z轴角度，可选参数
         * @param {number=} option.p 3d视距，可选参数
         * @param {number=} option.mix 混合动画，可选参数
         * @param {number} time 动画时间
         * @param {Function=} callback 回调函数，可选参数
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo rotate.html
         */
        'rotate': function (option, time, callback) {
            setStyle3(this.elm, prefixed.js, 'transition', getTime(time) + 's');
            if (callback) {
                if (prefixed.used) {
                    setEnd3(this.elm, prefixed.lowercase, callback);
                }
                else {
                    callback();
                }
            }
            var plan = '';
            if (option.x) {
                plan += ' rotateX(' + option.x + 'deg)';
            }
            else {
                plan += ' rotateX(0deg)';
            }
            if (option.y) {
                plan += ' rotateY(' + option.y + 'deg)';
            }
            else {
                plan += ' rotateY(0deg)';
            }
            if (option.z) {
                plan += ' rotateZ(' + option.z + 'deg)';
            }
            else {
                plan += ' rotateZ(0deg)';
            }
            if (option.p) {
                plan = 'perspective(' + option.p + 'px)' + plan;
                setStyle(this.elm, {
                    'transform-style': 'preserve-3d'
                });
            }
            if (option.mix) {
                plan += getStyle3(this.elm, prefixed.js, 'transform');
            }

            setStyle3(this.elm, prefixed.js, 'transform', plan);
            return this;
        },

        /**
         * 扭曲元素
         *
         * @method skew
         * @param {Object} option 运动参数
         * @param {number=} option.x 相对于x轴角度，可选参数
         * @param {number=} option.y 相对于y轴角度，可选参数
         * @param {number=} option.mix 混合动画，可选参数
         * @param {number} time 动画时间
         * @param {Function=} callback 回调函数，可选参数
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo skew.html
         */
        'skew': function (option, time, callback) {
            setStyle3(this.elm, prefixed.js, 'transition', getTime(time) + 's');
            if (callback) {
                if (prefixed.used) {
                    setEnd3(this.elm, prefixed.lowercase, callback);
                }
                else {
                    callback();
                }
            }
            var plan = '';
            if (option.x) {
                plan = ' skewX(' + option.x + 'deg)';
            }
            else {
                plan += ' skewX(0deg)';
            }
            if (option.y) {
                plan += ' skewY(' + option.y + 'deg)';
            }
            else {
                plan += ' skewY(0deg)';
            }
            if (option.mix) {
                plan += getStyle3(this.elm, prefixed.js, 'transform');
            }

            setStyle3(this.elm, prefixed.js, 'transform', plan);
            return this;
        },

        /**
         * 缩放元素
         *
         * @method scale
         * @param {Object} option 运动参数
         * @param {number=} option.x x轴缩放比例，可选参数
         * @param {number=} option.y y轴缩放比例，可选参数
         * @param {number=} option.mix 混合动画，可选参数
         * @param {number} time 动画时间
         * @param {Function=} callback 回调函数，可选参数
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo scale.html
         */
        'scale': function (option, time, callback) {
            setStyle3(this.elm, prefixed.js, 'transition', getTime(time) + 's');
            if (callback) {
                if (prefixed.used) {
                    setEnd3(this.elm, prefixed.lowercase, callback);
                }
                else {
                    callback();
                }
            }
            if (!option.x) {
                option.x = 1;
            }
            if (!option.y) {
                option.y = 1;
            }
            var plan = ' scale(' + option.x + ',' + option.y + ')';

            if (option.mix) {
                plan += getStyle3(this.elm, prefixed.js, 'transform');
            }

            setStyle3(this.elm, prefixed.js, 'transform', plan);
            return this;
        },

        /**
         * 显示元素
         *
         * @method show
         * @param {number} time 动画时间
         * @param {Function=} callback 回调函数，可选参数
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo show.html
         */
        'show': function (time, callback) {
            setStyle3(this.elm, prefixed.js, 'transition', getTime(time) + 's');
            if (callback) {
                if (prefixed.used) {
                    setEnd3(this.elm, prefixed.lowercase, callback);
                }
                else {
                    callback();
                }
            }
            setStyle(this.elm, {
                opacity: 1
            });
            return this;
        },

        /**
         * 隐藏元素
         *
         * @method hide
         * @param {number} time 动画时间
         * @param {Function=} callback 回调函数，可选参数
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo hide.html
         */
        'hide': function (time, callback) {
            setStyle3(this.elm, prefixed.js, 'transition', getTime(time) + 's');
            if (callback) {
                if (prefixed.used) {
                    setEnd3(this.elm, prefixed.lowercase, callback);
                }
                else {
                    callback();
                }
            }
            setStyle(this.elm, {
                opacity: 0
            });
            return this;
        },

        /**
         * 触发动画，用于对写好的cssanimation调用
         *
         * @method trigger
         * @param {string | Array} className 要触发css类名，多个用数组
         * @param {boolean=} save 是否保持动画结束时的状态
         * @param {Function=} callback 回调函数，可选参数
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo trigger.html
         */
        'trigger': function (className, save, callback) {
            if (is(save, 'function')) {
                callback = save;
                save = false;
            }
            var that = this;
            if (callback) {
                if (prefixed.used) {
                    setEnd3(this.elm, prefixed.lowercase, clear);
                }
                else {
                    callback();
                }
            }
            if (is(className, 'array')) {
                for (var i = 0, len = className.length; i < len; i++) {
                    addClass(this.elm, className[i]);
                }
            }
            else {
                addClass(this.elm, className);
            }

            function clear() {
                if (callback) {
                    callback();
                }
                if (!save) {
                    removeClass(that.elm, className);
                }
            }
            return this;
        },

        /**
         * 停止动画，用于trigger触发的动画
         *
         * @method stop
         * @param {string | Array} className 要触发css类名，多个用数组
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo stop.html
         */
        'stop': function (className) {
            if (className) {
                if (is(className, 'array')) {
                    for (var i = 0, len = className.length; i < len; i++) {
                        removeClass(this.elm, className[i]);
                    }
                }
            else {
                    removeClass(this.elm, className);
                }
            }
            clearStyle3(this.elm, prefixed.js);
            return this;
        },

        /**
         * 删除关键帧动画
         *
         * @method delete
         * @param {string} name 动画名称
         *
         * @demo delete.html
         */
        'delete': function (name) {
            removeCSS(name);
        },

        /**
         * 创建关键帧
         *
         * @method initKeyFrame
         * @param {Object | Array} option 关键帧动作对象或数组
         * @param {string} option.name 动画名称
         * @param {Array} option.keyframe 关键帧动作
         *
         * @demo run.html
         */
        'initKeyFrame': function (option) {
            if (option) {
                var cssText = '';
                if (is(option, 'array')) {
                    for (var i = 0, len = option.length; i < len; i++) {
                        cssText = '@' + prefixed.css + 'keyframes ' + option[i].name
                        + ' {' + getCssText(option[i].keyframe, prefixed.css) + '}';
                        addCSS(cssText, option[i].name);
                    }
                }
                else {
                    cssText = '@' + prefixed.css + 'keyframes ' + option.name
                    + ' {' + getCssText(option.keyframe, prefixed.css) + '}';
                    addCSS(cssText, option.name);
                }
            }
        },

        /**
         * 运行已定义的动画
         *
         * @method run
         * @param {Object} option 运动参数
         * @param {string} option.name 动画名称
         * @param {number} option.time 动画时间
         * @param {string=} option.easing 缓动函数，可选参数
         * @param {number=} option.delay 延迟时间，可选参数
         * @param {number | string=} option.count 动画次数，可选参数默认为1，forever无限
         * @param {boolean=} option.back 是否反向播放动画，可选参数
         * @param {boolean=} option.save 是否保持动画结束时的状态
         * @param {Function=} callback 回调函数
         *
         * @chainable
         * @return {Object} EA实例
         *
         * @demo run.html
         */
        'run': function (option, callback) {
            var that = this;
            if (callback) {
                if (prefixed.used) {
                    setEnd3(this.elm, prefixed.lowercase, clear);
                }
                else {
                    callback();
                }
            }
            if (option.name) {
                var plan = option.name + ' ' + getTime(option.time) + 's';
                if (!option.easing) {
                    option.easing = 'ease';
                }
                if (!option.delay) {
                    option.delay = 0;
                }
                if (!option.count) {
                    option.count = 1;
                }
                else if (option.count === 'forever') {
                    option.count = 'infinite';
                }
                if (option.back === true) {
                    option.back = 'alternate';
                }
                else {
                    option.back = 'normal';
                }
                plan += ' ' + option.easing + ' ' + option.delay + 's ' + option.count + ' ' + option.back;
                setStyle3(this.elm, prefixed.js, 'animation', plan);
                if (!option.save) {
                    setStyle3(this.elm, prefixed.js, 'animationFillMode', 'none');
                }
                else {
                    setStyle3(this.elm, prefixed.js, 'animationFillMode', 'forwards');
                }
                return this;
            }

            function clear() {
                if (callback) {
                    callback();
                }
                if (!option.save) {
                    clearStyle3(that.elm, that.prefixed.js);
                }
            }
        },

        /**
         * 更新动画
         *
         * @method update
         * @param {string} name 动画名字
         * @param {Array} keyframe 关键帧动作
         *
         * @demo update.html
         */
        'update': function (name, keyframe) {
            var keyframesRule = getKeyFramse(name);
            if (keyframesRule.length > 0) {
                for (var i = 0, len = keyframe.length; i < len; i++) {
                    keyframesRule[0].insertRule(keyframe[i]);
                }
            }
        },

        /**
         * 是否可用
         *
         * @method isUsed
         *
         * @return {boolean} 是否支持css3的标识
         */
        'isUsed': function () {
            return used;
        }
    };

    EA.prototype.Init.prototype = EA.prototype;

    /**
     * 获得浏览器前缀
     *
     * @return {Object}
     */
    function getPrefixed() {
        var body = document.body || document.documentElement;
        var style = body.style;
        var vendor = ['Webkit', 'Khtml', 'Moz', 'Ms', 'O'];
        var i = 0;
        var pre = '';

        while (i < vendor.length) {
            if (typeof style[vendor[i] + 'Transition'] === 'string') {
                pre = vendor[i].toLowerCase();
            }
            i++;
        }

        if (!pre) {
            pre = 'o';
            used = false;
        }
        var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            used: used,
            dom: dom,
            lowercase: pre,
            uppercase: pre.toUpperCase(),
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    }

    /**
     * 获得关键帧对象
     *
     * @param {string} name 动画名字
     *
     * @return {Object}
     */
    function getKeyFramse(name) {
        var styleSheet = document.styleSheets;
        var keyframesRule = [];
        for (var i = 0, len = styleSheet.length; i < len; i++) {
            for (var j = 0; j < styleSheet[i].cssRules.length; j++) {
                if (styleSheet[i].cssRules[j].type === window.CSSRule.KEYFRAMES_RULE
                    && styleSheet[i].cssRules[j].name === name) {
                    keyframesRule.push(styleSheet[i].cssRules[j]);
                }
            }
        }
        return keyframesRule;
    }

    /**
     * 解析参数生成css文本
     *
     * @param {Array} option 生成css文本需要的参数
     * @param {string} prefixed 浏览器前缀
     *
     * @return {Object}
     */
    function getCssText(option, prefixed) {
        var tmp = '';
        for (var i = 0, len = option.length; i < len; i++) {
            tmp += option[i];
        }
        tmp = tmp.replace(/transform/g, prefixed + 'transform');
        tmp = tmp.replace(/animation/g, prefixed + 'animation');
        return tmp;
    }

    /**
     * 向dom添加样式
     *
     * @param {string} cssText css文本
     * @param {string} name keyframe名字
     */
    function addCSS(cssText, name) {
        if (animations[name]) {
            return;
        }
        var style = null;
        var head = document.head || document.getElementsByTagName('head')[0];
        style = document.getElementsByTagName('style')[0];
        if (!style) {
            style = document.createElement('style');
            style.type = 'text/css';
        }
        if (style.styleSheet) {
            var func = function () {
                try {
                    style.styleSheet.cssText += cssText;
                }
                catch(e) {
                    log('addCSS faild');
                }
            };
            if (style.styleSheet.disabled) {
                setTimeout(func, 10);
            }
            else {
                func();
            }
        }
        else {
            var textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
        }
        head.appendChild(style);
        animations[name] = cssText;
    }

    /**
     * 从dom删除样式
     *
     * @param {string} name keyframe名字
     */
    function removeCSS(name) {
        var style = null;
        var head = document.head || document.getElementsByTagName('head')[0];
        style = document.getElementsByTagName('style')[0];
        var cssText = animations[name];
        if (style.styleSheet) {
            var func = function () {
                try {
                    style.styleSheet.cssText = style.styleSheet.cssText.replace(cssText, '');
                }
                catch (e) {
                    log('removeCSS faild');
                }
            };
            if (style.styleSheet.disabled) {
                setTimeout(func, 10);
            }
            else {
                func();
            }
        }
        else {
            style.innerText = style.innerText.replace(cssText, '');
        }
        head.appendChild(style);
    }

    /**
     * 格式化时间
     *
     * @param {number} time 时间，单位是毫秒数
     * @param {number=} fixed 时间精度，换算成秒小数点儿后的精度位数，可选参数
     *
     * @return {number}
     */
    function getTime(time, fixed) {
        if (!time) {
            return 0;
        }
        if (!fixed) {
            fixed = 1;
        }
        return (time / 1000).toFixed(fixed);
    }

    /**
     * 设置css3样式
     *
     * @param {Object} element dom 对象
     * @param {string} prefixed js属性前缀
     * @param {string} name 属性名
     * @param {string} value 属性值
     */
    function setStyle3(element, prefixed, name, value) {
        var style = prefixed + name.charAt(0).toUpperCase() + name.substring(1);
        element.style[style] = value;
        element.style[name] = value;
    }

    /**
     * 获取css3样式
     *
     * @param {Object} element dom 对象
     * @param {string} prefixed js属性前缀
     * @param {string} name 属性名
     *
     * @return {string}
     */
    function getStyle3(element, prefixed, name) {
        var style = prefixed + name.charAt(0).toUpperCase() + name.substring(1);
        return element.style[style] ? element.style[style] : element.style[name];
    }

    /**
     * 清除css3样式
     *
     * @param {Object} element dom 对象
     * @param {string} prefixed js属性前缀
     */
    function clearStyle3(element, prefixed) {
        setStyle3(element, prefixed, 'transition', '0s');
        setStyle3(element, prefixed, 'transform', '');
        setStyle3(element, prefixed, 'animation', '');
    }

    /**
     * 设置动画回调函数
     *
     * @param {Object} element dom 对象
     * @param {string} prefixed js属性前缀
     * @param {Function=} callback 回调函数
     */
    function setEnd3(element, prefixed, callback) {
        var funA = function () {
            callback();
            removeHandler(element, prefixed === 'o' ? 'oanimationend'
            : prefixed + 'AnimationEnd', funA);
            removeHandler(element, 'animationend', funA);
        };
        var funT = function () {
            callback();
            removeHandler(element, prefixed + 'TransitionEnd', funT);
            removeHandler(element, 'transitionend', funT);
        };
        addHandler(element, prefixed === 'o' ? 'oanimationend'
        : prefixed + 'AnimationEnd', funA);
        addHandler(element, 'animationend', funA);
        addHandler(element, prefixed === 'o' ? 'otransitionend'
        : prefixed + 'TransitionEnd', funT);
        addHandler(element, 'transitionend', funT);
    }

    /**
     * 设置元素样式
     *
     * @param {Object} element dom 对象
     * @param {Object} json 属性集合
     */
    function setStyle(element, json) {
        if (element.length) {
            for (var i = 0, len = element.length; i < len; i++) {
                arguments.callee(element[i], json);
            }
        }
        else {
            if (arguments.length === 2) {
                for (var j in json) {
                    if (json.hasOwnProperty(j)) {
                        element.style[j] = json[j];
                    }
                }
            }
            else {
                element.style[arguments[2]] = arguments[3];
            }
        }
    }

    /**
     * 类型判断
     *
     * @param {Object} obj 数据对象
     * @param {string} type 要匹配的类型
     *
     * @return {?number}
     */
    function is(obj, type) {
        var ret = false;
        var tmp = Object.prototype.toString.call(obj);
        switch (type) {
            case 'number':
                if (tmp === '[object Number]') {
                    ret = true;
                }
                break;
            case 'string':
                if (tmp === '[object String]') {
                    ret = true;
                }
                break;
            case 'boolean':
                if (tmp === '[object Boolean]') {
                    ret = true;
                }
                break;
            case 'array':
                if (tmp === '[object Array]') {
                    ret = true;
                }
                break;
            case 'function':
                if (tmp === '[object Function]') {
                    ret = true;
                }
                break;
            case 'object':
                if (tmp === '[object Object]') {
                    ret = true;
                }
                break;
            case 'null':
                if (tmp === '[object Null]') {
                    ret = true;
                }
                break;
            case 'undefined':
                if (tmp === '[object Undefined]') {
                    ret = true;
                }
                break;
            case 'dom':
                if (tmp === '[object HTMLDivElement]') {
                    ret = true;
                }
                break;
        }
        return ret;
    }

    /**
     * 添加className
     *
     * @param {Object} element dom 对象
     * @param {string} className css类名
     *
     */
    function addClass(element, className) {
        if (element.className.indexOf(className) === -1) {
            element.className += ' ' + className;
        }
    }

    /**
     * 移除className
     *
     * @param {Object} element dom 对象
     * @param {string} className css类名
     *
     */
    function removeClass(element, className) {
        var classValue = element.className;
        if (classValue.indexOf(className) > -1) {
            element.className = classValue.replace(' ' + className, '');
            element.className = classValue.replace(className, '');
        }
    }

    /**
     * 设置元素样式
     *
     * @param {string} msg 日志内容
     * @param {string=} level 日志级别，可选参数
     */
    /* eslint-disable no-console */
    function log(msg, level) {
        if (window.console) {
            console.log(msg);
        }
    }
    /* eslint-enable no-console */

    /**
     * 添加事件
     *
     * @param {Object} element dom 对象
     * @param {string} type 事件类型
     * @param {Function} handler 处理函数
     *
     */
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }
        else {
            element['on' + type] = handler;
        }
    }

    /**
     * 移除事件
     *
     * @param {Object} element dom 对象
     * @param {string} type 事件类型
     * @param {Function} handler 处理函数
     *
     */
    function removeHandler(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        }
        else {
            element['on' + type] = null;
        }
    }

    var exports = EA;

    return exports;
});

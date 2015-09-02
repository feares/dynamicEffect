/**
 * EA is easy animation
 *
 * @module EA
 * @file EA is easy animation
 * @author donkunshan(dongkunshan@baidu.com)
 * @date 2015-02-14
 */

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
        EA.prototype.prefixed = this.getPrefixed();
        if (!selector) {
            return this;
        }
        if (selector.jquery) {
            this.elm = selector[0];
        }
        else if (this.is(selector, 'dom')) {
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
    'constructor': EA,

    /**
     * @const 版本号
     *
     * @public
     */
    'version': '0.0.1',

    /**
     * 浏览器前缀
     *
     * @public
     */
    'prefixed': null,

    /**
     * 动画名称集合
     *
     * @public
     */
    'animations': {},

    /**
     * 返回当前版本号
     *
     * @return {string} 当前版本号
     */
    'getVersion': function () {
        return this.version;
    },

		/**
		 * 获得浏览器前缀
		 *
		 * @return {Object}
		 */
    'getPrefixed': function () {
        var styles = window.getComputedStyle(document.documentElement, '');
        var pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
        var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            uppercase: pre.toUpperCase(),
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    },

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
        this.setEnd3(clear);
        if (option.name && option.keyframe) {
            var cssText = '';
            var plan = option.name + ' ' + this.getTime(option.time) + 's';
            cssText = '@' + this.prefixed.css + 'keyframes ' + option.name
						+ ' {' + this.getCssText(option.keyframe, this.prefixed.css) + '}';
            this.addCSS(cssText, option.name);
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
            this.setStyle3('animation', plan);
            if (!option.save) {
                this.setStyle3('animationFillMode', 'none');
            }
						else {
                this.setStyle3('animationFillMode', 'forwards');
            }
            return this;
        }

        function clear() {
            if (callback) {
                callback();
            }
            if (!option.save) {
                that.clearStyle3();
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
        this.setStyle3('transition', this.getTime(time) + 's');
        if (callback) {
            this.setEnd3(callback);
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
            plan += this.getStyle3('transform');
        }
        this.setStyle3('transform', plan);
        return this;
    },

    /**
     * 旋转元素
     *
     * @method rotate
     * @param {Object} option 运动参数
     * @param {number=} option.x 相对于x轴角度，可选参数
     * @param {number=} option.y 相对于y轴角度，可选参数
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
        this.setStyle3('transition', this.getTime(time) + 's');
        if (callback) {
            this.setEnd3(callback);
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
        if (option.p) {
            plan = 'perspective(' + option.p + 'px)' + plan;
            this.setStyle({'transform-style': 'preserve-3d'});
        }
        if (option.mix) {
            plan += this.getStyle3('transform');
        }

        this.setStyle3('transform', plan);
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
        this.setStyle3('transition', this.getTime(time) + 's');
        if (callback) {
            this.setEnd3(callback);
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
            plan += this.getStyle3('transform');
        }

        this.setStyle3('transform', plan);
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
        this.setStyle3('transition', this.getTime(time) + 's');
        if (callback) {
            this.setEnd3(callback);
        }
        if (!option.x) {
            option.x = 1;
        }
        if (!option.y) {
            option.y = 1;
        }
        var plan = ' scale(' + option.x + ',' + option.y + ')';

        if (option.mix) {
            plan += this.getStyle3('transform');
        }

        this.setStyle3('transform', plan);
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
        this.setStyle3('transition', this.getTime(time) + 's');
        if (callback) {
            this.setEnd3(callback);
        }
        this.setStyle({opacity: 1});
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
        this.setStyle3('transition', this.getTime(time) + 's');
        if (callback) {
            this.setEnd3(callback);
        }
        this.setStyle({opacity: 0});
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
        if (this.is(save, 'function')) {
            callback = save;
            save = false;
        }
        var that = this;
        this.setEnd3(clear);
        if (this.is(className, 'array')) {
            for (var i = 0, len = className.length; i < len; i++) {
                this.addClass(className[i]);
            }
        }
				else {
            this.addClass(className);
        }

        function clear() {
            if (callback) {
                callback();
            }
            if (!save) {
                that.removeClass(className);
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
            if (this.is(className, 'array')) {
                for (var i = 0, len = className.length; i < len; i++) {
                    this.removeClass(className[i]);
                }
            }
						else {
                this.removeClass(className);
            }
        }
        this.clearStyle3();
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
        this.removeCSS(name);
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
            if (this.is(option, 'array')) {
                for (var i = 0, len = option.length; i < len; i++) {
                    cssText = '@' + this.prefixed.css + 'keyframes ' + option[i].name
										+ ' {' + this.getCssText(option[i].keyframe, this.prefixed.css) + '}';
                    this.addCSS(cssText, option[i].name);
                }
            }
            else {
                cssText = '@' + this.prefixed.css + 'keyframes ' + option.name
                + ' {' + this.getCssText(option.keyframe, this.prefixed.css) + '}';
                this.addCSS(cssText, option.name);
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
        this.setEnd3(clear);
        if (option.name) {
            var plan = option.name + ' ' + this.getTime(option.time) + 's';
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
            this.setStyle3('animation', plan);
            if (!option.save) {
                this.setStyle3('animationFillMode', 'none');
            }
            else {
                this.setStyle3('animationFillMode', 'forwards');
            }
            return this;
        }

        function clear() {
            if (callback) {
                callback();
            }
            if (!option.save) {
                that.clearStyle3();
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
        var keyframesRule = this.getKeyFramse(name);
        if (keyframesRule.length > 0) {
            for (var i = 0, len = keyframe.length; i < len; i++) {
                keyframesRule[0].insertRule(keyframe[i]);
            }
        }
    },

    /**
     * 获得关键帧对象
     *
     * @param {string} name 动画名字
		 *
		 * @return {Object}
     */
    'getKeyFramse': function (name) {
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
    },

    /**
     * 解析参数生成css文本
     *
     * @param {Array} option 生成css文本需要的参数
     * @param {string} prefixed 浏览器前缀
		 *
		 * @return {Object}
     */
    'getCssText': function (option, prefixed) {
        var tmp = '';
        for (var i = 0, len = option.length; i < len; i++) {
            tmp += option[i];
        }
        tmp = tmp.replace(/transform/g, prefixed + 'transform');
        tmp = tmp.replace(/animation/g, prefixed + 'animation');
        return tmp;
    },

    /**
     * 向dom添加样式
     *
     * @param {string} cssText css文本
     * @param {string} name keyframe名字
     */
    'addCSS': function (cssText, name) {
        if (this.animations[name]) {
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
                    this.log('addCSS faild');
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
        this.animations[name] = cssText;
    },

    /**
     * 从dom删除样式
     *
     * @param {string} name keyframe名字
     */
    'removeCSS': function (name) {
        var style = null;
        var head = document.head || document.getElementsByTagName('head')[0];
        style = document.getElementsByTagName('style')[0];
        var cssText = this.animations[name];
        if (style.styleSheet) {
            var func = function () {
                try {
                    style.styleSheet.cssText = style.styleSheet.cssText.replace(cssText, '');
                }
                catch (e) {
                    this.log('removeCSS faild');
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
    },

    /**
     * 格式化时间
     *
     * @param {number} time 时间，单位是毫秒数
     * @param {number=} fixed 时间精度，换算成秒小数点儿后的精度位数，可选参数
		 *
		 * @return {number}
     */
    'getTime': function (time, fixed) {
        if (!time) {
            return 0;
        }
        if (!fixed) {
            fixed = 1;
        }
        return (time / 1000).toFixed(fixed);
    },

    /**
     * 设置css3样式
     *
     * @param {string} name 属性名
     * @param {string} value 属性值
     */
    'setStyle3': function (name, value) {
        var style = this.prefixed.js + name.charAt(0).toUpperCase() + name.substring(1);
        this.elm.style[style] = value;
    },

    /**
     * 获取css3样式
     *
     * @param {string} name 属性名
     *
     * @return {string}
     */
    'getStyle3': function (name) {
        var style = this.prefixed.js + name.charAt(0).toUpperCase() + name.substring(1);
        return this.elm.style[style];
    },

    /**
     * 清除css3样式
     *
     * @param {Object} elm dom对象
     */
    'clearStyle3': function () {
        this.setStyle3('transition', '0s');
        this.setStyle3('transform', '');
        this.setStyle3('animation', '');
    },

    /**
     * 设置动画回调函数
     *
     * @param {Function=} callback 回调函数
     */
    'setEnd3': function (callback) {
        var that = this;
        var tmpA = function () {
            callback();
            that.removeHandler(that.elm, that.prefixed.lowercase === 'o' ? 'oanimationend'
            : that.prefixed.lowercase + 'AnimationEnd', tmpA);
            that.removeHandler(that.elm, 'animationend', tmpA);
        };
        var tmpT = function () {
            callback();
            that.removeHandler(that.elm, that.prefixed.lowercase + 'TransitionEnd', tmpT);
            that.removeHandler(that.elm, 'transitionend', tmpT);
        };
        this.addHandler(this.elm, that.prefixed.lowercase === 'o' ? 'oanimationend'
        : that.prefixed.lowercase + 'AnimationEnd', tmpA);
        this.addHandler(this.elm, 'animationend', tmpA);
        this.addHandler(this.elm, that.prefixed.lowercase === 'o' ? 'otransitionend'
        : that.prefixed.lowercase + 'TransitionEnd', tmpT);
        this.addHandler(this.elm, 'transitionend', tmpT);
    },

    /**
     * 设置元素样式
     *
     * @param {Object} json 属性集合
     */
    'setStyle': function (json) {
        if (this.elm.length) {
            for (var i = 0; i < this.elm.length; i++) {
                this.setStyle(this.elm[i], json);
            }
        }
				else {
            if (arguments.length === 1) {
                for (var j in json) {
                    if (json.hasOwnProperty(j)) {
                        this.elm.style[j] = json[j];
                    }
                }
            }
            else {
                this.elm.style[arguments[1]] = arguments[2];
            }
        }
    },

    /**
     * 类型判断
     *
     * @param {Object} obj 数据对象
     * @param {string} type 要匹配的类型
		 *
		 * @return {?number}
     */
    'is': function (obj, type) {
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
    },

    /**
     * 添加className
     *
     * @param {string} className css类名
		 *
     */
    'addClass': function (className) {
        if (this.elm.className.indexOf(className) === -1) {
            this.elm.className += ' ' + className;
        }
    },

    /**
     * 移除className
     *
     * @param {string} className css类名
		 *
     */
    'removeClass': function (className) {
        if (this.elm.className.indexOf(className) > -1) {
            this.elm.className = this.elm.className.replace(' ' + className, '');
            this.elm.className = this.elm.className.replace(className, '');
        }
    },

    /**
     * 设置元素样式
     *
     * @param {string} msg 日志内容
     * @param {string=} level 日志级别，可选参数
     */
    'log': function (msg, level) {
        if (window.console) {
            window.console.log(msg);
        }
    },

    /**
     * 添加事件
     *
     * @param {Object} element dom 对象
     * @param {string} type 事件类型
     * @param {Function} handler 处理函数
     *
     */
    'addHandler': function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }
        else {
            element['on' + type] = handler;
        }
    },

    /**
     * 移除事件
     *
     * @param {Object} element dom 对象
     * @param {string} type 事件类型
     * @param {Function} handler 处理函数
     *
     */
    'removeHandler': function (element, type, handler) {
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
};

EA.prototype.Init.prototype = EA.prototype;

window.ea = EA;

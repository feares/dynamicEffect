/**
 * @file EA is easy animation
 * @author donkunshan(dongkunshan@baidu.com)
 * @date 2015-02-14
 */

var EA = function(selector) {
		return new EA.prototype.init(selector);
}

EA.prototype = {
    init: function(selector) {
        EA.prototype.prefixed = this.getPrefixed();
				if (!selector) {
				    return this;
				}
				if (this.is(selector, 'dom')) {
						this.elm = selector;
				} else if (selector.indexOf('#') === 0) {
				    this.elm = document.getElementById(selector.substr(1));
				} else if (selector.indexOf('.') === 0) {
				    var tmp = document.getElementsByClassName(selector.substr(1));
						if (tmp && tmp.length > 0) {
						    this.elm = tmp[0];
						}
				}
        return this;
    },
    version: '0.0.1',
    constructor: EA,
    prefixed: null,
		animations: {},
		/**
		* 获得浏览器前缀
		*
		*/
    getPrefixed: function() {
        var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
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
		* @param {Object} elm dom对象
		* @param {Object} option 运动参数
		* @param {string} option.name 动画名称
		* @param {number} option.time 动画时间
		* @param {string=} option.easing 缓动函数，可选参数
		* @param {number=} option.delay 延迟时间，可选参数
		* @param {number | string=} option.count 动画次数，可选参数默认为1，forever无限
		* @param {boolean=} option.back 是否反向播放动画，可选参数
		* @param {boolean=} option.save 是否保持动画结束时的状态
		* @param {Array} option.keyframe 关键帧动作
		*/
    create: function(option, callback) {
		    var that = this;
		    this.setEnd3(clear);
        if (option.name && option.keyframe) {
            var cssText = '';
            var plan = option.name + ' ' + option.time + 's';
            cssText = '@' + this.prefixed.css + 'keyframes ' + option.name + ' {' + this.getCssText(option.keyframe, this.prefixed.css) + '}';
						this.addCSS(cssText, option.name);
            if (!option.easing) {
                option.easing = 'ease';
            }
            if (!option.delay) {
                option.delay = 0;
            }
            if (!option.count) {
                option.count = 1;
            } else if (option.count === 'forever') {
                option.count = 'infinite';
            }
            if(option.back == true) {
                option.back = 'alternate';
            } else {
                option.back = 'normal';
            }
            plan += ' ' + option.easing + ' ' + option.delay + 's ' + option.count + ' ' + option.back;
						this.setStyle3('animation', plan);
						return this;
        }

        function clear() {
            if (callback) {
                callback();
            }
            if(!option.save) {
                that.clearStyle3(elm);
                that.removeCSS(option.name);
            }
        }
    },
		/**
     * 移动元素
     *
     * @param {Object} option 运动参数
     * @param {number=} option.top top位移，可选参数
     * @param {number=} option.right right位移，可选参数
     * @param {number=} option.bottom bottom位移，可选参数
     * @param {number=} option.left left位移，可选参数
     * @param {number} time 动画时间
     * @param {Function=} callback 回调函数，可选参数
     */
    move: function(option, time, callback) {
        var plan = '';
        if (Modernizr.csstransforms) {
				    this.setStyle3('transition', this.getTime(time) + 's');
            if (callback) {
						    this.setEnd3(callback);
            }
            var plan = '';
            if (option.top) {
                plan += ' translateY(' + option.top + ')';
            }
            if (option.right) {
                plan += ' translateX(-' + option.right + ')';
            }
            if (option.bottom) {
                plan += ' translateY(-' + option.bottom + ')';
            }
            if (option.left) {
                plan += ' translateX(' + option.left + ')';
            }
						this.setStyle3('transform', plan);
        } else {
            $(this.elm).animate(path, time, callback);
        }
				return this;
    },
    /**
     * 旋转元素
     *
     * @param {Object} option 运动参数
     * @param {number=} option.x 相对于x轴角度，可选参数
     * @param {number=} option.y 相对于y轴角度，可选参数
     * @param {number=} option.p 3d视距，可选参数
     * @param {number} time 动画时间
     * @param {Function=} callback 回调函数，可选参数
     */
    rotate: function(option, time, callback) {
        if (Modernizr.csstransforms) {
				    this.setStyle3('transition', this.getTime(time) + 's');
            var plan = '';
            if (option.x) {
                plan += ' rotateX(' + option.x + 'deg)';
            } else {
                plan += ' rotateX(0deg)';
            }
            if (option.y) {
                plan = ' rotateY(' + option.y + 'deg)';
            } else {
                plan = ' rotateY(0deg)';
            }
            if (option.p) {
                plan = 'perspective(' + option.p + 'px)' + plan;
            }
            if (callback) {
						    this.setEnd3(callback);
            }
						this.setStyle3('transform', plan);
        } else {
            log('can not realize on css2');
        }
				return this;
    },
    /**
     * 扭曲元素
     *
     * @param {Object} elm dom对象
     * @param {Object} option 运动参数
     * @param {number=} option.x 相对于x轴角度，可选参数
     * @param {number=} option.y 相对于y轴角度，可选参数
     * @param {number} time 动画时间
     * @param {Function=} callback 回调函数，可选参数
     */
    skew: function(option, time, callback) {
        if (Modernizr.csstransforms) {
				    this.setStyle3('transition', this.getTime(time) + 's');
            if (callback) {
						    this.setEnd3(callback);
            }
            var plan = '';
            if (option.x) {
                plan = ' skewX(' + option.x + 'deg)';
            } else {
                plan += ' skewX(0deg)';
            }
            if (option.y) {
                plan = ' skewY(' + option.y + 'deg)';
            } else {
                plan += ' skewY(0deg)';
            }
						this.setStyle3('transform', plan);
        } else {
            log('can not realize on css2');
        }
				return this;
    },
    /**
     * 显示元素
     *
     * @param {Object} elm dom对象
     * @param {number} time 动画时间
     * @param {Function=} callback 回调函数，可选参数
     */
    show: function(time, callback) {
        if (Modernizr.opacity) {
				    this.setStyle3('transition', this.getTime(time) + 's');
            if (callback) {
							    this.setEnd3(callback);
            }
						this.setStyle({'opacity': 1});
        } else {
            $(this.elm).fadeIn(time, callback);
        }
				return this;
    },
    /**
     * 隐藏元素
     *
     * @param {Object} elm dom对象
     * @param {number} time 动画时间
     * @param {Function=} callback 回调函数，可选参数
     */
    hide: function(time, callback) {
        if (Modernizr.opacity) {
				    this.setStyle3('transition', this.getTime(time) + 's');
            if (callback) {
						    this.setEnd3(callback);
            }
						this.setStyle({'opacity': 0});
        } else {
            $(this.elm).fadeOut(time, callback);
        }
				return this;
    },
    /**
     * 触发动画，用于对写好的cssanimation调用
     *
     * @param {Object} elm dom对象
     * @param {string | Array} className 要触发css类名，多个用数组
     * @param {boolean=} save 是否保持动画结束时的状态
     * @param {Function=} callback 回调函数，可选参数
     */
    trigger: function(className, save, callback) {
        if (Modernizr.cssanimations) {
            if (this.is(save, 'function')) {
                callback = save;
                save = false;
            }
						var that = this;
						this.setEnd3(clear);
            if (this.is(className, 'array')) {
                for (var i = 0, len = className.length;i < len; i++) {
                    $(this.elm).addClass(className[i]);
                }
            } else {
                $(this.elm).addClass(className);
            }
        } else {
            log('can not realize on css2');
        }

        function clear() {
            if (callback) {
                callback();
            }
            if (!save) {
                $(that.elm).removeClass(className);
            }
        }
				return this;
    },
    /**
     * 停止动画
     *
     * @param {Object} elm dom对象
     * @param {string | Array} className 要触发css类名，多个用数组
     */
    stop: function(className) {
        if (Modernizr.cssanimations) {
            if(className) {
                if (this.is(className, 'array')) {
                    for (var i = 0, len = className.length;i < len;i++) {
                        $(this.elm).removeClass(className[i]);
                    }
                } else {
                    $(this.elm).removeClass(className);
                }
            }
						this.clearStyle3();
        } else {
            $(this.elm).stop();
        }
				return this;
    },
    /**
     * 删除关键帧动画
     *
     * @param {string} name 动画名称
     */
    delete: function(name) {
        removeCSS(name);
    },
    /**
     * 创建关键帧
     *
     * @param {Object} elm dom对象
     * @param {Object | Array} option 关键帧动作对象或数组
     * @param {string} option.name 动画名称
     * @param {Array} option.keyframe 关键帧动作
     */
    initKeyFrame: function(option) {
        if (option) {
            var cssText = '';
            if (this.is(option, 'array')) {
                for (var i = 0, len = option.length; i < len; i++) {
                    cssText = '@' + this.prefixed.css + 'keyframes ' + option[i].name + ' {' + this.getCssText(option[i].keyframe, this.prefixed.css) + '}';
										this.addCSS(cssText, option[i].name);
                }
            } else {
                cssText = '@' + this.prefixed.css + 'keyframes ' + option.name + ' {' + this.getCssText(option.keyframe, this.prefixed.css) + '}';
								this.addCSS(cssText, option.name);
            }
        }
    },
    /**
     * 运行已定义的动画
     *
     * @param {Object} elm dom对象
     * @param {Object} option 运动参数
     * @param {string} option.name 动画名称
     * @param {number} option.time 动画时间
     * @param {string=} option.easing 缓动函数，可选参数
     * @param {number=} option.delay 延迟时间，可选参数
     * @param {number | string=} option.count 动画次数，可选参数默认为1，forever无限
     * @param {boolean=} option.back 是否反向播放动画，可选参数
     * @param {boolean=} option.save 是否保持动画结束时的状态
     */
    run: function(option, callback) {
		    var that = this;
        this.setEnd3(clear);
        if (option.name) {
            var plan = option.name + ' ' + option.time + 's';
            if (!option.easing) {
                option.easing = 'ease';
            }
            if (!option.delay) {
                option.delay = 0;
            }
            if (!option.count) {
                option.count = 1;
            } else if (option.count === 'forever') {
                option.count = 'infinite';
            }
            if(option.back == true) {
                option.back = 'alternate';
            } else {
                option.back = 'normal';
            }
            plan += ' ' + option.easing + ' ' + option.delay + 's ' + option.count + ' ' + option.back;
						this.setStyle3('animation', plan);
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
     * @param {string} name 动画名字
     * @param {Array} keyframe 关键帧动作
     */
    update: function(name, keyframe) {
        if (keyframe) {
            var keyframesRule = this.getKeyFramse(name);
            for (var i = 0, len = keyframe.length; i < len; i++) {
                var rule = keyframe[i];
                keyframesRule[0].insertRule(keyframe[i]);
            }
        }
    },
    /**
     * 获得关键帧对象
     *
     * @param {string} name 动画名字
     */
    getKeyFramse: function(name) {
        var styleSheet = document.styleSheets,
        keyframesRule = [];
        for (var i = 0, len = styleSheet.length; i < len; i++) {
            [].slice.call(styleSheet[i].cssRules).forEach(function(item) {
                if (item.type === CSSRule.KEYFRAMES_RULE && item.name === name) {
                    keyframesRule.push(item);
                }
            });
        }
        return keyframesRule;
    },
    /**
     * 解析参数生成css文本
     *
     * @param {Array} option 生成css文本需要的参数
     * @param {string} prefixes 浏览器前缀
     */
    getCssText: function(option, prefixed) {
        var tmp = '';
        for (var i = 0, len = option.length;i < len;i++) {
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
    addCSS: function(cssText, name) {
        if (this.animations[name]) {
            return;
        }
        var style = null, head = document.head || document.getElementsByTagName('head')[0];
        style = document.getElementsByTagName('style')[0];
        if (!style) {
            style = document.createElement('style');
            style.type = 'text/css';
        }
        if (style.styleSheet) {
            var func = function() {
                try {
                    style.styleSheet.cssText += cssText;
                } catch(e) {
                    log('addCSS faild');
                }
            }
            if (style.styleSheet.disabled) {
                setTimeout(func,10);
            } else {
                func();
            }
        } else {
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
    removeCSS: function(name) {
        var style = null, head = document.head || document.getElementsByTagName('head')[0];
        style = document.getElementsByTagName('style')[0];
        var cssText = EA.animations[name];
        if (style.styleSheet) {
            var func = function() {
                try {
                    style.styleSheet.cssText = style.styleSheet.cssText.replace(cssText, '');
                } catch(e) {
                    log('removeCSS faild');
                }
            }
            if (style.styleSheet.disabled) {
                setTimeout(func,10);
            } else {
                func();
            }
        } else {
            style.innerText = style.innerText.replace(cssText, '');
        }
        head.appendChild(style);
    },
    /**
     * 格式化时间
     *
     * @param {number} time 时间，单位是毫秒数
     * @param {number=} fixed 时间精度，换算成秒小数点儿后的精度位数，可选参数
     */
    getTime: function(time, fixed) {
        if (!fixed) {
            fixed = 1;
        }
        return (time / 1000).toFixed(fixed);
    },
    /**
     * 设置css3样式
     *
     * @param {Object} elm dom对象
     * @param {string} 属性明
     * @param {string} 属性值
     */
    setStyle3: function(name, value) {
        var style = this.prefixed.js + name.charAt(0).toUpperCase() + name.substring(1);
        this.elm.style[style] = value;
    },
    /**
     * 清除css3样式
     *
     * @param {Object} elm dom对象
     */
    clearStyle3: function() {
        this.setStyle3('transition', '0s');
				this.setStyle3('transform', '');
				this.setStyle3('animation', '');
    },
    /**
     * 设置动画回调函数
     *
     * @param {Object} elm dom对象
     * @param {Function=} callback 回调函数
     */
    setEnd3: function(callback) {
        $(this.elm).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback);
        $(this.elm).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', callback);
    },
    /**
     * 设置元素样式
     *
     * @param {Object} elm dom对象
     * @param {Object} json 属性集合
     */
    setStyle: function(json) {
        if (this.elm.length) {
            for(var i = 0;i < obj.length;i++){
						    this.setStyle(obj[i], json);
            }
        } else {
            if (arguments.length === 1) {
                for (var i in json) {
								    this.elm.style[i] = json[i];
                }
            } else {
						    this.elm.style[arguments[1]] = arguments[2];
            }
        }
    },
    /**
     * 类型判断
     *
     * @param {Object} obj 数据对象
     * @param {string} type 要匹配的类型
     */
    is: function(obj, type) {
        var ret = false;
        var tmp = Object.prototype.toString.call(obj);
        switch(type) {
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
            case 'object':console.log(tmp);
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
     * 设置元素样式
     *
     * @param {string} msg 日志内容
     * @param {string=} level 日志级别，可选参数
     */
    log: function(msg, level) {
        if (console) {
            console.log(msg);
        }
    }
}

EA.prototype.init.prototype = EA.prototype;

ea = EA;
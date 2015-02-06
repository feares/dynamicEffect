/**
 * @file EA is easy animation
 * @author donkunshan(dongkunshan@baidu.com)
 */
window.EA = (function (window, document, undefined) {

    var version = '0.0.1',

    EA = {};

    log(Modernizr);

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
    EA.move = function (elm, option, time, callback) {
        var plan = '';
        if (Modernizr.csstransforms) {
            setStyle3(elm, 'transition', getTime(time) + 's');
            if (callback) {
                setEnd3(elm, callback);
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
            setStyle3(elm, 'transform', plan);
        } else {
            $(elm).animate(path, time, callback);
        }
    }

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
    EA.rotate = function (elm, option, time, callback) {
        if (Modernizr.csstransforms) {
            setStyle3(elm, 'transition', getTime(time) + 's');
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
                setEnd3(elm, callback);
            }
            setStyle3(elm, 'transform', plan);
        } else {
            log('can not realize on css2');
        }
    }

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
    EA.skew = function (elm, option, time, callback) {
        if (Modernizr.csstransforms) {
            setStyle3(elm, 'transition', getTime(time) + 's');
            if (callback) {
                setEnd3(elm, callback);
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
            setStyle3(elm, 'transform', plan);
        } else {
            log('can not realize on css2');
        }
    }

    /**
     * 显示元素
     *
     * @param {Object} elm dom对象
     * @param {number} time 动画时间
     * @param {Function=} callback 回调函数，可选参数
     */
    EA.show = function (elm, time, callback) {
        if (Modernizr.opacity) {
              setStyle3(elm, 'transition', getTime(time) + 's');
              if (callback) {
                  setEnd3(elm, callback);
              }
              setStyle(elm, {"opacity": 1});
          } else {
              $(elm).fadeIn(time, callback);
        }
    }

    /**
     * 隐藏元素
     *
     * @param {Object} elm dom对象
     * @param {number} time 动画时间
     * @param {Function=} callback 回调函数，可选参数
     */
    EA.hide = function (elm, time, callback) {
        if (Modernizr.opacity) {
            setStyle3(elm, 'transition', getTime(time) + 's');
            if (callback) {
                setEnd3(elm, callback);
            }
            setStyle(elm, {"opacity": 0});
        } else {
            $(elm).fadeOut(time, callback);
        }
    }

    /**
     * 触发动画，用于对写好的cssanimation调用
     *
     * @param {Object} elm dom对象
     * @param {string | Array} className 要触发css类名，多个用数组
     * @param {Function=} callback 回调函数，可选参数
     */
    EA.trigger = function (elm, className, callback) {
        if (Modernizr.cssanimations) {
            setEnd3(elm, callback);
            if (is(className, 'array')) {
                for (var i = 0, len = className.length;i < len;i++) {
                    $(elm).addClass(className[i]);
                }
            } else {
                $(elm).addClass(className);
            }
        } else {
            log('can not realize on css2');
        }

        function clear () {
            if (callback) {
                callback();
            }
            $(elm).removeClass(className);
        }
    }

    /**
     * 停止动画
     *
     * @param {Object} elm dom对象
     * @param {string | Array} className 要触发css类名，多个用数组
     */
    EA.stop = function (elm, className) {
        if (Modernizr.cssanimations) {
            if(className) {
                if (is(className, 'array')) {
                    for (var i = 0, len = className.length;i < len;i++) {
                        $(elm).removeClass(className[i]);
                    }
                } else {
                    $(elm).removeClass(className);
                }
            }
            clearStyle3(elm);
        } else {
            $(elm).stop();
        }
    }

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
     * @param {Array} option.keyframe 关键帧动作
     */
    EA.create = function (elm, option, callback) {
        if (callback) {
            setEnd3(callback);
        }
        if (option.name && option.keyframe) {
            var cssText = '';
            var plan = option.name + ' ' + option.time + 's';
            cssText = '@-webkit-keyframes ' + option.name + ' {' + getCssText(option.keyframe) + '}';
            addCSS(cssText);
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
            setStyle3(elm, 'animation', plan);
        }
    }

    /**
     * 更新动画
     *
     * @param {Object} elm dom对象
     * @param {Array} keyframe 关键帧动作
     */
    EA.update = function (elm, keyframe, callback) {
        if (callback) {
            setEnd3(callback);
        }
        if (keyframe) {
            var plan = '';
            setStyle3(elm, 'animation', plan);
        }
    }

    /**
     * 解析参数生成css文本
     *
     * @param {Array} option 生成css文本需要的参数
     */
    function getCssText(option) {
        var tmp = '';
        for (var i = 0, len = option.length;i < len;i++) {
            tmp += option[i];
        }
        return tmp;
    }

    /**
     * 向dom添加样式
     *
     * @param {number} cssText css文本
     */
    function addCSS(cssText){
        var style = null, head = document.head || document.getElementsByTagName('head')[0];
        style = document.getElementsByTagName('style')[0];
        if (!style) {
            style = document.createElement('style');
            style.type = 'text/css';
        }
        if(style.styleSheet){
            var func = function(){
                try{
                    style.styleSheet.cssText = cssText;
                }catch(e){

                }
            }
            if(style.styleSheet.disabled){
                setTimeout(func,10);
            }else{
                func();
            }
        }else{
            var textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
        }
        head.appendChild(style);
    }

    /**
     * 格式化时间
     *
     * @param {number} time 时间，单位是毫秒数
     * @param {number=} fixed 时间精度，换算成秒小数点儿后的精度位数，可选参数
     */
    function getTime (time, fixed) {
        if (!fixed) {
            fixed = 1;
        }
        return (time / 1000).toFixed(fixed);
    }

    /**
     * 设置css3样式
     *
     * @param {Object} elm dom对象
     * @param {string} 属性明
     * @param {string} 属性值
     */
    function setStyle3 (elm, name, value) {
        var wStyle = 'Webkit' + name.charAt(0).toUpperCase() + name.substring(1);
        var mStyle = 'Moz' + name.charAt(0).toUpperCase() + name.substring(1);
        var oSyle = 'O' + name.charAt(0).toUpperCase() + name.substring(1);
        var msSyle = 'ms' + name.charAt(0).toUpperCase() + name.substring(1);
        elm.style[name] = value;
        elm.style[wStyle] = value;
        elm.style[mStyle] = value;
        elm.style[oSyle] = value;
        elm.style[msSyle] = value;
    }

    /**
     * 清除css3样式
     *
     * @param {Object} elm dom对象
     */
    function clearStyle3 (elm) {
        setStyle3(elm, 'transition', '0s');
        setStyle3(elm, 'transform', '');
        setStyle3(elm, 'animation', '');
    }

    /**
     * 设置动画回调函数
     *
     * @param {Object} elm dom对象
     * @param {Function=} callback 回调函数
     */
    function setEnd3 (elm, callback) {
        $(elm).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback);
        $(elm).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', callback);
    }

    /**
     * 设置元素样式
     *
     * @param {Object} elm dom对象
     * @param {Object} json 属性集合
     */
    function setStyle (elm, json) {
        if (elm.length) {
            for(var i = 0;i < obj.length;i++){
                setStyle(obj[i], json);
            }
        } else {
            if (arguments.length === 2) {
                for (var i in json) {
                    elm.style[i] = json[i];
                }
            } else {
                elm.style[arguments[1]] = arguments[2];
            }
        }
    }

    /**
     * 类型判断
     *
     * @param {Object} obj 数据对象
     * @param {string} type 要匹配的类型
     */
    function is (obj, type){
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
        }
        return ret;
    }

    /**
     * 设置元素样式
     *
     * @param {string} msg 日志内容
     * @param {string=} level 日志级别，可选参数
     */
    function log (msg, level){
        if (console) {
            console.log(msg);
        }
    }

    return EA;

})(this, this.document);

window.Animate = (function (window, document, undefined) {

    var version = '0.0.1',

    Animate = {},

    callbakcCache = null,

    elmCache = null;

    console.log(Modernizr);

    Animate.move = function (elm, path, time, callback) {
        var plan = '';
        if (Modernizr.csstransforms) {
            setStyle3(elm, 'transition', (time/1000) + 's');
            if (callback) {
                setEnd3(elm, callback);
            }
            for (var p in path) {
                switch(p) {
                    case 'top':
                        plan += ' translateY(' + path[p] + ')';
                        break;
                    case 'right':
                        plan += ' translateX(-' + path[p] + ')';
                        break;
                    case 'bottom':
                        plan += ' translateY(-' + path[p] + ')';
                        break;
                    case 'left':
                        plan += ' translateX(' + path[p] + ')';
                        break;
                }
            }
            setStyle3(elm, 'transform', plan);
        } else {
            setStyle(elm, {"position": "relative"});
            $(elm).animate(path, time, callback);
        }
    }

    Animate.rotate = function (elm, rotateX, rotateY, time, perspective, callback) {
        if (Modernizr.csstransforms) {
            setStyle3(elm, 'transition', (time/1000) + 's');
            if (callback) {
                setEnd3(elm, callback);
            }
            setStyle3(elm, 'transform', 'perspective(' + perspective + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
        } else {
            console.log('can not realize on css2');
        }
    }

    Animate.skew = function (elm, skewX, skewY, time, callback) {
        if (Modernizr.csstransforms) {
            setStyle3(elm, 'transition', (time/1000) + 's');
            if (callback) {
              setEnd3(elm, callback);
            }
            setStyle3(elm, 'transform', 'skewX(' + skewX + 'deg) skewY(' + skewY + 'deg)');
        } else {
            console.log('can not realize on css2');
        }
    }

    Animate.show = function (elm, time, callback) {
        if (Modernizr.opacity) {
              setStyle3(elm, 'transition', (time/1000) + 's');
              if (callback) {
                  setEnd3(elm, callback);
              }
              setStyle(elm, {"opacity": 1});
          } else {
              $(elm).fadeIn(time, callback);
        }
    }

    Animate.hide = function (elm, time, callback) {
        if (Modernizr.opacity) {
            setStyle3(elm, 'transition', (time/1000) + 's');
            if (callback) {
              setEnd3(elm, callback);
            }
            setStyle(elm, {"opacity": 0});
        } else {
            $(elm).fadeOut(time, callback);
        }
    }

    Animate.trigger = function (elm, className, callback) {
        if (Modernizr.cssanimations) {
            if (callbakcCache) {
                elmCache.removeEventListener('webkitAnimationEnd', callbakcCache);
                elmCache.removeEventListener('animationend', callbakcCache);
            }
            callbakcCache = clear;
            elmCache = elm;
            elm.addEventListener('webkitAnimationEnd', clear);  // Chrome, Safari 和 Opera
            elm.addEventListener('animationend', clear);        // 标准语法
            $(elm).addClass(className);
        } else {
            console.log('can not realize on css2');
        }

        function clear () {
            if (callback) {
              callback();
            }
            $(elm).removeClass(className);
        }
    }

    function setStyle3 (obj, name, value) {
        var wStyle = 'Webkit' + name.charAt(0).toUpperCase() + name.substring(1);
        var mStyle = 'Moz' + name.charAt(0).toUpperCase() + name.substring(1);
        var oSyle = 'O' + name.charAt(0).toUpperCase() + name.substring(1);
        var msSyle = 'ms' + name.charAt(0).toUpperCase() + name.substring(1);
        obj.style[name] = value;
        obj.style[wStyle] = value;
        obj.style[mStyle] = value;
        obj.style[oSyle] = value;
        obj.style[msSyle] = value;
    }

    function setEnd3 (elm, fnc) {
        if (callbakcCache) {
            elmCache.removeEventListener('webkitTransitionEnd', callbakcCache);
            elmCache.removeEventListener('transitionend', callbakcCache);
        }
        callbakcCache = fnc;
        elmCache = elm;
        elm.addEventListener('webkitTransitionEnd', fnc);  // Chrome, Safari 和 Opera
        elm.addEventListener('transitionend', fnc);        // 标准语法
    }

    function setStyle (obj, json) {
        if (obj.length) {
            for(var i = 0;i < obj.length;i++){
                setStyle(obj[i], json);
            }
        } else {
            if(arguments.length === 2) {
                for (var i in json) {
                  obj.style[i] = json[i];
                }
            } else {
                obj.style[arguments[1]] = arguments[2];
            }
        }
    }

    return Animate;

})(this, this.document);

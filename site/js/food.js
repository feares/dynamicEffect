/**
 * @file food.js
 * @author dongkunshan(dongkunshan@baidu.com)
 * @date 2015-02-14
 */


var x = -20;
var y = 0;
$(document).ready(function() {
    ea().initKeyFrame([
        {
          name:'star',
          keyframe:[
              '0% {transform: rotate(0deg) scale(0.8, 0.8);}',
              '100% {transform: rotate(360deg) scale(1, 1);}'
          ]
        },
        {
          name:'scale',
          keyframe:[
              '0% {transform: scale(0.5, 0.5);}',
              '100% {transform: scale(1, 1);}'
          ]
        }
    ]);

    ea('.plate').rotate({x: -20, y: 0, p: 500});

    $(document).bind('mousedown', function(ev) {
        var oEvent = ev || event;
  		  var mouseStartX = oEvent.clientX;
  		  var mouseStartY = oEvent.clientY;
  		  var startX = x;
  		  var startY = y;
        $(document).bind('mousemove', function(ev) {
            var oEvent = ev || event;
      			y = startY + (oEvent.clientX - mouseStartX) / 10;
      			x = startX - (oEvent.clientY - mouseStartY) / 10;
            ea('.plate').rotate({x: x, y: y, p: 500});
        });
        $(document).bind('mouseup', function(ev) {
            $(document).unbind('mousemove');
      			$(document).unbind('mouseup');
        });
    });

    for (var i = 0; i < 6; i++) {
        ea($('.plate').children()[i]).move({up: '200px'}).rotate({y: i * 60, mix: true});
    }

    $('.scroll-mask .scroll').on('click', function() {
        ea('.scroll-mask').move({left: '0px'}, 2000, function() {
            ea('.text1').show(3000, function() {
                ea('.text2').show(3000, function() {
                    ea('.text3').show(3000, star_bg);
                });
            });
        });
    });
});

function star_bg() {
    $('.content ul').hide();
    $('.scroll-img').show();
    setTimeout(function() {
        $('.page2').css('z-index', 3);
        ea('.page2').show(2000);
    }, 2000);
    ea('.scroll-img').run({name: 'star', time: 36, save: true}, function() {
        ea().update('star', [
            '0% {transform: rotate(0deg);}',
            '100% {transform: rotate(360deg);}'
        ]);
        ea('.scroll-img').run({name: 'star', time: 36, count: 'forever'});
    });
}

function getDeg(elm) {
    var reg = /(rotateY\([\-\+]?((\d+)(deg))\))/i;
    var degStr = ea(elm).getStyle3('transform').match(reg);
    var deg;
    try {
        deg = degStr[3];
        return deg;
    } catch (e) {

    }
}

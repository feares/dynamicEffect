/**
 * @file Demo Related JS
 * @author zhangli01(zhangli01@baidu.com)
 * @date 2015-01-19
 */

$(document).ready(function() {

    // button demo event
    $(".animateTest").click(function () {
        var tag = $(this).attr('tag');
        $(this).toggleClass(tag);
    });

    $("a[href='#']").click(function() {
        return false;
    });

    $("#div1").click(function () {
        var that = this;
        Animate.move(this, {left:'10px'}, 1000, function (){
            Animate.move(that, {left:'0px'}, 1000);
        });
    });

    $("#div2").click(function () {
        var that = this;
        Animate.skew(this, 0, 30, 1000, function (){
          Animate.skew(that, 0, 0, 1000);
        });
    });

    $("#div3").click(function () {
        var that = this;
        Animate.rotate(this, 0, 180, 1000, 200, function (){
          Animate.rotate(that, 0, 0, 1000, 200);
        });
    });

    $("#div4").click(function () {
        var that = this;
        Animate.hide(this, 1000, function (){
          Animate.show(that, 1000);
        });
    });

    $(".animated").click(function () {
        var tag = $(this).attr('tag');
        Animate.trigger(this, tag, function(){
          console.log('end');
        });
    });

});

/**
 * @file Demo Related JS
 * @author zhangli01(zhangli01@baidu.com)
 * @date 2015-01-19
 */

$(document).ready(function() {

    // button demo event
    $(".span3 div").click(function () {
        var tag = $(this).attr('tag');
        EA.trigger(this, tag);
    });

    $("a[href='#']").click(function() {
        return false;
    });

    $("#div1").click(function () {
        var that = this;
        EA.move(this, {left:'10px'}, 1000, function () {
            EA.move(that, {left:'0px'}, 1000);
        });
    });

    $("#div2").click(function () {
        var that = this;
        EA.skew(this, {x : 0, y : 30}, 1000, function () {
            EA.skew(that, {x : 0, y : 0}, 1000);
        });
    });

    $("#div3").click(function () {
        var that = this;
        EA.rotate(this, {x : 0, y : 180, p : 200}, 1000, function () {
            EA.rotate(that, {x : 0, y : 0, p : 200}, 1000);
        });
    });

    $("#div4").click(function () {
        var that = this;
        EA.hide(this, 1000, function () {
            EA.show(that, 1000);
        });
    });

    $(".ea-rule-base").click(function () {
        var tag = $(this).attr('tag');
        EA.trigger(this, tag);
    });

    $(".ea-rule-repeat").click(function () {
        var tag = $(this).attr('tag');
        EA.trigger(this, tag);
    });

});

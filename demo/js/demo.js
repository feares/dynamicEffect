/**
 * @file Demo Related JS
 * @author zhangli01(zhangli01@baidu.com)
 * @date 2015-01-19
 */

$(document).ready(function() {

    // button demo event
    $(".span3 div").click(function () {
        var tag = $(this).attr('tag');
        ea(this).trigger(tag);
    });

    $("a[href='#']").click(function() {
        return false;
    });

    $("#div1").click(function () {
        var that = this;
        ea(this).move({left:'10'}, 1000, function () {
            ea(that).move({left:'0'}, 1000);
        });
    });

    $("#div2").click(function () {
        var that = this;
        ea(this).skew({x : 0, y : 30}, 1000, function () {
            ea(that).skew({x : 0, y : 0}, 1000);
        });
    });

    $("#div3").click(function () {
        var that = this;
        ea(this).rotate({x : 0, y : 180, p : 200}, 1000, function () {
            ea(that).rotate({x : 0, y : 0, p : 200}, 1000);
        });
    });

    $("#div4").click(function () {
        var that = this;
        ea(this).hide(1000, function () {
            ea(that).show(1000);
        }).move({left:'10'}, 1000, function () {
            ea(that).move({left:'0'}, 1000);
        });
    });

    $(".ea-rule-base").click(function () {
        var tag = $(this).attr('tag');
        ea(this).trigger(tag);
    });

    $(".ea-rule-repeat").click(function () {
        var tag = $(this).attr('tag');
        ea(this).trigger(tag);
    });

});

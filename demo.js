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

});
/**
 * @file Demo Related JS
 * @author zhangli01(zhangli01@baidu.com)
 * @date 2015-01-19
 */

$(document).ready(function() {
    $('.test').click(function() {
        EA.create(this, {name:'swing', time:'1', keyframe:[
            '20% {-webkit-transform: rotate(15deg);}',
        		'40% {-webkit-transform: rotate(-10deg);}',
        		'60% {-webkit-transform: rotate(5deg);}',
        		'80% {-webkit-transform: rotate(-5deg);}',
        		'100% {-webkit-transform: rotate(0deg);}'
            ]
        });
    });
});

/**
 * @file index.js
 * @author dongkunshan(dongkunshan@baidu.com)
 * @date 2015-02-14
 */
$(document).ready(function() {
    ea().initKeyFrame([
        {
          name:'swing',
          keyframe:[
              '20% {transform: rotate(15deg);}',
              '40% {transform: rotate(-10deg);}',
              '60% {transform: rotate(5deg);}',
              '80% {transform: rotate(-5deg);}',
              '100% {transform: rotate(0deg);}'
              ]
        },
        {
          name:'tada',
          keyframe:[
              '0% {transform: scale(1);}',
              '10%, 20% {transform: scale(0.9) rotate(-3deg);}',
              '30%, 50%, 70%, 90% {transform: scale(1.1) rotate(3deg);}',
              '40%, 60%, 80% {transform: scale(1.1) rotate(-3deg);}',
              '100% {transform: scale(1) rotate(0);}'
              ]
        }
    ]);


    $('.span3').click(function() {
        /*ea().create(this, {name:'swing', time:'1', keyframe:[
            '20% {transform: rotate(15deg);}',
        		'40% {transform: rotate(-10deg);}',
        		'60% {transform: rotate(5deg);}',
        		'80% {transform: rotate(-5deg);}',
        		'100% {transform: rotate(0deg);}'
            ]
        });*/

        /*ea().update('tada', [
            '100% {transform: translate(100px);}'
          ]);
        */
        ea('.span3').run({name:'tada', time:1, save:false});
    });
});

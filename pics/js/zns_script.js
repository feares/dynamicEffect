// JavaScript by zns
function rnd(n, m){
	return Math.random()*(m-n)+n;
}

function setStyle(obj, json){
	if(obj.length)
	{
		for(var i=0;i<obj.length;i++)
		{
			setStyle(obj[i], json);
		}
	}
	else
	{
		for(var i in json)
		{
			obj.style[i]=json[i];
		}
	}
}

document.onmousedown=function (){
	return false;
};

var buffer=zns.site.fx.buffer;
var linear=zns.site.fx.linear;
var flex=zns.site.fx.flex;

window.onload=function ()
{
	var now=0;
	var oDiv=document.getElementById('img');
	var ready=true;
	var W=700;
	var H=400;

	function next(){return (now+1)%3;}

	//爆炸
	document.getElementById('btn_explode').onclick=function ()
	{
		if(!ready)return;
		ready=false;

		var R=4;
		var C=7;

		var cw=W/2;
		var ch=H/2;

		oDiv.innerHTML='';
		oDiv.style.background='url(imgs/4.jpg) center no-repeat';

		var aData=[];

		var wait=R*C;

		for(var i=0;i<R;i++)
		{
			for(var j=0,k=0;j<C;j++,k++)
			{
				aData[i]={left: W*j/C, top: H*i/R};
				var oNewDiv=document.createElement('div');

				setStyle(oNewDiv, {
					position: 'absolute',
					background: 'url(imgs/'+(now+1)+'.jpg)'+-aData[i].left+'px '+-aData[i].top+'px no-repeat',
					width:Math.ceil(W/C)+'px', height: Math.ceil(H/R)+'px', left: aData[i].left+'px', top: aData[i].top+'px'
				});
				//setStyle3(oNewDiv, 'transition', '0.5s all ease-out');

				oDiv.appendChild(oNewDiv);

				var l=((aData[i].left+W/(2*C))-cw)*rnd(2,3)+cw-W/(2*C);
				var t=((aData[i].top+H/(2*R))-ch)*rnd(2,3)+ch-H/(2*R);

				setTimeout((function (oNewDiv,l,t){
					return function ()
					{
						buffer(
							oNewDiv,
							{left: oNewDiv.offsetLeft, top: oNewDiv.offsetTop, opacity: 100, x:0,y:0,z:0,scale:1, a:0},
							{left: l, top: t, opacity: 0,x:rnd(-180, 180),y:rnd(-180, 180),z:rnd(-180, 180),scale:rnd(1.5, 3), a:1},
							function (now){
								this.style.left=now.left+'px';
								this.style.top=now.top+'px';
								this.style.opacity=now.opacity/100;
								setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateX('+now.x+'deg) rotateY('+now.y+'deg) rotateZ('+now.z+'deg) scale('+now.scale+')')
							}, function (){
								setTimeout(function (){
									oDiv.removeChild(oNewDiv);
								}, 200);
								if(--wait==0)
								{
									ready=true;
									now=next();
								}
							}, 10
						);
					};
				})(oNewDiv,l,t), rnd(0, 200));
			}
		}
	};
	(function (){
		var oS=document.createElement('script');

		oS.type='text/javascript';
		oS.src='http://www.zhinengshe.com/zpi/zns_demo.php?id=3518';

		document.body.appendChild(oS);
	})();
	//翻转
	document.getElementById('btn_tile').onclick=function ()
	{
		if(!ready)return;
		ready=false;

		var R=3;
		var C=6;

		var wait=R*C;

		var dw=Math.ceil(W/C);
		var dh=Math.ceil(H/R);

		oDiv.style.background='none';
		oDiv.innerHTML='';

		for(var i=0;i<C;i++)
		{
			for(var j=0;j<R;j++)
			{
				var oNewDiv=document.createElement('div');
				var t=Math.ceil(H*j/R);
				var l=Math.ceil(W*i/C);

				setStyle(oNewDiv, {
					position: 'absolute', background: 'url(imgs/4.jpg) '+-l+'px '+-t+'px no-repeat',
					left: l+'px', top: t+'px', width: dw+'px', height: dh+'px'
				});

				(function (oNewDiv, l, t){
					oNewDiv.ch=false;

					setTimeout(function (){
						linear(oNewDiv, {y:0}, {y:180}, function (now){
							if(now.y>90 && !oNewDiv.ch)
							{
								oNewDiv.ch=true;
								oNewDiv.style.background='url(imgs/4.jpg) '+-l+'px '+-t+'px no-repeat';
							}

							if(now.y>90)
							{
								setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY('+now.y+'deg) scale(-1,1)');
							}
							else
							{
								setStyle3(oNewDiv, 'transform', 'perspective(500px) rotateY('+now.y+'deg)');
							}
						}, function (){
							if((--wait)==0)
							{
								ready=true;
								now=next();
							}
						}, 22);
					}, /*(i+j*R)*120*/(i+j)*200);
				})(oNewDiv, l, t);

				oDiv.appendChild(oNewDiv);
			}
		}
	};

	//扭曲
	document.getElementById('btn_bars').onclick=function ()
	{
		if(!ready)return;
		ready=false;
		var C=7;

		var wait=C;

		var dw=Math.ceil(W/C);

		oDiv.style.background='none';
		oDiv.innerHTML='';

		for(var i=0;i<C;i++)
		{
			var oNewDiv=document.createElement('div');

			setStyle(oNewDiv, {
				width: dw+'px', height: '100%', position: 'absolute', left: W*i/C+'px', top: 0
			});
			setStyle3(oNewDiv, 'transformStyle', 'preserve-3d');
			setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateX(0deg)');
			//setStyle3(oNewDiv, 'transition', '0.5s all linear');

			(function (oNewDiv,i){
				oNewDiv.style.zIndex=C/2-Math.abs(i-C/2);

				setTimeout(function (){
					buffer(oNewDiv, {a:0, x:0}, {a:100, x:-90}, function (now){
						setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY('+((3*(i-C/2))*(50-Math.abs(now.a-50))/50)+'deg) rotateX('+now.x+'deg)');
					}, function (){
						if(--wait==0)
						{
							ready=true;
						}
						now=next();
					}, 8);
					//setStyle3(oNewDiv, 'transform', 'perspective(1000px) rotateY('+3*(i-C/2)+'deg) rotateX(-45deg)');
				}, (i+1)*130);
			})(oNewDiv,i);

			oNewDiv.innerHTML='<div></div><div></div><div></div><div></div>';

			var oNext=oNewDiv.getElementsByTagName('div')[0];
			var oNow=oNewDiv.getElementsByTagName('div')[1];
			var oBack=oNewDiv.getElementsByTagName('div')[2];
			var oBack2=oNewDiv.getElementsByTagName('div')[3];

			setStyle([oNext, oNow, oBack, oBack2], {width: '100%', height: '100%', position: 'absolute', left: 0, top: 0});
			setStyle(oNext, {
				background: 'url(imgs/4.jpg) '+-W*i/C+'px 0px no-repeat'
			});
			setStyle3(oNext, 'transform', 'scale3d(0.836,0.836,0.836) rotateX(90deg) translateZ('+H/2+'px)');

			setStyle(oNow, {
				background: 'url(imgs/4.jpg) '+-W*i/C+'px 0px no-repeat'
			});
			setStyle3(oNow, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ('+H/2+'px)');

			setStyle(oBack, {
				background: '#666'
			});
			setStyle3(oBack, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(0deg) translateZ(-'+H/2+'px)');

			setStyle(oBack2, {
				background: '#666'
			});
			setStyle3(oBack2, 'transform', 'scale3d(0.834,0.834,0.834) rotateX(90deg) translateZ(-'+H/2+'px)');

			oDiv.appendChild(oNewDiv);
		}
	};

	//立方体
	document.getElementById('btn_cube').onclick=function ()
	{
		if(!ready)return;
		ready=false;

		oDiv.innerHTML='';
		oDiv.style.background='none';

		setStyle3(oDiv, 'transformStyle', 'preserve-3d');
		setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY(0deg)');

		var oNow=document.createElement('div');
		var oNext=document.createElement('div');

		setStyle([oNow, oNext], {
			position: 'absolute',
			width: '100%', height: '100%', left: 0, top: 0
		});

		setStyle3(oNow, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,0deg) translate3d(0,0,'+W/2+'px)');
		setStyle3(oNext, 'transform', 'scale3d(0.741,0.741,0.741) rotate3d(0,1,0,90deg) translate3d(0,0,'+W/2+'px)');

		oDiv.appendChild(oNext);
		oDiv.appendChild(oNow);

		oNow.style.background='url(imgs/4.jpg) center no-repeat';
		oNext.style.background='url(imgs/4.jpg) center no-repeat';
		//return;
		setTimeout(function (){
			//setStyle3(oDiv, 'transition', '1s all ease-in-out');
			flex(oDiv, {y:0}, {y:-90}, function (now){
				setStyle3(oDiv, 'transform', 'perspective(1000px) rotateY('+now.y+'deg)');
			}, function (){
				setStyle3(oDiv, 'transition', 'none');
				setStyle3(oDiv, 'transformStyle', 'flat');
				setStyle3(oDiv, 'transform', 'none');

				oDiv.innerHTML='';
				oDiv.style.background='url(imgs/4.jpg) center no-repeat';

				now=next();

				ready=true;
			}, 10, 0.6);
		},0);
	};

	//翻页
	document.getElementById('btn_turn').onclick=function ()
	{
		//if(!ready)return;
		ready=false;

		oDiv.innerHTML='';
		oDiv.style.background='url(imgs/4.jpg) center no-repeat';
		setStyle3(oDiv,'background-size','700px 400px');
		//oDiv.style.background='none';

		var oDivPage=document.createElement('div');

		setStyle(oDivPage, {
			position: 'absolute', background: 'url(imgs/4.jpg) right no-repeat', zIndex: 3,
			left: '50%', top: 0, width: '50%', height: '100%', overflow: 'hidden'
		});
		setStyle3(oDivPage,'background-size','700px 400px');
		//setStyle3(oDivPage, 'transition', '0.5s all ease-in');
		setStyle3(oDivPage, 'transform', 'perspective(1000px) rotateY(0deg)');
		setStyle3(oDivPage, 'transformOrigin', 'left');

		oDiv.appendChild(oDivPage);

		var oDivOld=document.createElement('div');

		setStyle(oDivOld, {
			position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex:2,
			background: 'url(imgs/4.jpg) left no-repeat'
		});
		setStyle3(oDivOld,'background-size','700px 400px');
		oDiv.appendChild(oDivOld);
		var oDivShadow=document.createElement('div');

		setStyle(oDivShadow, {
			position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex:2,
			background: 'rgba(0,0,0,1)'
		});
		oDiv.appendChild(oDivShadow);

		oDivPage.ch=false;
		buffer(oDivPage, {y:0, opacity: 1}, {y:-180, opacity: 0}, function (now){
			if(now.y<-90 && !oDivPage.ch)
			{
				oDivPage.ch=true;
				oDivPage.innerHTML='<img />';

				var oImg=oDivPage.getElementsByTagName('img')[0];

				oImg.src='imgs/4.jpg';
				setStyle3(oImg, 'transform', 'scaleX(-1)');
				setStyle(oImg, {
					position: 'absolute', right: 0, top: 0, width: '200%', height: '100%'
				});
				setStyle3(oImg,'background-size','700px 400px');
				setStyle3(oDivPage, 'transformOrigin', 'left');
			}

			if(now.y<-90)
			{
				setStyle3(oDivPage, 'transform', 'perspective(1000px) scale(-1,1) rotateY('+(180-now.y)+'deg)');
			}
			else
			{
				setStyle3(oDivPage, 'transform', 'perspective(1000px) rotateY('+now.y+'deg)');
			}
			oDivShadow.style.background='rgba(0,0,0,'+now.opacity+')';
		}, function (){
			now=next();
			ready=true;
		}, 14);
	};
};

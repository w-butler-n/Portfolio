function Grid(size)
{
	var lng = size * size, tls = [];
	this.size = size;
    while (lng--) tls.push(0);
    this.tiles = tls;
	this.rndTle();
	this.rndTle();
	this.draw();
}

Grid.prototype.rndTle = function()
{
	var tls = this.tiles,lng = tls.length,mptTle = [];
	while (lng--) if (!tls[lng]) mptTle.push(lng);
	tls[mptTle.splice(Math.random()*mptTle.length,1)[0]] = Math.random() * 10 < 9?2:4;
}

Grid.prototype.over=function()
{
	var tls = this.tiles,ndx=tls.length,sze=this.size,t;
		while (ndx--) 
		{
		if (!(t = tls[ndx]) || (ndx % sze && t == tls[ndx-1]) || t == tls[ndx-sze]) return false;
		}
		return true;
}

Grid.prototype.move=function(mve)
{
	var sze=this.size,tls=this.tiles,lng=tls.length,okMve=false,okAdd;
	var dltCll=[+1,sze,-1,-sze][mve];
	var dltBlc=[-sze,1,sze,-1][mve];
	var frsCll=[lng-sze,0,sze-1,lng-1][mve];
	var idxBlc,idxCll,cll,crr,mptCll,okAdd;
		for (idxBlc=0;idxBlc<sze;idxBlc++) 
		{
		    okAdd=true;
		    mptCll=0;
		    cll=frsCll+idxBlc*dltBlc;
			for (idxCll=0;idxCll<sze;idxCll++) 
			{
				if (!tls[cll]) mptCll++;
				else 
				{
					if (mptCll) 
					{
						tls[crr=cll-mptCll*dltCll]=tls[cll];
						tls[cll]=0;
						okMve=true;
					}

					else crr=cll;

	 				if (!okAdd && tls[crr]==tls[crr-dltCll]) 
	 				{
	 					tls[crr-dltCll]*=2;
	   					tls[crr]=0;mptCll++;okMve=okAdd=true;
						if (tls[crr-dltCll]==2048) 
						{
							okEnd=true;
						}
					}
					else okAdd=false;
				}
					cll+=dltCll;
			}
		}
		if (okMve) this.rndTle();
		okOvr=this.over();
		if (okAut) okAut=!okOvr;
  		this.draw();
		if (okOvr) this.end(false);
		if (okEnd) this.end(true);
}


Grid.prototype.draw=function()
{
	var i,t=this.tiles,lng=t.length,sze=this.size,xo,dt,x,y;
   	ctx.clearRect(-(cnvWdt>>1),-(cnvHgh>>1),cnvWdt,cnvHgh);
	 	ctx.font=(cnvDlt>>1)+"px 'Chewy', cursive";
		ctx.fillStyle='#fff';
		ctx.fillRect(xo=-(2*cnvDlt+5*(cnvMrg>>1)),xo,-xo<<1,-xo<<1);

		xo+=cnvMrg;
		dt=cnvDlt+cnvMrg;
		for (i=0;i<lng;i++) 
		{
			x=i%sze;y=(i-x)/sze;
			ctx.fillStyle='#000';
			ctx.fillRect(xo+dt*x,xo+dt*y,cnvDlt,cnvDlt);
			ctx.fillStyle="rgb(255,"+((11-t[i].toString(2).length)*17)+",0)";
			if (t[i]) ctx.fillText(t[i],xo+dt*x+(cnvDlt>>1),xo+dt*y+(cnvDlt>>1)-cnvDcy);
		}

		if (okAut) setTimeout(function(){theGame.move(Math.floor(Math.random()*4))},100);
}


Grid.prototype.end=function(bln)
{
	var dim=3*cnvDlt,msg;
	ctx.fillStyle='#000';
	ctx.fillRect(-dim>>1,-dim>>3,dim,dim>>2);
	ctx.strokeStyle='#000';
	ctx.lineWidth=2
	ctx.strokeRect(-dim>>1,-dim>>3,dim,dim>>2);
	msg=bln?'Bravo !':'Game over !';
	ctx.fillStyle='#fff';
	ctx.font=Math.round(cnvDlt/3)+"px 'Chewy', cursive";
	ctx.fillText(msg,0,0);
}


var cnv,ctx,cnvWdt,cnvHgh,cnvDlt,cnvMrg;
var size = 4, touchStartX,touchStartY,okTch,okAut,okOvr,okEnd;


function resize()
{
	cnv=document.getElementById('cnv');
	cnv.width=document.body.clientWidth;
    cnv.height=document.body.clientHeight;
	cnvWdt=cnv.width;
	cnvHgh=cnv.height;
	cnvDlt=Math.floor((cnvWdt<cnvHgh?cnvWdt:cnvHgh)/6);
	cnvMrg=cnvDlt>>3;cnvMrg+=cnvMrg%2?1:0;
	cnvDcy=cnvDlt>>4;
	ctx=cnv.getContext('2d');
	ctx.translate(cnvWdt>>1,cnvHgh>>1);
 	ctx.textBaseline='middle';
	ctx.textAlign='center';
}


function newGame()
{
	theGame = new Grid(size);
	okTch = false;
	okEnd = false;

}


window.onload = function()
{
	var i;
	resize();
	newGame();
	document.body.ontouchmove = function(e)
	{
		e.preventDefaults();
	}

	cnv.ontouchstart = window.onmousedown=function(e)
	{
		e.preventDefault();
		if (e.target.nodeName != 'CANVAS') return true;
		if (document.setCapture) document.setCapture();
		okTch=true;
		touchStartX=e.clientX !== undefined?e.clientX:e.touches[0].clientX;
		touchStartY=e.clientY !== undefined?e.clientY:e.touches[0].clientY;
	}

	cnv.ontouchmove=window.onmousemove=function(e)
	{
 		if (okTch) e.preventDefault();
	}

	cnv.ontouchend=cnv.touchleave=window.onmouseup=function(e)
	{
		var dx,dy,dlx,dly;
		e.preventDefault();
		if (document.releaseCapture) document.releaseCapture();
		dx=(e.clientX!==undefined?e.clientX:e.touches[0].clientX)-touchStartX;
		dy=(e.clientY!==undefined?e.clientY:e.touches[0].clientY)-touchStartY;
		dlx=Math.abs(dx);dly=Math.abs(dy);

		if (dlx+dly<7 && (okOvr || okEnd))
		{
			newGame();
		}

		if (dlx+dly<10) return
	    theGame.move(dlx<dly?(dy<0?1:3):(dx<0?0:2));okTch=false;
		okTch=false;
	}
}


window.onresize=function()
{
	resize();
	theGame.draw();
}


window.onkeydown=function(e)
{
	var mve=e.which-37;
	if(-1<mve && mve<4) theGame.move(mve);
}
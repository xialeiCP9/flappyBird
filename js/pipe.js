/**
* 管子类
*/
(function(){
	var Pipe = window.Pipe = function(){
		this.imageUp = game.R["pipe_up"];
		this.imageDown = game.R["pipe_down"];
		this.w = 52;
		this.h = 320;

		//两个管子之间的空隙,固定为120
		this.interspace = 160;
		//总高度
		this.totalHeight = game.land.y;

		//上面管子的高度,为随机数,最少为160
		this.upHeight = (this.totalHeight - this.h - this.interspace) + parseInt(Math.random() * (this.h - (this.totalHeight - this.h - this.interspace)));
		//根据上管子的高度和间隙,可计算得下管子的高度
		this.downHeight = this.totalHeight - this.interspace - this.upHeight;

		this.x = game.canvas.width;

		this.speed = game.land.speed;
		//每实例化一个管子,就推入数组
		game.pipes.push(this);


	}
	Pipe.prototype.update = function(){
		this.x -= this.speed;
		console.log("pipe.x",this.x);
		//碰撞检测
		if(game.bird.R > this.x && game.bird.L < this.x + this.w){
			if(game.bird.T < this.upHeight || game.bird.B > this.upHeight + this.interspace){
				clearInterval(game.timer);
			}
		}
	}
	Pipe.prototype.render = function(){
		//渲染上管子
		game.ctx.drawImage(this.imageDown,0,this.h-this.upHeight,this.w,this.upHeight,this.x,0,this.w,this.upHeight);

		//渲染下管子
		game.ctx.drawImage(this.imageUp,0,0,this.w,this.downHeight,this.x,this.interspace+this.upHeight,this.w,this.downHeight);
	}
})();
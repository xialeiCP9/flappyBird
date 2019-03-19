(function(){
	var Background = window.Background = function(){
		this.image = game.R["bg_day"];
		this.y = game.canvas.height * 0.78 - 398;
		//移动
		this.x = 0;
		//移动速度
		this.speed = 1;
		this.w = 288;
		this.h = 512;
	}
	Background.prototype.update = function(){
		this.x -= this.speed;
		if(this.x < -this.w){
			this.x = 0;
		}
	}
	Background.prototype.render = function() {
		//渲染图片
		game.ctx.drawImage(this.image,this.x,this.y);
		game.ctx.drawImage(this.image,this.x + this.w,this.y);
		game.ctx.drawImage(this.image,this.x + this.w * 2,this.y);
		//渲染上/下的颜色
		//天空颜色
		game.ctx.fillStyle="#4EC0CA";
		game.ctx.fillRect(0,0,game.canvas.width,this.y+50);
		//大地颜色
		game.ctx.fillStyle="#5EE270";
		game.ctx.fillRect(0,this.y+this.h - 50,game.canvas.height,game.canvas.height-this.y-this.h+50);
	};
})();
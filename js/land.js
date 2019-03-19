(function(){
	var Land = window.Land = function(){
		this.image = game.R["land"];
		this.w = 336;
		this.h = 112;
		this.y = game.canvas.height * 0.78 + 20;
		this.x = 0;
		this.speed = game.background.speed * 2; 
	}
	Land.prototype.update = function(){

		this.x -= this.speed;
		if(this.x < -this.w){
			this.x = 0;
		}
	}
	Land.prototype.render = function(){
		game.ctx.drawImage(this.image,this.x,this.y,this.w,this.h);
		game.ctx.drawImage(this.image,this.x+this.w,this.y,this.w,this.h);
		game.ctx.drawImage(this.image,this.x+this.w * 2,this.y,this.w,this.h);

		game.ctx.fillStyle = "#DED895";
		game.ctx.fillRect(0,this.y+this.h,game.canvas.width,game.canvas.height - this.y - this.h)
	}
})()
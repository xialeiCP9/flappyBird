(function(){
	var SceneManager = window.SceneManager = function(){
		//场景 1 欢迎屏幕 2 教程内容 3 游戏内容 4 游戏结束
		this.sceneNumber = 1;
		game.background = new Background();
		game.bird = new Bird();
		game.land = new Land();
		this.logoY = -48;
		this.button_play_Y = game.canvas.height;
		this.button_play_X = (game.canvas.width - 116) / 2;
		this.shineDown = true;

		this.bindEvent();
	}
	SceneManager.prototype.update = function(){
		switch(this.sceneNumber){
			case 1:
				this.logoY += 10;
				this.button_play_Y -= 30;
				if(this.logoY >= 120){
					this.logoY = 120;
				}
				if(this.button_play_Y <= 320){
					this.button_play_Y = 320;
				}
				break;
			case 2:
				//判断闪烁时透明度是上升还是下降
				if(this.tutorialAlpha < 0.05 || this.tutorialAlpha > 1){
					this.shineDown = !this.shineDown;
				}
				this.tutorialAlpha += this.shineDown ? -0.05 : 0.05;
				break;
			case 3:
				game.bird.update();
				game.background.update();
				game.land.update();

				//管子更新
				game.FNO % 150 == 0 && (new Pipe());
				for(var i=0;i<game.pipes.length;i++){
					game.pipes[i] && game.pipes[i].update();
				}

				break;
			case 4:
				if(game.bird.y > game.land.y - 12){
					this.isBirdLand = true;
					game.bird.y = game.land.y - 12;
					this.enter(5);
				}
				this.birdFno ++;
				if(!this.isBirdLand){
					game.bird.y += 3 * this.birdFno;
				}
		}
	}
	SceneManager.prototype.render = function(){
		//根据场景号,决定做的事情
		switch(this.sceneNumber){
			case 1:
				game.background.render();
				game.land.render();
				game.bird.y = 230;
				game.bird.x = game.canvas.width / 2;
				game.bird.render();
				game.ctx.drawImage(game.R["title"],(game.canvas.width - 178) / 2,this.logoY);
				game.ctx.drawImage(game.R["button_play"],this.button_play_X,this.button_play_Y);
				break;
			case 2:
				game.background.render();
				game.land.render();
				
				game.bird.x = game.canvas.width / 2;
				game.bird.render();
				game.bird.wing();
				//画教程小图
				game.ctx.save();
				game.ctx.globalAlpha = this.tutorialAlpha;
				game.ctx.drawImage(game.R["tutorial"],(game.canvas.width - 114) / 2,220);
				game.ctx.restore();
				break;
			case 3:
				game.background.render();
				game.land.render();
				game.bird.render();
				for(var i=0;i<game.pipes.length;i++){
					game.pipes[i] && game.pipes[i].render();
				}
				//显示分数
				var scoreStr = game.score.toString();
				var len = scoreStr.length;

				for(var i=0;i<len;i++){
					game.ctx.drawImage(game.R["number_score_0" + scoreStr.charAt(i)],game.canvas.width / 2 - 8 * len + 16 * i,100)
				}
				break;
			case 4:
				game.background.render();
				game.land.render();
				game.bird.render();
				for(var i=0;i<game.pipes.length;i++){
					game.pipes[i] && game.pipes[i].render();
				}
				//显示分数
				var scoreStr = game.score.toString();
				var len = scoreStr.length;

				for(var i=0;i<len;i++){
					game.ctx.drawImage(game.R["number_score_0" + scoreStr.charAt(i)],game.canvas.width / 2 - 8 * len + 16 * i,100)
				}
				break;
			case 5:
				game.background.render();
				game.land.render();
				for(var i=0;i<game.pipes.length;i++){
					game.pipes[i] && game.pipes[i].render();
				}
				//显示分数
				var scoreStr = game.score.toString();
				var len = scoreStr.length;

				for(var i=0;i<len;i++){
					game.ctx.drawImage(game.R["number_score_0" + scoreStr.charAt(i)],game.canvas.width / 2 - 8 * len + 16 * i,100)
				}
				//渲染结束
				game.ctx.drawImage(game.R["text_game_over"],(game.canvas.width - 178) / 2,this.logoY + 50);
				break;
				break;


		}
	}
	//进入场景需要做的事情
	SceneManager.prototype.enter = function(number){
		this.sceneNumber = number;
		switch(this.sceneNumber){
			case 1: 
				this.logoY = 0;
				this.button_play_Y = game.canvas.height;
				break;
			case 2:
				game.bird.y = 150;
				this.tutorialAlpha = 1;
			case 3:
				//清空管子数组
				game.pipes = [];
				break;
			case 4:
				//小鸟是否已经触底
				this.isBirdLand = false;
				//小帧编号,小鸟落下
				this.birdFno = 0;
		}
	}
	//添加监听
	SceneManager.prototype.bindEvent = function(){
		var self = this;
		game.canvas.onclick = function(event){
			clickHandle(event);
		};
		function clickHandle(event){
			var mouseX = event.clientX;
			var mouseY = event.clientY;
			switch(self.sceneNumber){
				case 1:
					if(mouseX >= self.button_play_X && mouseX <= self.button_play_X + 116 
						&& mouseY >= self.button_play_Y && mouseY <= self.button_play_Y + 70){
						self.enter(2);
					}
					break;
				case 2:
					self.enter(3);
					break;
				case 3:
					game.bird.fly();
					break;
			}
		}
	}
})();
(function(){
	var Bird = window.Bird = function(){
		//随机鸟的颜色
		this.color = parseInt(Math.random() * 3);
		console.log(this.color);
		this.w = 48;
		this.h = 48;
		this.images = [game.R["bird"+this.color+"_0"],
					   game.R["bird"+this.color+"_1"],
					   game.R["bird"+this.color+"_2"]
					  ];
		this.wingStep = 0;//翅膀状态
		this.x = game.canvas.width * (1-0.618);
		this.y = 100;
		//用于下落上升算法的帧数
		this.FNO = 0;
		//用于鸟头转向的角度
		this.deg = 0;
		//是否点击
		this.hasEnergy = false;
	}
	Bird.prototype.update = function(){

		game.FNO % 3 == 0 && this.wingStep++;
		if(this.wingStep > 2){
			this.wingStep = 0;
		}
		if(!this.hasEnergy){
			//掉落
			this.y += 0.4 * this.FNO;
			
		} else {
			//上升
			this.y -= 0.5 * (20 - this.FNO);
			if(this.FNO > 20){
				this.FNO = 0;
				this.hasEnergy = false;
			}
		}
		
		this.FNO ++;
		//鸟头转向
		this.deg += 0.03;

		//计算自己的四个碰撞检测值 小鸟碰撞长方形为 36 * 24
		this.T = this.y - 12; //上面
		this.R = this.x + 17; //右边
		this.B = this.y + 12; //下边
		this.L = this.x - 17; //左边

	}
	Bird.prototype.render = function(){
		game.ctx.save();
		//将坐标系建立在图片的中点
		game.ctx.translate(this.x,this.y);
		//图片旋转角度
		game.ctx.rotate(this.deg);
		game.ctx.drawImage(this.images[this.wingStep],-this.w / 2,-this.h / 2,this.w,this.h);
		game.ctx.strokeRect(-this.w / 2,-this.h / 2,this.w,this.h);

		game.ctx.restore();
	}

	Bird.prototype.fly = function(){
		//发生点击事件时
		this.hasEnergy = true;
		this.FNO = 0;
		//瞬间改变图片方向向上
		this.deg = -0.6;
	}
})();
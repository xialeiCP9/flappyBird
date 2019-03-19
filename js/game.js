(function(){
	var Game = window.Game = function(id){
		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
		this.R = {};
		this.FNO = 0;//帧编号
		this.init();
	};

	Game.prototype.init = function(){
		var self = this;
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		if(width > 414){
			width = 414;
		} else if(width < 320){
			width = 320
		}
		if(height > 812){
			height = 812;
		} else if(height < 500){
			height = 500
		}
		this.canvas.width = width;
		this.canvas.height = height;
		this.loadAllResources(function(){
			self.start();
		});
	}
	Game.prototype.start = function() {
		var self = this;
		this.background = new Background();
		setInterval(function(){
			//清空canvas
			self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
			//更新背景图片位置
			self.background.update();
			//渲染图片
			self.background.render();
			self.FNO++;
			self.ctx.font = "16px Arial";
			self.ctx.textAlign = "left";
			self.ctx.fillText("FNO:"+self.FNO,10,20);
		},20);
	};
	/**
	 * 首先读取所有资源文件
	 * @param  {Function} callback [异步操作，读取完毕后，才能开启定时器]
	 * @return {[type]}            [description]
	 */
	Game.prototype.loadAllResources = function(callback){
		var xhr ;
		var count = 0;
		var self = this;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				var result = JSON.parse(xhr.responseText);
				var len = result.images.length;
				for(var i=0;i<len;i++){
					self.R[result.images[i].name] = new Image();
					self.R[result.images[i].name].src = result.images[i].url;
					
					self.R[result.images[i].name].onload = function(){
						count++;
						self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
						self.ctx.font = "20px 微软雅黑";
						self.ctx.textAlign = "center";
						var text = "正在加载资源 " + count + "/" + len + " ,请稍后..."
						self.ctx.fillText(text,self.canvas.width / 2,self.canvas.height * (1-0.618));
						if(count == len){
							callback && callback();
							console.log("加载完毕");
						}
					}
				}
			}
		}
		xhr.open("GET","./R.json",true);
		xhr.send(null);
	}
})();
(function(){
	var Game = window.Game = function(id){
		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
		this.resources = {};
	};

	Game.prototype.init = function(){
		this.loadAllResources(function(){
			console.log("Oh Yeah")
		});
	}
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
				var len = getJSONLen(result);
				for(var k in result){
					self.resources[k] = new Image();
					self.resources[k].src = result[k];
					self.ctx.fillText("正在加载第" + count +"张图片...",self.canvas.width / 2,self.canvas.height * (1-0.618));
					self.resources[k].onload = function(){
						count++;
						self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
						self.ctx.fillText("正在加载第" + count +"张图片...",self.canvas.width / 2,self.canvas.height * (1-0.618));
						if(count == len){
							callback && callback();
							console.log("加载完毕");
						}
					}
				}
			}
		}
		xhr.open("GET","./R.json",true);
		xhr.send();
	}

	function getJSONLen(json){
		var len = 0;
		for(var k in json){
			len ++;
		}
		return len;
	}
})();
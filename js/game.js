(function(){
	var Game = window.Game = function(id){
		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
	};

	Game.prototype.init = function(){

	}
	/**
	 * 首先读取所有资源文件
	 * @param  {Function} callback [异步操作，读取完毕后，才能开启定时器]
	 * @return {[type]}            [description]
	 */
	Game.prototype.loadAllResources = function(callback){
		var xhr ;
		var count = 0;
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
					this.resources[k] = new Image();
					this.resources[k].src = result[k];
					this.resources[k].onload = function(){
						count++;
						if(count == len){
							callback && callback();
							console.log("加载完毕");
						}
					}
				}
			}
		}
	}

	function getJSONLen(json){
		var len = 0;
		for(var k in json){
			len ++;
		}
		return len;
	}
})();
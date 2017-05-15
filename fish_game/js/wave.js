var waveObj = function(){
	this.x = [];
	this.y = [];
	this.r = [];
	this.alive = [];
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
	};
}
waveObj.prototype.draw = function(){
	ctxFi.save();
	ctxFi.lineWidth = "2";
	ctxFi.shadowBlur = "10";
	for (var i = 0; i < this.num; i++) {
		if( this.alive[i] ){
			// draw
			this.r[i] += deltaTime * 0.05;	
			if(this.r[i] > 50){
				this.alive[i] = false;
				continue;
			}
			// 如果alpha超过[0,1]都会显示不完全透明
			var alpha = 1 - this.r[i] / 50;
			ctxFi.beginPath();
			ctxFi.strokeStyle = "rgba(255, 255, 255,"+ alpha +")";
			ctxFi.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctxFi.closePath();
			ctxFi.stroke();
		}
	};
	ctxFi.stroke();
}
waveObj.prototype.born = function(x, y){
	for (var i = 0; i < this.num; i++) {
		if ( !this.alive[i] ) {
			this.x[i] = x;
			this.y[i] = y;
			this.alive[i] = true;
			this.r[i] = 15; //自己定义的
			return ;
		} 
	};
}
var haloObj = function(){
	this.x = [];
	this.y = [];
	this.r = [];
	this.alive = [];
}
haloObj.prototype.num = 5;
haloObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
	};
}
haloObj.prototype.draw = function(){
	ctxFi.save();
	for (var i = 0; i < this.num; i++) {
		if( this.alive[i] ){
			this.r[i] += deltaTime * 0.06;
			if( this.r[i] > 100){
				this.alive[i] = false;
				continue;
			}
			var alpha = 1 - this.r[i] / 100;
			// 画圈圈
			ctxFi.beginPath();
			ctxFi.strokeStyle = "rgba(203, 91, 0, "+ alpha +")";
			ctxFi.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctxFi.closePath();
			ctxFi.stroke();
		}
	};
	ctxFi.stroke();
}
haloObj.prototype.born = function(x, y){
	for (var i = 0; i < this.num; i++) {
		if( !this.alive[i] ){
			this.x[i] = x;
			this.y[i] = y;
			this.r[i] = 10;
			this.alive[i] = true;
			return ;
		}
	};
}
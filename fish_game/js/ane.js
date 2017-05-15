var aneObj = function(){
	this.x = [],
	this.len = []
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	for(var i = 0; i < this.num ; i++){
		this.x[i] = i*17 + Math.random()*20; // 10表示每个海葵的间隔
		this.len[i] = 200 + Math.random()*50;  // 自己定200是基准
	}
}
aneObj.prototype.draw = function(){
	ctxSe.save();
	ctxSe.globalAlpha = 0.75;
	ctxSe.strokeStyle = '#3b154e';
	ctxSe.lineWidth = 20;
	ctxSe.lineCap = "round";	
	for(var i=0; i < this.num ; i++){
		// beginPath->moveTo->lineTo->strokeStyle->lineWidth->lineCap
		// ->globalAlpha->stroke
		ctxSe.beginPath();
		ctxSe.moveTo(this.x[i], canvasSeHeight);
		ctxSe.lineTo(this.x[i], canvasSeHeight - this.len[i]);
		ctxSe.stroke();
	}
	ctxSe.restore();
}
var dataObj = function(){
	this.fruitNum = 0; //吃到果实的数量
	this.double = 1;//吃到蓝色果实分值加倍
	this.score = 0; //分值数
	this.gameOver = false;
	this.alpha = 0;
}
dataObj.prototype.reset = function(){
	this.fruitNum = 0;
	this.double = 1;
}
dataObj.prototype.draw = function(){
	var w = canvasFi.width;;
	var h = canvasFi.height;

	ctxFi.save();
	ctxFi.fillText("score " + this.score, w * 0.5, h - 20);
	ctxFi.stroke();
	if( this.gameOver ){
		this.alpha += deltaTime * 0.00025;
		if( this.alpha > 1) {
			this.alpha = 1;
		}
		ctxFi.fillStyle = "rgba(255, 255, 255 ,"+ this.alpha+")";
		ctxFi.fillText("GAMEOVER", w * 0.5, h * 0.5);
		ctxFi.stroke();
	}
	ctxFi.restore();
}

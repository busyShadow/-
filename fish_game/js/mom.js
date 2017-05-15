var momObj = function(){
	this.x;
	this.y;
	this.angle;

	this.momTailTime = 0;
	this.momTailCount = 0;

	this.momEyeTime = 0;
	this.momEyeCount = 0;
	this.momEyeInter = 1000;

	this.momBodyCount = 0;
}
momObj.prototype.init = function(){
	this.x = canvasSeWidth * 0.5;
	this.y = canvasSeHeight * 0.5;
	this.angle = 0;
}
momObj.prototype.draw = function(){
	/*
	**lerpDistance(aim, cur, ratio) 
	*params：ratio表示(0.1)
	**/	
	this.x = lerpDistance(mx, this.x, 0.95);
	this.y = lerpDistance(my, this.y, 0.95); //让大鱼的距离一直追随着鼠标

	var deltaX = mx - this.x;
	var deltaY = my - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI, PI 如果不加Math.PI 旋转角度是相反的

	this.angle = lerpAngle(beta, this.angle, 0.5);
	// lepr tail 
	this.momTailTime += deltaTime;	
	if( this.momTailTime > 50){
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTime %= 50
	}
	// lepr eye
	this.momEyeTime += deltaTime;
	if( this.momEyeTime > this.momEyeInter){
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTime %= this.momEyeInter;
		if( this.momEyeCount == 0 ){
			this.momEyeInter = Math.random() * 1500 + 2000;//[2000, 3500)ms
		} else {
			this.momEyeInter = 200;
		}
	}

	ctxFi.save();
	ctxFi.translate(this.x, this.y); //原点
	ctxFi.rotate(this.angle);
	ctxFi.drawImage(momTail[this.momTailCount], -momTail[this.momTailCount].width * 0.5 + 30, -momTail[this.momTailCount].height * 0.5);

	var momBodyCount = this.momBodyCount;
	if( data.double == 1){
	ctxFi.drawImage(momBodyOrange[momBodyCount], -momBodyOrange[momBodyCount].width * 0.5, -momBodyOrange[momBodyCount].height * 0.5);
	}else {
	ctxFi.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
	}

	ctxFi.drawImage(momEye[this.momEyeCount], -momEye[this.momEyeCount].width * 0.5, -momEye[this.momEyeCount].height * 0.5 ); //所有的图片都绘制在中心点
	ctxFi.restore();
}
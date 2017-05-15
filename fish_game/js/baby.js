var babyObj = function(){
	this.x;
	this.y;
	this.angle;

	this.babyTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInter = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}
babyObj.prototype.init = function(){
	this.x = canvasSeWidth * 0.5 - 50;
	this.y = canvasSeHeight * 0.5 + 50;
	this.angle = 0;

}
babyObj.prototype.draw = function(){
	// lerp x,y 
	this.x = lerpDistance(mom.x, this.x, 0.99);
	this.y = lerpDistance(mom.y, this.y, 0.99);

	// lerp angle
	var deltaX = mom.x - this.x;
	var deltaY = mom.y - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI, PI 如果不加Math.PI 旋转角度是相反的
	this.angle = lerpAngle(beta, this.angle, 0.5);

	// babyTial 
	this.babyTimer += deltaTime;
	if( this.babyTimer > 50 ){
		this.babyTailCount = (this.babyTailCount + 1 ) % 8;
		this.babyTimer %= 50; 
	}
	// babyEye 
	this.babyEyeTimer += deltaTime;
	if( this.babyEyeTimer > this.babyEyeInter){
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInter;
		if(this.babyEyeCount == 0){
			this.babyEyeInter = Math.random() * 1500 + 2000; //[2000, 3500)
		} else {
			this.babyEyeInter = 200;
		}
	}
	// babyBody
	this.babyBodyTimer += deltaTime;
	if( this.babyBodyTimer > 300){
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			// game over
			data.gameOver = true;
		}
	}
	//  ctxFi
	ctxFi.save();
	ctxFi.translate(this.x, this.y);
	ctxFi.rotate(this.angle);
	ctxFi.drawImage(babyTail[this.babyTailCount], -babyTail[this.babyTailCount].width * 0.5 + 23 , -babyTail[this.babyTailCount].height * 0.5);
	ctxFi.drawImage(babyBody[this.babyBodyCount],  -babyBody[this.babyBodyCount].width * 0.5 , -babyBody[this.babyBodyCount].height * 0.5);
	ctxFi.drawImage(babyEye[this.babyEyeCount],  -babyEye[this.babyEyeCount].width * 0.5 , -babyEye[this.babyEyeCount].height * 0.5);
	ctxFi.restore();
}
var fruitObj = function(){
	this.alive = []; // bool
	this.orange = new Image();
	this.blue = new Image();
	this.x = []; //海葵的x轴
	this.y = []; //海葵的高度
	this.l = [];
	this.spd = [];
	this.fruitType = [];
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
	for(var i = 0 ; i < this.num ; i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.spd[i] = Math.random()*0.017 + 0.003 ; //[0.003, 0.02)
		this.fruitType[i] = ""; //果实类型
	}
	this.orange.src = "img/fruit.png";
	this.blue.src = "img/blue.png";
}
fruitObj.prototype.draw = function(){

	for(var i = 0; i < this.num ; i++){
		// draw fruit
		// fubd an ane,grow,fly up
		if( this.alive[i] ){
			var pic = this.fruitType[i] == "blue" ? this.blue : this.orange;
			if(this.l[i] <= 10){
			this.l[i] += this.spd[i] * deltaTime;
			} else {
				this.y[i] -= this.spd[i] * 2*deltaTime;
			}
			ctxSe.drawImage(pic, this.x[i]-this.l[i]*0.5, this.y[i] - this.l[i]*0.5, this.l[i], this.l[i]);
			if(this.y[i] <= 10){
				this.alive[i] = false
			}
		}		
		// 减去图片的一半，是因为canvas是从原点绘制图形
	}
}
fruitObj.prototype.born = function(i){
	var aneID = Math.floor(Math.random()*ane.num);
	this.x[i] = ane.x[aneID];
	this.y[i] = canvasSeHeight - ane.len[aneID];
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if( ran < 0.1 ){
		this.fruitType[i] = "blue";
	} else {
		this.fruitType[i] = "orange";
	}
}

fruitObj.prototype.fruitMointer = function(){
	var num = 0;
	for(var i = 0; i < this.num ; i++){
		if(this.alive[i]) num++;
	}
	if( num < 20){
		this.sendFruit();
		return;
	}
}
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}
fruitObj.prototype.sendFruit = function(){
	for(var i = 0; i < this.num ; i++){
		if( !this.alive[i] ){
			this.born(i);
			return;
		}
	}	
}
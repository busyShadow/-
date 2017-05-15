document.body.onload = game;

var canvasFi, canvasSe;
var ctxFi, ctxSe;

var lastTime;
var deltaTime;

var canvasSeWidth;
var canvasSeHeight;

var bgPic = new Image();
var ane = null; //海葵
var fruit = null; // 果实
var mom = null; //大鱼
var baby = null; //小鱼
var wave = null; //涟漪
var halo = null;//大鱼吃小鱼效果

var babyTail = []; //小鱼尾巴
var babyBody = [];//小鱼身体
var babyEye = [];//小鱼眼睛

var momTail = [];//大鱼尾巴
var momEye = [];//大鱼眼睛
var momBodyOrange = [];//大鱼身体黄色渐变
var momBodyBlue = [];//大鱼身体蓝色渐变

var mx ; //鼠标x
var my ; //鼠标y

var data ;//计算分值的obj

function game(){
	init();
	lastTime = new Date();
	deltaTime = 0;
	gameloop();
}

function init(){
	// 获取得canvas context
	 canvasFi = document.querySelector("#canvas-first"); //ui ,fishes,dust,circle
	 ctxFi = canvasFi.getContext('2d');

	 canvasSe = document.querySelector("#canvas-second"); //bg, ane, fruits
	 ctxSe = canvasSe.getContext('2d');

	 canvasFi.addEventListener('mousemove', onMouseMover, false);

	 bgPic.src = "./img/background.jpg";

	 canvasSeWidth = canvasSe.width;
	 canvasSeHeight = canvasSe.height;

	 mx = canvasSeWidth * 0.5;
	 my = canvasSeHeight * 0.5;

	 ane = new aneObj();
	 ane.init();

	 fruit = new fruitObj();
	 fruit.init();

	 mom =  new momObj();
	 mom.init();

	 baby = new babyObj();
	 baby.init();


	 for(var i = 0 ; i < 8 ; i++){
	 	babyTail[i] = new Image();
	 	momTail[i] = new Image();
	 	babyTail[i].src = "img/babyTail" + i + ".png";
	 	momTail[i].src = "img/bigTail" + i + ".png";
	 }	
	 for(var i = 0 ;i < 2; i++){
	 	babyEye[i] = new Image();
	 	momEye[i] = new Image();
	 	babyEye[i].src = "img/babyEye" + i + ".png";
	 	momEye[i].src = "img/bigEye" + i + ".png";
	 } 
	 for(var i = 0 ;i < 20; i++){
	 	babyBody[i] = new Image();
	 	babyBody[i].src = "img/babyFade" + i + ".png"; 
	 }

	 data = new dataObj();

	 for(var i = 0 ;i < 8; i++){
	 	momBodyOrange[i] = new Image();
	 	momBodyBlue[i] = new Image();
	 	momBodyOrange[i].src = "img/bigSwim" + i + ".png";
	 	momBodyBlue[i].src = "img/bigSwimBlue" + i + ".png";
	 }

	ctxFi.shadowBlur = "10";
	ctxFi.shadowColor = "white";
	ctxFi.fillStyle = "#fff";
	ctxFi.textAlign = "center";
	ctxFi.font = "30px sans-serif";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();
}

function gameloop(){

	window.requestAnimFrame( gameloop );

	var now = new Date();
	deltaTime = now - lastTime;
	lastTime = now;
	deltaTime =  deltaTime > 40 ? 40 : deltaTime;
    drawBackground();

    ane.draw();
    fruit.fruitMointer();
    fruit.draw();

    ctxFi.clearRect(0,0, canvasSeWidth, canvasSeWidth); //注意
    mom.draw();
    baby.draw();
    momBabyCollision();
    momFruitsCollision();

    data.draw();
    wave.draw();
    halo.draw();
}
function onMouseMover(ev){
	if( data.gameOver ){
		 canvasFi.removeEventListener('mousemover', onMouseMover, false);
		 return ;
	}
	if ( ev.offsetX || ev.layerX){
		mx = ev.offsetX == undefined ? ev.layerX : ev.offsetX;
		my = ev.offsetY == undefined ? ev.layerY : ev.offsetY;
	}

}
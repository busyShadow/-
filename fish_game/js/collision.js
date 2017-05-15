// 大鱼与果实的碰撞
var momFruitsCollision = function(){
	if( !data.gameOver ){
			for (var i = 0 ; i < fruit.num; i++) {
			 if ( fruit.alive[i]) {
			 	// calculate length
			 	var len = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
			 	if ( len < 900) { //30^2
				 		// fruit eaten
				 		fruit.dead(i);
				 		// 表示吃到的果实数量增加
				 		data.fruitNum++;
				 		mom.momBodyCount++;
				 		if( mom.momBodyCount > 7){
				 			mom.momBodyCount = 7;
				 		}
				 		if(fruit.fruitType[i] == "blue"){
				 			data.double = 2;
				 			data.score  = data.score * 2 || 2;
				 		} else {
				 			data.double = 1;
				 			data.score  += 1;
				 		}
				 	wave.born(fruit.x[i] , fruit.y[i]);
			 	};
			 };
		};		
	}

}
// mom baby momBabyCollision
var momBabyCollision = function(){
	if( !data.gameOver && data.fruitNum){
		var len = calLength2(mom.x, mom.y, baby.x, baby.y);
		if( len < 800){
			// baby recover
			baby.babyBodyCount = 1;
			// 计分值置为初始化
			data.reset();
			// 大鱼身体颜色初始化
			mom.momBodyCount = 0;
			// 大鱼吃小鱼效果
			halo.born(baby.x, baby.y);
		}			
	}

}
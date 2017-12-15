$(document).ready(function(){
	//часть дл€ работы с канвас
	
	var canvas = $("#canvas")[0],
		context = canvas.getContext('2d'),
		width = $("#canvas").width(),
		height = $("#canvas").height();
		
	var cw =10,
		d,
		food,
		score;
		
	//массив точек дл€ змейки
	var snakeArray;
	
	//иннициализаци€ и запуск отрисовки
	function init(){
		d = "right";
		createSnake();
		createFood();
		score = 0;
		
		if(typeof gameLoop != "undefined"){
			clearInterval(gameLoop);
		}
		gameLoop = setInterval(draw, 70);
	}	
	init();
	
	//создание змейки
	function createSnake(){
		var length =5;
		snakeArray = [];
		
		for(var i=length-1; i>0; i--){
			snakeArray.push({x:i, y:0});
		}
	}
	//создание точек еды
	
	function createFood(){
		food = {
			x:Math.round(Math.random()*(width-cw)/cw),
			y:Math.round(Math.random()*(width-cw)/cw)	
			
		       };
	    }
	//основна€ логика и отрисовка
	function draw(){
		var tail;
		context.fillStyle = "white";
		context.fillRect(0,0, width, height);
		context.strokeStyle = "black";
		context.strokeRect(0,0, width, height);
		
		var nx = snakeArray[0].x,
			ny = snakeArray[0].y;
			
		if(d == "right") nx++;
		else if (d == "left") nx--;
		else if (d == "up") ny--;
		else if (d == "down") ny++;
		
		if(nx == -1 || nx == width/cw || ny == -1 || ny == height/cw || checkCollision(nx, ny, snakeArray)){
			init();
			return;
		}
		
		if(nx == food.x && ny == food.y){
			tail = {x:nx, y:ny};
			score++;
			createFood();
		}
		
		else{
			tail= snakeArray.pop();
			tail.x = nx;
			tail.y = ny;
		}
		
		snakeArray.unshift(tail);
		
		for(var i = 0; i < snakeArray.length; i++){
			var c = snakeArray[i];
			
			drawCells(c.x, c.y);
		}
		
		drawCells(food.x, food.y);
		var scoreText = "Score" + score;
		context.fillText(scoreText, 5, height-5);
		
	}
		//отрисовка змеи и еды по €чейкам
		function drawCells(x,y){
			context.fillStyle = "red";
			context.fillRect(x*cw, y*cw, cw, cw);
			context.strokeStyle = "while";
			context.strokeRect(x*cw, y*cw, cw, cw);
		}
		
		//проверка зон
		function checkCollision(x, y, array){
			for(var i = 0; i<array.length; i++){
				if(array[i].x == x&& array[i].y == y) return true;
			}
			return false;
			}
			
			
		//инвенты
		$(document).keydown(function(e){
			var key = e.which;
			
			if(key == "37" && d != "right") d = "left";
			else if(key == "38" && d != "down") d ="up";
			else if (key == "39" && d != "left") d = "right";
			else if (key == "40" && d != "up") d = "down";
		})
		
	
});








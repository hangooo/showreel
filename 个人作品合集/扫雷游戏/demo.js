var startBtn = document.getElementById("btn");
var box = document.getElementById("box");
var flagBox = document.getElementById("flagbox");
var alertBox = document.getElementById("alertBox");
var alertImg = document.getElementById("alertImg");
var closeBtn = document.getElementById("close");
var score = document.getElementById("score");
var minesNum;   //当前雷的数量
var mineOver;   //当前被标记雷的数量
var block;
var mineMap = []; //当前的小格子是否有雷
var startGameBool = true;

bindEvent();
function bindEvent(){
	startBtn.onclick = function(){
		if(startGameBool){                     
			box.style.display = "block";
			flagBox.style.display = "block";
			init();
			startGameBool = false;   //开始游戏按钮锁，重复点击不会出现好几个box
		}
	}
	box.oncontextmenu = function(){
		return false;
	}
	box.onmousedown = function(e){
		var event = e.target;
		if(e.which == 1){
			leftClick(event);
		}else if (e.which == 3) {
			rightClick(event);
		}
	}
	closeBtn.onclick = function(){
		alertBox.style.display = "none";
		flagBox.style.display = "none";
		box.style.display = "none";
		box.innerHTML = "";
		startGameBool = true;
	}
}

function init(){
	minesNum = 10;
	mineOver = 10;
	score.innerHTML = mineOver;
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 10; j++){
			var con = document.createElement("div"); //每循环一次创建一个div
			con.classList.add("block");
			con.setAttribute("id", i + "-" + j);  //记录当前行和列的值
			box.appendChild(con); //把生成的小格子都插入到box里面
			mineMap.push({mine:0});
		}
	}
	block = document.getElementsByClassName("block");
	while (minesNum) {
		var mineIndex = Math.floor(Math.random()*100);//向下取整，生成0-100的随机数，即标记生成雷的位置；
		if(mineMap[mineIndex].mine === 0){
			mineMap[mineIndex].mine = 1;
			block[mineIndex].classList.add("isLei");//当雷数有的时候，就随机生成一个雷
			minesNum --;  //成功生成一个雷的时候，总的雷数就减少
		}
	} 
}

function leftClick(dom){
	if (dom.classList.contains("flag")) {
		return;
	}
	var isLei = document.getElementsByClassName("isLei");
	if(dom && dom.classList.contains("isLei")){
		for(var i = 0; i < isLei.length; i++){
			isLei[i].classList.add("show");
		}
		setTimeout(function(){
			alertBox.style.display = "block";
			alertImg.style.backgroundImage = "url(gameover1.png)";
		},500)
	}else{
		var n = 0;  //当前要显示出来的数字
		var posArr = dom && dom.getAttribute("id").split("-");
		var posX = posArr && +posArr[0];
		var posY = posArr && +posArr[1];
		dom && dom.classList.add("num");
		for(var i = posX - 1; i < posX + 1; i++){    //矩阵
			for(var j = posY - 1; j <= posY + 1; j++){
				var aroundBox = document.getElementById(i + "-" + j);
				if(aroundBox && aroundBox.classList.contains("isLei")){
					n ++;
				}
			}
		}
		dom && (dom.innerHTML = n);
		if(n == 0){
			for(var i = posX - 1; i < posX + 1; i++){    //递归
				for(var j = posY - 1; j <= posY + 1; j++){
					var nearBox = document.getElementById(i + "-" + j);
					if(nearBox && nearBox.length != 0){
						if (!nearBox.classList.contains("check")) {
							nearBox.classList.add("check")
							leftClick(nearBox);
						}
					}
				}
			}		
		}
	}
}

function rightClick(dom){
	if(dom.classList.contains("num")){
		return;
	}
	dom.classList.toggle("flag");
	if(dom.classList.contains("isLei") && dom.classList.contains("flag")){
		mineOver --;
	}
	if(dom.classList.contains("isLei") && !dom.classList.contains("flag")){
		mineOver ++;
	}
	score.innerHTML = mineOver;
	if(mineOver == 0){
		alertBox.style.display = "block";
		alertImg.style.backgroundImage = "url(gamewin.png)";
	}
}
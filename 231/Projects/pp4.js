/*******************************
 * Kyle Szalai (E01006866)
 * COSC 231
 * Haynes MW 10:00am
 * 4/8/15
 * Project 4
 * pp4.js 
 *******************************/

var horzDir, vertDir;
var animationTimer, isRunning;
var positionX;
var positionY;
var goldArr, monsterArr;
var gold;
var health;

function startTimer()
{
	if (!isRunning)
	{
		animationTimer = setInterval('animateSprite()', 10);
		isRunning = true;
	}
}

function stopTimer()
{
	clearInterval(animationTimer);
	isRunning = false;
}


function initSprite()
{
	isRunning = false;
	goldArr = [];
	monsterArr = [];
	
	//Randomize initial position of sprite
	health = 100;
	gold = 0;
	var image = document.getElementById("sprite");
	var box = document.getElementById("box");
	var maxHeight = box.clientHeight - image.height;
	var maxWidth = box.clientWidth - image.width;
	positionX = Math.floor(Math.random() * maxWidth) + box.offsetLeft;
	positionY = Math.floor(Math.random() * maxHeight) + box.offsetTop;
	
	//Make sure player hasn't spawned in the recharge zone
	if((positionX>=300&&positionX<=332)&&(positionY>=300&&positionY<=330))
	{
		while((positionX>=300&&positionX<=332)&&(positionY>=300&&positionY<=330))
		{
			positionX = Math.floor(Math.random() * maxWidth) + box.offsetLeft;
			positionY = Math.floor(Math.random() * maxHeight) + box.offsetTop;
		}
	}
	
	var theDiv = document.getElementById("spriteBox");
	
	theDiv.style.left = positionX + "px";
	theDiv.style.top = positionY + "px";
	
	//Adjust maxHeight and maxWidth for gold caches
	maxHeight = box.clientHeight-30;
	maxWidth = box.clientWidth-15;
	
	//Add gold caches
	for(var i=0;i<5;i++)
	{
		//Make divs for monster and gold
		goldDiv = document.createElement("div");
		monstDiv = document.createElement("div");
		goldDiv.className = "goldBox";
		monstDiv.className = "monster";
		
		//Calculate where the gold will go
		goldDiv.style.left = (Math.floor(Math.random()*maxWidth)+box.offsetLeft) + "px";
		goldDiv.style.top = (Math.floor(Math.random()*maxHeight)+box.offsetTop) + "px";
		
		//Make sure the gold hasn't spawned on top of the recharge zone or player
		//parseInt to make comparison easier
		var goldLeft = parseInt(goldDiv.style.left);
		var goldTop = parseInt(goldDiv.style.top);
		
		//If spawned in recharge zone or on player
		if(((goldLeft>=250&&goldLeft<=382)&&(goldTop>=250&&goldTop<=380))||((goldLeft>=(positionX-50)&&goldLeft<=(positionX+82))&&(goldTop>=(positionY-50)&&goldTop<=(positionY+80))))
		{
			while(((goldLeft>=250&&goldLeft<=382)&&(goldTop>=250&&goldTop<=380))||((goldLeft>=(positionX-50)&&goldLeft<=(positionX+82))&&(goldTop>=(positionY-50)&&goldTop<=(positionY+80))))
			{
				//Recalculate where it should go
				goldDiv.style.left = (Math.floor(Math.random()*maxWidth)+box.offsetLeft) + "px";
				goldDiv.style.top = (Math.floor(Math.random()*maxHeight)+box.offsetTop) + "px";
				
				//Check to make sure new location is valid
				goldLeft = parseInt(goldDiv.style.left);
				goldTop = parseInt(goldDiv.style.top);
			}
		}
		
		goldDiv.zIndex = "0";
		goldDiv.id = "available";
		
		//Place monsters on top of goldDivs
		monstDiv.style.left = goldDiv.style.left;
		monstDiv.style.top = goldDiv.style.top;
		monstDiv.zIndex = "1";
		monstDiv.style.visibility = "hidden";
		
		//Fill gold array with gold
		goldArr[i] = document.createElement("img");
		goldArr[i].src = "images/rupee.gif";
		
		//Fill monstArr with monsters
		monsterArr[i] = document.createElement("img");
		//Determine whether 1 or 0 for either monster
		var monstType = (Math.floor(Math.random() * (2-0)) + 0);
		
		//Load correct image
		if(monstType==0)
		{
			monsterArr[i].src = "images/lm.gif";
			monstDiv.id = "1"; //id will be used as health
		}
		else
		{
			monsterArr[i].src = "images/rbm.gif";
			monstDiv.id = "2";
		}
		
		//Add to game
		goldDiv.appendChild(goldArr[i]);
		monstDiv.appendChild(monsterArr[i]);
		box.appendChild(goldDiv);
		box.appendChild(monstDiv);
	}
	
	box.appendChild(theDiv);
}

function animateSprite()
{
	moveSprite(horzDir, vertDir);
}

function direction(horz, vert)
{
	if (horz == 0 && vert == 0)
	{
		stopTimer();
		return;
	}

	//Load the correct image based on the direction
	if (horz != horzDir || vert != vertDir)
	{
		var image = document.getElementById("sprite");

		if (horz == 0 && vert == -1)
			image.src = "images/link_up_dynamic.gif";
		else if (horz == -1 && vert == 0)
			image.src = "images/link_left_dynamic.gif";
		else if (horz == 1 && vert == 0)
			image.src = "images/link_right_dynamic.gif";
		else if (horz == 0 && vert == 1)
			image.src = "images/link_down_dynamic.gif";

		horzDir = horz;
		vertDir = vert;
	}
	startTimer(); // checks isRunning
}

//Calculate where to move the div containing the sprite to
function moveSprite(horz, vert)
{
	var image = document.getElementById("sprite");
	var box = document.getElementById("box");

	var maxVert = box.offsetTop + box.clientHeight - image.height;
	var maxHorz = box.offsetLeft + box.clientWidth - image.width;
	
	var multiplier = (((positionX + positionY) % 3) == 0) ? 1 : 2;
	positionX += multiplier * horz;
	positionY += multiplier * vert;

	if (positionX <= box.offsetLeft || positionX >= maxHorz ||
		 positionY <= box.offsetTop || positionY >= maxVert) 
	{
		return;
	}
	
	//update the style member of the div with the new coordinates
	var theDiv = document.getElementById("spriteBox");
	theDiv.style.left = positionX + "px";
	theDiv.style.top = positionY + "px";
	
	//See if we're near monsters
	for(var i=0;i<monsterArr.length;i++)
	{
		//If the monster is still invisible
		if(monsterArr[i].parentNode.style.visibility=="hidden"
			&& monsterArr[i].parentNode.id!="0")
		{
				//Calculate how far away we are from the monster
				deltaX = positionX - parseInt(monsterArr[i].parentNode.style.left);
				deltaY = positionY - parseInt(monsterArr[i].parentNode.style.top);
				
				//If close enough, make them appear
				if(Math.sqrt((deltaX*deltaX)+(deltaY*deltaY))<=50)
				{
					monsterArr[i].parentNode.style.visibility = "visible";
				}
		}
	}
	
	//Check to stop a collision with monsters
	for(var i=0;i<monsterArr.length;i++)
	{
		//If health != 0
		if(monsterArr[i].parentNode.id!="0")
		{
			deltaX = positionX - parseInt(monsterArr[i].parentNode.style.left);
			deltaY = positionY - parseInt(monsterArr[i].parentNode.style.top);
			if(Math.sqrt((deltaX*deltaX)+(deltaY*deltaY))<=30)
			{	
				//Get the player's health
				var playerHealth = document.getElementById("health");
				
				//Store previous id temporarily
				var image = document.getElementById("sprite");
				var temp = image.src;
				
				//Load the correct attack image
				if (horzDir == 0 && vertDir == -1)
					image.src = "images/link_up_damage.png";
				else if (horzDir == -1 && vertDir == 0)
					image.src = "images/link_left_damage.png";
				else if (horzDir == 1 && vertDir == 0)
					image.src = "images/link_right_damage.png";
				else if (horzDir == 0 && vertDir == 1)
					image.src = "images/link_down_damage.png";
				
				//Set a time out to reset image
				var resetImage = setTimeout(
					function()
					{
						image.src = temp;
					},200); //200ms allows for nice looking animation
				
				//Hit the player if nearby
				//RBM Damage
				if(monsterArr[i].src == "http://people.emich.edu/kszalai/231/Projects/images/rbm.gif")
				{
					health = health - 25;
					playerHealth.innerHTML = health;
				}
				
				//LM damage
				else
				{
					health = health - 10;
					playerHealth.innerHTML = health;
				}
					
				//Stop the player
				stopMoving();
				return;
			}
		}
		
		//Else we can pick up the gold!
		else
		{
			//Calculate how far away gold is
			deltaX = positionX - parseInt(goldArr[i].parentNode.style.left);
			deltaY = positionY - parseInt(goldArr[i].parentNode.style.top);
			if(Math.sqrt((deltaX*deltaX)+(deltaY*deltaY))<=50)
			{
				//Make the gold go away
				goldArr[i].parentNode.style.visibility = "hidden";
				
				//Get the score from the page
				var score = document.getElementById("gold");
				
				//If the gold hasn't been picked up yet
				if(goldArr[i].parentNode.id=="available")
				{
					//Update the gold id
					goldArr[i].parentNode.id = "pickedUp";
					
					//Store previous image source temporarily
					var image = document.getElementById("sprite");
					var temp = image.src;
					
					//Display character picking up gold
					image.src = "images/link_found_rupee.png";
					
					//Set a time out to reset image
					var resetImage = setTimeout(
						function()
						{
							image.src = temp;
						},500); //200ms allows for nice looking animation
					
					direction(0,0);
					
					//Update score
					gold = gold + 10;
					score.innerHTML = gold;
				}
			}
		}
	}
	
	//Check to see if all health is lost
	//If lost, display and reload
	if(health<=0)
	{
		alert("You lose");
		alert("Reloading...");
		location.reload();
	}
	
	//Check to see if we've picked up all the gold
	//If won, display and reload
	else if(gold==50)
	{
		alert("You win!");
		alert("Reloading...");
		location.reload();
	}
	
	//If player is over recharge zone, reset health
	if((positionX>=300&&positionX<=332)&&(positionY>=300&&positionY<=330))
	{
		health = 100;
		var resetHealth = document.getElementById("health");
		resetHealth.innerHTML = health;
		
	}
}

// IE vs. Mozilla key capture semantics adapted from
// http://www.irt.org/script/1214.htm

//onkeydown pick up the keys pressed
document.onkeydown = keysPressed;
var keys = [];
function keysPressed(e)
{
	var keyCode;

	// IE doesn't receive the event as a parameter
	if (e != undefined && e.which != undefined)
		keyCode = e.which;
	else
		keyCode = window.event.keyCode;

	keys[e.keyCode] = true;
	
	//Check for directional keys
	if (keyCode==32||(keyCode >= 37 && keyCode <= 40) 
		|| (keyCode >= 65&& keyCode <= 87))
	{
		switch (keyCode)
		{
		case 32: //Space bar for attack
			attack();
			break;
		case 37: case 74: case 65: //Left
			direction(-1, 0);
			break;

		case 39: case 76: case 68://Right
			direction(1, 0);
			break;

		case 38: case 73: case 87://Up
			direction(0, -1);
			break;

		case 40: case 75: case 83: //Down
			direction(0, 1);
			break;

		
		}
		return false; // do not continue event processing
	}
	return true; // continue event processing for keys we are not consuming
}

function attack()
{
	//Get the sprite
	var image = document.getElementById("sprite");
	
	//Store previous image source temporarily
	var temp = image.src;
	
	//Set a time out to reset image
	var resetImage = setTimeout(
		function()
		{
			image.src = temp;
		},200); //200ms allows for nice looking animation
	
	//Load the correct attack image
	if (horzDir == 0 && vertDir == -1)
		image.src = "images/link_up_attack.png";
	else if (horzDir == -1 && vertDir == 0)
		image.src = "images/link_left_attack.png";
	else if (horzDir == 1 && vertDir == 0)
		image.src = "images/link_right_attack.png";
	else if (horzDir == 0 && vertDir == 1)
		image.src = "images/link_down_attack.png";
	
	//Cause damage to monster
	for(var i=0;i<monsterArr.length;i++)
	{
		//Calculate where player is in relation to closest monster
		deltaX = positionX - parseInt(monsterArr[i].parentNode.style.left);
		deltaY = positionY - parseInt(monsterArr[i].parentNode.style.top);
		if(Math.sqrt((deltaX*deltaX)+(deltaY*deltaY))<=50)
		{		
			//If RBM
			if(monsterArr[i].parentNode.id=="2")
			{
				//Update the RBM
				monsterArr[i].parentNode.id = "1";
			}
			
			//If LM or damaged RBM
			else
			{
				//Set health to zero and make monster invisible
				monsterArr[i].parentNode.id = "0";
				monsterArr[i].parentNode.style.visibility = "hidden";
			}
		}
	}
}

//onkeyup stop the sprite from moving
document.onkeyup = stopMoving;
function stopMoving()
{
	direction(0,0);
}
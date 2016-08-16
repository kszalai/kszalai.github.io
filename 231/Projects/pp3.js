/*******************************
 * Kyle Szalai (E01006866)
 * COSC 231
 * Haynes MW 10:00am
 * 3/17/15
 * Project 3
 * pp3.js 
 *******************************/

var horzDir, vertDir;
var animationTimer, isRunning;
var positionX;
var positionY;

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
	
	//Randomize initial position of sprite
	var image = document.getElementById("sprite");
	var box = document.getElementById("box");
	var maxHeight = box.clientHeight - image.height;
	var maxWidth = box.clientWidth - image.width;
	positionX = Math.floor(Math.random() * maxWidth) + box.offsetLeft;
	positionY = Math.floor(Math.random() * maxHeight) + box.offsetTop;
	
	var theDiv = document.getElementById("spriteBox");
	
	theDiv.style.left = positionX + "px";
	theDiv.style.top = positionY + "px";
	
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
}

// IE vs. Mozilla key capture semantics adapted from
// http://www.irt.org/script/1214.htm

//onkeydown pick up the keys pressed
document.onkeydown = keyCapture;
function keyCapture(e)
{
	var keyCode;

	// IE doesn't receive the event as a parameter
	if (e != undefined && e.which != undefined)
		keyCode = e.which;
	else
		keyCode = window.event.keyCode;

	//Check for directional keys
	if ((keyCode >= 37 && keyCode <= 40) 
		|| (keyCode >= 65&& keyCode <= 87))
	{
		switch (keyCode)
		{
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

//onkeyup stop the sprite from moving
document.onkeyup = stopMoving;
function stopMoving()
{
	direction(0,0);
}
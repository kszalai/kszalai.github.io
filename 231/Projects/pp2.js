/**********************************
 * Kyle Szalai (E01006866)
 * COSC 231
 * Haynes MW 10:00am
 * Project 2
 * pp2.js
 **********************************/
//A function that will make a new
//image for the respective car
function newImg (source) {
	xImage = new Image();
	xImage.src = source;
	return xImage;
}

var count = 0;

var pics = new Array();
var cars = new Array();
var engine = new Array();
var fact1 = new Array();
var fact2 = new Array();

pics[0] = newImg("images/fordgt.jpg");
cars[0] = "2016 Ford GT"; 
engine[0] = "3.5-Liter 600 Horsepower Twin-Turbocharged V6 w/ EcoBoost"; 
fact1[0] = "7 Speed Semi-automatic Dual-clutch fact1mission"; 
fact2[0] = "Ultra lightweight Carbon Fiber Chassis";

pics[1] = newImg("images/mustang.jpg");
cars[1] = "2017 Ford Mustang GT350"; 
engine[1] = "5.3-Liter 500 Horsepower V8";
fact1[1] = "Removed back seats, stereo, air conditioning, carpets, trunk floorboards, and backup camera"; 
fact2[1] = "Lightweight and Race-ready from the factory";

pics[2] = newImg("images/corvette.jpg"); 
cars[2] = "2016 Chevrolet Corvette C7.R";
engine[2] = "Z06 Direct-Injection Engine"; 
fact1[2] = "New aluminium frame"; 
fact2[2] = "A corvette built for racing.";

pics[3] = newImg("images/gtr.jpg");
cars[3] = "2016 Nissan GT-R Nismo Edition"; 
engine[3] = "NISMO-tuned 600-hp, 3.8-liter, high-capacity twin-turbocharged V6 engine";
fact1[3] = "NISMO-tuned Suspension"; 
fact2[3] = "NISMO Black 20-inch super-lightweight RAYS forged-alloy wheels";

pics[4] = newImg("images/challenger.jpg");
cars[4] = "2016 Dodge Challenger";
engine[4] = "5.7-liter HEMI V8 Engine"; 
fact1[4] = "TREMEC 6 Speed Manual Transmission";
fact2[4] = "Comes in a more powerful package known as the 'Hellcat' Challenger";

function goBackward()	{
	count--;
	if(count==-1)
		count=4;
	
	var pic = document.getElementById('thePicture');
	pic.src = pics[count].src;
	var nameOfCar = document.getElementById('theName');
	nameOfCar.innerHTML = "<span class='title'><b><u>" + cars[count] + "</u></b></span>";
	var engineType = document.getElementById('engine');
	engineType.innerHTML = "<b>"+ engine[count] + "</b>";
	var fact1Type = document.getElementById('fact1');
	fact1Type.innerHTML = "<b>" + fact1[count] + "</b>";
	var fact2Fact = document.getElementById('fact2');
	fact2Fact.innerHTML = "<b>" + fact2[count] + "</b>";
}

function goForward()	{
	count++;
	if(count==5)
		count=0;
	
	var pic = document.getElementById('thePicture');
	pic.src = pics[count].src;
	var nameOfCar = document.getElementById('theName');
	nameOfCar.innerHTML = "<span class='title'><b><u>" + cars[count] + "</u></b></span>";
	var engineType = document.getElementById('engine');
	engineType.innerHTML = "<b>"+ engine[count] + "</b>";
	var fact1Type = document.getElementById('fact1');
	fact1Type.innerHTML = "<b>" + fact1[count] + "</b>";
	var fact2Fact = document.getElementById('fact2');
	fact2Fact.innerHTML = "<b>" + fact2[count] + "</b>";
}
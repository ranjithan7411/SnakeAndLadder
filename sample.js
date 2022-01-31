var c = document.getElementById("board");
var ctx = c.getContext("2d");
var p,com; // player objects for single player game
var nop; // No of players in multiplayer game
var tiles = new Array(); // Tile objects 
var players = new Array();// array of player used in multiplayer game
var globalpostion = 0; // highest position occupied by any player
var random_number;


class Tile{
	constructor(x,y,wh,ht,next){
		this.x = x; 
		this.y = y; 
		this.wh = wh; 
		this.ht = ht; 
		this.next = next; 
	}
}

// Random Number Generator
function rand()
{
	random_number = Math.ceil(Math.random() * 6);
}

class Player
{
	constructor(color)
	{
		this.position = 0; // current position
		this.pre = 0; // previous position
		this.r = 0; // random number
		this.color = color; // player color
	}
	roll(r) // update pre and positon
	{
		this.r = r;
		this.pre = this.position;
		this.position += this.r;
		if(this.position > 100)
			this.position = this.pre;
	}
	remove(pos) // remove previous position
	{
		if((pos > 0) && (pos != this.position))
		{
			var p = tiles[pos-1];
			ctx.clearRect(p.x,p.y,p.wh,p.ht);
		}
	}
	show(pos) // show updated position
	{
		var cur = tiles[pos-1];
		ctx.beginPath();
		ctx.arc(cur.x+25, cur.y+25, 22, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	move()
	{
		this.show(this.position);
		this.remove(this.pre);
		//check if ladder or snake present		
		if(tiles[this.position - 1].next != this.position)
		{
			this.pre = this.position;
			this.position = tiles[this.position - 1].next;
			this.remove(this.pre);
			this.show(this.position);
		}
	}
}

// Initialize tiles Array
function setup()
{
	var wh = 600; 
	var ht = 600; 
	var boxwh = wh/10; 
	var boxht = ht/10; 
	var x1 = 0; 
	var x2 = 9 * boxwh;
	var y = 9 * boxht;
	var c=0;
	for(var i = 0; i < 10; ++i)
	{
		for(var j = 0; j < 10; ++j)
		{
			if(i % 2 == 0)
			{
				tiles[c++] = new Tile(x1,y,boxwh,boxht,c);
				x1 += boxwh;
			}
			else{
				tiles[c++] = new Tile(x2,y,boxwh,boxht,c);
				x2 -= boxwh;
			}
		}
		x1 = 0;
		x2 = 9 * boxwh;
		y -= boxht;
	}
	//ladders
	tiles[0].next = 38;
	tiles[3].next = 14;
	tiles[8].next = 31;
	tiles[27].next = 84;
	tiles[20].next = 42;
	tiles[50].next = 67;
	tiles[71].next = 91;
	tiles[79].next = 99;
	//snakes
	tiles[16].next = 7;
	tiles[53].next = 34;
	tiles[61].next = 19;
	tiles[63].next = 60;
	tiles[86].next = 36;
	tiles[92].next = 73;
	tiles[94].next = 75;
	tiles[97].next = 79;
}
setup();
// Reset function for Single player game
function singlereset()
{
	setup();
	p = new Player("black");
	com = new Player("yellow");
	var players = new Array();
	ctx.clearRect(0,0,600,600);
	singleplayer();
}
//reset function for multiplayer game
function multireset()
{
	setup();
	p = new Player("black");
	com = new Player("yellow");
	var players = new Array();
	ctx.clearRect(0,0,600,600);
	multiplayer();
}
// for Dice
function off()
{
	document.getElementById("overlay").style.display="none";
}
function random()
{
	document.getElementById("overlay").style.display="block";
	var x = random_number;
	
    document.getElementById("number").innerHTML = x;
	
}
function myfun()
{
	document.getElementById("overlay").style.display="none";
	document.getElementById("cube").style.transform = "rotateY(360deg)  rotateX(360deg)";
	setTimeout(nochange,800);
}
function nochange()
{
	document.getElementById("cube").style.transform = "rotateY(90deg) rotateX(0)";
    setTimeout(random,1200);
}

////////////////////////////////////////////////////////////////////////
// Table of contents
// 00. Setup
// 01. Enemy
// 02. Player
// 03. Gem
// 03. Life
////////////////////////////////////////////////////////////////////////

// 00. Setup object

// This function renders first landing page with character selection feature
var Setup = function() {
	this.pause = 0;
	this.selection = false;

	this.x = 212;

	this.imageSetup = 'images/Setup.png';
	this.imageSelect = 'images/Selector.png';
	this.imagePause = 'images/Pause.png';

	this.soundPause = new Audio('audios/Pause.wav');
	this.soundPause.volume = 0.2;
};


Setup.prototype.handleInput = function(key) {
	// It makes 'space bar' as pause / restart toggle key
	if (this.selection) {
		if (key === 'space'){
			this.pause = (this.pause + 1) % 2;
			backgroundSound.pause();
			setup.soundPause.play();
		}
	}
	// Select the character
	else {
		if (key === 'enter'){
			if (this.x === 10)
				player.sprite = player.boy;
			else if (this.x === 111)
				player.sprite = player.pinkGirl;
			else if (this.x === 212)
				player.sprite = player.princessGirl;
			else if (this.x === 313)
				player.sprite = player.hornGirl;
			else if (this.x === 414)
				player.sprite = player.catGirl;

			this.selection = true;

		// Move the selection cursor
	  	} else if (this.x > 10 && key === 'left'){
			this.x -= 101;
			console.log(this.x);
		} else if (this.x < 404 && key === 'right'){
			this.x += 101;
			console.log(this.x);
		}
	}
}

// Render the start page with a image which explains the goal and key
Setup.prototype.start = function(){
	ctx.drawImage(Resources.get(this.imageSetup), 0, 0);
}
// Render selector image
Setup.prototype.select = function(){
	ctx.drawImage(Resources.get(this.imageSelect), this.x, 485, 71, 120);
}
// Add fallback backgroun image
Setup.prototype.pauseScreen = function(){
	ctx.drawImage(Resources.get(this.imagePause), 0, 0);
}


// 01. Enemy object

var Enemy = function() {
    this.x;
    this.y;
    this.speed = getRandomInt(100,300);
    this.bug = 'images/enemy-bug.png';
};

/*
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if(this.x < 500){
        this.x += this.speed * dt;
    } else {
        this.x = -Math.random() * 300;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.bug), this.x, this.y);
};



// 02. Player Object

var Player = function(){
    this.x = 202;
    this.y = 404;

	this.sprite; // This takes final image of player

	// Load images of characters
	this.boy = 'images/char-boy.png';
	this.catGirl = 'images/char-cat-girl.png';
	this.hornGirl = 'images/char-horn-girl.png';
	this.pinkGirl = 'images/char-pink-girl.png';
	this.princessGirl = 'images/char-princess-girl.png';

	// Initiate the number of lifes of player
	this.numLife = 3;

	this.whichColor;

	// Score of each gem
	this.scoreGreen = 0;
	this.scoreBlue = 0;
	this.scoreOrange = 0;

	// Give sound effect to movement of player
	this.soundMove = new Audio("audios/Move.wav");
	this.soundMove.volume = 0.3;
	this.soundDamage = new Audio("audios/Damage.wav");
	this.soundDamage.volume = 0.5;
	this.soundGem = new Audio("audios/Gem.wav");
	this.soundGem.volume = 0.5;
	this.soundReset = new Audio("audios/Reset.wav");
	this.soundReset.volume = 0.2;
};

Player.prototype.update = function(dt) {
	if (this.y === -11 && (gem.x - this.x) === 20 ){

		this.soundGem.play(); // Sound of collecting gem

		if (gem.Color === 'green'){
			this.scoreGreen += 1;
		} else if (gem.Color === 'blue') {
			this.scoreBlue += 1;
		} else if (gem.Color === 'orange') {
			this.scoreOrange += 1;
		}

		this.reset();

	} else if (this.y === -11) {
		player.soundReset.play(); // Sound of reset

		// Randomize the location of the life
		life.x = [20, 121, 222, 323, 424][getRandomInt(0,4)];
		life.y = [281, 198, 115][getRandomInt(0,2)];

		this.reset();

	} else if (Math.abs(life.x - this.x) === 20  && Math.abs(life.y - this.y) === 43 ){
		life.soundLife.play(); // SOund of getting additional life
		this.numLife += 1;

		// After Getting the gem, it should disappear
		life.x = undefined;
		life.y = undefined;
	}

	// When player collect at least 3 gems for each color, she win
	if (this.scoreGreen >= 3 && this.scoreBlue >= 3 && this.scoreOrange >= 3) {
		alert("YOU WIN!");
		window.location.reload(true);

	// Condition of lose
	} else if (this.numLife === 0){
		alert("GAME OVER!");
		window.location.reload(true);
	}
};

// Render the image of character
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

        if (this.x > 0 && key === 'left' ){
			player.soundMove.play(); // sound of movement
            this.x -= 101;
        } else if (this.x < 404 && key === 'right'){
			player.soundMove.play();
            this.x += 101;
        } else if (this.y !== 404 && key === 'down'){
			player.soundMove.play();
            this.y += 83;
        } else if (this.y !== -11 && key === 'up'){
			player.soundMove.play();
            this.y -= 83;
        }
}

Player.prototype.reset = function() {
		this.x = 202;
		this.y = 404;

		// Once it's resetted, gem shows up in random location
		gem.x = [20, 121, 222, 323, 424][getRandomInt(0,4)];
		gem.Color = ['green', 'blue', 'orange'][getRandomInt(0,2)];
}


// 03. Gem object

var Gem = function(color) {
	this.x = [20, 121, 222, 323, 424][getRandomInt(0,4)];
	this.y = 25 ;
	this.Color = color;
	this.gemColor;

	this.gemGreen = 'images/Gem Green.png';
	this.gemBlue = 'images/Gem Blue.png';
	this.gemOrange = 'images/Gem Orange.png';
}

Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.gemGreen), 5+202, 530, 32, 54);
	ctx.drawImage(Resources.get(this.gemBlue), 5+303, 530, 32, 54);
	ctx.drawImage(Resources.get(this.gemOrange), 5+404, 530, 32, 54);
};

Gem.prototype.update = function() {
	if (this.Color === 'green')
		this.gemColor = 'images/Gem Green.png';
	else if (this.Color === 'blue')
		this.gemColor = 'images/Gem Blue.png';
	else if (this.Color === 'orange')
		this.gemColor = 'images/Gem Orange.png';

	ctx.drawImage(Resources.get(this.gemColor), this.x, this.y, 61, 103);

	// Scoreboard for gem collection
	ctx.font = "24px helvetica";
	player.scoreGreen >= 3 ? ctx.fillStyle = 'yellow' : ctx.fillStyle = 'black';
	ctx.fillText(player.scoreGreen + "/3", 248, 574);

	player.scoreBlue >= 3 ? ctx.fillStyle = 'yellow' : ctx.fillStyle = 'black';
	ctx.fillText(player.scoreBlue + "/3", 248 + 101, 574);

	player.scoreOrange >= 3 ? ctx.fillStyle = 'yellow' : ctx.fillStyle = 'black';
	ctx.fillText(player.scoreOrange + "/3", 248 + 202, 574);
	ctx.fillStyle = 'black';
};


//04. Life object

var Life = function() {
	this.x = [20, 121, 222, 323, 424][getRandomInt(0,4)];
	this.y = [281, 198, 115][getRandomInt(0,2)]; //238(43), 155(43), 72(43)
	this.imageLife = "images/Heart.png";

	this.soundLife = new Audio("audios/Life.wav");
	this.soundLife.volume = 0.2;
}

Life.prototype.render = function() {
	ctx.font = "32px helvetica";
	ctx.fillText(player.numLife, 45, 575);
	ctx.drawImage(Resources.get(this.imageLife), 5, 535, 32, 54);
};

Life.prototype.update = function() {
	ctx.drawImage(Resources.get(this.imageLife), this.x, this.y, 64, 108);
}



// This function select random property from the object for colorSelector
// function.
function randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

// This function select random color
function colorSelector(){
	var colors = {
		green: 'green',
		blue: 'blue',
		orange: 'orange'
		};
	return randomProperty(colors);
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var firstEnemy = new Enemy();
firstEnemy.x = -101;
firstEnemy.y = 62;

var secondEnemy = new Enemy();
secondEnemy.x = -101;
secondEnemy.y = 145;

var thirdEnemy = new Enemy();
thirdEnemy.x = -101;
thirdEnemy.y = 228;

var forthEnemy = new Enemy();
forthEnemy.x = -505;
forthEnemy.y = 62;

var fifthEnemy = new Enemy();
fifthEnemy.x = -303;
fifthEnemy.y = 145;

var sixthEnemy = new Enemy();
sixthEnemy.x = -404;
sixthEnemy.y = 228;


// Iniiate entities
var setup = new Setup();
var allEnemies = [firstEnemy, secondEnemy, thirdEnemy, forthEnemy, fifthEnemy, sixthEnemy];
var player = new Player();
var gem = new Gem(colorSelector());
var life = new Life();



document.addEventListener('keyup', function(e) {

    var allowedKeys = {
		32: 'space',
		13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
	setup.handleInput(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});

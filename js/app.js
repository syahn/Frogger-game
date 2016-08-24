
////////////////////////////////////////////////////////////////////////
// Table of contents
// 01. Enemy object
// 02. Player object
// 03. Gem object
////////////////////////////////////////////////////////////////////////



// 01. Enemy object

var Enemy = function() {
    this.x;
    this.y;
    this.speed = getRandomInt(100,300);
    this.sprite = 'images/enemy-bug.png';
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// 02. Player Object

var Player = function(){
    this.x = 202;
    this.y = 404;
    this.sprite = 'images/char-boy.png';
	this.logoLife = 'images/Heart.png';
	this.numLife = 3;

	// Give sound effect to movement of player
	this.effectMove = new Audio("audios/Move3.wav");
	this.effectMove.volume = 0.5;
	this.effectDamage = new Audio("audios/Damage.wav");
	this.effectDamage.volume = 0.5;
};

Player.prototype.update = function(dt) {
	if (this.y === -11 && (gem.x - this.x) === 20 ){
		this.reset();
		this.numLife += 1;
	} else if (this.y === -11) {
		this.reset();
		this.numLife += 1;
	}

	if (this.numLife === 0){
		alert("GAME OVER!");
		window.location.reload(true);
	}
};

Player.prototype.life = function() {
	ctx.font = "32px helvetica";
	ctx.fillText(this.numLife, 45, 575);
	ctx.drawImage(Resources.get(this.logoLife), 5, 535, 32, 54);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
        if (this.x > 0 && key === 'left' ){
            this.x -= 101;
			console.log(this.x, this.y);
        } else if (this.x < 404 && key === 'right'){
            this.x += 101;
			console.log(this.x, this.y);

        } else if (this.y !== 404 && key === 'down'){
            this.y += 83;
			console.log(this.x, this.y);

        } else if (this.y !== -11 && key === 'up'){
            this.y -= 83;
			console.log(this.x, this.y);

        }
}

Player.prototype.reset = function() {
		this.x = 202;
		this.y = 404;
		gem = new Gem(colorSelector());
	}


// 03. Gem object

var Gem = function(color) {
	this.x = [20, 121, 222, 323, 424][getRandomInt(0,4)];
	this.y = 25 ;

	if (color === 'green')
		this.color = 'images/Gem Green.png';
	else if (color === 'blue')
		this.color = 'images/Gem Blue.png';
	else if (color === 'orange')
		this.color = 'images/Gem Orange.png';
	else
		this.color = undefined;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.color), this.x, this.y, 61, 103);
};


// var gem = new Gem(colorSelector()[colorCount]);
// var gemBlue = new Gem('blue');
// var gemOrange = new Gem('orange');


// This function select random property from the object for colorSelector
// function.
function randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

// This function
function colorSelector(){
	var colors = {
		green: 'green',
		blue: 'blue',
		orange: 'orange'
		};
	return randomProperty(colors);
	// var first = randomProperty(colors);
	// delete colors[first];
	// var second = randomProperty(colors);
	// delete colors[second];
	// var third = randomProperty(colors);
	//
	// var orderColor = [first, second, third];

	// return orderColor;
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

var allEnemies = [firstEnemy, secondEnemy, thirdEnemy, forthEnemy, fifthEnemy, sixthEnemy];


var player = new Player();


document.addEventListener('keyup', function(e) {
	player.effectMove.play();
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

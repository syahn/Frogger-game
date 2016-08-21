
/*
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Enemy = function() {
    this.x;
    this.y;
    this.speed = getRandomInt(100,300);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if(this.x < 500){
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }
	// console.log(this.x, this.y);

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



var Player = function(){
    this.x = 202;
    this.y = 404;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

        if (this.x > 0 && key === 'left' ){
            this.x -= 101;
        } else if (this.x < 404 && key === 'right'){
            this.x += 101;
        } else if (this.y !== 404 && key === 'down'){
            this.y += 83;
        } else if (this.y !== -11 && key === 'up'){
            this.y -= 83;
        }
		console.log(this.x, this.y);
}

Player.prototype.reset = function() {
	if (this.y === -11){
		this.x = 202;
		this.y = 404;
	}
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var firstEnemy = new Enemy();
firstEnemy.x = -101;
firstEnemy.y = 60;

var secondEnemy = new Enemy();
secondEnemy.x = -101;
secondEnemy.y = 145;

var thirdEnemy = new Enemy();
thirdEnemy.x = -101;
thirdEnemy.y = 228;



var allEnemies = [firstEnemy, secondEnemy, thirdEnemy];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

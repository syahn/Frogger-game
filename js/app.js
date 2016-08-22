
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
        this.x = -Math.random() * 300;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



var Player = function(){
    this.x = 202;
    this.y = 404;
    this.sprite = 'images/char-boy.png';
	this.score = 0;
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
		if (this.y === -11){
			player.reset();
			player.score += 1;
		}
}

Player.prototype.reset = function() {
		this.x = 202;
		this.y = 404;
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
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

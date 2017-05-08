// Enemies our player must avoid
var Enemy = function() {
    // Initial Coordinates
    this.x = -101;
    this.y = 83 * (Math.ceil(Math.random() * 3)) - 20;

    // Speed of enemy vehicles
    this.speed = Math.floor(Math.random() * (210 - 70) + 70);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

    // Resets enemy to starting (left) side after reaching end (right)
    if (this.x > 101 * 5) {
        this.x = -101;
        this.y = 83 * (Math.ceil(Math.random() * 3)) - 20;
    }
    
    // Checking Collision and reset player
    if (this.x > player.x - 70 && this.x < player.x + 70 && this.y + 20 == player.y) {
        Player.call(player);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
    // Inital Coordinates
    this.x = 101*2;
    this.y = 83*5;

    // Sprite URL
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // If player reaches water, resets the player
    if (this.y < 83) {
        setTimeout(function() {Player.call(player);},300);
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move player according to arrow keys
Player.prototype.handleInput = function(keys) {
    // If statements check the boundary, keeping the player contained inside.
    switch (keys) {
        case 'left' :
            if (this.x > 0) {
                this.x -= 101;
            } break;
        case 'right' :
            if (this.x < 101*4) {
                this.x += 101;
            } break;
        case 'up' :
            if (this.y > 0) {
                this.y -= 83;
            } break;
        case 'down' :
            if (this.y < 83*5) {
                this.y += 83;
            } break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

for (i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
}


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

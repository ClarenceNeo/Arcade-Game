/* app.js
 * 这是运行游戏的主要逻辑，完成了游戏角色的生成。
 */

/* 这是我们的玩家要躲避的敌人 */
var Enemy = function() {
    this.x = -150 - Math.random() * 150;
    this.y = Math.ceil(Math.random() * 3) * 75;
    this.speed = 180 + Math.random() * 200;
    this.sprite = 'images/enemy-bug.png';
};


/* 此为游戏必须的函数，用来更新敌人的位置
 * 参数: dt ，表示时间间隙
 */
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -101;
        this.y = Math.ceil(Math.random() * 3) * 75;
    }
};

/* 此为游戏必须的函数，用来在屏幕上画出敌人 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* 实现自己的玩家类 */
var Player = function() {
    this.x = 202;
    this.y = 375;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.y == allEnemies[i].y && this.x > allEnemies[i].x && this.x < allEnemies[i].x + 60) {
            this.x =202;
            this.y =375;
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* 设置控制玩家运动，并设置玩家运行区域 */
Player.prototype.handleInput = function(move) {
    if (move == 'left') {
        this.x -= 101;
    } else if (move == 'right') {
        this.x += 101;
    } else if (move == 'down') {
        this.y += 75;
    } else if (move == 'up') {
        this.y -= 75;
    }

    if (this.x > 404) {
        this.x = 404;
    } else if (this.y > 375) {
        this.y = 375;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y < 60) {
        this.y = 375;
        this.x = 202;
    }
};

/* 实例化所有对象 */
var allEnemies = [];
for (i = 0; i < 5; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}
var player = new Player();


/* 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput() */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

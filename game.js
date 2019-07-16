const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    keys: {
        TOP_KEY: 38,
        LEFT_KEY: 37,
        RIGTH_KEY: 39,
        SPACE: 32
    },

    init: function(id) {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth * .98
        this.height = window.innerHeight * .98
        this.canvas.width = this. width
        this.canvas.height = this.height
        this.start()
    },

    start: function() {
        this.reset() 

        this.interval = setInterval(()=>{
            this.framesCounter++
            if (this.framesCounter > 1000) this.framesCounter = 0

            if (this.framesCounter % 200 == 0){
                this.enemy.shoot()
            }
        
     
            this.clear()
            this.drawAll()
            this.moveAll()
            this.clearAll()
            this.isCollissionPlayer()
            this.isCollisionEnemy()
            this.isCollissionFlyingEnemies()
            this.removePlayerBullets()
            this.removeEnemyBullets()

        },1000/this.fps)
    
       
    },

    reset: function() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys)
        this.enemy = new Enemy(this.ctx, this.canvas.width, this.canvas.height)
        this.leftEnemy = new FlyingEnemie(this.ctx, "images/angry_icon.png", this.canvas.width, this.canvas.height, 0, this.height/2-25) 
        this.rigthEnemy = new FlyingEnemie(this.ctx, "images/words_angry.png", this.canvas.width, this.canvas.height, this.width-50, this.height/2-25)
    },

    drawAll: function() {
        this.background.draw()
        this.player.draw()
        this.enemy.draw()
        this.leftEnemy.draw()
        this.rigthEnemy.draw()

    },

    moveAll: function() {
        this.player.move()
        this.enemy.move()
        this.leftEnemy.moveLeft()
        this.rigthEnemy.moveRigth()
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    clearAll: function() {
        //console.log(this.enemy.enemyBullets)
        this.enemy.clearEnemyBullets()
        this.player.clearBullets()
    },

    isCollissionAll: function() {

        
    },

    isCollissionPlayer : function() {
        
        this.player.bullets.some(bullet => {

            if ((bullet.posX + bullet.width > this.enemy.posX) &&
                (bullet.posX < this.enemy.posX + this.enemy.width) &&
                (bullet.posY < this.enemy.posY + this.enemy.heigth) &&
                (bullet.posY + bullet.heigth > this.enemy.posY)){
                console.log("Colisión")
                
                return true
            }

            

        })

    },

    removePlayerBullets: function() {

        this.player.bullets.forEach((bullet, idx) => {

            if ((bullet.posX + bullet.width > this.enemy.posX) &&
            (bullet.posX < this.enemy.posX + this.enemy.width) &&
            (bullet.posY < this.enemy.posY + this.enemy.heigth) &&
            (bullet.posY + bullet.heigth > this.enemy.posY)) {
                this.player.bullets.splice(idx, 1)
            }
            
        });
    },

    isCollisionEnemy: function() {

        this.enemy.enemyBullets.some(bullet => {

            if ((bullet.posX + bullet.width > this.player.posX)&&
                (bullet.posX < this.player.posX + this.player.width) && 
                (bullet.posY + bullet.width > this.player.posY) &&
                (bullet.posY < this.player.posY + this.player.height)) {
                    console.log("Estas muerto")
                }
        })
    },

    removeEnemyBullets: function() {

        this.enemy.enemyBullets.forEach((bullet, idx) =>{

            if ((bullet.posX + bullet.width > this.player.posX)&&
            (bullet.posX < this.player.posX + this.player.width) && 
            (bullet.posY + bullet.width > this.player.posY) &&
            (bullet.posY < this.player.posY + this.player.height)) {
                this.enemy.enemyBullets.splice(idx, 1)
            }
        })
    },

    isCollissionFlyingEnemies: function() {

        if ((this.leftEnemy.posX + this.leftEnemy.width > this.player.posX) &&
            (this.leftEnemy.posX < this.player.posX + this.player.width) &&
            (this.leftEnemy.posY + this.leftEnemy.width > this.player.posY) &&
            (this.leftEnemy.posY < this.player.posY + this.player.height)) {

                console.log("tocado")
        }

        if ((this.rigthEnemy.posX + this.rigthEnemy.width > this.player.posX) &&
        (this.rigthEnemy.posX < this.player.posX + this.player.width) &&
        (this.rigthEnemy.posY + this.rigthEnemy.width > this.player.posY) &&
        (this.rigthEnemy.posY < this.player.posY + this.player.height)) {

            console.log("ay qué dolor")
        }
    }
}
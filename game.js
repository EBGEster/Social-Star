const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    platforms: [],
    myPlatform: undefined,
    isBonus: false,
    myBonus: [],
    
    
    keys: {
        TOP_KEY: { key: 38, down: false},
        LEFT_KEY: { key: 37, down: false},
        RIGHT_KEY: {key: 39, down: false},
        SPACE: 65
    },

    init: function(id) {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth * .98
        this.height = window.innerHeight * .98
        this.canvas.width = this. width
        this.canvas.height = this.height
        this.start()
        document.getElementById("fondo").play()
    },

    start: function() {
        this.reset() 

        this.interval = setInterval(()=>{
            this.framesCounter++
            if (this.framesCounter > 1000) this.framesCounter = 0

            if (this.framesCounter % 200 == 0){
                this.enemy.shoot()
            }

            // if (this.framesCounter % 10== 0) {
            //     this.movePlatforms()
            // }
        
     
            this.clear()
            this.drawAll()
            this.moveAll()
            this.clearAll()
            this.isCollissionAll()
            this.checkLife()
            this.movePlatforms()
            

        },1000/this.fps)
    
       
    },

    reset: function() {
        this.background = new Background(this.ctx, this.width, this.height)

        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys)
        this.enemy = new Enemy(this.ctx, this.canvas.width, this.canvas.height)

        this.leftEnemy = new FlyingEnemie(this.ctx, "images/angry_icon.png", this.canvas.width, this.canvas.height, 0, this.height/2-25) 
        this.rigthEnemy = new FlyingEnemie(this.ctx, "images/words_angry.png", this.canvas.width, this.canvas.height, this.width-50, this.height/2-25)
        
        this.lifeLine = new LifeLine(this.ctx)
        this.followers = new Followers(this.ctx, this.canvas.width)
        
        this.platforms.push(this.bottomLeftPlatform = new Platform(this.ctx, "images/platform_4red.png", this.canvas.width , this.canvas.height, -150, this.canvas.height/2 + 100, 150))
        this.platforms.push(this.bottomRigthPlatform = new Platform(this.ctx, "images/platform_4red.png", this.canvas.width , this.canvas.height, this.canvas.width +150, this.canvas.height/2 + 100, 150))
        this.platforms.push(this.topRigthPlatform = new Platform(this.ctx, "images/platform_3red.png", this.canvas.width , this.canvas.height, this.canvas.width + 150, this.canvas.height/2+30, 100))
        this.platforms.push(this.topLeftPlatform = new Platform(this.ctx, "images/platform_3red.png", this.canvas.width , this.canvas.height, -150, this.canvas.height/2+30, 100))
    
        this.myBonus.push(this.leftBonus = new Bonus(this.ctx, 30))
        this.myBonus.push(this.rigthBonus = new Bonus(this.ctx, this.canvas.width - 80))
        
    },

    drawAll: function() {
        this.background.draw()
        this.player.draw(this.framesCounter)
        this.enemy.draw()
        this.leftEnemy.draw()
        this.rigthEnemy.draw()
        this.lifeLine.draw(this.player.pLife)
        this.followers.draw(this.enemy.eLife)
        this.topLeftPlatform.draw()
        this.bottomLeftPlatform.draw()
        this.topRigthPlatform.draw()
        this.bottomRigthPlatform.draw()
        this.myBonus.forEach(bonus => bonus.draw())   
        // if (!this.isBonus) {
        //     setTimeout(() => { 
        //         this.leftBonus.draw()
        //         console.log("soy el bonus")
        //         this.isBonus = false }, 10000)
        //     this.isBonuss = true
        // }
        
    },

    moveAll: function() {
        this.player.move(this.framesCounter)
        this.enemy.move()
        this.leftEnemy.moveLeft()
        this.rigthEnemy.moveRigth()
        
    },

    movePlatforms : function() {
        this.topLeftPlatform.move()
        this.bottomLeftPlatform.move()
        this.topRigthPlatform.moveB()
        this.bottomRigthPlatform.moveB()
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    clearAll: function() {
        //console.log(this.enemy.enemyBullets)
        this.enemy.clearEnemyBullets()
        this.player.clearBullets()
    },

    checkLife: function() {

        if (this.player.pLife < 0){
            this.gameOver()
        }

        if (this.enemy.eLife < 0){
            this.playerWin()
        }
    },

    isCollissionAll: function() {
        this.isCollissionPlayer()
        this.isCollisionEnemy()
        this.isCollissionFlyingEnemies()
        this.removeEnemyBullets()
        this.removePlayerBullets()
        this.isCollissionPlatform()
        this.isCollissionBonus()
        
    },

    isCollissionPlayer : function() {
        
        this.player.bullets.some(bullet => {

            if ((bullet.posX + bullet.width > this.enemy.posX) &&
                (bullet.posX < this.enemy.posX + this.enemy.width) &&
                (bullet.posY < this.enemy.posY + this.enemy.height) &&
                (bullet.posY + bullet.height > this.enemy.posY)){
                console.log("Colisión")
                
                this.enemy.eLife -= 1
                document.getElementById("yes").play()
                console.log("Enemy life" , this.enemy.eLife)
            }

            

        })

    },

    removePlayerBullets: function() {

        this.player.bullets.forEach((bullet, idx) => {

            if ((bullet.posX + bullet.width > this.enemy.posX) &&
            (bullet.posX < this.enemy.posX + this.enemy.width) &&
            (bullet.posY < this.enemy.posY + this.enemy.height) &&
            (bullet.posY + bullet.height > this.enemy.posY)) {
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

                    this.player.pLife -= 1
                    document.getElementById("dislike").play()
                    console.log(this.player.pLife)
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
                this.player.pLife -= 0.005
                this.leftEnemy.velY -=1
                document.getElementById("flying").play()
                console.log("tocado")
        }

        if ((this.rigthEnemy.posX + this.rigthEnemy.width > this.player.posX) &&
        (this.rigthEnemy.posX < this.player.posX + this.player.width) &&
        (this.rigthEnemy.posY + this.rigthEnemy.width > this.player.posY) &&
        (this.rigthEnemy.posY < this.player.posY + this.player.height)) {
            this.player.pLife -= 0.005
            this.rigthEnemy.velY -=1
            document.getElementById("flying").play()
            console.log("ay qué dolor")
        }
    },

    isCollissionPlatform() {

        this.myPlatform = this.platforms.find((platf) => {
            return this.player.posY + this.player.height > platf.posY
                && this.player.posY < platf.posY + platf.height
                && this.player.posX + this.player.width > platf.posX
                && this.player.posX < platf.posX + platf.width
               // && this.player.velY > 0
        })
        // console.log(this.myPlatform, this.player)
        if (this.myPlatform && (this.player.posY+this.player.height<this.myPlatform.posY+20)) {
            this.player.posY0 = this.myPlatform.posY - this.player.height
            this.player.posY = this.player.posY0
         } else {
            this.player.posY0 = this.canvas.height - (this.player.height * 2)
            
        }

    },

    isCollissionBonus() {
        
        this.myBonus.forEach((bonus,idx) => {

            if ((bonus.posX + bonus.width > this.player.posX) &&
            (bonus.posX < this.player.posX + this.player.width) &&
            (bonus.posY + bonus.width > this.player.posY) &&
            (bonus.posY < this.player.posY + this.player.height)) {
                this.myBonus.splice(idx, 1)
                this.player.pLife += 1
                document.getElementById("loveit").play()
                console.log("Suma vida")
            }

        })
               
    },

    playerWin: function() {
        clearInterval(this.interval)
    },

    gameOver: function() {
        
        this.imgGameOver = new Image()
        this.imgGameOver.src = "images/failed.png"

        this.imgGameOver.onload = () => {
            
            this.ctx.drawImage(this.imgGameOver, this.canvas.width/2, this.canvas.height/2, this.canvas.width/2, this.canvas.height/2)
        
        }

        document.getElementById("gameover").play()
        // this.imgGameOver2 = new Image()
        // this.imgGameOver2.src = "images/fail.gif"

        // this.imgGameOver2.onload = () => {
            
        //     this.ctx.drawImage(this.imgGameOver2, 100, 100, 100, 100)
        
        // }
       clearInterval(this.interval)    
    }
}
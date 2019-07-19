class Enemy {

    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx
        this.gameWidth = canvasW
        this.gameHeight = canvasH
        
        this.width = 150
        this.height = 150

        this.posY = 60
        this.posX = this.gameWidth/2 - this.width

        this.velX = -3

        this.image = new Image()
        this.image.src = "images/main_enemy1.png"

        this.enemyBullets = []

        this.eLife = 10
    } 

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.enemyBullets.forEach(bullet => bullet.draw())
    }

    move() {

        this.posX += this.velX

        if (this.posX < 0 || this.posX > this.gameWidth - this.width){
            this.changeDirection()
            
        }

        this.enemyBullets.forEach(bullet => bullet.move())
        
    }

    changeDirection() {

        this.velX *= -1
    }

    shoot() {

        this.enemyBullets.push(new EnemyBullet(this.ctx, this.posX+this.width/2, this.posY+this.height/2, this.height, this.eLife))
    }

    clearEnemyBullets() {
               
        this.enemyBullets.forEach( (obs, idx) => {
            if(obs.posY>= this.gameHeight) {
            this.enemyBullets.splice(idx, 1)
            } 
        })        
    }
}
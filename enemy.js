class Enemy {

    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx
        this.gameWidth = canvasW
        this.gameHeigth = canvasH
        
        this.width = 150
        this.heigth = 150

        this.posY = 50
        this.posX = this.gameWidth/2 - this.width

        this.velX = -3

        this.image = new Image()
        this.image.src = "images/main_enemy.png"

        this.enemyBullets = []

    } 

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.heigth)
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

        this.enemyBullets.push(new EnemyBullet(this.ctx, this.posX+this.width/2, this.posY+this.heigth/2, this.heigth))
    }

    clearEnemyBullets() {
               
        this.enemyBullets.forEach( (obs, idx) => {
            if(obs.posY>= this.gameHeigth) {
            this.enemyBullets.splice(idx, 1)
            } 
        })

        console.log(this.enemyBullets)
        
    }
}
class EnemyBullet {

    constructor(ctx, x, y,  playerHeight){
        this.ctx = ctx
        this.posX = x
        this.posY = y
        //this.posY0 = y0
        this.playerHeight = playerHeight
        this.velY = 2
        this.velX = 1

        this.width = 28
        this.height = 40

        this.image = new Image()
        this.image.src = "images/dislikeicon.png"


    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posY += this.velY
        // this.posX += this.velX
        // this.vel
    }
}
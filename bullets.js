class Bullets {

    constructor(ctx, x, y, y0, playerHeight){
        this.ctx = ctx
        this.posX = x
        this.posY = y
        this.posY0 = y0
        this.playerHeight = playerHeight
        this.velY = 3
        this.velX = 1

        this.width = 28
        this.heigth = 40

        this.image = new Image()
        this.image.src = "images/upload.png"


    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.heigth)
    }

    move() {
        this.posY -= this.velY
        // this.posX += this.velX
        // this.vel
    }
}
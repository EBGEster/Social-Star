class Background {

    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = w
        this.heigth = h

        this.image = new Image()
        this.image.src = "images/bg.png"

        this.posX = 0
        this.posY = 0
    }

    draw() {
        
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.heigth)
    }
}
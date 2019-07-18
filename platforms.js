class Platform {

    constructor(ctx, img, canvasW, canvasH, x, y, width){

        this.ctx = ctx
        this.gameWidth = canvasW
        this.gameHeight = canvasH

        this.posX = x
        this.posY = y

        this.width = width
        this.height = 20

        this.image = new Image()
        this.image.src = img

        this.velX = 2
        this.timeoutSet = false
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posX += this.velX
        
        if (this.posX <= -150 || this.posX >= 30){
            this.velX = 0

            if (!this.timeoutSet) {
                if (this.posX === 30 ) {
                    setTimeout(() => {
                        this.velX = -2
                        this.timeoutSet = false
                    }, 5000)
                    this.timeoutSet = true
                }
                else if (this.posX === -150) {
                    setTimeout(() => {
                        this.velX = 2
                        this.timeoutSet = false
                    }, 5000)
                    this.timeoutSet = true
                }
            }
        }
    }

    moveB() {
        this.posX -= this.velX
        
        console.log(this.gameWidth - this.width - 30)
        if (this.posX >= this.gameWidth + 150 || this.posX <= this.gameWidth - this.width - 30){
            this.velX = 0

            if (!this.timeoutSet) {
                if (this.posX === 856) {
                    setTimeout(() => {
                        this.velX = 2
                        this.timeoutSet = false
                    }, 5000)
                    this.timeoutSet = true
                }
                else if (this.posX === 906) {
                    setTimeout(() => {
                        this.velX = -2
                        this.timeoutSet = false
                    }, 5000)
                    this.timeoutSet = true
                }
            }
        }
    }

}


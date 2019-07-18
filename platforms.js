function makeEven(x) { return x % 2 === 0 ? x : x+1 }

class Platform {

    constructor(ctx, img, canvasW, canvasH, x, y, width){

        this.ctx = ctx
        this.gameWidth = canvasW
        this.gameHeight = canvasH

        this.posX = makeEven(x)
        this.posY = y

        this.width = width
        this.height = 20

        this.image = new Image()
        this.image.src = img

        this.velX = 2
        this.timeoutSet = false

        this.platRightStopPos = [
            makeEven(this.gameWidth - this.width) - 30,
            makeEven(this.gameWidth) + 150]
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
        
        if (this.posX === this.platRightStopPos[1] || this.posX === this.platRightStopPos[0]){
            this.velX = 0

            if (!this.timeoutSet) {
                if (this.posX === this.platRightStopPos[1]) {
                    setTimeout(() => {
                        this.velX = 2
                        this.timeoutSet = false
                    }, 5000)
                    this.timeoutSet = true
                }
                else if (this.posX === this.platRightStopPos[0]) {
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


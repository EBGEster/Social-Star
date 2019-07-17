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
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posX += this.velX
        //console.log(this.posX)

        if (this.posX < -150 || this.posX >= 150){
             this.velX = 0

           if(this.posX >= 150 && this.posX <= 200 ){
                setTimeout(() => {
                    this.velX = -2
                    

                }, 5000)
           } else if(this.posX <= -150 && this.posX >= -200) {
                setTimeout(() => {
                    this.velX = 2


                }, 5000)
           }

            //console.log("cambio de direccion")
            
            
        }
    }

    // setVel() {
    //     this.velX = 2
    //     this.velX *=-1
    //     //if(this.posX <= -200) this.velX *= -1
    // }
}
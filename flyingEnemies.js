class FlyingEnemie {
    constructor(ctx, img, canvasW, canvasH, x, y){
        
            this.ctx = ctx
            this.gameWidth = canvasW
            this.gameHeight = canvasH
            
            this.width = 50
            this.height = 50
    
            this.posX = x//this.GameWidth/2 - this.width
            this.posY = y//this.GameHeigth/2-this.width
                
            this.velX = 1
            this.velY = 1
            
    
            this.image = new Image()
            this.image.src = img
    }

    draw() {
        this.ctx.drawImage(this.image,this.posX, this.posY,this.width,this.height)
    }

    moveLeft(){

        this.posX += this.velX
        //this.velY += this.gravity
        this.posY += this.velY
        //console.log(this.posY)

        if (this.posY> this.gameHeight - this.height || this.posY < 0) this.velY *= -1
        if (this.posX > this.gameWidth - this.width || this.posX < 0) this.velX *= -1
    }


    moveRigth(){

        this.posX -= this.velX
        //this.velY += this.gravity
        this.posY -= this.velY
        //console.log(this.posY)

        if (this.posY> this.gameHeight - this.height || this.posY < 0) this.velY *= -1
        if (this.posX > this.gameWidth - this.width || this.posX < 0) this.velX *= -1
    }


}
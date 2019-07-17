class Followers  {
    constructor(ctx, canvasW, ){
        this.ctx = ctx
        this.height = 40
        this.width = 70
        this.posX = canvasW
        this.posY = 20

        this.image0 = new Image()
        this.image0.src = "images/0follow.png"
        this.image1 = new Image()
        this.image1.src = "images/1000follow.png"
        this.image2 = new Image()
        this.image2.src = "images/100kfollow.png"
        this.image3 = new Image()
        this.image3.src = "images/300kfollow.png"
        this.image4 = new Image()
        this.image4.src = "images/700kfollow.png"
        this.image5 = new Image()
        this.image5.src = "images/1mfollow.png"

        //this.lifes = []
        this.space = 0
    }
    
    draw(enemyLife) {

        this.ctx.font = "40px sans-serif"
        this.ctx.fillStyle = "pink"
        this.ctx.fillText("FOLLOWERS", this.posX/2 + 150, 50)

        if (enemyLife >= 9){
            this.ctx.drawImage(this.image0, this.posX - this.width *1.5 , this.posY, this.width, this.height)
        }
        else if (enemyLife >= 8){
            this.ctx.drawImage(this.image1, this.posX - this.width *1.5, this.posY, this.width, this.height)

            console.log("dibujo")
        }
        else if(enemyLife >= 6){
            this.ctx.drawImage(this.image2, this.posX - this.width *1.5, this.posY, this.width, this.height)
            
        }
        else if(enemyLife >= 4){
            this.ctx.drawImage(this.image3, this.posX - this.width *1.5, this.posY, this.width, this.height)
            
        }
        else if(enemyLife >= 1) {
            this.ctx.drawImage(this.image4, this.posX - this.width *1.5, this.posY, this.width, this.height)
            

        }
        else if (enemyLife >= 0) {
            this.ctx.drawImage(this.image5, this.posX - this.width *1.5, this.posY, this.width, this.height)
        }
    }

   
}
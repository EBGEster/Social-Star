class LifeLine  {
    constructor(ctx){
        this.ctx = ctx
        this.height = 40
        this.posX = 40
        this.posY = 20

        this.image = new Image()
        this.image.src = "images/influencer.png"
    }
    

    // init: function (ctx) {
    //     this.ctx = ctx
    // }

    draw(playerLife) {

        this.ctx.drawImage(this.image, this.posX - 30, 20, 25, 40)
        
        if (playerLife >= 2) {
            this.ctx.fillStyle = "green"
        } 
        else if (playerLife < 2) {
            this.ctx.fillStyle = "red"
        }

        this.ctx.fillRect(this.posX, this.posY, playerLife * 100, this.height)
    }
}
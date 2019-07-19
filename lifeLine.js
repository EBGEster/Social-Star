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
        
        if (playerLife >= 3) {
            this.ctx.fillStyle = "#99DE4F"
        } 
        else if (playerLife < 3) {
            this.ctx.fillStyle = "#EE312B"
        }

        this.ctx.fillRect(this.posX, this.posY, playerLife * 50, this.height)
    }
}
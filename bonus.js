class Bonus {

    constructor(ctx, x){
        this.ctx = ctx

        this.posX = x 
        this.posY = 200

        this.width = 50
        this.height = 50

        this.image = new Image()
        this.image.src = "images/loveiticon.png"

        this.extraLife = 5

        
        
    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

        // if (!this.isBonus) {
        //     setTimeout(() => { 
        //         this.leftBonus.draw()
        //         this.shootLock = false }, 3000)
        //     this.shootLock = true
        // }
    }

    createBonus() {
        this.myBonus.push(this.leftBonus = new Bonus(this.ctx, 30))
        this.myBonus.push(this.rigthBonus = new Bonus(this.ctx, this.canvas.width - 80))
    }
}
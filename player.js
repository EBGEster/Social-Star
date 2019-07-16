class Player {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeigth = h

        this.image = new Image()
        this.image.src = "images/influencer.png"

        this.width = 60
        this.height = 110

        this.posX = this.gameWidth/2
        this.posY = this.gameHeigth * .98 - this.height * 2
        this.posY0 = this.gameHeigth * .98 - this.height * 2

        this.velY = 10
        this.gravity = 0.4

        this.keys = keys
        this.setListeners()

        this.bullets = []

    }

    // get bullets(){
    //     return this.bullets
    // }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.bullets.forEach(bullet => bullet.draw())
    }

    move() {
                
        if (this.posY < this.posY0) {
            this.posY += this.velY
            this.velY += this.gravity
        } else {
            this.velY = 1
            this.posY = this.posY0
        }

        this.bullets.forEach(bullet => bullet.move())
    }

    shoot() {

        this.bullets.push(new Bullets(this.ctx, this.posX+this.width/2-14, this.posY, this.posY0, this.height))
    }

    clearBullets() {
               
        this.bullets.forEach( (obs, idx) => {
            if(obs.posY<= 0) {
            this.bullets.splice(idx, 1)
            } 
        }) 
        
    }

    

    setListeners() {
        document.onkeydown = (e) => {
            switch(e.keyCode){
                case this.keys.TOP_KEY: 
                    if (this.posY >= this.posY0) {
                        this.posY -=20
                        this.velY -=10
                    }   
                    break

                case this.keys.LEFT_KEY: 
                    if (this.posX >0){
                        this.posX -=20
                    }
                    break

                case this.keys.RIGTH_KEY:
                    if (this.posX < this.gameWidth - this.width){
                        this.posX +=20
                    }
                    break

                // case this.keys.RIGTH_KEY && this.keys.TOP_KEY:
                //     this.posX +=30
                //     this.velY += this.gravity
                //     this.posY +=this.velY
                    

                //     break

                // case this.keys.LEFT_KEY && this.keys.TOP_KEY:
                //     this.posX -=20
                //     this.posY +=20
                //     this.velY += this.gravity

                //     break   

                case this.keys.SPACE:
                    this.shoot()
                    break

            }
        }
    }
}
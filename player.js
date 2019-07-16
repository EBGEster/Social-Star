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

        this.pLife = 5

    }

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

        if (this.keys.RIGHT_KEY.down && this.posX < this.gameWidth - this.width) {
            this.posX +=10
        }

        if (this.keys.LEFT_KEY.down && this.posX >0){
            this.posX -=10
        }

        if (this.keys.TOP_KEY.down && this.posY >= this.posY0) {
            this.posY -=15
            this.velY -=8
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
            switch (e.keyCode) {
                case this.keys.TOP_KEY.key:
                    this.keys.TOP_KEY.down = true

                    break

                case this.keys.LEFT_KEY.key:
                    this.keys.LEFT_KEY.down = true

                    break

                case this.keys.RIGHT_KEY.key:
                    this.keys.RIGHT_KEY.down = true

                    break

                case this.keys.SPACE:
                    this.shoot()

                    break
            }
        }

        document.onkeyup = (e) => {
            switch (e.keyCode) {
                case this.keys.TOP_KEY.key:
                    this.keys.TOP_KEY.down = false
   
                    break

                case this.keys.LEFT_KEY.key:
                     this.keys.LEFT_KEY.down = false

                        break

                case this.keys.RIGHT_KEY.key:
                     this.keys.RIGHT_KEY.down = false
    
                        break
            }
        }
    }
    

    // setListeners() {
    //     document.onkeydown = (e) => {
    //         switch(e.keyCode){
    //             case this.keys.TOP_KEY: 
    //                 if (this.posY >= this.posY0) {
    //                     this.posY -=20
    //                     this.velY -=10
    //                 }   
    //                 break

    //             case this.keys.LEFT_KEY: 
    //                 if (this.posX >0){
    //                     this.posX -=20
    //                 }
    //                 break

    //             case this.keys.RIGHT_KEY:
    //                 if (this.posX < this.gameWidth - this.width){
    //                     this.posX +=20
    //                 }
    //                 break

    //             case this.keys.SPACE:
    //                 this.shoot()
    //                 break

    //         }
    //     }
    // }
}


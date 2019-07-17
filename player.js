class Player {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = "images/influencerSprite.png"

        this.image.frames = 3
        this.image.framesY = 2
        this.image.framesIndex_X = 0
        this.image.framesIndex_Y = 1

        this.width = 60
        this.height = 110

        this.posX = this.gameWidth/2
        this.posY = this.gameHeight * .98 - this.height * 2
        this.posY0 = this.gameHeight * .98 - this.height * 2

        this.velY = 10
        this.gravity = 0.4

        this.keys = keys
        this.setListeners()

        this.bullets = []

        this.pLife = 5

        // this.timer = 4
        this.shootLock = false

    }

    draw(framesCounter) {
        this.ctx.drawImage(this.image,
            this.image.framesIndex_X * Math.floor(this.image.width/this.image.frames), //inicio corte x
            this.image.framesIndex_Y * Math.floor(this.image.height/this.image.framesY),//inicio corte y 
            Math.floor(this.image.width/this.image.frames),                            // fin corte x
            Math.floor(this.image.height/this.image.framesY),                                                       //fin corte y     
            this.posX, this.posY, this.width, this.height)

       
        
        this.bullets.forEach(bullet => bullet.draw())
    }

    animate(framesCounter){ 
        if(framesCounter%5==0) {
          this.image.framesIndex_X++              
          if(this.image.framesIndex_X>2) {
            this.image.framesIndex_X = 0
          }
        }
        
      }

    move(framesCounter) {
                
        if (this.posY < this.posY0) {
            this.posY += this.velY
            this.velY += this.gravity
        } else {
            this.velY = 1
            this.posY = this.posY0
        }

        if (this.keys.RIGHT_KEY.down && this.posX < this.gameWidth - this.width) {
            this.posX +=10
            this.animate(framesCounter)
            //this.framesIndex_Y = 1
        }

        if (this.keys.LEFT_KEY.down && this.posX >0){
            this.posX -=10
            this.animate(framesCounter)
            //this.framesIndex_Y = 0
        }

        if (this.keys.TOP_KEY.down && this.posY >= this.posY0) {
            this.posY -=20
            this.velY -=10
        }

        this.bullets.forEach(bullet => bullet.move())
    }

    // isFloor() {

    //     if (this.posY < this.posY0) {
    //         this.posY += this.velY
    //         this.velY += this.gravity
    //     } else {
    //         this.velY = 1
    //         this.posY = this.posY0
    //     }

    // }

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
                    this.image.framesIndex_Y= 0

                    break

                case this.keys.RIGHT_KEY.key:
                    this.keys.RIGHT_KEY.down = true
                    this.image.framesIndex_Y=1

                    break

                case this.keys.SPACE:
                    //this.shoot()
                // throttle (this.shoot, 5, this.timer)
                    // this.timer++
                    // console.log(this.timer)
    
                    // if(this.timer == 5) {
                    //     this.shoot()
                    //     this.timer = 0
                    // }

                    if (!this.shootLock) {
                        this.shoot()
                        setTimeout(() => { this.shootLock = false }, 3000)
                        this.shootLock = true
                    }
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

function throttle(func, wait, timer) {
     timer ++

    if(timer == wait) {
        func()
        timer = 0
    }
}

window.onload = () => {
    let button = document.getElementById("button")

    button.onclick = () => {
        document.getElementById("start").play()
        button.classList.add('on')
        button.classList.remove('button')
        Game.init("canvas")
    }
    
}


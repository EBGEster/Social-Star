window.onload = () => {
    let button = document.getElementById("button")

    button.onclick = () => {
        button.classList.add('on')
        button.classList.remove('button')
        Game.init("canvas")
    }
    
}


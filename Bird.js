const birdElem = document.querySelector('[data-bird]')
const BIRD_SPEED = .5
const JUMP_DURATION = 125
let timeSinceLastJusmp = Number.POSITIVE_INFINITY


export function setupBird() {
    setTop(window.innerHeight / 2)
    document.removeEventListener('keydown', handleJump)
    document.addEventListener('keydown', handleJump)
}

export function updateBird(delta) {
    if(timeSinceLastJusmp < JUMP_DURATION){
        setTop(getTop() - BIRD_SPEED * delta)
    }else {
        setTop(getTop() + BIRD_SPEED * delta)
    }
    timeSinceLastJusmp += delta
}

export function getBirdRect() {
    return birdElem.getBoundingClientRect()
}


function setTop(top) {
    birdElem.style.setProperty('--bird-top', top)

}

function getTop() {
    return parseFloat(getComputedStyle(birdElem).getPropertyValue('--bird-top'))

}

function handleJump(e) {
    if(e.code !== 'Space') return

    timeSinceLastJusmp = 0 

}
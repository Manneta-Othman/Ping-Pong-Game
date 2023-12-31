import {updateBird, setupBird, getBirdRect} from "./Bird.js"
import {updatePipe, setupPipes, getPassedPipesCount, getPipeRects} from "./pipe.js"

const title = document.querySelector("[data-title]")
const subTitle = document.querySelector("[data-subtitle]")

document.addEventListener('keypress', handleStart, {once:true})

let lastTime

function updateLoop(time) {
    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
    updatePipe(delta)
    if(checkLose()) return handleLose()
    lastTime = time; 
    window.requestAnimationFrame(updateLoop)

}

function checkLose() {
    const birdRect = getBirdRect()
    const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect) )
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function handleStart() {
    title.classList.add('hide');
    setupBird()
    setupPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)

}


function handleLose() {
    setTimeout(() => {
        title.classList.remove('hide')
        subTitle.classList.remove('hide')
        subTitle.textContent = `${getPassedPipesCount()} Pipes`
        document.addEventListener('keypress', handleStart, {once:true})
    }, 100)

}

export const paintIt = async () => {
    let elements = document.querySelectorAll('li')
    for (let i of elements) {
        i.style.color = theColor();
    }
}

const theColor = () => {
    return 'hsl(' + (360 * Math.random()) + ',50%,50%)'; // H,S,L
}
const getCookieValue = (name) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
const setCookieValue = (name, value) => document.cookie = `${name} = ${value} ;SameSite=Lax`

function randomizedArray(size) {
    let shuffled = []
    while (shuffled.length < size) {
        let randomNumber = Math.floor(Math.random() * size)
        if (shuffled.indexOf(randomNumber) === -1) shuffled.push(randomNumber)
    }
    if (isSolvable(shuffled)) return shuffled
    else return randomizedArray(size)
}

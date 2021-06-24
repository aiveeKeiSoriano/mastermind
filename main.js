let readlineSync = require('readline-sync')

function calcScore(code, guess) {
    let score = { correctPos: 0, incorrectPos: 0 }
    let codeCopy = code.filter((el, i) => el !== guess[i])
    let guessCopy = guess.filter((el, i) => el !== code[i])
    score.correctPos = code.length - codeCopy.length
    for (let i = 0; i < guessCopy.length; i++) {
        if (codeCopy.includes(guessCopy[i])) {
            score.incorrectPos++
            codeCopy.splice(codeCopy.indexOf(guessCopy[i]), 1)
            guessCopy.splice(i, 1)
            i--
        }
    }
    return score
}

function mastermind() {
    let code = new Array(4).fill(0).map(el => Math.ceil(Math.random() * 5))
    // console.log(code)
    console.log("M A S T E R M I N D")
    let count = 1
    let win = false
    while (count < 11) {
        let answer = readlineSync.question(count + ") Guess the 4-digit code: ", {limit: ['quit', /^[1,2,3,4,5][1,2,3,4,5][1,2,3,4,5][1,2,3,4,5]$/], limitMessage: 'Enter 4-digit code in the range 1-5 or "quit" to exit'})
        if (answer === 'quit') break;
        if (answer === code.join('')) {
            win = true
            break;
        }
        let ansArr = answer.split('').map(el => parseInt(el))
        let score = calcScore(code, ansArr)
        console.log(score.correctPos + " matching digit(s) in the correct position")
        console.log(score.incorrectPos + " matching digit(s) in the incorrect position")
        count++
    }

    if (win) {
        console.log("Correct - You win!")
    }
    else {
        console.log("You lose. Code was " + code.join(''))
    }
}

mastermind()
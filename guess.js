// Week 1 project: a computer guessing game

// code to prepare async functions
const readline = require('readline');
const readlineInterface = 
readline.createInterface(process.stdin, process.stdout);

// async ask function itself
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// random number generator function
let min = 1
let max = 99

function numGuess(min, max) {
    let num = max - min +1;
    return min + Math.floor(Math.random() * num);
}

// computer asks to play the game
console.log('Please think of a number')
// computer has seven guesses
let count = 1

// computer guesses a number and asks is it this number?
async function isIt() {
    let num = numGuess(min, max)
    let numGuessQues = await ask('Is it ' + num + '? ')
        // if the computer guessed correctly on try one
        // it declares the user's number and displays a victory message
        // then exists the program
        if(numGuessQues === 'y') {
            console.log('Your number was ' + num +'!\nI guessed in 1 try!')
            process.exit();
         } else {
            // if the computer did not guess correctly on try one
            // it asks if the user's number is higher or lower
            // and guesses again
            while (numGuessQues === 'n') {
                while (count <= 6) {
                    count = count + 1
                let highLow = await ask('Is it higher (H) or lower (L)? ')
                    while (highLow === 'h') {
                        min = num + 1
                        num = numGuess(min, max)
                        let newNumQues = await ask('Is it ' + num + '? ')
                            if(newNumQues === 'y') {
                                console.log('Your number was ' + num +'!')
                                console.log('I guessed in ' + count + ' times! ')
                                process.exit();
                            } else {
                                break;
                            }
                    
                    } while (highLow === 'l') {
                        max = num - 1
                        num = numGuess(min, max)
                        let newNumQues = await ask('Is it ' + num + '? ')
                            if(newNumQues === 'y') {
                                console.log('Your number was ' + num +'!')
                                process.exit();
                            } else {
                                break;
                            }
                    }
                }
    console.log('You win this time...')
    process.exit(); 
            }
        }
}

isIt();

// 
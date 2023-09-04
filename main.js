//console.log(words)

const wordElement = document.querySelector('.word')
const hintElement = document.querySelector('.hint span')
const refreshButton = document.querySelector('.refresh-word')
const checkButton = document.querySelector('.check-word')
const input = document.querySelector('input')
const timeElement = document.querySelector('.time span b')
const scoreElement = document.querySelector('.score span')
const numOfPlays = document.querySelector('.num span')

//initial variables

let word = ''
let timer
let score = 0
let num = 3 //Each player has 3 chances
let time = 10

//Initial Game

function initGame() {
  //Generate a random word
  let randomIndex = Math.floor(Math.random() * words.length)
  let randomObj = words[randomIndex]
  word = randomObj.word.toLowerCase()
  console.log(randomObj)

  //shuffles characters of the word in a string
  let wordArr = word.split('').sort(() => Math.random() - 0.5)
  let scrambleWord = wordArr.join('')

  /** If the characters are not shuffled successfully,
   * call the initGame() function again  */

  if (scrambleWord === word) return initGame()

  //render HTML
  numOfPlays.innerText = num
  scoreElement.innerText = score
  wordElement.innerText = scrambleWord
  hintElement.innerText = randomObj.hint
  timeElement.innerText = time
  input.value = ''
  checkButton.setAttribute('disabled', true)

  //initial timer
  timer = setInterval(() => {
    if (time > 0) {
      time--
      return (timeElement.innerText = time)
    }
    loseGame(`Time Out!  ${word.toLocaleUpperCase()} is the correct word`)
  }, 1000)
}
initGame()

//Refresh Game -> reset all values except 'score" and numbers of plays
refreshButton.addEventListener('click', () => loseGame())

function refreshGame(msg) {
  if (msg) alert(msg)
  word = ''
  time = 10
  clearInterval(timer)
  initGame()
}

//Game Over
function gameOver() {
  let msg = `Game Over! Your score is ${score} points, play again?`
  num = 3
  score = 0
  refreshGame(msg)
}

//lose Game
function loseGame(msg) {
  num--
  if (num < 0) return gameOver()
  refreshGame(msg)
  //alert(message)
}

//Win Game
function winGame(msg) {
  score++
  refreshGame(msg)
}

//Check if input is disabled
input.addEventListener('input', (e) => {
  if (!e.target.value.trim()) {
    checkButton.setAttribute('disabled', true)
  } else {
    checkButton.removeAttribute('disabled')
  }
})

//Check Word
checkButton.addEventListener('click', () => {
  let answerText = input.value.trim().toLowerCase()
  if (answerText !== word)
    return loseGame(
      `Oops! ${answerText.toUpperCase()} is not the correct answer`
    )
  return winGame(`Congrats! ${word.toUpperCase()} is the correct answer`)
})
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault() // Prevent the default behavior of the enter key
    checkButton.click() // Trigger the click event on the button
  }
})

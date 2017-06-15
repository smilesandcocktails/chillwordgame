document.addEventListener('DOMContentLoaded', function (event) {
  // puzzle array of objects
  var puzzle =
    [
    {answer: 'PIZZA', category: 'FOOD'},
    {answer: 'PASSIONFRUITS', category: 'FOOD'},
    {answer: 'CHEESEBURGERS', category: 'FOOD'},
    {answer: 'BLACKBERRIES', category: 'FOOD'},
    {answer: 'GINGERBREAD', category: 'FOOD'},
    {answer: 'POMEGRANATE', category: 'FOOD'},
    {answer: 'QUESADILLAS', category: 'FOOD'},
    {answer: 'LEMONGRASS', category: 'FOOD'},
    {answer: 'PISTACHIOS', category: 'FOOD'},
    {answer: 'WATERMELON', category: 'FOOD'},
    {answer: 'HAZELNUTS', category: 'FOOD'},
    {answer: 'STONEHENGE', category: 'LANDMARK'},
    {answer: 'MERLION', category: 'LANDMARK'},
    {answer: 'PARTHENON', category: 'LANDMARK'},
    {answer: 'COLOSSEUM', category: 'LANDMARK'},
    {answer: 'KILIMANJARO', category: 'LANDMARK'},
    {answer: 'ACROPOLIS', category: 'LANDMARK'},
    {answer: 'POMPEII', category: 'LANDMARK'},
    {answer: 'ALCATRAZ', category: 'LANDMARK'},
    {answer: 'MECCA', category: 'LANDMARK'},
    {answer: 'FRANKENSTEIN', category: 'CHARACTER'},
    {answer: 'CHEWBACCA', category: 'CHARACTER'},
    {answer: 'LEPRECHAUNS', category: 'CHARACTER'},
    {answer: 'ZEUS', category: 'CHARACTER'},
    {answer: 'POSEIDON', category: 'CHARACTER'},
    {answer: 'VOLDEMORT', category: 'CHARACTER'},
    {answer: 'GODZILLA', category: 'CHARACTER'},
    {answer: 'BATWOMAN', category: 'CHARACTER'},
    {answer: 'CHIMPANZEES', category: 'ANIMALS'},
    {answer: 'CATERPILLAR', category: 'ANIMALS'},
    {answer: 'HUMMINGBIRD', category: 'ANIMALS'},
    {answer: 'WHALE', category: 'ANIMALS'},
    {answer: 'DOLPHINS', category: 'ANIMALS'},
    {answer: 'HONEYBEES', category: 'ANIMALS'},
    {answer: 'COMPASS', category: 'THINGS'},
    {answer: 'AUTOMOBILE', category: 'THINGS'},
    {answer: 'QUESTIONNAIRE', category: 'THINGS'},
    {answer: 'CARBOHYDRATES', category: 'THINGS'},
    {answer: 'BANJO', category: 'THINGS'},
    {answer: 'MOTORCYCLES', category: 'THINGS'},
    {answer: 'ABBREVIATIONS', category: 'THINGS'}
    ]

  // Declare variables used by multiple functions
  var randomIndex = puzzle.length + 1
  var alphabets = [] // to store guessed letter entries for checks
  var timeoutOneMin
  var counter = 60
  var scoreCounter = 0

  // Hiding guess & solve buttons at the start of the page
  var bottomContainer = document.querySelector('.bottom-container')
  bottomContainer.style.display = 'none'

  // Calls to display the puzzle when click on "Let's Play" button at homepage
  var startButton = document.querySelector('#startButton')
  startButton.addEventListener('click', function () {

    var intro = document.querySelector('.intro')
    intro.style.display = 'none'

    hideIntroShowButtons()
    oneMinCountDown()
    displayPuzzle()
  
  })

  // Call functions to check on 1-letter-guess validity & win
  var guess = document.querySelector('#guess')
  guess.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode
    if (key === 13) {
      checkGuess()
      guessResult()
      exposeLetter()
      didGuessSolve()
      guess.value = ''
    }
  })

  // Call functions to check on entire word validity & win
  var solve = document.querySelector('#solve')
  solve.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode
    if (key === 13) {
      isWordCorrect()
      displaySolveResult()
    }
  })

  // Set timer interval by 1 second
  function oneMinCountDown () {
    timeoutOneMin = setInterval(alertTimesUp, 1000)
  }

  // Displays timer on screen; Alerts if time is 0 & restarts
  function alertTimesUp () {
    var seconds = document.querySelector('.seconds')
    seconds.textContent = 'TIME LEFT: ' + counter + ' SECONDS'

    // Alert, Hide guess fields, reset score, call restart
    if (counter < 1) {
      clearInterval(timeoutOneMin)

      var resultBox = document.querySelector('.interaction')
      var showResult = document.querySelector('.showResult')

      showResult.textContent = 'SORRY, YOU RAN OUT OF TIME. TRY AGAIN!'
      resultBox.appendChild(showResult)

      var bottomContainer = document.querySelector('.bottom-container')
      bottomContainer.style.display = 'none'

      scoreCounter = 0
      var scoreboard = document.querySelector('.scoreboard')
      var score = document.querySelector('#score')

      score.textContent = 'BEST SCORE: ' + scoreCounter
      scoreboard.appendChild(score)

      restart()
    } else {
      counter--
    }
  }
  // Gets random number for index of puzzles array
  function randomizeIndex () {
    randomIndex = Math.floor(Math.random() * puzzle.length)
    return randomIndex
  }

  // Hide start button & show guess fields
  function hideIntroShowButtons () {
    var startButton = document.querySelector('#startButton')
    startButton.style.display = 'none'
    var bottomContainer = document.querySelector('.bottom-container')
    bottomContainer.style.display = 'block'
  }

  // Removes previous letters, categories, alerts, gets random # & displays puzzle & corresponding category
  function displayPuzzle () {
    // Remove previous letters
    var dummyLetters = document.querySelectorAll('.letter')
    dummyLetters.forEach(function (letter) {
      letter.remove()
    })
    // Remove previous categories
    var dummyCategory = document.querySelectorAll('.category')
    dummyCategory.forEach(function (category) {
      category.remove()
    })

    // Remove previous alerts
    var previousResultShow = document.querySelector('.showResult')
    previousResultShow.textContent = ''

    var randomIndex = randomizeIndex()

    var answer = puzzle[randomIndex].answer
    var category = puzzle[randomIndex].category
    var display = document.querySelector('#display-puzzle')

    // Separate Letters of Word into Own Box
    for (var i = 0; i < answer.length; i++) {
      var eachLetterBox = document.createElement('p')
      eachLetterBox.className = 'letter'
      eachLetterBox.textContent = answer.split('')[i]
      display.appendChild(eachLetterBox)
    }

    // Display corresponding Category below the boxes
    var categoryIntro = document.createElement('p')
    categoryIntro.textContent = 'The category of this word: ' + category
    categoryIntro.className = 'category'
    display.appendChild(categoryIntro)
  }

  // Checks if 1-letter guess entry is valid
  function checkGuess () {
    var guess = document.querySelector('#guess')
    var answer = puzzle[randomIndex].answer

    // Guess entry is not a 1-letter entry
    if (guess.value.length > 1 || guess.value.length < 1) {
      return 1
    // Letter has already been guessed stored in array
    } else if (alphabets.includes(guess.value.toUpperCase()) === true) {
      return 2
    // Letter is not in the word
    } else if (!answer.includes(guess.value.toUpperCase())) {
      return 3
    // Letter is in the word
    } else if (answer.includes(guess.value.toUpperCase())) {
      return 4
    }
  }

  // Checks if guess entry is the final winning word
  function didGuessSolve () {
    var letters = document.querySelectorAll('.letter')
    var answer = puzzle[randomIndex].answer
    var resultBox = document.querySelector('.interaction')
    var showResult = document.querySelector('.showResult')

    var pinkArr = []

    // If displayed letter has a pink background, push to a check array
    letters.forEach(function (letter) {
      if (letter.style.backgroundColor === 'deeppink') {
        pinkArr.push(1)
      }
    })

    if (pinkArr.length === answer.length) {
      scoreCounter = scoreCounter + 1000
      var scoreboard = document.querySelector('.scoreboard')
      var score = document.querySelector('#score')

      score.textContent = 'BEST SCORE: ' + scoreCounter
      scoreboard.appendChild(score)

      showResult.textContent = 'HOORAY! YOU HAVE GUESSED CORRECTLY!'
      resultBox.appendChild(showResult)

      var bottomContainer = document.querySelector('.bottom-container')
      bottomContainer.style.display = 'none'

      guess.value = ''
      // Stop the timer
      clearInterval(timeoutOneMin)
      // Remove solved puzzle from randomization
      removeOldPuzzleAndRestart()
    }
  }

  // Takes return values from checkGuess() & display results
  function guessResult () {
    var guess = document.querySelector('#guess')
    var resultBox = document.querySelector('.interaction')
    var showResult = document.querySelector('.showResult')

    resultBox.removeChild(resultBox.lastChild)

    if (checkGuess() === 1) {
      showResult.textContent = 'SORRY, YOU HAVE TO ENTER A 1-LETTER GUESS.'
      resultBox.appendChild(showResult)
    } else if (checkGuess() === 2) {
      showResult.textContent = 'YOU HAVE ALREADY GUESSED \'' + guess.value.toUpperCase() + '\' EARLIER ON.'
      resultBox.appendChild(showResult)
    } else if (checkGuess() === 3) {
      alphabets.push(guess.value.toUpperCase())
      showResult.textContent = 'SORRY, \'' + guess.value.toUpperCase() + '\' IS NOT IN THE WORD!'
      resultBox.appendChild(showResult)
    } else if (checkGuess() === 4) {
      alphabets.push(guess.value.toUpperCase())
      showResult.textContent = 'EXCELLENT! \'' + guess.value.toUpperCase() + '\' IS IN THE WORD'
      resultBox.appendChild(showResult)
    }
  }

  // Reveals the letter if the guess is correct
  function exposeLetter () {
    var guess = document.querySelector('#guess')
    var letters = document.querySelectorAll('.letter')

    letters.forEach(function (letter) {
      if (letter.textContent === guess.value.toUpperCase()) {
        letter.style.backgroundColor = 'deeppink'
      }
    })
  }

  // Checks the solve input field if word is correct
  function isWordCorrect () {
    var solveInput = document.querySelector('#solve')
    var answer = puzzle[randomIndex].answer

    if (solveInput.value.toUpperCase() === answer) {
      return true
    } else {
      return false
    }
  }

  // Takes isWordCorrect() result & display if word is correct
  function displaySolveResult () {
    var letters = document.querySelectorAll('.letter')
    var resultBox = document.querySelector('.interaction')
    var showResult = document.querySelector('.showResult')

    if (isWordCorrect() === true) {
      scoreCounter = scoreCounter + 1000
      var scoreboard = document.querySelector('.scoreboard')
      var score = document.querySelector('#score')

      score.textContent = 'BEST SCORE: ' + scoreCounter
      scoreboard.appendChild(score)

      letters.forEach(function (letter) {
        letter.style.backgroundColor = 'deeppink'
      })

      showResult.textContent = 'SMART ONE! YOU\'VE SOLVED IT!'
      resultBox.appendChild(showResult)

      solve.value = ''

      clearInterval(timeoutOneMin)

      var bottomContainer = document.querySelector('.bottom-container')
      bottomContainer.style.display = 'none'
      removeOldPuzzleAndRestart()
    } else {
      showResult.textContent = 'SORRY PLEASE TRY AGAIN!'
      resultBox.appendChild(showResult)

      solve.value = ''
    }
  }
  // Remove previously solved puzzles & restart
  function removeOldPuzzleAndRestart () {
    puzzle.splice(randomIndex, 1)

    restart()
  }
  // Resets timer counter to 60 seconds, clear alphabet array
  function restart () {
    var startButton = document.querySelector('#startButton')
    startButton.value = 'Another Puzzle'
    startButton.style.display = 'block'

    counter = 60
    alphabets = []
  }
})

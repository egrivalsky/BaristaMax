//Objects
const drinkOrdered = {
    size: null,
    milk: null,
    drink: null,
}

const drinkServed = {
    size: null,
    milk: null,
    drink: null,
}

//Global arrays
const sizeArr = ["small ", "medium ", "large "];
const milkArr = ["whole milk", "soy"];
const processArr = ["brew ", "espresso "];
const requestArr = ["I'd like a ", "Let me get a ", "May I please have a ", "Gimme a "];
const drinkArr = ["latte ", "coffee ", "iced latte ", "chai ", "mocha", "iced coffee "];

//Global variables
let t;
let size;
let milk;
let process;
let request;
let drink;
let roundNumber = 0;
let tips = 0;

//Functions

function startGame() {
    roundNumber = roundNumber + 1;
    runTimer();
    generateOrder();
    let gameInfo = document.getElementById('game-info')
    gameInfo.getElementsByTagName('h3')[0].innerText = `ROUND ${roundNumber}`
    document.querySelector('#game-progress');
    let h2ForTipsLabel = document.createElement('h2');
    h2ForTipsLabel.setAttribute('id', 'total-tips-label');
    let h2ForTipsAmount = document.createElement('h2');
    h2ForTipsAmount.setAttribute('id', 'tips-display')
    document.querySelector('#game-progress').append(h2ForTipsLabel);
    h2ForTipsLabel.innerText = `Total tips: `;
    h2ForTipsAmount.innerText = `$${tips}`
    document.getElementById('game-progress').append(h2ForTipsAmount);
    let goalForRound = document.createElement('span');
    goalForRound.setAttribute('id', 'goal-for-round');
    goalForRound.innerText = `You need ${roundNumber * 5 + 5} for lunch.`
    document.querySelector('#game-progress').append(goalForRound);

}
function runTimer() {
    t = 2;
    // ** - reacts to buttons ONLY because spans do not have a class assigned - **
    document.querySelector('#select-from').addEventListener('click', chooseIngredients);
    console.log('start button clicked');
    let timerDisplay = document.getElementById('timer')
    const gameTimer = setInterval(() => {
        if (t >= 0) {
            timerDisplay.innerText = t;
            t--;
        } else {
            clearInterval(gameTimer);
            timesUp();
        }
    }, 1000);
}

const generateOrder = () => {
    size = sizeArr[Math.floor(Math.random() * sizeArr.length)];
    milk = milkArr[Math.floor(Math.random() * milkArr.length)];
    //process = processArr[Math.floor(Math.random() * (processArr.length - 1))];
    request = requestArr[Math.floor(Math.random() * requestArr.length)];
    drink = drinkArr[Math.floor(Math.random() * drinkArr.length)];
    let requestSentence = "<span>"+`${request} ${size} ${drink} with ${milk}.`+"</span>";
    drinkOrdered.size = size;
    drinkOrdered.milk = milk;
    drinkOrdered.drink = drink;
    document.getElementById('customer-order').innerHTML =  requestSentence;
    console.log(requestSentence)
}

const generateSizeButtons = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let button = document.createElement('button')
        button.innerText=arr[i];
        button.setAttribute('id', arr[i])
        button.setAttribute('class', 'size');
        document.getElementById('size').append(button);
    }
}
const generateMilkButtons = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let button = document.createElement('button');
        button.innerText=arr[i];
        button.setAttribute('id', arr[i]);
        button.setAttribute('class', 'milk');
        document.getElementById('milk').append(button);
    }
}
const generateDrinkButtons = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let button = document.createElement('button');
        button.setAttribute('id', arr[i]);
        button.setAttribute('class', 'drink');
        button.innerText=arr[i];
        document.getElementById('drink').append(button);
    }
}

function generateNextOrder() {
    generateOrder();
    let list = document.getElementById('current-ingredients');
    let item = list.getElementsByTagName('li');
    while (item.length > 0) {
    list.removeChild(item[0]);
    }
}

const chooseIngredients = (e) => {
    if (e.target.getAttribute('class')) {
        if (e.target.getAttribute('class') === 'size') {
            drinkServed.size = e.target.id;
        } else if (e.target.getAttribute('class') === 'milk') {
            drinkServed.milk = e.target.id;
        } else {
            drinkServed.drink = e.target.id
        }
    
        let ingredient = document.createElement('li');
        ingredient.innerText = e.target.id;
        document.getElementById('current-ingredients').append(ingredient);
    } 
    };

const success = () => {
    document.querySelector('#result').remove();
    let announceResult = document.createElement('h1')
    announceResult.setAttribute('id', 'result');
    announceResult.setAttribute('style', 'color: blue');
    announceResult.innerText = "SUCCESS! +$1";
    document.querySelector('#pass-fail').append(announceResult);
    tips = tips + 1;
    console.log(tips);
    let tipsDisplay = document.querySelector('#tips-display');
    tipsDisplay.innerText = `$${tips}`;
    generateNextOrder();
}
    
const failure = () => {
    document.querySelector('#result').remove();
    let announceResult = document.createElement('h2')
    announceResult.setAttribute('id', 'result');
    announceResult.setAttribute('style', 'color: red');
    announceResult.innerText = "This is not what I ordered!  -2 seconds";
    document.querySelector('#pass-fail').append(announceResult);
    t = t - 2;

    generateNextOrder();
}

function timesUp() {
    console.log("TIME'S UP!");
    console.log(`total tips: $${tips}`)
    let divToClear = document.getElementById('game-progress');
    let h2ToClear = divToClear.getElementsByTagName('h2')[0];
    divToClear.removeChild(h2ToClear);
    //YOU WIN
    if (tips === 0) {
        console.log("You win! You got enough money to eat!")
        let header = document.getElementById('header');
        let youWin = document.createElement('div');
        youWin.setAttribute('id', 'you-win');
        youWin.innerHTML = "<span>YOU WIN!</span>";
        let playAgainButton = document.createElement('button');
        playAgainButton.setAttribute('id', 'play-again-button');
        youWin.style.flexDirection = 'column';
        playAgainButton.style.marginTop = "10px"
        playAgainButton.innerHTML = "Play Again";
        header.append(youWin);
        document.getElementById('you-win').append(playAgainButton);
        document.querySelector('#start').removeEventListener('click', startGame);
        document.getElementById('play-again-button').addEventListener('click', playAgain);
    }
}

function playAgain() {
      //play again button
      let youWin = document.getElementById('you-win');
      header.removeChild(youWin);
      roundNumber = roundNumber - 1;
      let divToClear = document.getElementById('game-progress')
      let goal = document.querySelector('#goal-for-round');
      let tipAmount = document.querySelector('#tips-display');
      let tipDisplay = document.querySelector('#total-tips-label');
      divToClear.removeChild(goal);
      divToClear.removeChild(tipAmount);
      divToClear.removeChild(tipDisplay);
      tips = 0;
      generateNextOrder();
      startGame();
    console.log("you wanna play")
}



/*
Event listeners
*/
//adds ingredients to drink being made


//checks if drink has correct ingredients then generates next order
document.querySelector('#serve-drink').addEventListener('click', (e) => {
    let result;
    if (drinkOrdered.size === drinkServed.size &&
        drinkOrdered.milk === drinkServed.milk &&
        drinkOrdered.drink === drinkServed.drink ) {
             success();
        } else {
             failure(); 
        };

})


//starts timer and loads round
document.querySelector('#start').addEventListener('click', startGame);
generateSizeButtons(sizeArr);
generateMilkButtons(milkArr);
generateDrinkButtons(drinkArr);




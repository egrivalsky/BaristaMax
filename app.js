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
let t = 45;
let size;
let milk;
let process;
let request;
let drink;
let roundNumber = 0;
let tips = 0;
let tipsGoal;

//Functions

function startGame() {
    roundNumber = roundNumber + 1;
    tipsGoal = roundNumber * 5 + 5;
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
    goalForRound.innerText = `You need $${tipsGoal} for lunch.`
    document.querySelector('#game-progress').append(goalForRound);
    document.querySelector('#serve-drink').addEventListener('click', serveDrink);

}
function runTimer() {
    t = 45;
    // ** - reacts to buttons ONLY because spans do not have a class assigned - **
    document.querySelector('#select-from').addEventListener('click', chooseIngredients);
    console.log('start button clicked');
    let timerDisplay = document.getElementById('timer')
    const gameTimer = setInterval(() => {
        timerDisplay.innerText = t;
        if (t > 0) {
            t--;
            timerDisplay.innerText = t;
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
}

const generateSizeButtons = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let button = document.createElement('button')
        button.innerText=arr[i];
        button.setAttribute('id', arr[i])
        button.setAttribute('class', 'size');
        //document.getElementById('size').append(button);
        document.getElementById('select-from').append(button)
    }
}
const generateMilkButtons = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let button = document.createElement('button');
        button.innerText=arr[i];
        button.setAttribute('id', arr[i]);
        button.setAttribute('class', 'milk');
       // document.getElementById('milk').append(button);
       document.getElementById('select-from').append(button)
    }
}
const generateDrinkButtons = (arr) => {

    while (arr.length > 0) {
        let button = document.createElement('button');
        let buttonValue = arr.splice(Math.floor(Math.random() * arr.length), 1);
        button.setAttribute('id', buttonValue);
        button.setAttribute('class', 'drink');
        button.innerText=buttonValue;

    /*for (let i = 0; i < arr.length; i++) {
        let button = document.createElement('button');
        button.setAttribute('id', arr[i]);
        button.setAttribute('class', 'drink');
        button.innerText=arr[i]; */
       // document.getElementById('drink').append(button);
       document.getElementById('select-from').append(button)
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

//checks if drink has correct ingredients then generates next order
function serveDrink() {
    document.querySelector('#result').remove();
    if (drinkOrdered.size === drinkServed.size &&
        drinkOrdered.milk === drinkServed.milk &&
        drinkOrdered.drink === drinkServed.drink ) {
             success();
        } else {
             failure(); 
        };

}


const success = () => {
    //document.querySelector('#result').remove();
    let announceResult = document.createElement('h2')
    announceResult.setAttribute('id', 'result');
    announceResult.setAttribute('style', 'color: white');
    announceResult.innerText = "SUCCESS! +$1";
    document.querySelector('#pass-fail').append(announceResult);
    tips = tips + 1;
    console.log(tips);
    let tipsDisplay = document.querySelector('#tips-display');
    tipsDisplay.innerText = `$${tips}`;
    generateNextOrder();
}
    
const failure = () => {
    //document.querySelector('#result').remove();
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
    console.log(`total tips: $${tips}`);
    document.querySelector('#serve-drink').removeEventListener('click', serveDrink);
    let divToClear = document.getElementById('game-progress');
    let h2ToClear = divToClear.getElementsByTagName('h2')[0];
    divToClear.removeChild(h2ToClear);
    //YOU WIN THE ROUND
    if (tips >= tipsGoal) {
        let header = document.getElementById('header');
        let winLose = document.createElement('div');
        winLose.setAttribute('id', 'win-lose');
        winLose.innerHTML = "<span>YOU WIN!</span>";
        let playAgainButton = document.createElement('button');
        playAgainButton.setAttribute('id', 'play-again-button');
        winLose.style.flexDirection = 'column';
        playAgainButton.style.marginTop = "10px"
        playAgainButton.innerHTML = "Play Again";
        header.append(winLose);
        document.getElementById('win-lose').append(playAgainButton);
        document.querySelector('#start').removeEventListener('click', startGame);
        document.getElementById('play-again-button').addEventListener('click', playAgain);
    //YOU LOSE THE ROUND   
    } else {
        console.log("sorry, you lost");
        let header = document.getElementById('header');
        let winLose = document.createElement('div');
        winLose.setAttribute('id', 'win-lose');
        winLose.style.flexDirection = 'column';
        winLose.innerHTML = "<span id='womp-womp'>WOMP WOMP YOU LOST!</span>";
        let playAgainButton = document.createElement('button');
        playAgainButton.setAttribute('id', 'play-again-button');
        playAgainButton.style.marginTop = "10px"
        playAgainButton.innerHTML = "Play Again";
        header.append(winLose);
        document.getElementById('win-lose').append(playAgainButton);
        document.querySelector('#start').removeEventListener('click', startGame);
        document.getElementById('play-again-button').addEventListener('click', playAgain);

    }
}

function playAgain() {
      //play again button
      let header = document.getElementById('header');
      let winLose = document.getElementById('win-lose');
      header.removeChild(winLose);
      roundNumber = roundNumber - 1;
      let divToClear = document.getElementById('game-progress')
      let goalForRound = document.querySelector('#goal-for-round');
      let h2ForTipsAmount = document.querySelector('#tips-display');
      let successDisplayDiv = document.querySelector('#pass-fail');
      successDisplayDiv.innerHTML = "<h2 id='result'></h2>";
      divToClear.removeChild(goalForRound);
      divToClear.removeChild(h2ForTipsAmount);
      tips = 0;
      generateNextOrder();
      startGame();
    console.log("you wanna play")
}


//starts timer and loads round
document.querySelector('#start').addEventListener('click', startGame);
generateSizeButtons(sizeArr);
generateMilkButtons(milkArr);
generateDrinkButtons(drinkArr);




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
const drinkArr = ["latte ", "coffee ", "espresso ", "iced coffee "];

//Global variables
let size;
let milk;
let process;
let request;
let drink;

//Functions
function runTimer() {
    let t = 60;
    console.log('start button clicked');

    let timerDisplay = document.getElementById('timer')
    const gameTimer = setInterval(() => {
        if (t >= 0) {
            timerDisplay.innerText = t;
            t--;
        } else {
            timesUp();
        }
        
    }, 100);


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


function timesUp() {
    console.log("TIME'S UP!");
    clearInterval(gameTimer);

}


/*
Event listeners
*/
//adds ingredients to drink being made
// ** - reacts to buttons ONLY because spans do not have a class assigned - **
document.querySelector('#select-from').addEventListener('click', chooseIngredients)

//checks if drink has correct ingredients then generates next order
document.querySelector('#serve-drink').addEventListener('click', (e) => {
    let result;
    if (drinkOrdered.size === drinkServed.size &&
        drinkOrdered.size === drinkServed.size &&
        drinkOrdered.size === drinkServed.size) {
            result = "SUCCESS!"
        } else {
            result = "This is not what I ordered!"
        };
    document.querySelector('#result').remove();
    let announceResult = document.createElement('h1')
    announceResult.setAttribute('id', 'result');
    announceResult.innerText = result;
    document.querySelector('#pass-fail').append(announceResult);
    generateNextOrder();
})

//starts timer and loads round
document.querySelector('#start').addEventListener('click', runTimer);
document.querySelector('#start').addEventListener('click', generateOrder);



generateSizeButtons(sizeArr);
generateMilkButtons(milkArr);
generateDrinkButtons(drinkArr);

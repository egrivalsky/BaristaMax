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

generateOrder();
generateSizeButtons(sizeArr);
generateMilkButtons(milkArr);
generateDrinkButtons(drinkArr);
console.log(document.querySelectorAll('button'));
console.log(drinkOrdered);
/*
Event listeners
*/
//adds ingredients to drink being made
document.querySelector('#select-from').addEventListener('click', (e) => {
    if (e.target.id !== "select-from") {
        let ingredient = document.createElement('li');
        ingredient.innerText = e.target.id;
        document.getElementById('current-ingredients').append(ingredient);
        console.log(e.target.id);
        console.log(e.target.class);
    };
})

//checks if drink has correct ingredients
document.querySelector('#serve-drink').addEventListener('click', (e) => {
    let result;
    if (drinkOrdered.size === drinkServed.size &&
        drinkOrdered.size === drinkServed.size &&
        drinkOrdered.size === drinkServed.size) {
            result = "SUCCESS!"
        } else {
            result = "This is not what I ordered!"
        };
    let announceResult = document.createElement('h1').innerText =result;
    document.querySelector('#pass-fail').append(announceResult);

})


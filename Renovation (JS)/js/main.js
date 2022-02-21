const inputs = document.querySelectorAll('input');
const squareInput = document.querySelector('#square-input');
const rangeInput = document.querySelector('#square-range');
const radioType = document.querySelectorAll('input[name="type"]');
const radioBuilding = document.querySelectorAll('input[name="building"]');
const radioRooms = document.querySelectorAll('input[name="rooms"]');
const checkboxCeiling = document.querySelector('[name="ceiling"]');
const checkboxWalls = document.querySelector('[name="walls"]');
const checkboxFloor = document.querySelector('[name="floor"]');

const totalPrice = document.querySelector('#total-price');

const basePrice = 6000

let indexType = 1;
let indexBuilding = 1;
let indexRooms = 1;
let indexCeiling = 1;
let indexWalls = 1;
let indexFloor = 1;

reloadTotalPrice();

for (const input of inputs) {
    input.addEventListener('input', reloadTotalPrice);
};


squareInput.addEventListener('input', function () {
    rangeInput.value = squareInput.value;
});

rangeInput.addEventListener('input', function () {
    squareInput.value = rangeInput.value;
});

function reloadTotalPrice (){
        
    for (const radio of radioType){
        if (radio.checked){
            indexType = parseFloat(radio.value);
        }
    };

    for (const radio of radioBuilding){
        if (radio.checked){
            indexBuilding = parseFloat(radio.value);
        }
    };

    for (const radio of radioRooms){
        if (radio.checked){
            indexRooms = parseFloat(radio.value);
        }
    };

    if (checkboxCeiling.checked) {
        indexCeiling = checkboxCeiling.value * squareInput.value;
    } else indexCeiling = 0;
    if (checkboxWalls.checked) {
        indexWalls = parseFloat(checkboxWalls.value);
    } else indexWalls = 1;
    if (checkboxFloor.checked) {
        indexFloor = parseFloat(checkboxFloor.value);
    } else indexFloor = 1;

    const total = squareInput.value * basePrice * indexType * indexBuilding * indexRooms * indexWalls * indexFloor + indexCeiling;
    const formatter = new Intl.NumberFormat('ru');
    totalPrice.innerText = formatter.format(total);
};
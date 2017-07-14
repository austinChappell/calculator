let total = 0;
let ansStr = '';
let value = [];
let operators = [];
let numCount = 0;
let operatorCount = 0;

let container = document.querySelector('.container');
let one = document.querySelector('#one');
let two = document.querySelector('#two');
let three = document.querySelector('#three');
let four = document.querySelector('#four');
let five = document.querySelector('#five');
let six = document.querySelector('#six');
let seven = document.querySelector('#seven');
let eight = document.querySelector('#eight');
let nine = document.querySelector('#nine');
let zero = document.querySelector('#zero');
let clear = document.querySelector('#clear');
let answer = document.querySelector('#answer h2');
let divide = document.querySelector('#divide');
let times = document.querySelector('#times');
let minus = document.querySelector('#minus');
let plus = document.querySelector('#plus');
let equals = document.querySelector('#equals');
let dot = document.querySelector('#dot');

function updateAnswer() {
  answer.textContent += keyStrk;
}

container.addEventListener('click', function(evt) {
  let target = evt.target;
  if (target.classList.contains('number')) {
    keyStrk = target.innerHTML;
    ansStr += keyStrk;
    updateAnswer();
  } else if (target.classList.contains('operator')) {
    value[numCount] = Number(ansStr);
    numCount++;
    ansStr = '';
    answer.textContent += target.innerHTML;
    operators[operatorCount] = target.innerHTML;
    operatorCount++;
  } else if (target.classList.contains('equals')) {
    value[numCount] = Number(ansStr);
  }
});

function calculate() {

}

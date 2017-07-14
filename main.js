let total = 0;
let ansStr = '';
let value = [];
let operators = [];
let numCount = 0;
let operatorCount = 0;
let allTotals = [];
let allTotalsCount = 0;

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

function setZero() {

  total = 0;
  ansStr = '';
  value = [];
  operators = [];
  numCount = 0;
  operatorCount = 0;
  answer.textContent = ansStr;
  let allTotals = [];
  let allTotalsCount = 0;

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

  } else if (target.classList.contains('sq-root')) {

    value[numCount] = Number(ansStr);
    ansStr = '';
    answer.textContent += target.innerHTML;
    operators[operatorCount] = target.innerHTML;
    operatorCount++;

  } else if (target.classList.contains('clear')) {

    setZero();

  } else if (target.classList.contains('left-arrow')) {

    if (allTotalsCount > 0) {
      allTotalsCount--;
    }
    answer.textContent = allTotals[allTotalsCount];

  } else if (target.classList.contains('right-arrow')) {

    if (allTotalsCount < allTotals.length) {
      allTotalsCount++;
    }
    answer.textContent = allTotals[allTotalsCount];

  } else if (target.classList.contains('equals')) {

    value[numCount] = Number(ansStr);

    function calculate() {

      let timesIndex = operators.indexOf('x');
      let divideIndex = operators.indexOf('/');
      let addIndex = operators.indexOf('+');
      let minusIndex = operators.indexOf('-');
      let moduloIndex = operators.indexOf('%');
      let sqRootIndex = operators.indexOf("\u221A");

      function sqRoot() {

        let product = Math.sqrt(value[sqRootIndex]);
        total = product;
        value[sqRootIndex] = product;
        operators.splice(sqRootIndex, 1);
        sqRootIndex = operators.indexOf("\u221A");
        if (sqRootIndex !== -1) {
          sqRoot();
        }

      }

      function multiply() {

        let product = value[timesIndex] * value[timesIndex + 1];
        if (value.length === 2) {

          total = product;
          value[timesIndex] = product;
          value.splice(timesIndex + 1, 1);

        } else {

          value[timesIndex] = product;
          value.splice(timesIndex + 1, 1);
          operators.splice(timesIndex, 1);

        }

      }

      function divide() {

        let product = value[divideIndex] / value[divideIndex + 1];
        if (value.length === 2) {
          total = product;
          value[divideIndex] = product;
          value.splice(divideIndex + 1, 1);

        } else {

          value[divideIndex] = product;
          value.splice(divideIndex + 1, 1);
          operators.splice(divideIndex, 1);

        }

      }

      function modulo() {

        let remainder = value[moduloIndex] % value[moduloIndex + 1];
        if (value.length === 2) {
          total = remainder;
          value[moduloIndex] = remainder;
          value.splice(moduloIndex + 1, 1);

        } else {

          value[moduloIndex] = remainder;
          value.splice(moduloIndex + 1, 1);
          operators.splice(moduloIndex, 1);

        }

      }

      function add() {

        let sum = value[addIndex] + value[addIndex + 1];
        if (value.length === 2) {

          total = sum;
          value[addIndex] = sum;
          value.splice(addIndex + 1, 1);

        } else {

          value[addIndex] = sum;
          value.splice(addIndex + 1, 1);
          operators.splice(addIndex, 1);

        }

      }

      function subtract() {

        let sum = value[minusIndex] - value[minusIndex + 1];
        if (value.length === 2) {

          total = sum;
          value[minusIndex] = sum;
          value.splice(minusIndex + 1, 1);

        } else {

          value[minusIndex] = sum;
          value.splice(minusIndex + 1, 1);
          operators.splice(minusIndex, 1);

        }

      }

      if (sqRootIndex !== -1) {
        sqRoot();
      }

      let isModuloBeforeTimes;
      let isModuloBeforeDivide;
      let isModuloFirst;

      if ((moduloIndex !== -1 && moduloIndex < timesIndex) || (moduloIndex !== -1 && timesIndex === -1)) {
        isModuloBeforeTimes = true;
      }

      if ((moduloIndex !== -1 && moduloIndex < divideIndex) || (moduloIndex !== -1 && divideIndex === -1)) {
        isModuloBeforeDivide = true;
      }

      if (isModuloBeforeTimes && isModuloBeforeDivide) {
        isModuloFirst = true;
      } else {
        isModuloFirst = false;
      }

      if (isModuloFirst === true) {

        modulo();

      } else if (timesIndex !== -1) {

        multiply();

      } else if (divideIndex !== -1) {

        divide();

      } else if (addIndex !== -1) {

        add();

      } else if (minusIndex !== -1) {

        subtract();

      }

      if (value.length > 1) {

        calculate();

      } else {

        return total;

      }

    }

    calculate();
    total = parseFloat(total.toFixed(6));
    answer.textContent = total;
    value.splice(2, 1);
    operatorCount = 0;
    operators = [];
    ansStr = total;
    numCount = 0;

    allTotals.push(total);
    allTotalsCount++;

  }

});

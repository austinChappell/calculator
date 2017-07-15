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
let audio = document.querySelector('audio');

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

  if (target.classList.contains('click-sound')) {
    audio.play();
  }

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

      function sqRoot(sqRootIndex) {

        let product = Math.sqrt(value[sqRootIndex]);
        total = product;
        value[sqRootIndex] = product;
        operators.splice(sqRootIndex, 1);
        sqRootIndex = operators.indexOf("\u221A");
        if (sqRootIndex !== -1) {
          sqRoot();
        }

      }

      function megafunction(index, operatorFunc) {

        //let sum = value[index] - value[index + 1];
        let sum = operatorFunc(value[index], value[index + 1]);
        if (value.length === 2) {

          total = sum;
          value[index] = sum;
          value.splice(index + 1, 1);

        } else {

          value[index] = sum;
          value.splice(index + 1, 1);
          operators.splice(index, 1);

        }

      }


      if (sqRootIndex !== -1) {
        sqRoot(sqRootIndex);
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

        megafunction(moduloIndex, (a, b) => a % b);

      } else if (timesIndex !== -1) {

        megafunction(timesIndex, (a, b) => a * b);

      } else if (divideIndex !== -1) {

        megafunction(divideIndex, (a, b) => a / b);

      } else if (addIndex !== -1) {

        megafunction(addIndex, (a, b) => a + b);

      } else if (minusIndex !== -1) {

        megafunction(minusIndex, (a, b) => a - b);

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

// ZERO VALUES
let total = 0;
let ansStr = '';
let value = [];
let operators = [];
let numCount = 0;
let operatorCount = 0;
let allTotals = [];
let allTotalsCount = 0;
let subTotal;

let container = document.querySelector('.container');
let answer = document.querySelector('#answer h2');
let audio = document.querySelector('audio');

// FUNCTION USED FOR SQUARE ROOT
function sqRoot(index) {

  subTotal = Math.sqrt(value[index]);
  total = subTotal;
  value[index] = subTotal;
  operators.splice(index, 1);
  index = operators.indexOf("\u221A");
  if (index !== -1) {
    sqRoot(index);
  }

}

// FUNCTION USED FOR ADDITION, SUBTRACTION, DIVISION, MULTIPLICATION, AND MODULO
function megafunction(index, operatorFunc) {

  subTotal = operatorFunc(value[index], value[index + 1]);
  if (value.length === 2) {

    total = subTotal;
    value[index] = subTotal;
    value.splice(index + 1, 1);

  } else {

    value[index] = subTotal;
    value.splice(index + 1, 1);
    operators.splice(index, 1);

  }

}

// UPDATE DISPLAY ON CALCULATOR
function updateAnswer(targ) {

  keyStrk = targ.innerHTML;
  ansStr += keyStrk;
  answer.textContent += keyStrk;

}

// RESET VALUES TO ZERO
function setZero() {

  total = 0;
  ansStr = '';
  value = [];
  operators = [];
  numCount = 0;
  operatorCount = 0;
  answer.textContent = ansStr;
  allTotals = [];
  allTotalsCount = 0;

}

// ADDS MOST RECENT NUMBERS TO VALUE ARRAY, AND ADDS OPERATOR ITEM TO OPERATOR ARRAY
function createValue(targ) {
  value[numCount] = Number(ansStr);
  ansStr = '';
  answer.textContent += targ.innerHTML;
  operators[operatorCount] = targ.innerHTML;
  operatorCount++;
}

// CLICK EVENT ON ENTIRE CALCULATOR, LEVERAGING EVENT BUBBLING
container.addEventListener('click', function(evt) {

  let target = evt.target;

  // ADD CLICK SOUND
  if (target.classList.contains('click-sound')) {
    audio.play();
  }

  // PRINT NUMBER TO SCREEN
  if (target.classList.contains('number')) {

    updateAnswer(target);

    // OPERATOR TO ARRAY
  } else if (target.classList.contains('operator')) {

      createValue(target);
      numCount++;

      // SQ-ROOT DOES NOT UPDATE numCount
  } else if (target.classList.contains('sq-root')) {

      createValue(target);

      // CLEAR BUTTON
  } else if (target.classList.contains('clear')) {

    setZero();

    // SCROLLS BACK THROUGH ANSWERS
  } else if (target.classList.contains('left-arrow')) {

    if (allTotalsCount > 0) {
      allTotalsCount--;
    }
    answer.textContent = allTotals[allTotalsCount];

    // SCROLLS FORWARD THROUGH ANSWERS
  } else if (target.classList.contains('right-arrow')) {

    if (allTotalsCount < allTotals.length) {
      allTotalsCount++;
    }
    answer.textContent = allTotals[allTotalsCount];

    // GET ANSWER
  } else if (target.classList.contains('equals')) {

    value[numCount] = Number(ansStr);

    // RUN CALCULATIONS
    function calculate() {

      let sqRootIndex = operators.indexOf("\u221A");

      if (sqRootIndex !== -1) {
        sqRoot(sqRootIndex);
      }

      // THESE ELEMENTS ARE DEFINED FOLLOWING THE SQUARE ROOT CALCULATION
      let timesIndex = operators.indexOf('x');
      let divideIndex = operators.indexOf('/');
      let addIndex = operators.indexOf('+');
      let minusIndex = operators.indexOf('-');
      let moduloIndex = operators.indexOf('%');
      let isModuloBeforeTimes;
      let isModuloBeforeDivide;
      let isModuloFirst;

      // MODULO IS EQUAL IN ORDER OF OPERATIONS TO MULTI. AND DIV., BUT MUST BE EXECUTED ONLY IF IT COMES BEFORE MULTI. AND DIV.
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

      // Starting exeuting math problems

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

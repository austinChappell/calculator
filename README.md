# Project Title

Week-Four-Project

## Project Description

This is a project from The Iron Yard demonstrating our ability to manipulate the DOM, use functions, event bubbling, and flex-box.

### Things to know

This calculator app uses a variety of functions. Initially many variables are declared and/or assigned to zero values. Each operation has it's own mini-function, with the exception of the square root function, since square root only needs one value to execute. The mini-functions are passed into a mega-function which executes the rest of the equation.

Order of operations is achieved with this calculator. Square roots run first, then multiplication, division, and modulo reading left-to-right. Technically multi/div do not read left to read necessarily in this app, but that does not change the result. However, modulo does need to be executed in accordance to its position relative to multiplication and division operators. Addition and subtraction run last.

When entering an equation, two array are built. One is comprised of values, the other of operators. As the calculations run, an operator is removed from the array, and the two numbers that were executed become one. This process will continue to execute until there is only one value remaining.

The arrows at the bottom of the calculator allow you to scroll through previous answers, so long as they have not been cleared. Decimal places may also be used when running calculations. If the answer returns a precise decimal, it will be rounded to the sixth decimal place.

The entire calculator has one click event listener. The text in each container is the target, and determines what value is entered into the array or which function is run.

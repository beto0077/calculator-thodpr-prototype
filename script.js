// Select all necessary DOM elements
const display = document.getElementById("result");
const buttons = Array.from(document.querySelectorAll("input[type='button']"));
const clearButton = document.querySelector("input[value='c']");

// Initialize variables to hold numbers and operator
let firstNumber = "";
let secondNumber = "";
let operator = "";
let isNewCalculation = false;

// Helper function to update the display
function updateDisplay(value) {
    if (isNewCalculation) {
        display.value = value;
        isNewCalculation = false;
    } else {
        display.value += value;
    }
}

// Event listener for button clicks
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const value = e.target.value;

        // Handle digits and operators
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(value)) {
            updateDisplay(value);
        } else if (["+", "-", "*", "/"].includes(value)) {
            // Store the first number and operator
            if (firstNumber === "") {
                firstNumber = display.value;
                operator = value;
                display.value = "";
            } else {
                // If an operator is already stored, calculate the result
                secondNumber = display.value;
                operate(firstNumber, secondNumber, operator);
                firstNumber = display.value; // Set the result as the first number for next operation
                operator = value; // Store the new operator
            }
        } else if (value === "=") {
            // Perform the calculation when "=" is pressed
            secondNumber = display.value;
            operate(firstNumber, secondNumber, operator);
            firstNumber = display.value; // Update the first number for the next operation
            operator = ""; // Clear the operator after calculation
        } else if (value === "C") {
            // Clear the display when "c" is pressed
            firstNumber = "";
            secondNumber = "";
            operator = "";
            display.value = "";
        }
    });
});

// Function to perform calculations based on the operator
function operate(firstNum, secondNum, operator) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    
    let result;
    switch (operator) {
        case "+":
            result = firstNum + secondNum;
            break;
        case "-":
            result = firstNum - secondNum;
            break;
        case "*":
            result = firstNum * secondNum;
            break;
        case "/":
            if (secondNum === 0) {
                result = "Error";  // Division by zero error message
            } else {
                result = firstNum / secondNum;
            }
            break;
        default:
            result = secondNum;
            break;
    }

    // Display the result, rounding if necessary
    display.value = result.toString().length > 10 ? result.toFixed(6) : result;
    isNewCalculation = true;
}

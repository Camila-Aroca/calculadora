"use strict";


var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'), // number buttons
  operator = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed


// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
      var currentString = input.innerHTML;
      var lastChar = currentString[currentString.length - 1];


      if (resultDisplayed === false) {
          input.innerHTML += e.target.innerHTML;
      } else if (resultDisplayed === true && (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷")) {
          resultDisplayed = false;
          input.innerHTML += e.target.innerHTML;
      } else {
          resultDisplayed = false;
          input.innerHTML = "";
          input.innerHTML += e.target.innerHTML;
      }
  });
}


// adding click handlers to operator buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
      var currentString = input.innerHTML;
      var lastChar = currentString[currentString.length - 1];


      if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
          var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
          input.innerHTML = newString;
      } else if (currentString.length == 0) {
          console.log("enter a number first");
      } else {
          input.innerHTML += e.target.innerHTML;
      }
  });
}


// on click of 'equal' button
result.addEventListener("click", function() {
  calculateResult();
});


// clear button
clear.addEventListener("click", function() {
  input.innerHTML = ""; // clearing input
});


// Function to calculate and display result
function calculateResult() {
  var inputString = input.innerHTML;
  var numbers = inputString.split(/\+|\-|\×|\÷/g);
  var operators = inputString.replace(/[0-9]|\./g, "").split("");


  var finalResult = numbers.reduce(function(accumulator, currentValue, index) {
      if (index == 0) {
          return Number(currentValue); // set the accumulator to first number
      } else {
          var operator = operators[index - 1];
          switch (operator) {
              case "+":
                  return accumulator + Number(currentValue);
              case "-":
                  return accumulator - Number(currentValue);
              case "×":
                  return accumulator * Number(currentValue);
              case "÷":
                  return accumulator / Number(currentValue);
              default:
                  return accumulator;
          }
      }
  });


  input.innerHTML = finalResult;
  resultDisplayed = true;
}


// Adding keyboard input functionality
document.addEventListener("keydown", function(event) {
  var key = event.key;
  var currentString = input.innerHTML;
  var lastChar = currentString[currentString.length - 1];


  // Check if key is a number
  if (!isNaN(key)) {
      if (resultDisplayed) {
          input.innerHTML = key;
          resultDisplayed = false;
      } else {
          input.innerHTML += key;
      }
  }


  // Check if key is an operator
  else if (key === "+" || key === "-" || key === "*" || key === "/") {
      if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
          input.innerHTML = currentString.substring(0, currentString.length - 1) + (key === "*" ? "×" : key === "/" ? "÷" : key);
      } else {
          input.innerHTML += (key === "*" ? "×" : key === "/" ? "÷" : key);
      }
  }


  // Enter key to calculate result
  else if (key === "Enter") {
      calculateResult();
  }


  // Escape key to clear the input
  else if (key === "Escape") {
      input.innerHTML = "";
  }
});

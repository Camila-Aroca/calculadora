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






/*"use strict";


var input = document.getElementById('input'), // input/output button
   number = document.querySelectorAll('.numbers div'), // number buttons
   operator = document.querySelectorAll('.operators div'), // operator buttons
   result = document.getElementById('result'), // equal button
   clear = document.getElementById('clear'), // clear button
   resultDisplayed = false; // flag to keep an eye on what output is displayed


// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
   number[i].addEventListener("click", function(e) {
       // storing current input string and its last character in variables - used later
       var currentString = input.innerHTML;
       var lastChar = currentString[currentString.length - 1];


       // if result is not displayed, just keep adding
       if (resultDisplayed === false) {
           input.innerHTML += e.target.innerHTML;
       } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
           // if result is currently displayed and user pressed an operator
           // we need to keep on adding to the string for next operation
           resultDisplayed = false;
           input.innerHTML += e.target.innerHTML;
       } else {
           // if result is currently displayed and user pressed a number
           // we need to clear the input string and add the new input to start the new operation
           resultDisplayed = false;
           input.innerHTML = "";
           input.innerHTML += e.target.innerHTML;
       }
   });
}


// adding click handlers to operator buttons
for (var i = 0; i < operator.length; i++) {
   operator[i].addEventListener("click", function(e) {
       // storing current input string and its last character in variables - used later
       var currentString = input.innerHTML;
       var lastChar = currentString[currentString.length - 1];


       // if last character entered is an operator, replace it with the currently pressed one
       if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
           var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
           input.innerHTML = newString;
       } else if (currentString.length == 0) {
           // if first key pressed is an operator, don't do anything
           console.log("enter a number first");
       } else {
           // else just add the operator pressed to the input
           input.innerHTML += e.target.innerHTML;
       }
   });
}


// on click of 'equal' button
result.addEventListener("click", function() {
   // this is the string that we will be processing eg. -10+26+33-56*34/23
   var inputString = input.innerHTML;


   // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
   var numbers = inputString.split(/\+|\-|\×|\÷/g);


   // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
   // first we replace numbers with ''
   var operators = inputString.replace(/[0-9]|\./g, "").split("");


   // reducing numbers and operators array
   var finalResult = numbers.reduce(function(accumulator, currentValue, index) {
       if (index == 0) {
           return Number(currentValue); // set the accumulator to first number
       } else {
           var operator = operators[index - 1]; // if index starts from 1, then operator will be in operators[index-1]
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


   // displaying final result
   input.innerHTML = finalResult;
   resultDisplayed = true; // setting the flag that result is now displayed
});


// clear button
clear.addEventListener("click", function() {
   input.innerHTML = ""; // clearing input
});*/

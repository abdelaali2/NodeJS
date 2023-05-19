// Sample input: node calculator.js -o + 3 7

// steps
// from process.argv
// get the operator. Allowed operators are + - * / **
// get the operands (values)
// do the operation on the operands
// print the operation and results ex:  3 + 7 = 10

const args = process.argv.slice(2);

if (args[0] !== "-o") {
  console.log(`Error: Invalid option ${args[0]}, Option must be -o`);
  process.exit(1);
}

if (args.length > 4) {
  console.error("Error: too many command line arguments");
  process.exit(1);
}

const operator = args[1];
const operands = [...args.splice(2, 2)].map((operand) => +operand);

let result;
switch (operator) {
  case "+":
    result = operands.reduce((num1, num2) => num1 + num2);
    break;
  case "-":
    result = operands.reduce((num1, num2) => num1 - num2);
    break;
  case "*":
    result = operands.reduce((num1, num2) => num1 * num2);
    break;
  case "**":
    result = operands.reduce((num1, num2) => num1 ** num2);
    break;
  case "/":
    result = operands.reduce((num1, num2) => num1 / num2);
    break;
  default:
    break;
}

console.log("result", result);

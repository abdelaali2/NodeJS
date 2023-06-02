const path = require("path");
const fs = require("fs");

// Validation
const [, , ...commandArgs] = process.argv;

if (commandArgs.length < 4) {
  console.error("Too few arguments");
  process.exit(1);
} else if (commandArgs.length > 4) {
  console.error("Too many arguments");
  process.exit(1);
}

const validArgs = ["-i", "-e"];
commandArgs.forEach((arg) => {
  if (arg.startsWith("-") && !validArgs.includes(arg)) {
    console.error(`Invalid Argument: ${arg}`);
    process.exit(1);
  }
});

const inputFile = commandArgs[commandArgs.indexOf("-i") + 1];
const encodingAlgo = commandArgs[commandArgs.indexOf("-e") + 1];

const validAlgos = ["utf-8", "base64"];

if (!validAlgos.includes(encodingAlgo)) {
  console.error(`Invalid Algorithm: ${encodingAlgo}`);
  process.exit(1);
}

const inputFilePath = path.join(__dirname, "rawFiles", inputFile);

if (!fs.existsSync(inputFilePath)) {
  console.error(`File does not exist: ${inputFilePath}`);
  process.exit(1);
}

// Logic

const reader = fs.readFileSync(inputFilePath, { encoding: encodingAlgo });
console.log("File Content:", reader);

// node .\translator.js -i base64 -e base64
// File Content: Thisisabase64encodedstring==

// node .\translator.js -i utf-8 -e utf-8
// This is a utf-8 encoded string!

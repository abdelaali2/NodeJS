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

const validArgs = ["-i", "-o"];
commandArgs.forEach((arg) => {
  if (arg.startsWith("-") && !validArgs.includes(arg)) {
    console.error(`Invalid Argument: ${arg}`);
    process.exit(1);
  }
});

const inputFile = commandArgs[commandArgs.indexOf("-i") + 1];
const outputFile = commandArgs[commandArgs.indexOf("-o") + 1];

const inputFileExt = path.extname(inputFile);
const outputFileExt = path.extname(outputFile);

const inputFilePath = path.join(__dirname, "rawFiles", inputFile);
const outputFilePath = path.join(__dirname, "rawFiles", outputFile);

if (!(inputFileExt || outputFileExt)) {
  console.error(`Invalid File name`);
  process.exit(1);
}

if (!fs.existsSync(inputFilePath)) {
  console.error(`File does not exist: ${inputFilePath}`);
  process.exit(1);
}

// Logic

const reader = fs.createReadStream(inputFilePath, { encoding: "utf-8" });
const writer = fs.createWriteStream(outputFilePath, { encoding: "utf-8" });
reader.pipe(writer);

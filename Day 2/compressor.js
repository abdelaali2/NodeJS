const path = require("path");
const fs = require("fs");
const zlib = require("zlib");

// Validation
const [, , ...commandArgs] = process.argv;

if (commandArgs.length < 2) {
  console.error("Too few arguments");
  process.exit(1);
} else if (commandArgs.length > 2) {
  console.error("Too many arguments");
  process.exit(1);
}

if (commandArgs[0] !== "-i") {
  console.error(`Invalid Argument`);
  process.exit(1);
}

const inputFile = commandArgs[commandArgs.indexOf("-i") + 1];

const inputFileExt = path.extname(inputFile);

const inputFilePath = path.join(__dirname, "rawFiles", inputFile);
const outputFilePath = inputFilePath + ".gz";

if (!inputFileExt) {
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

const compressor = zlib.createGzip();

reader.pipe(compressor).pipe(writer);

// node .\compressor.js -i file1.js

// Sample input: node greetings.js -n ahmed -a 30 -c Egypt

// steps
// from process.argv
// get the options -n -a -c
// get the options' values
// print the message Hello, <name> <age> from <country>!

const args = process.argv.slice(2);
const validOptions = ["-a", "-c", "-n"];
const inputOptions = [];

let inputName;
let inputAge;
let inputCountry;

args.forEach((arg, index) => {
  if (arg.startsWith("-")) {
    inputOptions.push(arg);
  }

  inputOptions.forEach((option) => {
    if (!validOptions.includes(option)) {
      console.log(`ERROR: Invalid option ${option}`);
      process.exit(1);
    }
  });

  switch (arg) {
    case "-n":
      inputName = args[index + 1];
      break;
    case "-a":
      inputAge = parseInt(args[index + 1]);
      break;
    case "-c":
      inputCountry = args[index + 1];
      break;
  }
});

console.log(
  `Hello, ${inputName}, who is ${inputAge}-year old & from ${inputCountry}!`
);

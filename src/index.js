import { stdin, stdout } from 'process';
import { goToDedicatedFolder, goUpper, listOfFiles } from './commands/navigation.js';

const username = process.argv
  .find(arg => arg.startsWith('--username='))
  .split('=')[1]
;
const greeting = () => {
  console.log(`Welcome to the File Manager, ${username}!`)
};
const printPath = () => {
  console.log(`You are currently in ${process.cwd()}`)
};

const handleInput = (input) => {
  const trimmedInput = input.trim();
  const [command, ...args] = trimmedInput.split(' ');
  switch (command.toLowerCase()) {
    case 'up':
      goUpper();
      printPath();
      break;
    case 'cd':
      if (args.length === 0) {
        console.log('Invalid input');
      } else {
        const pathToDirectory = args.join(' ');
        console.log(args)
        goToDedicatedFolder(pathToDirectory);
        printPath();
      }
      break;
    case 'ls':
      listOfFiles();
      break;
    case 'cat':
      listOfFiles();
      break;
    default: 
      console.log('Invalid input');
  }
};

const start = () => {
  greeting();
  printPath();

  stdin.setEncoding('utf8');
  stdin.on('data', (input) => handleInput(input));
};

start();




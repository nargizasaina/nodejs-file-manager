import { stdin, stdout } from 'process';
import { goToDedicatedFolder, goUpper, listOfFiles } from './commands/navigation.js';
import { addFile, copyFile, deleteFile, moveFile, readFileAndPrint, renameFile } from './commands/fileOperations.js';
import { getOsOperations } from './commands/osOperations.js';
import { hashFile } from './commands/hashOperations.js';

const username = process.argv
  .find(arg => arg.startsWith('--username='))
  .split('=')[1]
;
const greeting = () => {
  console.log(`Welcome to the File Manager, ${username}!`)
};
export const printPath = () => {
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
        printPath();
      } else {
        const pathToDirectory = args.join(' ');
        console.log(args)
        goToDedicatedFolder(pathToDirectory);
        printPath();
      }
      break;
    case 'ls':
      listOfFiles();
      printPath();
      break;
    case 'cat':
      if (args.length === 0) {
        console.log('Invalid input');
        printPath();
      } else {
        readFileAndPrint(args[0]);
        printPath();
      }
      break;
    case 'add':
      if (args.length === 0) {
        console.log('Invalid input');
        printPath();
      } else {
        addFile(args[0]);
        printPath();
      }
      break;
    case 'rn':
      if (args.length !== 2) {
        console.log('Invalid input');
        printPath();
      } else {
        renameFile(args[0], args[1]);
        printPath();
      }
      break;
    case 'cp':
      if (args.length !== 2) {
        console.log('Invalid input');
        printPath();
      } else {
        copyFile(args[0], args[1]);
        printPath();
      }
      break;
    case 'mv':
      if (args.length !== 2) {
        console.log('Invalid input');
        printPath();
      } else {
        moveFile(args[0], args[1]);
        printPath();
      }
      break;
    case 'rm':
      if (args.length !== 1) {
        console.log('Invalid input');
        printPath();
      } else {
        deleteFile(args[0]);
        printPath();
      }
      break;
    case 'os':
      if (args.length !== 1) {
        console.log('Invalid input');
        printPath();
      } else {
        getOsOperations(args[0]);
        printPath();
      }
      break;
    case 'hash':
      if (args.length !== 1) {
        console.log('Invalid input');
        printPath();
      } else {
        hashFile(args[0]);
      }
      break;
    default: 
      console.log('Invalid input');
      printPath();
  }
};

const start = () => {
  greeting();
  printPath();

  stdin.setEncoding('utf8');
  stdin.on('data', (input) => handleInput(input));
};

start();




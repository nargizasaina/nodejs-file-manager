import { stdin } from 'process';
import os from 'os';
import { goToDedicatedFolder, goUpper, listOfFiles } from './commands/navigation.js';
import { addFile, copyFile, deleteFile, moveFile, readFileAndPrint, renameFile } from './commands/fileOperations.js';
import { getOsOperations } from './commands/osOperations.js';
import { hashFile } from './commands/hashOperations.js';
import { compressFile, decompressFile } from './commands/compressionOperations.js';

const username = process.argv
  .find(arg => arg.startsWith('--username='))?.split('=')[1] || 'Guest';
  
const greeting = () => {
  console.log(`Welcome to the File Manager, ${username}!`)
};
export const printPath = () => {
  console.log(`You are currently in ${process.cwd()}`)
};

const handleInput = async (input) => {
  const trimmedInput = input.trim();
  const [command, ...args] = trimmedInput.split(' ');
  switch (command.toLowerCase()) {
    case '.exit':
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit(0);
      break;
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
        await goToDedicatedFolder(pathToDirectory);
        printPath();
      }
      break;
    case 'ls':
      await listOfFiles();
      printPath();
      break;
    case 'cat':
      if (args.length === 0) {
        console.log('Invalid input');
        printPath();
      } else {
        await readFileAndPrint(args[0]);
      }
      break;
    case 'add':
      if (args.length === 0) {
        console.log('Invalid input');
        printPath();
      } else {
        await addFile(args[0]);
        printPath();
      }
      break;
    case 'rn':
      if (args.length !== 2) {
        console.log('Invalid input');
        printPath();
      } else {
        await renameFile(args[0], args[1]);
        printPath();
      }
      break;
    case 'cp':
      if (args.length !== 2) {
        console.log('Invalid input');
        printPath();
      } else {
        await copyFile(args[0], args[1]);
        printPath();
      }
      break;
    case 'mv':
      if (args.length !== 2) {
        console.log('Invalid input');
        printPath();
      } else {
        await moveFile(args[0], args[1]);
        printPath();
      }
      break;
    case 'rm':
      if (args.length !== 1) {
        console.log('Invalid input');
        printPath();
      } else {
        await deleteFile(args[0]);
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
    case 'compress':
      if (args.length !== 2) {
        console.log('Invalid input');
        printPath();
      } else {
        compressFile(args[0], args[1]);
      }
      break;
    case 'decompress':
      if (args.length !== 2) {
        console.log('Invalid input');
        printPath();
      } else {
        decompressFile(args[0], args[1]);
      }
      break;
    default: 
      console.log('Invalid input');
      printPath();
  }
};

process.on('SIGINT', () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

const start = () => {
  greeting();
  process.chdir(os.homedir());
  printPath();

  stdin.setEncoding('utf8');
  stdin.on('data', (input) => handleInput(input));
};

start();




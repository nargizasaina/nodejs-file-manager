import os from 'os';

export const printEOL = () => {
  const eol = os.EOL;
  console.log(`Default EOL: '${eol === '\n' ? '\\n' : '\\r\\n'}'`); 
};

const printCPUInfo = () => {
  const cpus = os.cpus();
  console.log(`Total CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: Model: ${cpu.model}, Clock Rate: ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
};

export const getOsOperations = (operation) => {
  switch (operation) {
    case '--EOL':
      printEOL();
      break;
    case '--cpus':
      printCPUInfo();
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      console.log('Invalid input');
  }
};
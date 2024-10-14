import { join, dirname, normalize, isAbsolute } from 'path';
import { access, readdir, stat } from 'fs/promises';

export const goUpper = () => {
  let current = process.cwd();
  const parent = dirname(current);
  process.chdir(parent);
};

export const goToDedicatedFolder = async (path) => {
  try {
    let current = process.cwd();
    const newPath = isAbsolute(path) ? normalize(path) : normalize(join(current, path));
    await access(newPath);
    console.log('after access')
    const stat = await fs.promises.stat(newPath);
    if (!stat.isDirectory()) {
      console.log('Operation failed');
    }
    process.chdir(newPath);
    console.log(`Directory changed to: ${newPath}`);
  } catch (error) {
    console.error('Invalid input');
  }
};

export const listOfFiles = async () => {
  try {console.log('ls')
    const current = process.cwd();
    const files = await readdir(current); 
    const items = [];

    for (const file of files) {
      const filePath = join(current, file);
      const itemPath = await stat(filePath);
      items.push({
        name: file,
        type: itemPath.isDirectory() ? 'directory' : 'file'
      });
    }
    
    console.log('----------------------------------------------------');
    console.log('Index'.padEnd(8) + 'Name'.padEnd(32) + 'Type'.padEnd(18));
    console.log('----------------------------------------------------');

    items.forEach((item, index) => {
      console.log(`${index.toString().padEnd(5)}\t${item.name.padEnd(20)}\t\t${item.type.padEnd(15)}`);
    });

    console.log('----------------------------------------------------');

  } catch (error) {
    console.log('FS operation failed');
  }
};


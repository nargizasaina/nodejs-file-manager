import { join, isAbsolute, dirname, basename } from 'path';
import {createReadStream, createWriteStream} from 'fs';
import { access, stat, open, rename, unlink } from 'fs/promises';

export const readFileAndPrint = async (filePath) => {
  try {
    const absolutePath = isAbsolute(filePath) ? filePath : join(process.cwd(), filePath);
    
    await access(absolutePath);
    const absolute = await stat(absolutePath);

    if (absolute.isFile()) {
      const readStream = createReadStream(absolutePath, { encoding: 'utf8' });
      readStream.on('data', (chunk) => {
        console.log(chunk);
      });
      
      readStream.on('error', () => {
        console.log('Operation failed');
      });
      
      readStream.on('end', () => {
        console.log('\nFile read complete.');
      });
      
    } else {
      console.log('Operation failed');
    }
  } catch (error) {
    console.log('Operation failed');
  }
};

export const addFile = async (name) => {
  const fileName = join(process.cwd(), name);
  try {
    await stat(fileName);
    console.log('Operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await open(fileName, 'w');
    } else {
      console.log('Operation failed');
    }
  }
};

export const renameFile = async (filePath, newName) => {
  try {
    const absolutePath = isAbsolute(filePath) ? filePath : join(process.cwd(), filePath);
    const fileExists = await access(absolutePath).then(() => true).catch(() => false);
    if (!fileExists) {
      console.log('Operation failed');
      return;
    }

    const directory = dirname(absolutePath);
    const newFilePath = join(directory, newName);
 
    await rename(absolutePath, newFilePath);
  } catch (error) {
    console.log('Operation failed');
  }
};

export const copyFile = async (sourceFile, targetFolder) => {
  try {
    const sourcePath = isAbsolute(sourceFile) ? sourceFile : join(process.cwd(), sourceFile);
    const targetPath = isAbsolute(targetFolder) ? targetFolder : join(process.cwd(), targetFolder);
  
    const sourceStat = await stat(sourcePath);
    if (!sourceStat.isFile()) {
      console.log('Operation failed');
      return;
    }

    const targetStat = await stat(targetPath);
    if (!targetStat.isDirectory()) {
      console.log('Operation failed');
      return;
    }

    const destinationPath = join(targetPath, basename(sourcePath));

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    readStream.pipe(writeStream);

    readStream.on('error', () => {
      console.log('Operation failed');
    });
    writeStream.on('error', () => {
      console.log('Operation failed');
    });

    writeStream.on('finish', () => {
      console.log(`File copied successfully to "${destinationPath}"`);
    });
  } catch (error) {
    console.log('Operation failed');
  }
};

export const moveFile = async (sourceFile, targetFolder) => {
  try {
    const sourcePath = isAbsolute(sourceFile) ? sourceFile : join(process.cwd(), sourceFile);
    const targetPath = isAbsolute(targetFolder) ? targetFolder : join(process.cwd(), targetFolder);

    const sourceStat = await stat(sourcePath);
    if (!sourceStat.isFile()) {
      console.log('Operation failed');
      return;
    }
 
    const targetStat = await stat(targetPath);
    if (!targetStat.isDirectory()) {
      console.log('Operation failed');
      return;
    }

    const destinationPath = join(targetPath, basename(sourcePath));

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destinationPath);
    readStream.pipe(writeStream);

    readStream.on('error', () => {
      console.log('Operation failed');
    });
    writeStream.on('error', () => {
      console.log('Operation failed');
    });

    writeStream.on('finish', async () => {
      try {
        writeStream.close();
        await unlink(sourcePath);
        console.log(`File moved successfully`);
      } catch (error) {
        console.log('Operation failed');
      }
    });
  } catch (error) {
    console.log('Operation failed');
  }
};

export const deleteFile = async (path) => {
  const sourcePath = isAbsolute(path) ? path : join(process.cwd(), path);

  try {
    await unlink(sourcePath);
  } catch (error) {
    console.log('Operation failed');
  }    
};
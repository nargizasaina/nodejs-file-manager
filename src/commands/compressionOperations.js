import { createReadStream, createWriteStream } from 'fs';
import { createGzip, createGunzip } from 'zlib';
import { pipeline } from 'node:stream';
import { promisify } from 'util';
import { join, isAbsolute } from 'path';
import { printPath } from '../index.js';

export const compressFile = async (filePath, pathToDest) => {
  const sourcePath = isAbsolute(filePath) ? filePath : join(process.cwd(), filePath);
  const destinationPath = isAbsolute(pathToDest) ? pathToDest : join(process.cwd(), pathToDest);

  const pipe = promisify(pipeline);
  
  const gzip = createGzip();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);

  try {
    await pipe(source, gzip, destination);
    console.log('File is compressed');
    printPath();
  } catch (err) {
    console.log('Operation failed');
    printPath();
  }
};

export const decompressFile = async (filePath, pathToDest) => {
  const sourcePath = isAbsolute(filePath) ? filePath : join(process.cwd(), filePath);
  const destinationPath = isAbsolute(pathToDest) ? pathToDest : join(process.cwd(), pathToDest);

  const pipe = promisify(pipeline);
  
  const gunzip = createGunzip();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);

  try {
    await pipe(source, gunzip, destination);
    console.log('File is decompressed');
    printPath();
  } catch (err) {
    console.log('Operation failed');
    printPath();
  }
};
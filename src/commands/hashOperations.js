import { join, isAbsolute } from 'path';
import {createReadStream} from 'fs';
import { createHash } from 'node:crypto';
import { printPath } from '../index.js';

export const hashFile = (path) => {
  const sourcePath = isAbsolute(path) ? path : join(process.cwd(), path);
  const hash = createHash('sha256');

  const input = createReadStream(sourcePath);

  input.on('readable', () => {
      const data = input.read();
      if (data){ 
        hash.update(data);
        printPath();
      } else {
        console.log(`${hash.digest('hex')}`);
        printPath();
      }
  });
};
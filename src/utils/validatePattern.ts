import * as fs from 'fs';
import * as path from 'path';

const validateFile = (filename: string, pattern?: string): boolean => {
  if (pattern) {
    return new RegExp(pattern, 'g').test(filename);
  }

  return true;
};

export const validatePattern = (itemPath: string, pattern?: string): boolean => {
  const stats = fs.statSync(itemPath);

  if (stats.isFile()) {
    return validateFile(itemPath);
  }

  if (stats.isDirectory()) {
    const content = fs.readdirSync(itemPath);

    for (const item of content) {
      const result = validatePattern(path.join(itemPath, item), pattern);

      if (!result) {
        return false;
      }
    }
  }

  return true;
};

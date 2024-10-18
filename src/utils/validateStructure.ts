import { Component, ValidateStructureResponse } from '../types';
import * as path from 'path';
import * as fs from 'fs';

export const validateStructure = (
  structure: Component[],
  rootPath: string,
): ValidateStructureResponse[] => {
  const errors: ValidateStructureResponse[] = [];

  console.log(rootPath);
  for (const item of structure) {
    const fullPath = path.join(rootPath, item.name);

    switch (item.type) {
      case 'file':
        let result = true;

        if (item.pattern) {
          result = fs.existsSync(fullPath) && new RegExp(item.pattern, 'g').test(fullPath);

          if (!result) {
            errors.push({
              error: `\\x1b[31m ${item.name} \\x1b[0m not found`,
              path: fullPath,
            });
          }
        } else {
          result = fs.existsSync(fullPath);
        }
        break;
      case 'folder':
        break;
    }

    if (item.type === 'file' && item.pattern) {
    }

    if (item.type === 'folder' && fs.statSync(fullPath).isDirectory()) {
      errors.push(...validateStructure(item.components!, fullPath));
    }
  }

  return errors;
};

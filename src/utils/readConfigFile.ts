import { Config } from '../types';
import * as path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';

export const readConfigFile = (filePath?: string): Config => {
  if (!filePath) {
    throw new Error('File path is not provided');
  }

  const rootPath = path.resolve(process.cwd());

  try {
    const configFile = fs.readFileSync(path.resolve(rootPath, filePath), {
      encoding: 'utf-8',
    });
    const jsonConfig = yaml.load(configFile) as Config;

    if (!jsonConfig) {
      throw new Error('Empty configuration file');
    }

    return jsonConfig;
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    }

    throw new Error('Invalid YAML format');
  }
};

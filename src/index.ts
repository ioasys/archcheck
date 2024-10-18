import { IAppConfig } from './interfaces';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';
import { Config } from './types';
import { readConfigFile, validatePattern, validateStructure } from './utils';

export const init = (config?: IAppConfig) => {
  let jsonConfig: Config = readConfigFile(config?.filePath);

  validateStructure(jsonConfig.structure, process.cwd());

  process.exit(0);
};

init({
  filePath: './architecture.yaml',
});

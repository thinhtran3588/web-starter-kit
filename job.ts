// tslint:disable:max-line-length
// tslint:disable:no-console
import fs from 'fs';
import path from 'path';

interface CopyFileTask {
  src: string;
  des: string;
}

interface ReplaceStringTask {
  src: string;
  replaces: {
    old: RegExp | string;
    new: string;
  }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...args: any[]): void => {
  global.console.log(...args);
};

export const updateConfig = (environment = 'default'): void => {
  const envFolder = `environments/${environment}`;
  const copyTasks: CopyFileTask[] = [
    {
      src: path.resolve(__dirname, `${envFolder}/override_config.json`),
      des: path.resolve(__dirname, `src/config/override_config.json`),
    },
  ];
  copyTasks.forEach((copyTask) => {
    if (!fs.existsSync(copyTask.src)) {
      return;
    }
    fs.copyFileSync(copyTask.src, copyTask.des);
    log(`copied ${copyTask.src} \n to ${copyTask.des}`);
  });
};

const run = (): void => {
  const command = process.argv[2];
  switch (command) {
    default:
      updateConfig(command);
  }
};

run();

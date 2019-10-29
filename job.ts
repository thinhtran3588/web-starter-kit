import fs from 'fs';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...args: any[]): void => {
  global.console.log(...args);
};

const updateConfig = (environment = 'default'): void => {
  const envFolder = `environments/${environment}`;
  const copyTasks = [
    {
      src: path.resolve(__dirname, `${envFolder}/override_config.ts`),
      des: path.resolve(__dirname, `src/config/override_config.ts`),
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

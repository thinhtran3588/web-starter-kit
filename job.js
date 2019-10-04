/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...args) => {
  global.console.log(...args);
};

const updateConfig = (environment = 'default') => {
  const envFolder = `environments/${environment}`;
  const copyTasks = [
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

const run = () => {
  const command = process.argv[2];
  switch (command) {
    default:
      updateConfig(command);
  }
};

run();

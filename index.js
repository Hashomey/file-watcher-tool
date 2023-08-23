#!/usr/bin/env node

const chokidar = require('chokidar');
const program = require('commander');
const { spawn } = require('child_process');
const debounce = require('lodash.debounce');

program
  .option('-c, --command <cmd>', 'Command to run on change', collect, [])
  .option('-d, --directory <dir>', 'Directory to watch')
  .option('-i, --ignore <pattern>', 'Ignore files matching pattern', collect, [])
  .option('-w, --wait <ms>', 'Debounce timeout in ms', parseInt)
  .parse(process.argv);
  
const { command, directory, ignore, wait } = program.opts();

if (!directory) {
  console.error('Directory is required!');
  process.exit(1);
}

const runCommand = (cmd) => {
  const parts = cmd.trim().split(' ');
  const c = parts[0];
  const args = parts.slice(1);

  console.log(`Running: ${cmd}`);
  
  const child = spawn(c, args, { stdio: 'inherit', shell: true });
  
  child.on('close', code => {
    if (code !== 0) {
      console.error(`Command "${cmd}" exited with code ${code}`);  
    } else {
      console.log(`Command "${cmd}" completed`);
    }
  });
};

const watcher = chokidar.watch(directory, {
  ignored: ignore,
  persistent: true,
  ignoreInitial: true
});

const onChange = debounce(path => {
  console.log(`File ${path} changed`);
  command.forEach(c => runCommand(c));  
}, wait || 100);

watcher.on('add', onChange);
watcher.on('change', onChange);
watcher.on('unlink', onChange);

console.log(`Watching ${directory} for changes...`);

process.on('SIGINT', () => {
  console.log('Stopping file watcher...');
  watcher.close();
  process.exit();
});
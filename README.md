# File Watcher

A CLI tool to watch files and run commands on changes.

## Usage

```js
file-watcher [options] 

// Options
-c, --command <cmd>    Command to run on change
-d, --directory <dir>  Watch directory
-i, --ignore <pattern> Ignore file patterns
-w, --wait <ms>        Debounce timeout


file-watcher -d src -c "npm run build"


// Install globally
npm install -g file-watcher

// Print help
file-watcher --help 

// Start watching 
file-watcher -d src -c "npm run build"



Contributing
Pull requests are welcome!

MIT © Hashim Osman Musa


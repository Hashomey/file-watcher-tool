File Watcher
A simple CLI tool to watch files and run commands when they change.

Usage

​```

file-watcher [options] 

Options:
-c, --command <cmd>    Command to run on file change
-d, --directory <dir>  Directory to watch
-i, --ignore <pattern> Ignore files matching pattern  
-w, --wait <ms>        Debounce timeout (default 100ms)

​```


​```

# Build on changes
file-watcher -d src -c "npm run build"

# Multiple commands
file-watcher -d dist -c "echo Built" -c "rsync dist server:/var/www" 

# Ignore logs 
file-watcher -d src -i "*.log" -c "npm test"
​```

​```
npm install -g file-watcher
​```

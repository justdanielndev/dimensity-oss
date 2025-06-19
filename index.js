#!/usr/bin/env node

const readline = require('readline');
const { spawn } = require('child_process');
const fs = require('fs');
const process = require('process');
const path = require('path');
readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

if (process.getuid && process.getuid() !== 0) {
  console.log('');
  console.log('\x1b[37mYou\'re not running as root, you may not be able to run some commands.\x1b[0m');
  console.log('');
} else {
  console.log('');
  console.log('\x1b[33mRunning as root, you should be able to run all commands, but be careful with what you run.\x1b[0m');
  console.log('');
}
const dimensityvars = {
  version: '1.9.0',
};

const dimensityfile = '.dimensity';
let dimensitycontent = "";
if (!fs.existsSync(dimensityfile)) {
  fs.writeFileSync(dimensityfile, JSON.stringify({
    "history": [],
    "onboarding": false,
    "color": "36m",
    "username": "user",
    "aliases": {},
    "autocomplete-suggestions": [
      { "command": "dimensity", "subcommands": ["help", "exit", "clear", "history", "settings"], "structure": { "help": { "options": [], "accepts_files": false }, "exit": { "options": [], "accepts_files": false }, "clear": { "options": [], "accepts_files": false }, "history": { "options": ["clear"], "accepts_files": false }, "settings": { "options": ["edit"], "accepts_files": false } } },
      { "command": "git", "subcommands": ["add", "commit", "push", "pull", "status", "log", "diff", "branch", "checkout", "merge", "clone"], "structure": { "add": { "options": ["-A", "--all"], "accepts_files": true }, "commit": { "options": ["-m", "--message"], "accepts_files": false }, "push": { "options": ["-u", "--set-upstream"], "accepts_files": false }, "pull": { "options": ["--rebase"], "accepts_files": false }, "status": { "options": ["-s", "--short"], "accepts_files": false }, "log": { "options": ["--oneline"], "accepts_files": true }, "diff": { "options": ["--cached"], "accepts_files": true }, "branch": { "options": ["-a", "--all"], "accepts_files": false }, "checkout": { "options": ["-b"], "accepts_files": true }, "merge": { "options": ["--no-ff"], "accepts_files": false }, "clone": { "options": [], "accepts_files": false } } },
      { "command": "npm", "subcommands": ["install", "run", "start", "test", "build"], "structure": { "install": { "options": ["-g", "--global"], "accepts_files": false }, "run": { "options": [], "accepts_files": false }, "start": { "options": [], "accepts_files": false }, "test": { "options": [], "accepts_files": false }, "build": { "options": [], "accepts_files": false } } },
      { "command": "ls", "subcommands": [], "structure": { "": { "options": ["-l", "-a"], "accepts_files": true } } },
      { "command": "cd", "subcommands": [], "structure": { "": { "options": [], "accepts_files": true } } },
      { "command": "mkdir", "subcommands": [], "structure": { "": { "options": ["-p"], "accepts_files": true } } },
      { "command": "touch", "subcommands": [], "structure": { "": { "options": [], "accepts_files": true } } },
      { "command": "cat", "subcommands": [], "structure": { "": { "options": ["-n"], "accepts_files": true } } },
      { "command": "grep", "subcommands": [], "structure": { "": { "options": ["-r", "-i"], "accepts_files": true } } },
      { "command": "find", "subcommands": [], "structure": { "": { "options": ["-name"], "accepts_files": true } } },
      { "command": "chmod", "subcommands": [], "structure": { "": { "options": ["-R"], "accepts_files": true } } },
      { "command": "cp", "subcommands": [], "structure": { "": { "options": ["-r"], "accepts_files": true } } },
      { "command": "mv", "subcommands": [], "structure": { "": { "options": [], "accepts_files": true } } },
      { "command": "rm", "subcommands": [], "structure": { "": { "options": ["-r", "-f"], "accepts_files": true } } }
    ]
  }, null, 2));
  dimensitycontent = {
    history: [],
    onboarding: false,
    color: "36m",
    username: "user",
    aliases: {},
    "autocomplete-suggestions": [
      { "command": "dimensity", "subcommands": ["help", "exit", "clear", "history", "settings"], "structure": { "help": { "options": [], "accepts_files": false }, "exit": { "options": [], "accepts_files": false }, "clear": { "options": [], "accepts_files": false }, "history": { "options": ["clear"], "accepts_files": false }, "settings": { "options": ["edit"], "accepts_files": false } } },
      { "command": "git", "subcommands": ["add", "commit", "push", "pull", "status", "log", "diff", "branch", "checkout", "merge", "clone"], "structure": { "add": { "options": ["-A", "--all"], "accepts_files": true }, "commit": { "options": ["-m", "--message"], "accepts_files": false }, "push": { "options": ["-u", "--set-upstream"], "accepts_files": false }, "pull": { "options": ["--rebase"], "accepts_files": false }, "status": { "options": ["-s", "--short"], "accepts_files": false }, "log": { "options": ["--oneline"], "accepts_files": true }, "diff": { "options": ["--cached"], "accepts_files": true }, "branch": { "options": ["-a", "--all"], "accepts_files": false }, "checkout": { "options": ["-b"], "accepts_files": true }, "merge": { "options": ["--no-ff"], "accepts_files": false }, "clone": { "options": [], "accepts_files": false } } },
      { "command": "npm", "subcommands": ["install", "run", "start", "test", "build"], "structure": { "install": { "options": ["-g", "--global"], "accepts_files": false }, "run": { "options": [], "accepts_files": false }, "start": { "options": [], "accepts_files": false }, "test": { "options": [], "accepts_files": false }, "build": { "options": [], "accepts_files": false } } },
      { "command": "ls", "subcommands": [], "structure": { "": { "options": ["-l", "-a"], "accepts_files": true } } },
      { "command": "cd", "subcommands": [], "structure": { "": { "options": [], "accepts_files": true } } },
      { "command": "mkdir", "subcommands": [], "structure": { "": { "options": ["-p"], "accepts_files": true } } },
      { "command": "touch", "subcommands": [], "structure": { "": { "options": [], "accepts_files": true } } },
      { "command": "cat", "subcommands": [], "structure": { "": { "options": ["-n"], "accepts_files": true } } },
      { "command": "grep", "subcommands": [], "structure": { "": { "options": ["-r", "-i"], "accepts_files": true } } },
      { "command": "find", "subcommands": [], "structure": { "": { "options": ["-name"], "accepts_files": true } } },
      { "command": "chmod", "subcommands": [], "structure": { "": { "options": ["-R"], "accepts_files": true } } },
      { "command": "cp", "subcommands": [], "structure": { "": { "options": ["-r"], "accepts_files": true } } },
      { "command": "mv", "subcommands": [], "structure": { "": { "options": [], "accepts_files": true } } },
      { "command": "rm", "subcommands": [], "structure": { "": { "options": ["-r", "-f"], "accepts_files": true } } }
    ]
  };
  console.log(`\x1b[37mCreated ${dimensityfile} file.\x1b[0m`);
} else {
  console.log(`\x1b[37mFound ${dimensityfile} file.\x1b[0m`);
  dimensitycontent = fs.readFileSync(dimensityfile, 'utf8').trim();
  try {
    const parsedContent = JSON.parse(dimensitycontent);
    if (!parsedContent["autocomplete-suggestions"]) {
      parsedContent["autocomplete-suggestions"] = [
        { "command": "dimensity", "subcommands": ["help", "exit", "clear", "history", "settings"], "structure": { "help": { "options": [], "accepts_files": false }, "exit": { "options": [], "accepts_files": false }, "clear": { "options": [], "accepts_files": false }, "history": { "options": ["clear"], "accepts_files": false }, "settings": { "options": ["edit"], "accepts_files": false } } },
        { "command": "ls", "subcommands": [], "structure": { "": { "options": ["-l", "-a"], "accepts_files": true } } },
        { "command": "cd", "subcommands": [], "structure": { "": { "options": [], "accepts_files": true } } },
        { "command": "git", "subcommands": ["add", "commit", "push", "pull", "status"], "structure": { "add": { "options": ["-A"], "accepts_files": true }, "commit": { "options": ["-m"], "accepts_files": false }, "push": { "options": [], "accepts_files": false }, "pull": { "options": [], "accepts_files": false }, "status": { "options": [], "accepts_files": false } } },
        { "command": "npm", "subcommands": ["install", "run", "start", "test"], "structure": { "install": { "options": ["-g"], "accepts_files": false }, "run": { "options": [], "accepts_files": false }, "start": { "options": [], "accepts_files": false }, "test": { "options": [], "accepts_files": false } } }
      ];
    }
    if (!parsedContent.hasOwnProperty("onboarding")) {
      parsedContent["onboarding"] = false;
    }
    if (!parsedContent.hasOwnProperty("username")) {
      parsedContent["username"] = "user";
    }
    if (!parsedContent.hasOwnProperty("aliases")) {
      parsedContent["aliases"] = {};
    }
    fs.writeFileSync(dimensityfile, JSON.stringify(parsedContent, null, 2));
    dimensitycontent = parsedContent;
  } catch (e) {
    console.log(`\x1b[31mError parsing ${dimensityfile}! Here's the error I got: ${e.message}\x1b[0m`);
    dimensitycontent = { 
      history: [], 
      "autocomplete-suggestions": [
        { "command": "dimensity", "subcommands": ["help", "exit", "clear", "history", "settings"], "structure": { "help": { "options": [], "accepts_files": false }, "exit": { "options": [], "accepts_files": false }, "clear": { "options": [], "accepts_files": false }, "history": { "options": ["clear"], "accepts_files": false }, "settings": { "options": ["edit"], "accepts_files": false } } },
        { "command": "ls", "subcommands": [], "structure": { "": { "options": ["-l"], "accepts_files": true } } },
        { "command": "cd", "subcommands": [], "structure": { "": { "options": [], "accepts_files": true } } }
      ], 
      onboarding: false, 
      username: "user",
      aliases: {}
    };
  }
}

class ScreenApp {
  constructor() {
    this.username = dimensitycontent.username || 'user';
    this.needsOnboarding = !dimensitycontent.onboarding;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `\x1b[32m${this.username}@dimensity:~$\x1b[0m `,
      completer: this.completer.bind(this)
    });
    this.history = dimensitycontent.history || [];
    this.autocompleteSuggestions = dimensitycontent["autocomplete-suggestions"] || [];
    this.aliases = dimensitycontent.aliases || {};
    this.rl.history = this.history;
    this.historyIndex = -1;
    this.currentInput = '';
    this.currentSuggestion = '';
    this.currentChild = null;
    this.sigintCount = 0;
    this.commands = {
      dimensity: this.dimensity.bind(this),
      exit: this.exit.bind(this),
      clear: this.clear.bind(this),
      history: this.showHistory.bind(this)
    };
    
    this.setupEventHandlers();
    this.setupKeypressHandler();
    setTimeout(() => {
      this.updateAutocompleteSuggestions();
    }, 1000);
  }

  findClosestMatch(input) {
    if (!input) return '';
    
    const commandNames = this.autocompleteSuggestions.map(suggestion => 
      typeof suggestion === 'string' ? suggestion : suggestion.command
    );
    
    const prefixMatches = commandNames.filter(cmd => 
      cmd.startsWith(input)
    );
    
    if (prefixMatches.length > 0) {
      return prefixMatches[0];
    }
    
    const containsMatches = commandNames.filter(cmd => 
      cmd.includes(input)
    );
    
    if (containsMatches.length > 0) {
      return containsMatches[0];
    }
    
    return '';
  }

  completeFilePath(partialPath) {
    try {
      const dir = path.dirname(partialPath === '' ? '.' : partialPath);
      const base = path.basename(partialPath);
      const files = fs.readdirSync(dir);
      
      const matches = files.filter(file => file.startsWith(base));
      
      if (matches.length === 0) return '';
      
      const completion = matches[0];
      
      const fullPath = path.join(dir, completion);
      const isDir = fs.statSync(fullPath).isDirectory();
      
      return path.join(dir, completion) + (isDir ? '/' : '');
    } catch (e) {
      return '';
    }
  }
  
  completeFiles(currentWord) {
    try {
      const dir = path.dirname(currentWord === '' ? '.' : currentWord);
      const base = path.basename(currentWord);
      const files = fs.readdirSync(dir === '' ? '.' : dir);
      
      const matches = files
        .filter(file => file.startsWith(base))
        .map(file => {
          const fullPath = path.join(dir, file);
          const isDir = fs.statSync(fullPath).isDirectory();
          return path.join(dir === '.' && currentWord.indexOf('/') === -1 ? '' : dir, file) + (isDir ? '/' : '');
        });
      
      return [matches, currentWord];
    } catch (e) {
      return [[], currentWord];
    }
  }

  completer(line) {
    const words = line.split(' ');
    
    if (words.length === 1) {
      const commandNames = this.autocompleteSuggestions.map(suggestion => 
        typeof suggestion === 'string' ? suggestion : suggestion.command
      );
      const matches = commandNames.filter(cmd => 
        cmd.startsWith(words[0])
      );
      return [matches, words[0]];
    }
    
    const mainCommand = words[0];
    const commandSuggestion = this.autocompleteSuggestions.find(suggestion => 
      typeof suggestion === 'object' && suggestion.command === mainCommand
    );
    
    if (commandSuggestion && words.length === 2) {
      const subcommandMatches = commandSuggestion.subcommands.filter(subcmd => 
        subcmd.startsWith(words[1])
      );
      if (subcommandMatches.length > 0) {
        return [subcommandMatches, words[1]];
      }
      
      const structure = commandSuggestion.structure[words[1]] || commandSuggestion.structure[''];
      if (structure) {
        const currentWord = words[1];
        
        if (currentWord.startsWith('-')) {
          const optionMatches = structure.options.filter(option => 
            option.startsWith(currentWord)
          );
          if (optionMatches.length > 0) {
            return [optionMatches, currentWord];
          }
        }
        
        if (structure.accepts_files && !commandSuggestion.subcommands.includes(words[1])) {
          return this.completeFiles(currentWord);
        }
      }
    }
    
    if (commandSuggestion && words.length > 2) {
      const subcommand = words[1] || '';
      const structure = commandSuggestion.structure[subcommand] || commandSuggestion.structure[''];
      
      if (structure) {
        const currentWord = words[words.length - 1];

        if (currentWord.startsWith('-')) {
          const optionMatches = structure.options.filter(option => 
            option.startsWith(currentWord)
          );
          if (optionMatches.length > 0) {
            return [optionMatches, currentWord];
          }
        }
        
        if (structure.accepts_files) {
          return this.completeFiles(currentWord);
        }
      }
    }
    
    const currentWord = words[words.length - 1];
    return this.completeFiles(currentWord);
  }

  setupEventHandlers() {
    this.rl.on('line', (input) => {
      this.processCommand(input.trim());
    });

    this.rl.on('close', () => {
      console.log('');
      console.log('👋 Bye!');
      process.exit(0);
    });

    process.on('SIGINT', () => {
      if (this.currentChild) {
        this.currentChild.kill('SIGINT');
        this.currentChild = null;
        console.log('');
        this.rl.prompt();
        return;
      }
      
      console.log('');
      console.log('👋 Bye!');
      process.exit(0);
    });
  }

  setupKeypressHandler() {
    process.stdin.on('keypress', (str, key) => {
      if (!key) return;
      
      if (key.name === 'up' || key.name === 'down') {
        this.clearVisibleSuggestion();
        return;
      }
      
      if (key.name === 'tab') {
        if (this.currentSuggestion && this.currentSuggestion !== this.rl.line) {
          const remainingText = this.currentSuggestion.slice(this.rl.line.length);
          
          this.clearVisibleSuggestion();
          
          this.rl.write(remainingText);
          return;
        }
        return;
      }
      
      if (key.name === 'left' || key.name === 'right' || 
          key.name === 'home' || key.name === 'end' ||
          key.name === 'return') {
        this.clearVisibleSuggestion();
        return;
      }
      
      if ((str && !key.ctrl && !key.meta) || key.name === 'backspace') {
        setTimeout(() => {
          this.clearVisibleSuggestion();
          this.showSuggestion();
        }, 0);
      }
    });
  }

  clearVisibleSuggestion() {
    if (this.currentSuggestion && this.currentSuggestion !== this.rl.line) {
      const currentCursor = this.rl.cursor;
      this.rl.write(null, {ctrl: true, name: 'e'});
      
      const suggestionPart = this.currentSuggestion.slice(this.rl.line.length);
      if (suggestionPart.length > 0) {
        process.stdout.write(' '.repeat(suggestionPart.length));
        process.stdout.write('\b'.repeat(suggestionPart.length));
      }
      
      if (currentCursor < this.rl.line.length) {
        this.rl.write(null, {ctrl: true, name: 'a'});
        for (let i = 0; i < currentCursor; i++) {
          this.rl.write(null, {name: 'right'});
        }
      }
      
      this.currentSuggestion = '';
    }
  }

  showSuggestion() {
    const line = this.rl.line;
    const words = line.split(' ');
    
    if (this.rl.cursor !== line.length) {
      return;
    }
    
    if (words.length === 1 && words[0].length > 0) {
      const suggestion = this.findClosestMatch(words[0]);
      
      if (suggestion && suggestion !== words[0]) {
        this.currentSuggestion = suggestion;
        const displayPart = suggestion.slice(words[0].length);
        
        process.stdout.write(`\x1b[90m${displayPart}\x1b[0m`);
        process.stdout.write('\b'.repeat(displayPart.length));
      }
    }
    else if (words.length === 2) {
      const mainCommand = words[0];
      const commandSuggestion = this.autocompleteSuggestions.find(suggestion => 
        typeof suggestion === 'object' && suggestion.command === mainCommand
      );
      
      if (commandSuggestion) {
        const subcommandMatches = commandSuggestion.subcommands.filter(subcmd => 
          subcmd.startsWith(words[1])
        );
        
        if (subcommandMatches.length > 0 && subcommandMatches[0] !== words[1]) {
          const suggestion = subcommandMatches[0];
          const displayPart = suggestion.slice(words[1].length);
          
          process.stdout.write(`\x1b[90m${displayPart}\x1b[0m`);
          process.stdout.write('\b'.repeat(displayPart.length));
          
          this.currentSuggestion = words[0] + ' ' + suggestion;
          return;
        }
        
        const subcommand = words[1] || '';
        const structure = commandSuggestion.structure[subcommand] || commandSuggestion.structure[''];
        
        if (structure && structure.accepts_files && !commandSuggestion.subcommands.includes(words[1])) {
          const fileSuggestion = this.completeFilePath(words[1]);
          
          if (fileSuggestion && fileSuggestion !== words[1]) {
            const displayPart = fileSuggestion.slice(words[1].length);
            
            process.stdout.write(`\x1b[90m${displayPart}\x1b[0m`);
            process.stdout.write('\b'.repeat(displayPart.length));
            
            this.currentSuggestion = words[0] + ' ' + fileSuggestion;
          }
        }
        else if (!structure || (!structure.accepts_files && !commandSuggestion.subcommands.includes(words[1]))) {
          const fileSuggestion = this.completeFilePath(words[1]);
          
          if (fileSuggestion && fileSuggestion !== words[1]) {
            const displayPart = fileSuggestion.slice(words[1].length);
            
            process.stdout.write(`\x1b[90m${displayPart}\x1b[0m`);
            process.stdout.write('\b'.repeat(displayPart.length));
            
            this.currentSuggestion = words[0] + ' ' + fileSuggestion;
          }
        }
      }
      else {
        const fileSuggestion = this.completeFilePath(words[1]);
        
        if (fileSuggestion && fileSuggestion !== words[1]) {
          const displayPart = fileSuggestion.slice(words[1].length);
          
          process.stdout.write(`\x1b[90m${displayPart}\x1b[0m`);
          process.stdout.write('\b'.repeat(displayPart.length));
          
          this.currentSuggestion = words[0] + ' ' + fileSuggestion;
        }
      }
    }
    else if (words.length > 2) {
      const mainCommand = words[0];
      const commandSuggestion = this.autocompleteSuggestions.find(suggestion => 
        typeof suggestion === 'object' && suggestion.command === mainCommand
      );
      
      let shouldSuggestFiles = true;
      
      if (commandSuggestion) {
        const subcommand = words[1] || '';
        const structure = commandSuggestion.structure[subcommand] || commandSuggestion.structure[''];
        
        if (structure) {
          shouldSuggestFiles = structure.accepts_files;
        }
      }
      
      if (shouldSuggestFiles || !commandSuggestion) {
        const lastWord = words[words.length - 1];
        const fileSuggestion = this.completeFilePath(lastWord);
        
        if (fileSuggestion && fileSuggestion !== lastWord) {
          const displayPart = fileSuggestion.slice(lastWord.length);
          
          process.stdout.write(`\x1b[90m${displayPart}\x1b[0m`);
          process.stdout.write('\b'.repeat(displayPart.length));
          
          words[words.length - 1] = fileSuggestion;
          this.currentSuggestion = words.join(' ');
        }
      }
    }
  }

  processCommand(input) {
    this.clearVisibleSuggestion();
    this.currentInput = '';
    this.currentSuggestion = '';
    
    if (!input) {
      this.rl.prompt();
      return;
    }

    this.history.push(input);
    this.historyIndex = -1;
    let Content = fs.readFileSync(dimensityfile, 'utf8').trim();
    if (Content) {
      try {
        Content = JSON.parse(Content);
        Content.history.push(input);
      } catch (e) {
        Content = { history: [input] };
      }
    } else {
      Content = { history: [input] };
    }
    fs.writeFileSync(dimensityfile, JSON.stringify(Content, null, 2));
    const [command, ...args] = input.split(' ');
    
    if (this.aliases[command]) {
      const aliasCommand = this.aliases[command];
      const expandedCommand = `${aliasCommand} ${args.join(' ')}`.trim();
      console.log(`\x1b[37m(running ${expandedCommand})\x1b[0m`);
      this.processCommand(expandedCommand);
      return;
    } else if (this.commands[command]) {
      this.commands[command](args);
    } else {
      this.executeSystemCommand(input);
    }
  }

  executeSystemCommand(command) {
    const child = spawn('sh', ['-c', command], {
      stdio: 'inherit'
    });
    
    this.currentChild = child;

    child.on('close', (code) => {
      this.currentChild = null;
      this.sigintCount = 0;
      
      if (code !== 0) {
        if (code != 127) {
        let errorMessage = `| Command exited with code ${code}! |`;
        let firstlinecontent = "";
        let i;
        for (i = 0; i < errorMessage.length; i++) {
            if (i == 0) {
                firstlinecontent = firstlinecontent + "+"
            } else if (i == errorMessage.length - 1) {
                firstlinecontent = firstlinecontent + "+"
            } else {
                firstlinecontent = firstlinecontent + "-"
            }
        }
        errorMessage = `| \x1b[31mCommand exited with code ${code}!\x1b[0m |`;
        console.log(firstlinecontent);
        console.log(errorMessage);
        console.log(firstlinecontent);
        }
      }
      this.rl.prompt();
    });

    child.on('error', (err) => {
      this.currentChild = null;
      this.sigintCount = 0;
      console.log(`Error: ${err.message}`);
      this.rl.prompt();
    });
  }

  // dimensity command stuff
  dimensity(command) {
    if (command[0] === 'help') {
      console.log('');
      console.log('Dimensity commands:');
      console.log('');
      console.log(' dimensity help              \x1b[37m- Show this help message\x1b[0m');
      console.log(' (dimensity) exit            \x1b[37m- Exit the application\x1b[0m');
      console.log(' (dimensity) clear           \x1b[37m- Clear the screen\x1b[0m');
      console.log(' dimensity history           \x1b[37m- Show command history\x1b[0m');
      console.log(' dimensity settings (edit)   \x1b[37m- Show/edit settings\x1b[0m');
      console.log('');
      this.rl.prompt();
      return;
    } else if (command[0] === 'exit') {
      this.exit();
      return;
    } else if (command[0] === 'clear') {
      this.clear();
      return;
    } else if (command[0] === 'history') {
      if (command[1] === 'clear') {
        this.history = [];
        this.historyIndex = -1;
        dimensitycontent = { history: [] };
        this.history = dimensitycontent.history;
        fs.writeFileSync(dimensityfile, JSON.stringify({ history: [] }, null, 2));
        console.log('\x1b[36mCommand history cleared!\x1b[0m \x1b[37mChanges with the history shown through the arrow keys will take effect when you reopen Dimensity (limitations of how I implemented it :D).\x1b[0m');
        this.rl.prompt();
        return;
      }
      this.showHistory();
      return;
    } else if (command[0] === 'settings') {
        if (command[1] === 'edit') {
          console.log('');
          console.log('Settings:');
          console.log(' 1. Username');
          console.log(' 2. Command Aliases');
          console.log(' 3. Theme Color');
          console.log(' 4. Exit settings');
          console.log('');
          this.rl.question('\x1b[33mChoose an option (1 to 4): \x1b[0m', (option) => {
            if (option === '1') {
              this.rl.question('Enter new username: ', (newUsername) => {
                if (newUsername && newUsername.trim()) {
                  this.username = newUsername.trim();
                  dimensitycontent.username = this.username;
                  fs.writeFileSync(dimensityfile, JSON.stringify(dimensitycontent, null, 2));
                  this.rl.setPrompt(`\x1b[32m${this.username}@dimensity:~$\x1b[0m `);
                  console.log(`👋 Hello ${this.username}, nice to meet you again! Got your new username.`);
                } else {
                  console.log(`\x1b[31mInvalid username. Please enter something valid :(\x1b[0m`);
                }
                this.rl.prompt();
              });
            } else if (option === '2') {
              this.manageAliases();
            } else if (option === '3') {
              console.log('Which color do you want to use?');
              console.log(' 1. \x1b[36mTeal (Dimensity Default)\x1b[0m');
              console.log(' 2. \x1b[31mRed\x1b[0m');
              console.log(' 3. \x1b[32mGreen\x1b[0m');
              console.log(' 4. \x1b[33mYellow\x1b[0m');
              console.log(' 5. \x1b[34mBlue\x1b[0m');
              console.log(' 6. \x1b[35mMagenta\x1b[0m');
              console.log(' 7. \x1b[36mCyan\x1b[0m');
              console.log(' 8. \x1b[37mWhite\x1b[0m');
              this.rl.question('\x1b[33mChoose a color (1-8): \x1b[0m', (colorOption) => {
                const colors = {
                  '1': '36m',
                  '2': '31m',
                  '3': '32m',
                  '4': '33m',
                  '5': '34m',
                  '6': '35m',
                  '7': '36m',
                  '8': '37m'
                };
                if (colors[colorOption]) {
                  dimensitycontent.color = colors[colorOption];
                  fs.writeFileSync(dimensityfile, JSON.stringify(dimensitycontent, null, 2));
                  const colorNames = {
                    '36m': 'Teal',
                    '31m': 'Red',
                    '32m': 'Green',
                    '33m': 'Yellow',
                    '34m': 'Blue',
                    '35m': 'Magenta',
                    '37m': 'White'
                  };
                  console.log(`Dimensity's color has been set to \x1b[${dimensitycontent.color}${colorNames[dimensitycontent.color]}\x1b[0m!`);
                } else {
                  console.log(`\x1b[31mInvalid color option.\x1b[0m`);
                }
                this.rl.prompt();
              });
            } else if (option === '4') {
              this.rl.prompt();
            } else {
              console.log(`\x1b[31mInvalid option! You can only choose 1 to 4.\x1b[0m`);
              this.rl.prompt();
            }
          });
        } else {
          const colorNames = {
            '36m': 'Teal',
            '31m': 'Red',
            '32m': 'Green',
            '33m': 'Yellow',
            '34m': 'Blue',
            '35m': 'Magenta',
            '37m': 'White'
          };
          console.log('');
          console.log('Current settings:');
          console.log(' Username: ' + dimensitycontent.username);
          console.log(' Command Aliases: ' + Object.keys(this.aliases).length + ' set \x1b[37m(to view/manage, use "dimensity settings edit")\x1b[0m');
          console.log(' Theme Color: \x1b[' + dimensitycontent.color + colorNames[dimensitycontent.color] + '\x1b[0m');
          console.log('');
          console.log('Type "dimensity settings edit" to edit any of these.');
          this.rl.prompt();
          return;
        }
    } else if (command.length === 0) {
      let message = `║ You're running Dimensity v${dimensityvars.version}!`;
      let messageauthor = `║ Created by Dan (@justdanielndev)`;
      let message2 = `║ Type "dimensity help" for help.`;
      const length = Math.max(message.length, messageauthor.length, message2.length);
      message = message.padEnd(length, ' ');
      messageauthor = messageauthor.padEnd(length, ' ');
      message2 = message2.padEnd(length, ' ');
      message = message + ' ║';
      messageauthor = messageauthor + ' ║';
      message2 = message2 + ' ║';
      const borderChar = '═';
      const borderLength = Math.max(message.length, message2.length);
      let firstlinecontent = '╔' + borderChar.repeat(borderLength - 2) + '╗';
      let thirdlinecontent = '╚' + borderChar.repeat(borderLength - 2) + '╝';
      console.log(`\x1b[${dimensitycontent.color}` + firstlinecontent + '\x1b[0m');
      console.log(`\x1b[${dimensitycontent.color}` + message + '\x1b[0m');
      console.log(`\x1b[${dimensitycontent.color}` + messageauthor + '\x1b[0m');
      console.log(`\x1b[${dimensitycontent.color}` + message2 + '\x1b[0m');
      console.log(`\x1b[${dimensitycontent.color}` + thirdlinecontent+ '\x1b[0m');
      this.rl.prompt();
      return;
    } else {
      console.log(`\x1b[31m${command[0]}... No idea what that command is. Were you trying to run a non-Dimensity command? Remove the "dimensity" prefix and try again.\x1b[0m`);
      this.rl.prompt();
      return;
    }
  }

  manageAliases() {
    console.clear();
    console.log('');
    console.log('\x1b[' + dimensitycontent.color+ 'Command Aliases' + '\x1b[0m');
    console.log('');
    
    const aliasKeys = Object.keys(this.aliases);
    if (aliasKeys.length > 0) {
      console.log('Your current aliases:');
      aliasKeys.forEach((alias, index) => {
        console.log(`  ${alias} (${this.aliases[alias]})`);
      });
      console.log('');
    } else {
      console.log('No aliases created yet!');
      console.log('');
    }
    
    console.log(' 1. Add new alias');
    console.log(' 2. Remove alias');
    console.log(' 3. Leave menu & settings');
    console.log('');
    
    this.rl.question('\x1b[33mChoose an option (1 to 3): \x1b[0m', (option) => {
      if (option === '1') {
        this.rl.question('Enter the new alias\' name: ', (aliasName) => {
          if (aliasName && aliasName.trim() && !aliasName.includes(' ')) {
            this.rl.question('Enter the command the alias should run: ', (originalCommand) => {
              if (originalCommand && originalCommand.trim()) {
                this.aliases[aliasName.trim()] = originalCommand.trim();
                dimensitycontent.aliases = this.aliases;
                fs.writeFileSync(dimensityfile, JSON.stringify(dimensitycontent, null, 2));
                console.log(`\x1b[32mAlias ${aliasName.trim()} (${originalCommand.trim()}) created successfully!\x1b[0m`);
                this.updateAutocompleteSuggestions();
              } else {
                console.log(`\x1b[31mInvalid command! Please enter a valid command.\x1b[0m`);
              }
              this.rl.prompt();
            });
          } else {
            console.log(`\x1b[31mInvalid alias name (alias names cannot contain spaces)! Please enter a valid alias name.\x1b[0m`);
            this.rl.prompt();
          }
        });
      } else if (option === '2') {
        if (aliasKeys.length === 0) {
          console.log(`\x1b[31mNo aliases to remove... Please add some first!\x1b[0m`);
          this.rl.prompt();
          return;
        }
        this.rl.question('Enter alias name to remove: ', (aliasToRemove) => {
          if (aliasToRemove && this.aliases[aliasToRemove.trim()]) {
            const removedCommand = this.aliases[aliasToRemove.trim()];
            delete this.aliases[aliasToRemove.trim()];
            dimensitycontent.aliases = this.aliases;
            fs.writeFileSync(dimensityfile, JSON.stringify(dimensitycontent, null, 2));
            console.log(`\x1b[32mAlias '${aliasToRemove.trim()}' (${removedCommand}) removed successfully!\x1b[0m`);
            this.updateAutocompleteSuggestions();
          } else {
            console.log(`\x1b[31mWe couldn't find that alias! Please enter a valid alias.\x1b[0m`);
          }
          this.rl.prompt();
        });
      } else if (option === '3') {
        this.rl.prompt();
      } else {
        console.log(`\x1b[31mInvalid option! Please choose 1, 2, or 3.\x1b[0m`);
        this.rl.prompt();
      }
    });
  }

  updateAutocompleteSuggestions() {
    const aliasCommands = Object.keys(this.aliases).map(alias => ({
      command: alias,
      subcommands: [],
      structure: { "": { options: [], accepts_files: true }}
    }));
    
    const nonAliasCommands = this.autocompleteSuggestions.filter(suggestion => 
      !this.aliases.hasOwnProperty(suggestion.command)
    );
    
    this.autocompleteSuggestions = [...nonAliasCommands, ...aliasCommands];
    dimensitycontent["autocomplete-suggestions"] = this.autocompleteSuggestions;
    fs.writeFileSync(dimensityfile, JSON.stringify(dimensitycontent, null, 2));
  }

  exit() {
    this.rl.close();
  }

  clear() {
    console.clear();
    this.rl.prompt();
  }

  showHistory() {
    console.log('Command history:');
    this.history.forEach((cmd, index) => {
      console.log(`  ${index + 1}: ${cmd}`);
    });
    this.rl.prompt();
  }

  runOnboarding() {
    const welcomeMessages = [
      '║ Hey, welcome to Dimensity! 👋',
      '║ May I... know your username? Please? :D',
      '║ This will be displayed the CLI prompt.'
    ];
    
    const maxLength = Math.max(...welcomeMessages.map(msg => msg.length));
    const paddedMessages = welcomeMessages.map(msg => msg.padEnd(maxLength, ' ') + ' ║');
    
    const borderChar = '═';
    const borderLength = paddedMessages[0].length;
    const topBorder = '╔' + borderChar.repeat(borderLength - 2) + '╗';
    const bottomBorder = '╚' + borderChar.repeat(borderLength - 2) + '╝';
    
    console.log('');
    console.log(`\x1b[${dimensitycontent.color}` + topBorder + `\x1b[0m`);
    paddedMessages.forEach(msg => {
      console.log(`\x1b[${dimensitycontent.color}` + msg + '\x1b[0m');
    });
    console.log(`\x1b[${dimensitycontent.color}` + bottomBorder + '\x1b[0m');
    console.log('');
    
    this.rl.question('Enter your username: ', (username) => {
      if (username && username.trim()) {
        this.username = username.trim();
        this.rl.setPrompt(`\x1b[32m${this.username}@dimensity:~$\x1b[0m `)
        let config = dimensitycontent;
        config.username = this.username;
        config.onboarding = true;
        fs.writeFileSync(dimensityfile, JSON.stringify(config, null, 2));
        console.log(`Nice to meet you, ${this.username}! You're all set.`);
        console.log('You can type "dimensity help" for available commands.');
        this.rl.prompt();
      } else {
        console.log('Please enter a valid username... :(');
        this.runOnboarding();
      }
    });
  }

  // omg, starts the server
  start() {
    console.log('');
    console.log('░ Starting Dimensity...');
    console.log('');
    
    if (this.needsOnboarding) {
      this.runOnboarding();
    } else {
      console.log('Fyi, you can type "dimensity help" for available commands.');
      console.log('');
      this.rl.prompt();
    }
  }
}

const app = new ScreenApp();
app.start();
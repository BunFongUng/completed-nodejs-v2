console.log('app.js started!');

const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
let command = process.argv[2];

// console.log(argv._);

if (command === 'add') {
    notes.addNote(argv.title, argv.text);
} else if (command === 'read') {
    notes.readNote(argv.title);
} else if (command === 'list'){
    notes.listNotes();
} else if (command === 'delete'){
    notes.deleteNote(argv.title);
} else{
    console.log('command not recognize');
}
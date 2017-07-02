console.log("app.js started!");

const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

const argv = yargs.argv;
let command = process.argv[2];

// console.log(argv._);

if (command === "add") {
  let note = notes.addNote(argv.title, argv.text);
    if(!note) {
        return console.log('could save the note.');
    }

    console.log(`Note created: ${note.title}, ${note.text}`);
} else if (command === "read") {
  notes.readNote(argv.title);
} else if (command === "list") {
  notes.listNotes();
} else if (command === "delete") {
  notes.deleteNote(argv.title);
} else {
  console.log("command not recognize");
}

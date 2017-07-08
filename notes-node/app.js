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
        return console.log('Note already exist.');
    }

    console.log(`Note created: ${note.title}, ${note.text}`);
} else if (command === "read") {
  let note = notes.readNote(argv.title);

  if(!note) {
    return console.log('Not Found!');
  }

  console.log('Reading Note');
  console.log(`Title: ${note.title}`);
  console.log(`Text: ${note.text}`);
} else if (command === "list") {
  let notesList = notes.listNotes();

  if(notesList.length === 0) {
    return console.log('There is no notes');
  }

  console.log(`Your notes list are (${notesList.length}): `);
  _.each(notesList,(note) => {
    console.log(`
        title: ${note.title}
        text: ${note.text}
        created_at: ${note.created_at}`);
    console.log('===================================================');
  });

} else if (command === "delete") {
  notes.deleteNote(argv.title);
} else {
  console.log("command not recognize");
}

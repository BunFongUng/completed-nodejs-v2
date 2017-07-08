const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

let title = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

let text = {
    describe: 'Text of your note',
    demand: true,
    alias: 'e'
};

const argv = yargs
    .command('add', 'Add new note.', {
        title,
        text
    })
    .command('read', 'Read a note', {
        title
    })
    .command('list', 'Listing all notes')
    .command('delete', 'Delete note', {
        title
    })
    .help()
    .argv;
let command = process.argv[2];

// console.log(argv._);

if (command === "add") {
  let note = notes.addNote(argv.title, argv.text);
    if(!note) {
        return console.log('Note already exist.');
    }

    console.log(`Note created:`);
    notes.logNote(note);
} else if (command === "read") {
  let note = notes.readNote(argv.title);

  if(!note) {
    return console.log('Not Found!');
  }

  console.log('Reading Note');
  notes.logNote(note);
} else if (command === "list") {
  let notesList = notes.listNotes();

  if(notesList.length === 0) {
    return console.log('There is no notes');
  }

  console.log(`Your notes list are (${notesList.length}): `);
  _.each(notesList,(note) => {
    notes.logNote(note);
  });

} else if (command === "delete") {
  let noteDelete = notes.deleteNote(argv.title);
  if(!noteDelete) {
    return console.log('Note not exist');
  }
  console.log('Note have been deleted!');
} else {
  console.log("command not recognize");
}

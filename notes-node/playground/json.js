const fs = require('fs');

let originalNote = {
    title: 'Learning NodeJS',
    text: 'Today i have learned nodejs.'
};

let originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);

let notesString = fs.readFileSync('notes.js');

let notes = JSON.parse(notesString);

console.log(notes.title);

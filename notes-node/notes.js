console.log("notejs.js started!");

const fs = require('fs');

let addNote = (title, text) => {
    let notes = [];

    let note = {
        title,
        text
    };

    try {
        let notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    } catch (error) {
        console.log("File don't exist.");
    }

    let duplicateNote = notes.filter((note) => note.title === title);

    if(duplicateNote.length === 0) {
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    }

};

let readNote = (title) => {
    console.log(`Reading note: ${title}`);
};

let listNotes = () => {
    console.log('listing all notes');
};

let deleteNote = (title) => {
    console.log(`Delete note: ${title}`);
};

module.exports = {
    addNote,
    readNote,
    listNotes,
    deleteNote
};

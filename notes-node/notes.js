console.log("notejs.js started!");

const fs = require('fs');

let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (error) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, text) => {
    let notes = fetchNotes();
    let created_at = new Date().toString();
    let note = {
        title,
        text,
        created_at
    };

    let duplicateNote = notes.filter((note) => note.title === title);

    if(duplicateNote.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
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

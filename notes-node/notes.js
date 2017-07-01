console.log("notejs.js started!");

let addNote = (title, text) => {
    console.log(`Adding note: title: ${title} and body: ${body} `);
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

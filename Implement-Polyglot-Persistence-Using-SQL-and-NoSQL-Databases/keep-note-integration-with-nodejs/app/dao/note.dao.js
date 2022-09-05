const connection = require("./db");

/*
variable to store connection object to perform CRUD operations using connection module
*/
sql = connection();
/* constructor to initialize note with note_title, note_content, note_status,
 note_creation_date,note_id and reminder_id  as its properties*/
const Note = function (note) {
  this.note_title = note.note_title;
  this.note_content = note.note_content;
  this.note_status = note.note_status;
  this.user_id = note.user_id;
  //   this.note_creation_date = note.note_creation_date;
  //   this.note_id = note.note_id;
  //   this.reminder_id = note.reminder_id;
};

/* 
  create should be a function that calls the query function on sql object to persist note 
  data in MySQL notes db schema using insert query. Write separate insert queries to insert row
  in Note, NoteCategory and NoteReminder tables
*/

Note.create = (newNote, result) => {
  sql.query("INSERT INTO notes SET ?", newNote, (err, res) => {
    if (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        return result("Invalid user id", null);
      }
      return result("error occurred while creating Note", null);
    }

    return result(null, { id: res.insertId, ...newNote });
  });
};

/* 
  findById should be a function that calls the query function on sql object 
  to fetch the note by the provided Id from the notesdb schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables
*/

Note.findById = (noteId, result) => {
  sql.query(`SELECT * FROM notes WHERE note_id = ${noteId}`, (err, res) => {
    if (err) {
      return result("error occurred while fetching Note", null);
    }

    if (res.length) {
      console.log("found note: ", res[0]);
      return result(null, res[0]);
    }

    // not found Note with the id
    return result({ kind: "not_found" }, null);
  });
};

/* 
  getAll should be a function that calls the query function on sql object to fetch all 
  the notes or notes with specific title from the notesdb   schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables.
*/

Note.getAll = (options, result) => {
  let query = "SELECT * FROM notes";
  if (options.title) {
    query += ` WHERE note_title = '${options.title}'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      return result("error occurred while fetching Note", null);
    }

    if (res.length) {
      console.log("found notes: ", res);
      return result(null, res);
    }

    // not found Note with the id
    return result({ kind: "not_found" }, null);
  });
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the note for the given id from the notesdb schema using update query
*/

Note.updateById = (id, note, result) => {
  sql.query(`UPDATE notes SET ? WHERE note_id = ${id}`, note, (err, res) => {
    if (err) {
      return result("error occurred while updating Note", null);
    }

    if (res.affectedRows == 0) {
      // not found Note with the id
      return result({ kind: "not_found" }, null);
    }

    return result(null, { id: id, ...note });
  });
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the note for the given id from the notesdb schema using delete query
*/
Note.remove = (id, result) => {
  sql.query("DELETE FROM notes WHERE note_id = ?", id, (err, res) => {
    if (err) {
      return result("error occurred while deleting Note", null);
    }

    if (res.affectedRows == 0) {
      // not found Note with the id
      return result({ kind: "not_found" }, null);
    }

    return result(null, res);
  });
};

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the notes from the notesdb schema using delete query
*/
Note.removeAll = (result) => {
  sql.query("DELETE FROM notes", (err, res) => {
    if (err) {
      return result("error occurred while deleting Note", null);
    }

    return result(null, res);
  });
};
sql.end((err) => {
    if (err) {
      console.log("error occurred while closing the connection");
    }
    console.log("connection closed");
  });
module.exports = Note;

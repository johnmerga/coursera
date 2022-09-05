const noteDAO = require("../dao/note.dao");

/* Create and Save a new Note by calling noteDAO create method.
   Depending on the return value, it should return the results or the error message*/
exports.create = (newNote, result) => {
  noteDAO.create(newNote, result);
};

/* Retrieve all notes by calling noteDAO getAll method.
    Depending on the return value, it should return the results or the error message*/
exports.getAll = (options, result) => {
  noteDAO.getAll(options, result);
};

/* Find a single Note by Id by calling noteDAO findById method.
   Depending on the return value, it should return the results or the error message*/
exports.findById = (noteId, result) => {
  noteDAO.findById(noteId, result);
};

/* Update a Note identified by the id by calling noteDAO updateById method.
   Depending on the return value, it should return the results or the error message*/
exports.updateById = (noteId, note, result) => {
  noteDAO.updateById(noteId, note, result);
};

/* Delete a Note with the specified id by calling noteDAO remove method.
   Depending on the return value, it should return the results or the error message*/
exports.remove = (noteId, result) => {
  noteDAO.remove(noteId, result);
};

/* Delete all Notes by calling noteDAO removeAll method.
   Depending on the return value, it should return the results or the error message*/
exports.removeAll = (result) => {
  noteDAO.removeAll(result);
};

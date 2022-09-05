const noteService = require("../service/note.service.js");

/* Call the create method of noteService object and return the result back*/
exports.create = (newNote, result) => {
  noteService.create(newNote, result);
};

/* Call the getAll method of noteService object and return the result back */
exports.getAll = (options, result) => {
  noteService.getAll(options, result);
};

/* Call the findById method of noteService object and return the result back */
exports.findById = (noteId, result) => {
  noteService.findById(noteId, result);
};

/* Call the updateById method of noteService object and return the result back */
exports.update = (noteId, note, result) => {
  noteService.updateById(noteId, note, result);
};

/* Call the remove method of noteService object and return the result back */
exports.delete = (noteId, result) => {
  noteService.remove(noteId, result);
};

/* Call the removeAll method of noteService object and return the result back */
exports.deleteAll = (result) => {
  noteService.removeAll(result);
};

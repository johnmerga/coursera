// #1 select user_id,user_password from users;
// #2 select note_creation_date from notes;
/**
 * Fetch all the Categories created after the particular Date.
 */
 const fetchNotesAfterDate = (date) => {
    return `SELECT * FROM notes WHERE note_creation_date > "${date}"`;
  };
  
  /**
   * Fetch all the Note ID from UserNote table for a given User.
   */
  const fetchNoteIdsForUser = (user_id) => {
    return `SELECT note_id FROM user_note WHERE user_id = ${user_id}`;
  };
  
  /**
   * Write Update query to modify particular Note for the given note Id.
   */
  const updateNote = (note_id, note) => {
    return `UPDATE notes SET note_title = "${note.note_title}", note_content = "${note.note_content}", note_status = "${note.note_status}" WHERE note_id = ${note_id}`;
  };
  
  /**
   * Fetch all the Notes from the Note table by a particular User.
   */
  const fetchNotesForUser = (user_id) => {
    return `SELECT * FROM notes WHERE user_id = ${user_id}`;
  };
  /**
   * Fetch all the Notes from the Note table for a particular Category.
   */
  const fetchNotesForCategory = (category_id) => {
    return `SELECT * FROM notes WHERE category_id = ${category_id}`;
  };
  /**
   * Fetch all the reminder details for a given note id.
   */
  const fetchReminderForNote = (note_id) => {
    return `SELECT * FROM reminders WHERE note_id = ${note_id}`;
  };
  /**
   * Fetch the reminder details for a given reminder id.
   */
  const fetchReminder = (reminder_id) => {
    return `SELECT * FROM reminders WHERE reminder_id = ${reminder_id}`;
  };
  /**
   * Write a query to create a new Note from particular User (Use Note and UserNote tables - insert statement).
   */
  const createNote = (note, user_id) => {
    return `INSERT INTO notes (note_title, note_content, note_status, user_id) VALUES ("${note.note_title}", "${note.note_content}", "${note.note_status}", ${user_id})`;
  };
  /**
   * Write a query to create a new Note from particular User to particular Category(Use Note and NoteCategory tables - insert statement)
   */
  const createNoteForCategory = (note, user_id, category_id) => {
    return `INSERT INTO notes (note_title, note_content, note_status, user_id, category_id) VALUES ("${note.note_title}", "${note.note_content}", "${note.note_status}", ${user_id}, ${category_id})`;
  };
  /**
   * Write a query to set a reminder for a particular note (Use Reminder and NoteReminder tables - insert statement)
   */
  const setReminderForNote = (reminder, note_id) => {
    return `INSERT INTO reminders (reminder_date, reminder_time, note_id) VALUES ("${reminder.reminder_date}", "${reminder.reminder_time}", ${note_id})`;
  };
  /**
   * Write a query to delete particular Note added by a User(Note and UserNote tables - delete statement)
   */
  const deleteNote = (note_id, user_id) => {
    return `DELETE FROM notes WHERE note_id = ${note_id} AND user_id = ${user_id}`;
  };
  /**
   * Write a query to delete particular Note from particular Category(Note and NoteCategory tables - delete statement)
   */
  const deleteNoteFromCategory = (note_id, category_id) => {
    return `DELETE FROM notes WHERE note_id = ${note_id} AND category_id = ${category_id}`;
  };
  
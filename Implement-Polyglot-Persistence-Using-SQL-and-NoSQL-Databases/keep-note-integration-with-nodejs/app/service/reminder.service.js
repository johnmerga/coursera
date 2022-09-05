const reminderDAO = require("../dao/reminder.dao");

/* Create and Save a new Reminder by calling reminderDAO create method.
   Depending on the return value, it should return the results or the error message*/
exports.create = (newReminder, result) => {
  reminderDAO.create(newReminder, result);
};

/* Retrieve all reminders by calling reminderDAO getAll method.
    Depending on the return value, it should return the results or the error message*/
exports.getAll = (options, result) => {
  reminderDAO.getAll(options, result);
};

/* Find a single Reminder by Id by calling reminderDAO findById method.
   Depending on the return value, it should return the results or the error message*/
exports.findById = (reminderId, result) => {
  reminderDAO.findById(reminderId, result);
};

/* Update a Reminder identified by the id by calling reminderDAO updateById method.
   Depending on the return value, it should return the results or the error message*/
exports.updateById = (reminderId, reminder, result) => {
  reminderDAO.updateById(reminderId, reminder, result);
};

/* Delete a Reminder with the specified id by calling reminderDAO remove method.
   Depending on the return value, it should return the results or the error message*/
exports.remove = (reminderId, result) => {
  reminderDAO.remove(reminderId, result);
};

/* Delete all Reminders by calling reminderDAO removeAll method.
   Depending on the return value, it should return the results or the error message*/
exports.removeAll = (result) => {
  reminderDAO.removeAll(result);
};

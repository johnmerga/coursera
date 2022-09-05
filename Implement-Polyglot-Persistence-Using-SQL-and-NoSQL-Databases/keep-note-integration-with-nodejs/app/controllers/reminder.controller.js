const reminderService = require("../service/reminder.service.js");

/* Call the create method of reminderService object and return the result back*/
exports.create = (newReminder, result) => {
  reminderService.create(newReminder, result);
};

/* Call the getAll method of reminderService object  and return the result back*/
exports.findAll = (options, result) => {
  reminderService.getAll(options, result);
};

/* Call the findById method of reminderService object  and return the result back*/
exports.findOne = (reminderId, result) => {
  reminderService.findById(reminderId, result);
};

/* Call the updateById method of reminderService object  and return the result back*/
exports.update = (reminderId, reminder, result) => {
  reminderService.updateById(reminderId, reminder, result);
};

/* Call the remove method of reminderService object  and return the result back*/
exports.delete = (reminderId, result) => {
  reminderService.remove(reminderId, result);
};

/* Call the removeAll method of reminderService object  and return the result back*/
exports.deleteAll = (result) => {
  reminderService.removeAll(result);
};

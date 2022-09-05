const connection = require("./db");
sql = connection();

/* constructor to initialize reminder with reminder_name, reminder_description and
reminder_creation_date as its properties*/

const Reminder = function (reminder) {
  this.reminder_name = reminder.reminder_name;
  this.reminder_description = reminder.reminder_description;
  this.reminder_type = reminder.reminder_type;
  this.reminder_creator_id = reminder.reminder_creator_id;
  //   this.reminder_creation_date = reminder.reminder_creation_date;
};

/* 
  create should be a function that calls the query function on sql object
  to persist reminder data in MySQL notesdb schema using insert query
*/

Reminder.create = (newReminder, result) => {
  sql.query("INSERT INTO reminders SET ?", newReminder, (err, res) => {
    if (err) {
      if (err.code == "ER_NO_REFERENCED_ROW_2") {
        return result("Reminder Creator ID should be provided", null);
      }
      return result("error occurred while creating Reminder", null);
    }
    return result(null, { id: res.insertId, ...newReminder });
  });
};

/* 
  findById should be a function that calls the query function on sql object 
  to fetch the reminder by the provided Id from the notesdb schema using select query
*/

Reminder.findById = (reminderId, result) => {
  sql.query(
    `SELECT * FROM reminders WHERE reminder_id = ${reminderId}`,
    (err, res) => {
      if (err) {
        return result("error occurred while fetching Reminder", null);
      }

      if (res.length) {
        return result(null, res[0]);
      }

      // not found Reminder with the id
      return result({ kind: "not_found" }, null);
    }
  );
};

/* 
  getAll should be a function that calls the query function on sql object 
  to fetch all the reminders or reminders with specific title from the notesdb 
  schema using select query
*/

Reminder.getAll = (options, result) => {
  let query = "SELECT * FROM reminders";
  if (options.title) {
    query += ` WHERE reminder_name LIKE '%${options.title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      return result("error occurred while fetching Reminders", null);
    }
    if (!res.length) {
      return result({ kind: "not_found" }, null);
    }

    return result(null, res);
  });
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the reminder for the given id from the notesdb schema using update query
*/

Reminder.updateById = (id, reminder, result) => {
  sql.query(
    "UPDATE reminders SET reminder_name = ?, reminder_description = ? WHERE reminder_id = ?",
    [reminder.reminder_name, reminder.reminder_description, id],
    (err, res) => {
      if (err) {
        return result("error occurred while updating Reminder", null);
      }

      if (res.affectedRows == 0) {
        // not found Reminder with the id
        return result({ kind: "not_found" }, null);
      }

      // return not only the result but also the updated reminder
        return result(null, { id: id, ...reminder });
    }
  );
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the reminder for the given id from the notesdb schema using delete query
*/
Reminder.remove = (id, result) => {
  sql.query("DELETE FROM reminders WHERE reminder_id = ?", id, (err, res) => {
    if (err) {
      return result("error occurred while deleting Reminder", null);
    }

    if (res.affectedRows == 0) {
      // not found Reminder with the id
      return result({ kind: "not_found" }, null);
    }

    return result(null, res);
  });
};

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the reminders from the notesdb schema using delete query
*/
Reminder.removeAll = (result) => {
  sql.query("DELETE FROM reminders", (err, res) => {
    if (err) {
      return result("error occurred while deleting Reminders", null);
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
module.exports = Reminder;

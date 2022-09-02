const mysql = require("mysql");

const dbConfig = require("../../config/db.config");

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL");
  }
});
const createUserTableQuery = `CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    user_added_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_password VARCHAR(255) NOT NULL,
    user_mobile VARCHAR(255) NOT NULL
    )`;

const createNoteTableQuery = `CREATE TABLE IF NOT EXISTS notes (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    note_title VARCHAR(255) NOT NULL,
    note_content TEXT NOT NULL,
    note_status VARCHAR(255) NOT NULL,
    note_creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`;
const createCategoryTableQuery = `CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_description TEXT NOT NULL,
    category_creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category_creator_id INT NOT NULL,
    FOREIGN KEY (category_creator_id) REFERENCES users(user_id)
    )`;
const createReminderTableQuery = `CREATE TABLE IF NOT EXISTS reminders (
        reminder_id INT AUTO_INCREMENT PRIMARY KEY,
        reminder_name VARCHAR(255) NOT NULL,
        reminder_description TEXT NOT NULL,
        reminder_type VARCHAR(255) NOT NULL,
        reminder_creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        reminder_creator_id INT NOT NULL,
        FOREIGN KEY (reminder_creator_id) REFERENCES users(user_id)
        )`;
const createNoteCategoryTableQuery = `CREATE TABLE IF NOT EXISTS note_categories (
        note_category_id INT AUTO_INCREMENT PRIMARY KEY,
        note_id INT NOT NULL,
        category_id INT NOT NULL,
        FOREIGN KEY (note_id) REFERENCES notes(note_id),
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
        )`;
const createNoteReminderTableQuery = `CREATE TABLE IF NOT EXISTS note_reminders (
            note_reminder_id INT AUTO_INCREMENT PRIMARY KEY,
            note_id INT NOT NULL,
            reminder_id INT NOT NULL,
            FOREIGN KEY (note_id) REFERENCES notes(note_id),
            FOREIGN KEY (reminder_id) REFERENCES reminders(reminder_id)
            )`;
const createUserNoteTableQuery = `CREATE TABLE IF NOT EXISTS user_notes (
            user_note_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            note_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (note_id) REFERENCES notes(note_id)
            )`;
connection.query(createUserTableQuery, (err) => {
  if (err) {
    console.log("Error creating user table", err);
  }
});
connection.query(createNoteTableQuery, (err) => {
  if (err) {
    console.log("Error creating note table", err);
  }
});
connection.query(createCategoryTableQuery, (err) => {
  if (err) {
    console.log("Error creating category table", err);
  }
});
connection.query(createReminderTableQuery, (err) => {
  if (err) {
    console.log("Error creating reminder table", err);
  }
});
connection.query(createNoteCategoryTableQuery, (err) => {
  if (err) {
    console.log("Error creating note category table", err);
  }
});
connection.query(createNoteReminderTableQuery, (err) => {
  if (err) {
    console.log("Error creating note reminder table", err);
  }
});
connection.query(createUserNoteTableQuery, (err) => {
  if (err) {
    console.log("Error creating user note table", err);
  }
});

module.exports = connection;

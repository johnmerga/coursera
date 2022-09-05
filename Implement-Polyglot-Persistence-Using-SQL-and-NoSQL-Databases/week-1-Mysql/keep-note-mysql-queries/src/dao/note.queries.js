const { user_id_fetcher } = require("./user.queries");
// note add query
const noteAddQuery = (note) => {
  return `INSERT INTO notes (note_title, note_content, note_status, user_id) VALUES ("${note.note_title}", "${note.note_content}", "${note.note_status}", ${note.user_id})`;
};
const note1 = {
  note_title: "note1",
  note_content: "note1 content",
  note_status: "Active",
  user_id: 169,
};
// generate 50 random users and insert them into the database
const generateNotes = (num) => {
  let notes = [];
  for (let i = 0; i < num; i++) {
    let note = {
      note_title: ``,
      note_content: "",
      note_status: "",
      user_id: 169,
    };
    users.push(user);
  }
  return users;
};

